import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ ADD THIS
    req.role = decoded.role; // optional if you want role-based auth
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
