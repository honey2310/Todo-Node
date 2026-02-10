import mongoose from "mongoose";
import moduleName from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: String,
    otp: Number,
    expiry: Date,
  },
  { timestamps: true },
);

export const OtpCollection = mongoose.model("otp", otpSchema);
