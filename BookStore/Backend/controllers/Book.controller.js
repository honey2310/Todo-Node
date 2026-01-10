// controllers/Book.controller.js
import Book from "../models/Book.model.js";
import fs from "fs";

export const addBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      coverImage: req.file?.path,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (req.file) {
      if (book.coverImage && fs.existsSync(book.coverImage)) {
        fs.unlinkSync(book.coverImage);
      }
      book.coverImage = req.file.path;
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.price = req.body.price;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.coverImage && fs.existsSync(book.coverImage)) {
      fs.unlinkSync(book.coverImage);
    }
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
