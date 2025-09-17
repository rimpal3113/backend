import express from "express";
import { getAdminStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats); // You can add auth middleware here if needed

export default router;
