// models/notificationModel.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  },
  { timestamps: true } // ✅ this adds createdAt & updatedAt automatically
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
