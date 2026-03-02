import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    name: String,
    education: String,
    phone: { type: String, unique: true, sparse: true },
    birthdate: String,
    image: String,
    location:String
  },
  { timestamps: true }
);

export const userCollection = mongoose.model("user", userSchema);
