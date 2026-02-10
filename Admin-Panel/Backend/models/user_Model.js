import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    name: String,
    education: String,
    phone: String,
    location: String,
    birthdate: Number,
    image: String,
  },
  { timestamps: true },
);

export const userCollection = mongoose.model("user", userSchema);
