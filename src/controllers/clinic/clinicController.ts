import {Router, Request, Response, NextFunction} from "express";

import scheduleController from "./scheduleController";
import serviceController from "./service/serviceController";

import verifyAccessToken from "../../middleware/token/verifyAccessToken";
import {
  NewClinicRequestData,
  verifyNewClinicRequestData,
} from "../../middleware/controllers/clinic/newClinic/verifyNewClinicRequestData";
import {asyncHandler} from "../../middleware/error/handlers/asyncHandler";
import {newCustomError} from "../../middleware/error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";

import {AuthenticatedRequest} from "../../middleware/token/AuthenticatedRequest";

import {
  getClinic,
  createClinic,
  findClinic,
} from "../../services/clinic/clinicService.js";
import {
  ClinicRequestData,
  verifyClinicRequestData,
} from "../../middleware/controllers/clinic/verifyClinicRequestData";

const router = Router();

type NewClinicRequest = Request<object, object, NewClinicRequestData>;
router.post(
  "/",
  verifyNewClinicRequestData,
  asyncHandler(
    async (req: NewClinicRequest, res: Response, next: NextFunction) => {
      const {email, password} = req.body.data;

      const foundClinic = await findClinic("", email, "");
      if (foundClinic) {
        throw newCustomError(
          responseDict.emailConflict,
          "Email is already being used",
          true
        );
      }

      await createClinic(email, password);
      return res.status(responseDict.success.code).json({
        message: "Successfully created clinic.",
      });
    }
  )
);

type ClinicRequest = Request<object, object, ClinicRequestData>;
router.get(
  "/",
  verifyAccessToken,
  verifyClinicRequestData,
  asyncHandler(
    async (req: ClinicRequest, res: Response, next: NextFunction) => {
      // TODO: Use typing to fix reliance on <!>
      const id = req.authorizedData!.clinic.id;
      const fields = req.query.fields as string[];

      const clinicData = await getClinic(id, fields);

      return res.status(200).json({
        data: {...clinicData},
        message: "Successfully retrieved clinic details",
      });
    }
  )
);

router.use("/schedule", scheduleController);

router.use("/service", serviceController);

export default router;
