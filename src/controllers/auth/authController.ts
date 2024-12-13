import express from "express";

const router = express.Router();

import loginController from "./loginController";
import otpController from "./otpController";
import logoutController from "./logoutController";
import verifyAccessToken from "../../middleware/token/verifyAccessToken";

router.use("/login", loginController);

router.use("/otp", otpController);

router.use("/logout", verifyAccessToken, logoutController);

export default router;
