import {Request, Response, NextFunction} from "express";
import {ErrorBody} from "../error/handlers/errorHandler";
import {cwLogger, devLogger, reqResLogger} from "./winstonLogger";
import config from "../../config";

export function logReqRes(req: Request, res: Response, next: NextFunction) {
  if (config.env === "development") {
    reqResLogger.info(`REQ <<< ${req.method} ${req.originalUrl}`);
    res.on("finish", () => {
      reqResLogger.info("RES: >>> sent");
    });
  }
  next();
}

export function logError(errorBody: ErrorBody) {
  if (config.env === "production") cwLogger.error(JSON.stringify(errorBody));
  else devLogger.error("ERROR", errorBody);
}
