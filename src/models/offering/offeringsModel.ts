import {z} from "zod";
import {Offering, offeringSchema} from "./offeringModel";

export const offeringsSchema = z.array(offeringSchema);

export type Offerings = Offering[];
