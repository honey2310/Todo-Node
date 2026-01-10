// models/Book.model.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    price: Number,
    coverImage: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
