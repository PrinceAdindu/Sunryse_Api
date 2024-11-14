import {z} from "zod";

export const authSchema = z.object({
  refreshToken: z.string().min(1).nullable(),
  otpCode: z.string().min(1).nullable(),
  otpExpiration: z.string().min(1).nullable(),
});

export type Auth = z.infer<typeof authSchema>;
