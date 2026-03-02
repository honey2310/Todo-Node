import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    // 🔥 This is the missing link causing the 404
    auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    firstName: String,
    lastName: String,
    dob: String,
    email: String,
    bloodGroup: String,
    phone: String,
    hospital: String,
    health: {
      hemoglobin: { type: String, default: "0.0" },
      bp: { type: String, default: "120/80" },
    },
    address: {
      line: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
    },
    donationFeed: [
      {
        hospitalName: String,
        units: { type: Number, default: 1 },
        date: { type: Date, default: Date.now },
        status: { type: String, default: "Pending" }, // Matches your frontend requirement
        hemoglobin: String,
        bp: String,
      },
    ],
    profileCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const donorCollection = mongoose.model("donor", donorSchema);
