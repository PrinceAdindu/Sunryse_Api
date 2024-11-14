import {Express} from "express";
import swaggerUi from "swagger-ui-express";
import {Request, Response, NextFunction} from "express";
import apiRoutes from "./api/apiRoutes";
import config from "../config";
import {swaggerConfig} from "./docs/swaggerConfig";

export function initializeRoutes(server: Express) {
  server.use("/", (req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl === "/") {
      return res.status(200).json({
        message: `Sunryse API Version: ${config.apiVersion}`,
      });
    }
    return next();
  });

  server.use("/api", apiRoutes);

  server.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
}
