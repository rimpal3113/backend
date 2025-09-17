// seed/seedAdmin.js
import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

const seedAdmin = async () => {
  try {
    console.log("📌 Running seedAdmin...");
    const exists = await Admin.findOne({ email: "admin@example.com" });
    if (exists) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashed = await bcrypt.hash("admin123", 10);
    const admin = new Admin({ name: "Admin", email: "admin@example.com", password: hashed });
    await admin.save();
    console.log("✅ Admin seeded");
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
  }
};
export default seedAdmin;

