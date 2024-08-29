import {Router} from "express";
import path from "path";

const router = Router();

router.get("/", async (req, res, next) => {
  res.status(200).json({message: "all good to go"});
});

export default router;
