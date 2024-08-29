import {Router} from "express";
import loginController from "../../controllers/loginController";
import registrationController from "../../controllers/registrationController";
import otpController from "../../controllers/otpController";
import logoutController from "../../controllers/logoutController";
import clinicController from "../../controllers/clinic/clinicController";
import stripeController from "../../controllers/stripeController";
import testController from "../../controllers/testController";
import resetPasswordController from "../../controllers/resetPasswordController";
import verifyAccessToken from "../../middleware/verifyAccessToken";

const router = Router();

router.use("/login", loginController);
router.use("/register", registrationController);
router.use("/resetPassword", resetPasswordController);
router.use("/otp", otpController);

router.use("/logout", verifyAccessToken, logoutController);
router.use("/clinic", verifyAccessToken, clinicController);
router.use("/stripe", verifyAccessToken, stripeController);
router.use("/test", verifyAccessToken, testController);

export default router;
