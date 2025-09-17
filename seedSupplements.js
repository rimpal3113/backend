import mongoose from "mongoose";
import dotenv from "dotenv";
import Supplement from "./models/Supplement.js"; // ✅ note .js extension

dotenv.config();

const seedSupplements = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Supplement.deleteMany();

    const supplements = [
      { name: "Whey Protein", brand: "ON", price: 2500, stock: 20 },
      { name: "Creatine", brand: "MuscleTech", price: 1200, stock: 15 },
      { name: "Multivitamins", brand: "GNC", price: 800, stock: 30 },
    ];

    await Supplement.insertMany(supplements);

    console.log("Supplements seeded ✅");
    process.exit();
  } catch (err) {
    console.error("Seeding failed ❌", err);
    process.exit(1);
  }
};

seedSupplements();
