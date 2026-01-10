// routes/Book.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/Book.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.post("/", upload.single("coverImage"), addBook);
router.get("/", getBooks);
router.put("/:id", upload.single("coverImage"), updateBook);
router.delete("/:id", deleteBook);

export default router;
