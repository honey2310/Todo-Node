import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
    },
    license: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    tier: {
      type: String,
      default: "Standard",
    },
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PatientCase", // This MUST match the model name in your PatientCollection
      },
    ],
  },
  { timestamps: true },
);

export const hospitalCollection = mongoose.model("hospital", hospitalSchema);
