import Member from "../models/Member.js";
import Bill from "../models/Bill.js";
import Notification from "../models/Notification.js";
import DietPlan from "../models/DietPlan.js";
import bcrypt from "bcryptjs"; // or "bcrypt" if you're using that package

export const addMember = async (req, res) => {
  try {
    const { name, age, gender, email, phone, membershipType, password } = req.body;

    if (!name || !age || !gender || !email || !phone || !membershipType || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Member.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Member already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 🔒 secure password

    const newMember = new Member({
      name,
      age,
      gender,
      email,
      phone,
      membershipType,
      password: hashedPassword, // Save hashed password
    });

    await newMember.save();

    res.status(201).json({ message: "Member added successfully", member: newMember });
  } catch (err) {
    console.error("Add member error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// Get All Members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ joinDate: -1 });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch members", error: err.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Member.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Member not found" });
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE Member
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Member.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const searchMembers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const members = await Member.find({
      name: { $regex: query, $options: "i" }, // case-insensitive search
    });

    res.status(200).json(members);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// backend/controllers/memberController.js
export const getMemberDashboard = async (req, res) => {
  try {
    const memberId = req.user.id;

    // Count pending bills
    const pendingBills = await Bill.countDocuments({
      memberId,
      status: "unpaid",
    });

    // Count unseen notifications
    const notifications = await Notification.countDocuments({
      memberId,
      seen: false,
    });

    // Example: Check diet plan exists or not
    const dietStatus = "Inactive"; // Replace this if you track it elsewhere

    res.json({
      pendingBills,
      notifications,
      dietStatus,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const createNotification = async (req, res) => {
  try {
    const { memberId, title, message, date } = req.body;

    if (!memberId || !title || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const notification = new Notification({
      memberId,
      title,
      message,
      date: date || new Date(),
    });

    await notification.save();

    res.status(201).json({ message: "Notification created", notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMemberNotifications = async (req, res) => {
  try {
    const memberId = req.user.id;

    const notifications = await Notification.find({ memberId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ message: "Server Error" });
  }
};



