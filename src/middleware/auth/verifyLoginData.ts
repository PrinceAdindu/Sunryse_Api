import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";

export function verifyNewClinicData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = loginDataSchema.safeParse(req.body);
  if (!result.success) {
    throw newCustomError(
      responseDict.badRequest,
      "Invalid login data provided",
      true,
      result.error
    );
  }
  next();
}

export const loginDataSchema = z.object({
  data: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type LoginData = z.infer<typeof loginDataSchema>;
