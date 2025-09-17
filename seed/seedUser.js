// seed/seedUser.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedUser = async () => {
  const exists = await User.findOne({ email: "user@example.com" });
  if (exists) {
    console.log("⚠️ User already exists");
    return;
  }

  const hashed = await bcrypt.hash("user123", 10);
  const user = new User({ name: "User", email: "user@example.com", password: hashed });
  await user.save();
  console.log("✅ User seeded");
};

export default seedUser;
