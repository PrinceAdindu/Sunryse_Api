import type {Request} from "express";
import {AuthTokenData} from "./AuthTokenData";

export interface AuthenticatedRequest<
  P = Record<string, any>, // Params type
  Q = Record<string, any>, // Query type
  B = Record<string, any>, // Body type
> extends Request<P, any, B, Q>,
    AuthTokenData {}
