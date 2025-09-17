import mongoose from "mongoose";

const dietPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },        // Diet plan name (e.g. Weight Loss Plan)
  memberName: { type: String, required: true },  // Member who is assigned this plan
  calories: { type: Number, required: true },    // Total calories
  meals: { type: String, required: true },       // Meal breakdown (e.g. "Breakfast, Lunch, Dinner")
  createdAt: { type: Date, default: Date.now },
});

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

export default DietPlan;
