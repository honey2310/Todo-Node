import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

export const Auth = mongoose.model("auth",authSchema);