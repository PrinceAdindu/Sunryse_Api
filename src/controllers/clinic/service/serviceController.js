import {Router} from "express";
import {
  createOffering,
  deleteOffering,
  editOffering,
} from "../../../services/clinic/serviceService";
// import {verifyNewOfferingData} from "../../../middleware/clinic/newOffering/verifyNewOfferingData";

const router = Router();

router.post("/", async (req, res, next) => {
  const id = req.id;
  const serviceData = req.body.data;
  try {
    await createOffering(id, serviceData);
    return res.status(200).json({
      message: "Successfully created new offering.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error creating new offering.",
    });
  }
});

router.put("/", async (req, res, next) => {
  const id = req.id;
  const serviceData = req.body.data;
  try {
    await editOffering(id, serviceData);
    return res.status(200).json({
      message: "Successfully updated service.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error updating offering.",
    });
  }
});

router.delete("/", async (req, res, next) => {
  const id = req.id;
  const serviceId = req.body.id;
  try {
    await deleteOffering(id, serviceId);
    return res.status(200).json({
      message: "Successfully deleted new offering.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error deleting new offering.",
    });
  }
});

export default router;
