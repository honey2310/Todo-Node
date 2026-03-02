import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true,
      unique: true,
    },

    units: {
      type: Number,
      default: 20, // ⭐ DEFAULT VALUE
    },

    status: {
      type: String,
      enum: ["Healthy", "Moderate", "Critical"],
      default: "Healthy",
    },
  },
  { timestamps: true }
);

export const inventoryCollection =
  mongoose.model("inventory", inventorySchema);