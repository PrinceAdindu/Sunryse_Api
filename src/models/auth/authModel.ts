import {z} from "zod";

export const authSchema = z.object({
  refreshToken: z.string().min(1).nullable(),
  otpCode: z.string().nullable(),
  otpExpiration: z.date(),
});

export type Auth = z.infer<typeof authSchema>;
