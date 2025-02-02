import {ZodIssue} from "zod";
import {Response, Request, NextFunction, ErrorRequestHandler} from "express";

import {AuthenticatedRequest} from "../../token/AuthenticatedRequest";
import {responseDict} from "../../../utilities/responsesDictionary";
import {logError} from "../../logger/logger";
import {CustomError} from "../CustomError";
import config from "../../../config";

export type ErrorBody = {
  code: number;
  name: string;
  message: string;
  request: string;
  operational: boolean;
  zodErrors: ZodIssue[] | null;
  stack: string | null;
  originalStack: string | null;
  clinicId: string | null;
};

function getMessage(error: Error | CustomError): string {
  if (error instanceof CustomError || error instanceof Error)
    return error.message;
  return "There was an unexpected server error with no message";
}

function getStatusCode(error: Error | CustomError): number {
  return error instanceof CustomError
    ? error.status
    : responseDict.unexpected.code;
}

function getOriginalStack(error: Error | CustomError): string | null {
  return error instanceof CustomError ? error.originalStack : null;
}

function getClinicId(req: Request | AuthenticatedRequest): string | null {
  // AuthenticatedRequest check
  if ("clinic" in req && req.clinic.id !== undefined) {
    return req.clinic.id;
  }
  return null;
}

function buildErrorResponseBody<T extends Request | AuthenticatedRequest>(
  error: Error | CustomError,
  req: T
): ErrorBody {
  const statusCode = getStatusCode(error);
  const message = getMessage(error);
  const originalStack = getOriginalStack(error);
  const clinicId = getClinicId(req);

  const body: ErrorBody = {
    code: statusCode,
    name: error.name,
    message: message,
    request: `${req.method} ${req.originalUrl}`,
    operational: error instanceof CustomError ? error.operational : false,
    zodErrors: error instanceof CustomError ? error.zodErrors : null,
    stack: config.env === "development" ? (error.stack ?? null) : null,
    originalStack: config.env === "development" ? originalStack : null,
    clinicId: clinicId,
  };
  return body;
}

export const errorHandler: ErrorRequestHandler = (
  error: Error | CustomError,
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const errorBody = buildErrorResponseBody(error, req);
  if (error instanceof CustomError && !error.operational) {
    logError(errorBody);
  }
  res.status(errorBody.code).json(errorBody);
  next();
};
