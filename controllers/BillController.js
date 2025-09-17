import Bill from "../models/Bill.js";
import Member from "../models/Member.js";

// Create new bill
export const createBill = async (req, res) => {
  try {
    const { memberName, amount, status } = req.body;
    const member = await Member.findOne({ email: memberName });

    if (!member) return res.status(404).json({ error: "Member not found" });

    const bill = new Bill({
      memberId: member._id,
      memberName: member.email,
      amount,
      status,
    });

    await bill.save();
    res.status(201).json({ message: "Bill created", bill });
  } catch (err) {
    console.error("Error in createBill:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all bills
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ date: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get bills by member ID

// GET /api/bills/member/:id
export const getBillsByMemberId = async (req, res) => {
  try {
    const bills = await Bill.find({ memberId: req.params.id }); // Ensure memberId is correct field
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// Delete bill
export const deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
