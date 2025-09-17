// seed/seedAll.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedAdmin from "./seedAdmin.js";
import seedMember from "./seedMember.js";
import seedUser from "./seedUser.js"; // <- Add this

dotenv.config();

const runSeeds = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");

    await seedAdmin();
    await seedMember();
    await seedUser(); // <- Call the user seeding function

    console.log("🌱 Seeding complete");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 DB disconnected");
  }
};

runSeeds();
