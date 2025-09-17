import mongoose from "mongoose"

const billSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
  memberName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  
})

const Bill = mongoose.model("Bill", billSchema)

export default Bill
