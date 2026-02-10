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

export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiry = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes

  try {
    await OtpCollection.create({ email, otp, expiry });

    await transport.sendMail({
      from: `OTP Services <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
      html: `
        <h2>Your OTP is <strong>${otp}</strong></h2>
        <p>This OTP expires in <b>5 minutes</b>.</p>
      `,
    });

    return true;
  } catch (err) {
    console.error("OTP Error:", err);
    return false;
  }
};
