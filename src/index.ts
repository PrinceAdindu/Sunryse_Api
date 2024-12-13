import "dotenv/config";

import config from "./config";
import {createServer} from "./createServer";
import {AuthTokenData} from "./middleware/token/AuthTokenData";

// TODO: Find a cleaner way to extend Express Request type
declare module "express" {
  interface Request {
    authorizedData?: AuthTokenData;
  }
}

export async function start() {
  const server = createServer();

  try {
    server.listen(config.port, () => {
      console.log("Server started listening on - ", `${config.url}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

start();
