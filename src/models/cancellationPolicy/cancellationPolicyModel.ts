import {z} from "zod";

export const cancellationPolicySchema = z
  .object({
    type: z.enum(["anytime", "notice", "none"]),
    notice: z.number().positive().nullable(),
    lateFee: z.number().nonnegative().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "notice") {
      if (data.notice === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Value required if type is "notice".',
        });
      }
      if (data.lateFee === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Value required if type is "notice".',
        });
      }
    }
  });

export type CancellationPolicy = z.infer<typeof cancellationPolicySchema>;
