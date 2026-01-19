import { Blog } from "../Models/BlogModel.js";
import fs from "fs";
import path from "path";

/* CREATE BLOG */
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
      title,
      content,
      image: req.file ? req.file.path : "",
      author: req.user.id,
    });
    res
      .status(201)
      .json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL BLOGS (PUBLIC) */
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

/* GET SINGLE BLOG */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

/* UPDATE BLOG */
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // ✅ Ownership check
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update title and content
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    // Handle image update
    if (req.file) {
      // New file uploaded: delete old image
      if (blog.image && fs.existsSync(blog.image)) {
        fs.unlinkSync(blog.image);
      }
      blog.image = req.file.path;
    } else if (req.body.existingImage) {
      // No new file, frontend sent existing image path
      blog.image = req.body.existingImage;
    }

    await blog.save();
    res.json({ success: true, message: "Blog updated", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE BLOG */
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // ✅ Ownership check
    if (!blog.author || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ✅ Delete image if exists
    if (blog.image && fs.existsSync(blog.image)) {
      fs.unlinkSync(blog.image);
    }

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
