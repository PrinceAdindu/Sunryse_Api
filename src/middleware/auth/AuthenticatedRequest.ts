import type {Request} from "express";
import {AuthTokenData} from "./AuthTokenData";

export interface AuthenticatedRequest extends Request, AuthTokenData {}
