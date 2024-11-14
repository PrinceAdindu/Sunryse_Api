import {z} from "zod";
import {cancellationPolicySchema} from "./cancellationPolicyModel";

export const cancellationPolicesSchema = z.array(cancellationPolicySchema);

export type CancellationPolicies = z.infer<typeof cancellationPolicesSchema>;
