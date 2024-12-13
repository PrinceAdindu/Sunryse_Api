import {z} from "zod";
import {accountSchema} from "./account/accountModel";
import {offeringsSchema} from "./offering/offeringsModel";
import {officeLocationsSchema} from "./officeLocation/officeLocationsModel";
import {cancellationPolicesSchema} from "./cancellationPolicy/cancellationPoliciesModel";
import {authSchema} from "./auth/authModel";

export const clinicSchema = z.object({
  id: z.string().uuid(),
  auth: authSchema,
  account: accountSchema,
  officeLocations: officeLocationsSchema,
  cancellationPolicies: cancellationPolicesSchema,
  offerings: offeringsSchema,
  bookings: z.string().array(),
});

export type Clinic = z.infer<typeof clinicSchema>;

export const newClinicSchema = z.object({
  id: z.string().uuid(),
  auth: z.object({
    refreshToken: z.string().nullable(),
    otpCode: z.string().nullable(),
    otpExpiration: z.date().nullable(),
  }),
  account: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  officeLocations: z.array(z.string()),
  cancellationPolicies: z.array(z.string()),
  offerings: z.array(z.string()),
  bookings: z.array(z.string()),
});

export type NewClinic = z.infer<typeof newClinicSchema>;
