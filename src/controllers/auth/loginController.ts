import {Router, Request, Response, NextFunction} from "express";
import {compare} from "bcrypt";

import config from "../../config.js";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../../services/tokenService.js";
import {
  editClinic,
  findClinic,
  getClinicAccount,
} from "../../services/clinic/clinicService.js";
import {LoginData} from "../../vgr/loginValidator.js";
import {asyncHandler} from "../../middleware/error/handlers/asyncHandler.js";
import {newCustomError} from "../../middleware/error/CustomError.js";
import {responseDict} from "../../utilities/responsesDictionary.js";

const router = Router();

type LoginRequest = Request<object, object, LoginData>;

router.post(
  "/",
  asyncHandler(async (req: LoginRequest, res: Response, next: NextFunction) => {
    const {email, password} = req.body.data;

    const foundClinic = await findClinic("", email);
    if (!foundClinic) {
      throw newCustomError(
        responseDict.notFound,
        "Email is not registered",
        true
      );
    }

    const clinicData = await getClinicAccount(foundClinic.id);

    if (!clinicData) {
      throw newCustomError(
        responseDict.notFound,
        "Error querying clinic",
        false
      );
    }

    try {
      const match = await compare(password, clinicData.password);
      if (!match) {
        throw newCustomError(
          responseDict.unauthRequest,
          "Incorrect password provided",
          true
        );
      }
    } catch (error) {
      throw newCustomError(
        responseDict.unexpected,
        "Error verifying hashed password",
        false
      );
    }

    const tokenBody = {id: foundClinic.id};
    const accessToken = createAccessToken(tokenBody);
    const refreshToken = createRefreshToken(tokenBody);
    await editClinic(foundClinic.id, {
      "auth.refreshToken": refreshToken,
    });

    res.cookie("clinicjwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: parseInt(config.refreshCookieExp),
    });
    return res
      .status(200)
      .json({message: "Login successful", data: {accessToken}});
  })
);

router.post(
  "/refresh",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    const refreshToken: string = cookies["clinicjwt"];
    if (!refreshToken) {
      throw newCustomError(
        responseDict.unauthRequest,
        "Missing authentication details",
        true
      );
    }

    const foundClinic = await findClinic("", "", refreshToken);
    if (!foundClinic) {
      throw newCustomError(
        responseDict.forbidden,
        "Refresh token does not exist",
        true
      );
    }

    const tokenBody = {id: foundClinic.id};
    const valid = verifyRefreshToken(refreshToken, tokenBody.id);
    if (!valid) {
      throw newCustomError(
        responseDict.forbidden,
        "Refresh token is not valid",
        true
      );
    }

    const accessToken = createAccessToken(tokenBody);
    return res.status(200).json({data: {accessToken}});
  })
);

export default router;
