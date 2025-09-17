import express from "express";
import {
  createBill,
  getBills,
  getBillsByMemberId,
  deleteBill,
} from "../controllers/BillController.js";

const router = express.Router();

router.post("/", createBill);

router.get("/", getBills);
router.get("/member/:id", getBillsByMemberId);
router.delete("/:id", deleteBill); // DELETE route for bill

export default router;
