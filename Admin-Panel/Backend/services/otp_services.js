import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { OtpCollection } from "../models/otp_Model.js";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOTP = async (email, role) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 1000 * 60 * 5);

  try {
    await OtpCollection.deleteMany({ email, role });
    await OtpCollection.create({ email, otp, role, expiry });

    // 🔥 FIX: Skip email transport if it's a phone-based role
    if (role === "donor_phone") {
      console.log(`Phone OTP for ${email}: ${otp}`); // For now, check console for the OTP
      return true;
    }

    // Only send email for other roles (admin, hospital, password_reset)
    await transport.sendMail({
      from: `OTP Services <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}.`,
      html: `<h2>Your OTP is <strong>${otp}</strong></h2>`,
    });

    return true;
  } catch (err) {
    console.error("OTP Error:", err);
    return false;
  }
};
