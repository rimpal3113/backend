import Notification from "../models/Notification.js";

// GET all notifications
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
};

// POST new notification
export const getMemberNotifications = async (req, res) => {
  try {
    const memberId = req.user.id; // assuming JWT decoded in req.user
    const notifications = await Notification.find({ memberId }).sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { title, message, recipient } = req.body;

    if (!recipient) {
      return res.status(400).json({ message: "Recipient is required" });
    }

    const newNotification = await Notification.create({
      title,
      message,
      recipient,
    });

    res.status(201).json({ message: "Notification created successfully", notification: newNotification });
  } catch (error) {
    console.error("Notification creation failed:", error);
    res.status(500).json({ message: "Failed to create notification", error });
  }
};