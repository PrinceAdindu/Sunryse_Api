import {Router} from "express";
import {hash} from "bcrypt";

import {getClinic, editClinic} from "../services/clinic/clinicService";
import {
  verifyResetPasswordData,
  verifyEmailData,
} from "../middleware/resetpassword/verifyResetPasswordData";

const router = Router();

router.post("/", verifyResetPasswordData, async (req, res) => {
  const {email, password} = req.body.data;

  let foundClinic;
  try {
    foundClinic = await getClinic({email});
    if (!foundClinic) {
      return res
        .status(401)
        .json({message: "You are not Authorized to update clinic password"});
    }
  } catch (err) {
    return res.status(500).json({message: "Error finding matching clinic"});
  }

  try {
    const hashedPassword = await hash(password, 10);
    const updated = await editClinic(foundClinic.id, {
      password: hashedPassword,
    });
    res.status(200).json({message: "password successfully updated."});
  } catch (err) {
    res
      .status(500)
      .json({message: "Unable to update your password. Try again. "});
  }
});

router.post("/email", verifyEmailData, async (req, res) => {
  const {email} = req.body.data;

  let isEmailFound;
  try {
    isEmailFound = await getClinic({email});
    if (isEmailFound) isEmailFound = Boolean(isEmailFound);
    else isEmailFound = false;

    return res.status(200).json({
      message: `Email was ${!isEmailFound && "Not"} Found`,
      isEmailFound,
    });
  } catch (err) {
    return res.status(500).json({message: "Error finding matching Email"});
  }
});

export default router;
