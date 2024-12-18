import {Request, Response, NextFunction, Router} from "express";

import verifyAccessToken from "../../middleware/token/verifyAccessToken.js";
import {asyncHandler} from "../../middleware/error/handlers/asyncHandler.js";

import {editClinic} from "../../services/clinic/clinicService.js";

const router = Router();

//TODO: Should not have to ues ! because verifyAccessToken middleware gaurentees req.authorizedData
router.post(
  "/",
  verifyAccessToken,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.authorizedData!.clinic.id;

    await editClinic(id, {"auth.refreshToken": ""});

    res.clearCookie("clinicjwt", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({message: "Logout successful"});
  })
);

export default router;
