import express from "express";
import { getDietPlans, createDietPlan } from "../controllers/dietPlanController.js";

const router = express.Router();

// GET all diet plans
router.get("/", getDietPlans);

// POST create new diet plan
router.post("/", createDietPlan);

export default router;
