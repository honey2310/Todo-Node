import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    role: { type: String, required: true },
    expiry: Date,
  },
  { timestamps: true },
);

export const OtpCollection = mongoose.model("otp", otpSchema);
