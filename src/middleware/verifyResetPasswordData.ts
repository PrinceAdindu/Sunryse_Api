import {Request, Response, NextFunction} from "express";

import {resetPasswordSchema, emailSchema} from "../vgr/resetPasswordValidator";

export function verifyResetPasswordData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = resetPasswordSchema.safeParse(req.body.data);

  if (!result.success) {
    return res.status(400).json({
      message: "Password reset request has invalid data",
      errors: result.error.errors,
    });
  }

  next();
}

export const verifyEmailData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = emailSchema.safeParse(req.body.data);

  if (!result.success) {
    return res.status(400).json({
      message: "Invalid email format",
      errors: result.error.errors,
    });
  }

  next();
};
