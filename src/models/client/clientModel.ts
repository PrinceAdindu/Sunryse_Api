import {z} from "zod";
import {addressSchema} from "../addressModel";

export const clientSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.number().min(10000000000),
  dateOfBirth: z.coerce.date(),
  address: addressSchema,
});

export type Client = z.infer<typeof clientSchema>;
