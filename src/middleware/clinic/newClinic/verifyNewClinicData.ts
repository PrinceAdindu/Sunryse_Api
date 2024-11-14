import {z} from "zod";
import {Request, Response, NextFunction} from "express";
import {newCustomError} from "../../error/CustomError";
import {responseDict} from "../../../utilities/responsesDictionary";

export const newClinicSchema = z
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

export type NewClinicData = z.infer<typeof newClinicSchema>;

export function verifyNewClinicData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = newClinicSchema.safeParse(req.body);
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
