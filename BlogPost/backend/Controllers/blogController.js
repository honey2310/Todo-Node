import { Blog } from "../Models/BlogModel.js";

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

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL BLOGS (PUBLIC) */
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json(blogs);
};

/* GET SINGLE BLOG */
export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "author",
    "name email"
  );

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  res.json(blog);
};

/* UPDATE BLOG */
export const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (!blog) return res.status(404).json({ message: "Not found" });
  
    // ⭐ only owner can modify
    if (!blog.author || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
  
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    await blog.save();
    res.json(blog);
  };
/* DELETE BLOG */
export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Not found" });

  // ⭐ only owner can delete
  if (!blog.author || blog.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await blog.deleteOne();
  res.json({ message: "Deleted" });
};
