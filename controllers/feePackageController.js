import FeePackage from "../models/FeePackage.js";


// Get all fee packages
export const getAllFeePackages = async (req, res) => {
  try {
    const packages = await FeePackage.find(); // get all packages
    res.json(packages); // send them to frontend
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages" });
  }
};
// Add new package (optional, for admin use)
export const addFeePackage = async (req, res) => {
  try {
    const { name, price, features } = req.body;
    const newPackage = new FeePackage({ name, price, features });
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ message: "Failed to add fee package", error });
  }
};

// Assign package to a member
export const assignPackage = async (req, res) => {
  try {
    const { memberId, packageId } = req.body;

    if (!memberId || !packageId) {
      return res.status(400).json({ message: "Member ID and Package ID are required" });
    }

    // Find member
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Find package
    const pkg = await FeePackage.findById(packageId);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    // Assign package with dates (1 month default expiry)
    const now = new Date();
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + 1);

    member.assignedPackage = {
      packageId: pkg._id,
      assignedDate: now,
      expiryDate: expiry,
    };

    await member.save();

    res.status(200).json({
      message: `Package '${pkg.name}' assigned to ${member.name} successfully.`,
      member,
    });
  } catch (error) {
    console.error("Error assigning package:", error);
    res.status(500).json({ message: "Server error" });
  }
};

