import { OtpModel } from "../Models/Otp_Model.js";
import { Auth } from "../Models/AuthModel.js"; // 👈 1. Make sure to import your User/Auth model
import jwt from "jsonwebtoken";

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res
      .status(400)
      .json({ success: false, message: "Email & OTP required" });

  // Search using the string version if your schema says String
  const data = await OtpModel.findOne({
    email: email.toLowerCase().trim(),
    otp: otp.toString(),
  });

  if (!data)
    return res.status(400).json({ success: false, message: "Invalid OTP" });

  // 3. Find the user so we can get their ID for the token
  const user = await Auth.findOne({ email: email.toLowerCase().trim() });
  if (!user) return res.status(404).json({ message: "User not found" });

  // 4. Create the Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  // 5. Set the Cookie (This is what stops the 401 error!)
  res.cookie("Auth_token", token, {
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  });

  // If the document exists, it hasn't been deleted by TTL yet, so it's valid!
  await OtpModel.deleteOne({ _id: data._id });

  res.status(200).json({ success: true, message: "OTP verified successfully" });
};

// Resend OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  await OtpModel.create({
    email,
    otp,
    expiry: new Date(Date.now() + 5 * 60 * 1000),
  });

  const mailSent = await sendOtpMail(email, otp);
  if (!mailSent)
    return res
      .status(500)
      .json({ success: false, message: "Failed to send OTP" });

  res.status(200).json({ success: true, message: "OTP sent" });
};
