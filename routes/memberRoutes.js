import express from "express";
import { addMember, getAllMembers, searchMembers, getMemberDashboard,deleteMember, updateMember , getMemberNotifications,createNotification } from "../controllers/memberController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", addMember);
router.get("/", getAllMembers); // ← fetch all members
router.delete("/:id", deleteMember);
router.put("/:id", updateMember);

router.get("/search", searchMembers);
router.get("/dashboard", authenticate, getMemberDashboard);
router.get("/notifications", authenticate, getMemberNotifications);
router.post("/notifications", createNotification);
export default router;
