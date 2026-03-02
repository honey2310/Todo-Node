import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, sparse: true },
    phone: { type: String, sparse: true },
    password: String,

    role: {
      type: String,
      enum: ["donor", "hospital", "admin"],
      default: "donor",
    },

    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "donor";
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

export const authCollection = mongoose.model("auth", authSchema);
