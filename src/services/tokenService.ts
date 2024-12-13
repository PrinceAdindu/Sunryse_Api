import jwt from "jsonwebtoken";
import config from "../config";
import {newCustomError} from "../middleware/error/CustomError";
import {responseDict} from "../utilities/responsesDictionary";
import {AuthTokenData} from "../middleware/token/AuthTokenData";

export const createAccessToken = (data: Object) => {
  try {
    const accessToken = jwt.sign(data, config.accessTokenSecret, {
      expiresIn: config.accessTokenExp,
    });
    return accessToken;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error creating access token",
      false,
      error
    );
  }
};

export const createRefreshToken = (data: AuthTokenData) => {
  try {
    const refreshToken = jwt.sign(data, config.refreshTokenSecret, {
      expiresIn: config.refreshTokenExp,
    });
    return refreshToken;
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error creating refresh token",
      false,
      error
    );
  }
};

export const verifyRefreshToken = async (
  refreshToken: string,
  clinicId: string
) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      config.refreshTokenSecret
    ) as AuthTokenData;
    return decoded.clinic.id === clinicId;
  } catch (error) {
    throw newCustomError(
      responseDict.unauthRequest,
      "Invalid refresh token",
      true,
      error
    );
  }
};
