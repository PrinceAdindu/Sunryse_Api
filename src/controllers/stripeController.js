import {Router} from "express";

import {getClinic} from "../services/clinic/clinicService";
import {
  createAccountLink,
  createDahsboardLink,
  getStripeStatus,
} from "../services/stripeService";

const router = Router();

router.post("/", async (req, res, next) => {
  const id = req.id;

  try {
    const clinic = await getClinic({id});
    const accountLink = await createAccountLink(clinic.stripeId);
    return res.status(200).send({
      ...accountLink,
      message: "Successfully created clninc account link",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error creating clinic account link"});
  }
});

router.get("/", async (req, res, next) => {
  const id = req.id;

  try {
    const clinic = await getClinic({id});
    const dashboardLink = await createDahsboardLink(clinic.stripeId);
    return res.status(200).send({
      ...dashboardLink,
      message: "Successfully created clninc dashboard link",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error creating clinic dashboard link"});
  }
});

router.get("/status", async (req, res, next) => {
  const id = req.id;

  try {
    const clinic = await getClinic({id});
    const status = await getStripeStatus(clinic.stripeId);

    return res.status(200).send({
      ...status,
      message: "Successfully retrieved stripe status",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error retrieving stripe status"});
  }
});

export default router;
