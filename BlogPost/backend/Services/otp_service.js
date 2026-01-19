import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail", // corrected
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (email, otp) => {
  try {
    await transport.sendMail({
      from: `OTP Services <${process.env.EMAIL}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp} and will expire in 5 minutes`,
      html: `<h2>Your OTP is <strong>${otp}</strong></h2>
             <p>This OTP expires in <b>5 minutes</b>.</p>`,
    });
    return true;
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return false;
  }
};
