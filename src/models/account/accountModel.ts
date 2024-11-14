import {z} from "zod";

export const accountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  clinicName: z.string().min(1),
});

export type Account = z.infer<typeof accountSchema>;
