import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
  },
  { timestamps: true },
);

export const authCollection = mongoose.model("auth", authSchema);
