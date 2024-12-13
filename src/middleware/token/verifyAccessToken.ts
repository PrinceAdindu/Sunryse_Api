import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";
import config from "../../config";

export default function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    throw newCustomError(
      responseDict.unauthRequest,
      "Authorization header is not provided",
      true
    );
  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.accessTokenSecret, (error, decoded) => {
    if (error)
      throw newCustomError(
        responseDict.unauthRequest,
        "Access token is invalid or expired",
        true,
        error
      );

    addAuthenticatedDetails(req, decoded);
  });
  next();
}

function addAuthenticatedDetails(
  req: Request,
  decodedDetails: string | JwtPayload | undefined
) {
  if (
    decodedDetails &&
    typeof decodedDetails === "object" &&
    "clinic" in decodedDetails
  ) {
    req.authorizedData = {clinic: decodedDetails.clinic};
  }
}
