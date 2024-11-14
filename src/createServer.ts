import express, {Express, raw, json} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import checkCredentials from "./middleware/checkCredentials";
import corsOptions from "./cors/corsOptions";

import {initializeRoutes} from "./routes/routes";
import webhookController from "./controllers/webhookController";
import {logReqRes} from "./middleware/logger/logger";
import {errorHandler} from "./middleware/error/handlers/errorHandler";
import {uncaughtErrorHandler} from "./middleware/error/handlers/uncaughtErrorHandler";

export function createServer(): Express {
  const server = express();

  // Handle options credentials check before CORS
  // CORS requires this header to be true and we need it to send cookikes
  server.use(checkCredentials);

  // Cross Origin Resource Sharing
  server.use(cors(corsOptions));

  // Connect webhook routes before middlewares
  server.use("/webhook", raw({type: "application/json"}), webhookController);

  // Use Helmet middleware security
  server.use(helmet());

  // Built-in middleware for json
  server.use(json());

  // Middleware for cookies
  server.use(cookieParser());

  // Log server requests and responses
  server.use("*", logReqRes);

  // Connect routes
  initializeRoutes(server);

  // Handle unacaught errors globally
  uncaughtErrorHandler();

  // Add error handler middleware last
  server.use(errorHandler);

  return server;
}
