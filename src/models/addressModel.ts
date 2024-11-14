import {z} from "zod";

export const addressSchema = z.object({
  street: z.string().min(1),
  number: z.number().nonnegative(),
  suite: z.number().nonnegative().nullable(),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  country: z.string().min(1),
});

export type Address = z.infer<typeof addressSchema>;
