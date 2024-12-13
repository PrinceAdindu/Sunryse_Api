import {Router} from "express";
import authController from "../../controllers/auth/authController";
import clinicController from "../../controllers/clinic/clinicController";
import stripeController from "../../controllers/stripeController";
import testController from "../../controllers/testController";
import verifyAccessToken from "../../middleware/token/verifyAccessToken";

const router = Router();

router.use("/auth", authController);
router.use("/clinic", clinicController);

router.use("/stripe", verifyAccessToken, stripeController);
router.use("/test", verifyAccessToken, testController);

export default router;
