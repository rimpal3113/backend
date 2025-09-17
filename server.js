// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import billsRoutes from "./routes/billsRoutes.js";
import feePackageRoutes from "./routes/feePackageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import supplementRoutes from "./routes/supplementRoutes.js";
import dietPlanRoutes from "./routes/dietPlans.js";
import userRoutes from "./routes/user.js";



// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "https://forfrontend-mzzt.vercel.app", credentials: true }));
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

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error:false,
  })
});
// Database connection and server start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("❌ DB connection error:", err));
