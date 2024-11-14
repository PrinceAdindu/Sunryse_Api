import {z} from "zod";
import {taxSchema} from "../taxes/taxModel";
import {cancellationPolicySchema} from "../cancellationPolicy/cancellationPolicyModel";

export const offeringSchema = z.object({
  id: z.string().min(1),
  status: z.boolean(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  duration: z.number().positive(),
  price: z.number().nonnegative(),
  currency: z.enum(["CAD", "USD"]),
  tax: taxSchema,
  location: z.enum(["virtual", "live", "hybrid"]),
  cancellationPolicy: cancellationPolicySchema,
});

export type Offering = z.infer<typeof offeringSchema>;
