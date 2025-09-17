import User from "../models/User.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // comes from authenticate middleware
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load user profile" });
  }
};
