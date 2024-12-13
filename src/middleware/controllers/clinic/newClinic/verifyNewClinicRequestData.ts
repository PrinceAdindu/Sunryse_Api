import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../../../error/CustomError";
import {responseDict} from "../../../../utilities/responsesDictionary";

export const newClinicRequestDataSchema = z
  .object({
    data: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirmation: z.string().min(8),
    }),
  })
  .superRefine(({data}, ctx) => {
    if (data.passwordConfirmation !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type NewClinicRequestData = z.infer<typeof newClinicRequestDataSchema>;

export function verifyNewClinicRequestData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = newClinicRequestDataSchema.safeParse(req.body);
  if (!result.success) {
    throw newCustomError(
      responseDict.badRequest,
      "Invalid new clinic data provided",
      true,
      result.error
    );
  }
  next();
}
