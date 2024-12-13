import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../../error/CustomError";
import {responseDict} from "../../../utilities/responsesDictionary";

export const clinicRequestDataSchema = z.object({
  fields: z.array(z.string()),
});

export type ClinicRequestData = z.infer<typeof clinicRequestDataSchema>;

export function verifyClinicRequestData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = clinicRequestDataSchema.safeParse(req.query);
  if (!result.success) {
    throw newCustomError(
      responseDict.badRequest,
      "Invalid clinic request data provided",
      true,
      result.error
    );
  }
  next();
}
