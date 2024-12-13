import {Router, Request, Response, NextFunction} from "express";

import config from "../../config.js";
import {asyncHandler} from "../../middleware/error/handlers/asyncHandler.js";
import {newCustomError} from "../../middleware/error/CustomError.js";
import {responseDict} from "../../utilities/responsesDictionary.js";
import {
  verifyLoginRequestData,
  LoginRequestData,
} from "../../middleware/controllers/auth/login/verifyLoginRequestData.js";

import {
  editClinic,
  findClinic,
  getClinic,
} from "../../services/clinic/clinicService.js";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../../services/tokenService.js";
import {comparePassword} from "../../services/auth/authService.js";

const router = Router();

type LoginRequest = Request<object, object, LoginRequestData>;

router.post(
  "/",
  verifyLoginRequestData,
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

    // TODO: Could have better typing for clinicData
    const clinicData = await getClinic(foundClinic.id, ["account.password"]);
    if (!clinicData) {
      throw newCustomError(
        responseDict.unexpected,
        "Error querying clinic for password",
        false
      );
    }

    const match = await comparePassword(password, clinicData.account.password);
    if (!match) {
      throw newCustomError(
        responseDict.unauthRequest,
        "Incorrect password provided",
        true
      );
    }

    const tokenBody = {clinic: {id: foundClinic.id}};
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
      .status(responseDict.success.code)
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

    const tokenBody = {clinic: {id: foundClinic.id}};
    const valid = verifyRefreshToken(refreshToken, tokenBody.clinic.id);
    if (!valid) {
      throw newCustomError(
        responseDict.forbidden,
        "Refresh token is not valid",
        true
      );
    }

    const accessToken = createAccessToken(tokenBody);
    return res
      .status(responseDict.success.code)
      .json({message: responseDict.success.name, data: {accessToken}});
  })
);

export default router;
