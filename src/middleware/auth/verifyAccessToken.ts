import jwt, {JwtPayload} from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

import {AuthenticatedRequest} from "./AuthenticatedRequest";
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
  try {
    jwt.verify(token, config.accessTokenSecret, (error, decoded) => {
      if (error)
        throw newCustomError(
          responseDict.unauthRequest,
          "Authorization token is invalid",
          true
        );

      addAuthenticatedDetails(req, decoded);
    });
    next();
  } catch (error) {
    throw newCustomError(
      responseDict.unexpected,
      "Error verifying jwt",
      false,
      error
    );
  }
}

function addAuthenticatedDetails(
  req: Request,
  decodedDetails: string | JwtPayload | undefined
) {
  const authenticatedReq = req as AuthenticatedRequest;
  if (
    decodedDetails &&
    typeof decodedDetails === "object" &&
    "id" in decodedDetails
  ) {
    authenticatedReq.clinic = {
      ...authenticatedReq.clinic,
      id: decodedDetails.id,
    };
  }
  return authenticatedReq;
}
