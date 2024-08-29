import {Router} from "express";
import {getClinic, createClinic} from "../services/clinic/clinicService";
import {verifyRegistrationData} from "../middleware/registration/verifyRegistrationData";

const router = Router();

router.post("/", verifyRegistrationData, async (req, res, next) => {
  const {email, password} = req.body.data;

  try {
    const foundClinic = await getClinic({email});
    if (foundClinic) {
      return res.status(409).json({
        message: "This email is already registered",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error checking to see if clinic already exists.",
    });
  }

  try {
    const data = {
      email,
      password,
    };
    const newClinic = await createClinic(data);
    return res.status(200).json({
      message: "Successfully created clinic.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating a clinic.",
    });
  }
});

export default router;
