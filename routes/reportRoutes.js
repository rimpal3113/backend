import express from "express";
import { getReports, createReport, exportReports } from "../controllers/reportController.js";

const router = express.Router();

router.get("/", getReports);       // ✅ GET all reports
router.post("/", createReport);    // ✅ Add new report
router.get("/export", exportReports); // ✅ Export reports as CSV

export default router;
