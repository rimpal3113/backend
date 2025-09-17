import mongoose from "mongoose";
import dotenv from "dotenv";
import DietPlan from "./models/DietPlan.js";

dotenv.config();

const seedDietPlans = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await DietPlan.deleteMany();

    await DietPlan.insertMany([
      {
        name: "Weight Loss Plan",
        memberName: "Ramesh",
        calories: 1800,
        meals: "Breakfast, Lunch, Dinner",
      },
      {
        name: "Muscle Gain Plan",
        memberName: "Suresh",
        calories: 2500,
        meals: "Breakfast, Snack, Lunch, Dinner",
      },
    ]);

    console.log("✅ Diet Plans seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDietPlans();
