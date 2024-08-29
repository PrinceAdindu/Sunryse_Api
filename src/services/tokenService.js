import {sign, verify} from "jsonwebtoken";
import config from "../config";

export const createAccessToken = (data) => {
  const createToken = sign(data, config.accessTokenSecret, {
    expiresIn: config.accessTokenExp,
  });
  return createToken;
};

export const createRefreshToken = (data) => {
  const refreshToken = sign(data, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExp,
  });
  return refreshToken;
};

export const createTokens = (data) => [
  createAccessToken(data),
  createRefreshToken(data),
];

export const verifyRefeshToken = async (refreshToken, data) => {
  verify(refreshToken, config.refreshTokenSecret, (error, decoded) => {
    return error || data.userId !== decoded.userId;
  });
};
