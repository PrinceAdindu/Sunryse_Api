import {z} from "zod";

export const officeLocationSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  details: z.string().min(1).nullable(),
});

export type OfficeLocation = z.infer<typeof officeLocationSchema>;
