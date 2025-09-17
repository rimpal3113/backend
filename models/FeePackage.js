import mongoose from "mongoose";

const feePackageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: [String],
});

export default mongoose.model("FeePackage", feePackageSchema);
