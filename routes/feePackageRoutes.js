import express from "express";
import { getAllFeePackages, addFeePackage,assignPackage } from "../controllers/feePackageController.js";

const router = express.Router();

router.get("/", getAllFeePackages);
router.post("/", addFeePackage); // Optional for admin
router.post("/", assignPackage);

export default router;
