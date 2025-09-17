import express from "express";
import { getAllNotifications, createNotification,getMemberNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", getAllNotifications);
router.get("/", getMemberNotifications);
router.post("/",  createNotification);

router.post("/", async (req, res) => {
  const { message, recipientId } = req.body;

  if (!recipientId || !message) {
    return res.status(400).json({ message: "Message and recipientId are required" });
  }

  try {
    const notification = new Notification({
      message,
      recipient: recipientId,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create notification",
      error: err,
    });
  }
});

// Get notifications for a specific member
router.get("/", async (req, res) => {
  const userId = req.query.user;

  try {
    const notifications = await Notification.find({ recipient: userId }).sort({ date: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});export default router;
