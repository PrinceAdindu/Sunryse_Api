import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../../../error/CustomError";
import {responseDict} from "../../../../utilities/responsesDictionary";

export const loginRequestDataSchema = z.object({
  data: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type LoginRequestData = z.infer<typeof loginRequestDataSchema>;

export function verifyLoginRequestData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = loginRequestDataSchema.safeParse(req.body);
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
