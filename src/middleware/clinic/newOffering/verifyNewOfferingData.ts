import {z} from "zod";
import {Request, Response, NextFunction} from "express";

import {newCustomError} from "../../error/CustomError";
import {responseDict} from "../../../utilities/responsesDictionary";
import {offeringSchema} from "../../../models/offering/offeringModel";
import {taxSchema} from "../../../models/taxes/taxModel";
import {cancellationPolicySchema} from "../../../models/cancellationPolicy/cancellationPolicyModel";
import {officeLocationSchema} from "../../../models/officeLocation/officeLocationModel";

export const newOfferingValidator = z.object({
  id: z.string(),
  status: z.boolean(),
  name: z.string().max(100),
  description: z.string().max(500),
  duration: z.number().positive(),
  price: z.number().positive(),
  currency: z.enum(["cad", "usd"]),
  tax: taxSchema.nullable(),
  location: officeLocationSchema,
  cancellationPolicy: cancellationPolicySchema,
});

export function verifyNewOfferingData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = offeringSchema.safeParse(req.body.data);
  if (!result.success) {
    throw newCustomError(
      responseDict.badRequest,
      "Invalid new offering data provided",
      true,
      result.error
    );
  }
  next();
}
