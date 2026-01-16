import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  otp: {
    type: String,
    required: true,
    index: true,
  },
  expiry: {
    type: Date,
    required: true,
    expires: 300, // auto delete after 5 minutes
  },
});

export const OtpModel = mongoose.model("otp", otpSchema);
