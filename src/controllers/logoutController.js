import {Router} from "express";
import {getClinic, editClinic} from "../services/clinic/clinicService";

const router = Router();

router.post("/", async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.clinicjwt)
      return res.status(200).json({message: "Logout successful"});
    const refreshToken = cookies.clinicjwt;
    const foundClinic = await getClinic({refreshToken});
    if (foundClinic) {
      await editClinic(foundClinic.id, {refreshToken: ""});
      res.clearCookie("clinicjwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      res.status(200).json({message: "Logout successful"});
    }
  } catch (error) {
    res.status(500).json({message: "Server error - logout unsuccessful"});
  }
});

export default router;
