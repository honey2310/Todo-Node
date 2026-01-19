import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: { type: String, required: true, minlength: 6 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Auth = mongoose.model("User", authSchema);
