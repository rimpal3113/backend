// seed/seedMember.js
import bcrypt from "bcrypt";
import Member from "../models/Member.js";

const seedMember = async () => {
  const exists = await Member.findOne({ email: "member@example.com" });
  if (exists) {
    console.log("⚠️ Member already exists");
    return;
  }

  const hashed = await bcrypt.hash("member123", 10);
  const member = new Member({ name: "Member", email: "member@example.com", password: hashed });
  await member.save();
  console.log("✅ Member seeded");
};

export default seedMember;
