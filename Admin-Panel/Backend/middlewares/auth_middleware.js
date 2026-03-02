import jwt from "jsonwebtoken";
import { authCollection } from "../models/auth_Model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies?.auth_token;

    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized: No token" });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
    }

    // Attach user to request
    const user = await authCollection.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    res.status(401).json({ status: false, message: "Unauthorized", error: err.message });
  }
};