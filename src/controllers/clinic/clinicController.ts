import {Router, Request} from "express";

import scheduleController from "./scheduleController";
import serviceController from "./service/serviceController";

import {
  // getClinic,
  createClinic,
  findClinic,
} from "../../services/clinic/clinicService.js";
import {NewClinicData} from "../../middleware/clinic/newClinic/verifyNewClinicData";
import {verifyNewClinicData} from "../../middleware/clinic/newClinic/verifyNewClinicData";
// import verifyAccessToken from "../../middleware/auth/verifyAccessToken";
import {asyncHandler} from "../../middleware/error/handlers/asyncHandler";
import {newCustomError} from "../../middleware/error/CustomError";
import {responseDict} from "../../utilities/responsesDictionary";

const router = Router();

type RegisterClinicRequest = Request<object, object, NewClinicData>;

router.post(
  "/",
  verifyNewClinicData,
  asyncHandler(async (req: RegisterClinicRequest, res, next) => {
    const {email, password} = req.body.data;

    const foundClinic = await findClinic("", email, "");
    if (foundClinic) {
      throw newCustomError(
        responseDict.emailConflict,
        "Email is already being used",
        true
      );
    }

    await createClinic(email, password);
    return res.status(200).json({
      message: "Successfully created clinic.",
    });
  })
);

// router.get("/", verifyAccessToken, async (req, res, next) => {
//   const id = req.id;
//   const fields = req.query.fields;
//   try {
//     const clinic = await getClinic({id});

//     // Extract fields from clinic based on req.field
//     const resObj = {};
//     fields.forEach((f) => {
//       if (clinic.hasOwnProperty(f)) {
//         resObj[f] = clinic[f];
//       }
//     });

//     return res.status(200).json({
//       ...resObj,
//       message: "Successfully retrieved clinic details.",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Error retrieving clinic details.",
//     });
//   }
// });

router.use("/schedule", scheduleController);

router.use("/service", serviceController);

export default router;
