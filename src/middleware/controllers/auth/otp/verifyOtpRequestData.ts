import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../../../error/CustomError";
import {responseDict} from "../../../../utilities/responsesDictionary";

export const otpSenderRequestSchema = z.object({
  data: z.object({
    email: z.string().email(),
  }),
});
export type OtpSenderRequestData = z.infer<typeof otpSenderRequestSchema>;

export function verifyOtpSenderRequestData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = otpSenderRequestSchema.safeParse(req.body);
  if (!result.success) {
    throw newCustomError(
      responseDict.badRequest,
      "Invalid email to send OTP request to",
      true,
      result.error
    );
  }
  next();
}

export const otpVerifierRequestSchema = z.object({
  data: z.object({
    email: z.string().email(),
    code: z.string(),
  }),
});
export type OtpVerifierRequestData = z.infer<typeof otpVerifierRequestSchema>;

export function verifyOtpVerifierRequestData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = otpVerifierRequestSchema.safeParse(req.body);
  if (!result.success) {
    throw newCustomError(
      responseDict.badRequest,
      "Invalid OTP verification data provided",
      true,
      result.error
    );
  }
  next();
}
