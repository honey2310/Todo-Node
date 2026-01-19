import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "", // optional, can set a placeholder URL if desired
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // updated to match Auth model
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", blogSchema);
