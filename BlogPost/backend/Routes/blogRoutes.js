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

const router = express.Router();

/* PUBLIC */
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

/* PROTECTED */
router.post("/", isAuthentication, upload.single("image"), createBlog);
router.put(
  "/:id",
  isAuthentication,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateBlog
);
router.delete("/:id", isAuthentication, deleteBlog);

export default router;
