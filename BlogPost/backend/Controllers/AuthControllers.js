import { Auth } from "../Models/AuthModel.js";
import bcrypt from "bcrypt";
import { OtpModel } from "../Models/Otp_Model.js"; 
import { sendOtpMail } from "../Services/otp_service.js";

// ----------------- SIGNUP -----------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Auth.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// ----------------- SIGNIN -----------------
export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email: email.toLowerCase() });

  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  // Check if OTP is required (optional: can be always true for new login)
  const otp = Math.floor(100000 + Math.random() * 900000);
  await OtpModel.create({
    email: user.email,
    otp,
    expiry: new Date(Date.now() + 5 * 60 * 1000),
  });

  const mailSent = await sendOtpMail(user.email, otp);
  if (!mailSent) return res.status(500).json({ message: "Failed to send OTP" });

  res.status(200).json({
    message: "OTP sent to your email",
    otpRequired: true,
  });
};

// ----------------- LOGOUT -----------------
export const logout = (req, res) => {
  res.clearCookie("Auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

// ----------------- HOME (GET ALL USERS) -----------------
export const home = async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
