import {z} from "zod";
import {Tax, taxSchema} from "./taxModel";

export const taxesSchema = z.array(taxSchema);

export type Taxes = Tax[];
