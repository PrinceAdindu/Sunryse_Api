import {z} from "zod";

export const taxSchema = z.object({
  type: z.string().min(1),
  percent: z.number().positive(),
});

export type Tax = z.infer<typeof taxSchema>;
