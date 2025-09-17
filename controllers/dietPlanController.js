import DietPlan from "../models/DietPlan.js";

// ✅ Get all diet plans
export const getDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diet plans", error: error.message });
  }
};

// ✅ Add new diet plan
export const createDietPlan = async (req, res) => {
  try {
    const { name, memberName, calories, meals } = req.body;

    const newPlan = new DietPlan({
      name,
      memberName,
      calories,
      meals,
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: "Failed to create diet plan", error: error.message });
  }
};
