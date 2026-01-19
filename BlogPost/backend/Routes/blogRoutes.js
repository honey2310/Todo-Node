import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../Controllers/blogController.js";

import { isAuthentication } from "../Middleware/AuthMiddleware.js";
import { upload } from "../Middleware/uploadMiddleware.js";

const blogrouter = express.Router();

/* PUBLIC */
blogrouter.get("/", getAllBlogs);
blogrouter.get("/:id", getBlogById);

/* PROTECTED */
blogrouter.post("/", isAuthentication, upload.single("image"), createBlog);
blogrouter.put("/:id", isAuthentication, upload.single("image"), updateBlog);
blogrouter.delete("/:id", isAuthentication, deleteBlog);

export default blogrouter;
