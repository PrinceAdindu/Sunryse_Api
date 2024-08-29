import {Request, Response, NextFunction} from "express";

export default function logger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`REQ <<< ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    console.log("RES >>>", "sent");
  });
  next();
}
