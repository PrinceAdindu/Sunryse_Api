import {z} from "zod";
import {OfficeLocation, officeLocationSchema} from "./officeLocationModel";

export const officeLocationsSchema = z.array(officeLocationSchema);

export type OfficeLocations = OfficeLocation[];
