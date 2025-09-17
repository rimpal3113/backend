// api/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "../routes/authRoutes.js";
import memberRoutes from "../routes/memberRoutes.js";
import adminRoutes from "../routes/adminRoutes.js";
import billsRoutes from "../routes/billsRoutes.js";
import feePackageRoutes from "../routes/feePackageRoutes.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import reportRoutes from "../routes/reportRoutes.js";
import supplementRoutes from "../routes/supplementRoutes.js";
import dietPlanRoutes from "../routes/dietPlans.js";
import userRoutes from "../routes/user.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "*" })); // Allow all origins (or restrict to frontend domain)
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/feepackages", feePackageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/supplements", supplementRoutes);
app.use("/api/dietplans", dietPlanRoutes);
app.use("/api/users", userRoutes);

// ✅ Debug / Health route (optional but helps confirm deployment)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running on Vercel!" });
});

// ✅ Database connection (singleton for serverless)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
}
connectDB();

// ❌ No app.listen() for Vercel
// ✅ Export for serverless
export default app;
