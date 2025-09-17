import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  membershipType: String,
  password: { type: String, required: true },
   assignedPackage: {
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: "FeePackage" },
    assignedDate: Date,
    expiryDate: Date,
  }
});

export default mongoose.model("Member", memberSchema);
