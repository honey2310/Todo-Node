import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOtpMail = async (email, otp) => {
  try {
    await transport.sendMail({
      from: "OTP Services <" + process.env.EMAIL + ">",
      to: email,
      subject: "OTP Verification",
      text: "your otp is" + otp + "will expired in 2 mintues",
    });
    return true;
  } catch (err) {
    return false;
  }
};
