import express, {raw, json} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import checkCredentials from "./middleware/checkCredentials";
import corsOptions from "./cors/corsOptions";

import config from "./config";
import init from "./routes/routes";
import webhookController from "./controllers/webhookController";
import logger from "./middleware/logger";

const server = express();

export function create() {
  // Handle options credentials check before CORS
  // CORS requires this header to be true and we need to send cookikes
  server.use(checkCredentials);

  // Cross Origin Resource Sharing
  server.use(cors(corsOptions));

  // Connect webhook routes before middlewares
  server.use("/webhook", raw({type: "application/json"}), webhookController);

  // Built-in middleware for json
  server.use(json());

  // Middleware for cookies
  server.use(cookieParser());

  // Log server requests and responses
  server.use("*", logger);

  // Connect Routes
  init(server);
}
export async function start() {
  try {
    server.listen(config.port, () => {
      console.log("Server started listening on - ", `${config.url}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}
