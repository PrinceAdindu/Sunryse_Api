import {z} from "zod";
import {Client, clientSchema} from "./clientModel";

export const clientsSchema = z.array(clientSchema);

export type Clients = Client[];
