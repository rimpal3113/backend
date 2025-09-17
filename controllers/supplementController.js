import Supplement from "../models/Supplement.js";

// ✅ Get all supplements
export const getSupplements = async (req, res) => {
  try {
    const supplements = await Supplement.find();
    res.json(supplements);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch supplements" });
  }
};

// ✅ Add a new supplement
export const createSupplement = async (req, res) => {
  try {
    const { name, brand, price, stock } = req.body;
    const newSupplement = new Supplement({ name, brand, price, stock });
    await newSupplement.save();
    res.status(201).json(newSupplement);
  } catch (err) {
    res.status(500).json({ message: "Failed to create supplement" });
  }
};

// ✅ Purchase supplement (reduce stock by 1)
export const purchaseSupplement = async (req, res) => {
  try {
    const { id } = req.params;
    const supplement = await Supplement.findById(id);

    if (!supplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }

    if (supplement.stock <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    supplement.stock -= 1;
    await supplement.save();

    res.json(supplement);
  } catch (err) {
    res.status(500).json({ message: "Purchase failed" });
  }
};
