import Router, {Request, Response, NextFunction} from "express";

import {asyncHandler} from "../../middleware/error/handlers/asyncHandler";
import {newCustomError} from "../../middleware/error/CustomError";
import {
  OtpSenderRequestData,
  OtpVerifierRequestData,
  verifyOtpVerifierRequestData,
  verifyOtpSenderRequestData,
} from "../../middleware/controllers/auth/otp/verifyOtpRequestData";
import {responseDict} from "../../utilities/responsesDictionary";

import {
  getClinic,
  editClinic,
  findClinic,
} from "../../services/clinic/clinicService";
import {
  generateOtpCode,
  generateOtpExpiration,
  validateOtpCode,
  validateOtpExpiration,
} from "../../services/auth/authService";
import sendEmail from "../../services/clinic/email/emailService";

const router = Router();

type OtpSenderRequest = Request<object, object, OtpSenderRequestData>;
router.post(
  "/",
  verifyOtpSenderRequestData,
  asyncHandler(
    async (req: OtpSenderRequest, res: Response, next: NextFunction) => {
      const {email} = req.body.data;

      const foundClinic = await findClinic("", email);
      if (!foundClinic) {
        throw newCustomError(
          responseDict.unauthRequest,
          "Email is not registered",
          false
        );
      }

      const randomCode = generateOtpCode();
      const expirationTime = generateOtpExpiration();
      await editClinic(foundClinic.id, {
        "auth.otpCode": randomCode,
        "auth.otpExpiration": expirationTime,
      });

      await sendEmail("otpEmailTemplate", {code: randomCode}, email);

      return res
        .status(responseDict.success.code)
        .json({message: "Successfully sent otp"});
    }
  )
);

type OtpVerifierRequest = Request<object, object, OtpVerifierRequestData>;
router.post(
  "/verify",
  verifyOtpVerifierRequestData,
  asyncHandler(
    async (req: OtpVerifierRequest, res: Response, next: NextFunction) => {
      const {email, code} = req.body.data;

      const foundClinic = await findClinic("", email);
      if (!foundClinic) {
        throw newCustomError(
          responseDict.unauthRequest,
          "Clinic does not exist",
          true
        );
      }

      const clinicData = await getClinic(foundClinic.id, [
        "auth.otpExpiration",
        "auth.otpCode",
      ]);

      if (!clinicData) {
        throw newCustomError(
          responseDict.unexpected,
          "Error querying clinic for otp",
          false
        );
      }

      const storedCodeExpiration = clinicData.auth.otpExpiration.toDate();
      const storedCode = clinicData.auth.otpCode;

      const isExpired = validateOtpExpiration(storedCodeExpiration);
      if (isExpired) {
        throw newCustomError(
          responseDict.unauthRequest,
          "Otp has expired",
          true
        );
      }

      const isValid = validateOtpCode(code, storedCode);
      if (!isValid) {
        throw newCustomError(
          responseDict.unauthRequest,
          "Invalid otp provided",
          true
        );
      }

      return res
        .status(responseDict.success.code)
        .json({message: "Successfully verified otp"});
    }
  )
);

export default router;
