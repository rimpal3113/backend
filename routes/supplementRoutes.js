import express from "express";
import {
  getSupplements,
  createSupplement,
  purchaseSupplement,
} from "../controllers/supplementController.js";

const router = express.Router();

// GET all supplements
router.get("/", getSupplements);

// POST new supplement
router.post("/", createSupplement);

// PUT purchase supplement
router.put("/purchase/:id", purchaseSupplement);

export default router;
