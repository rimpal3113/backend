import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Member from "../models/Member.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    if (role === "member") {
      user = await Member.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "user") {
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role provided" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
