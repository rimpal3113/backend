import Member from "../models/Member.js";

export const getAdminStats = async (req, res) => {
  try {
    // Count all members
    const totalMembers = await Member.countDocuments();

    // Count active memberships
    const activeSubscriptions = await Member.countDocuments({
      membershipType: { $in: ["basic", "standard", "premium"] }
    });

    // New signups in last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newSignups = await Member.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });

    res.status(200).json({
      totalMembers,
      activeSubscriptions,
      newSignups
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Failed to load stats" });
  }
};
