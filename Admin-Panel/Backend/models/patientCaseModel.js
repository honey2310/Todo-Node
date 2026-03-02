import mongoose from "mongoose";

const patientCaseSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    caseId: {
      type: String,
      unique: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    reason: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: true,
      min: 1,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
      default: "Low",
    },
    logisticsStatus: {
      type: String,
      enum: ["Pending", "Processing", "Dispatched", "Completed"],
      default: "Pending",
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospital",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

patientCaseSchema.pre("save", function () {
  if (!this.caseId) {
    this.caseId =
      "CASE-" +
      Date.now().toString().slice(-6) +
      Math.floor(Math.random() * 10);
  }
});

export const PatientCollection = mongoose.model(
  "PatientCase",
  patientCaseSchema,
);
