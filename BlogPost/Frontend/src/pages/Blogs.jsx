import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import React from "react";

export default function GuestHome() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:4000/api/blogs");
      // Ensure response is always an array
      const data = Array.isArray(res.data) ? res.data : [];
      setBlogs(data);
      setFilteredBlogs(data);
    } catch (err) {
      console.error("Fetch Blogs Error:", err);
      setBlogs([]);
      setFilteredBlogs([]);
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Search filter
  useEffect(() => {
    if (!search) return setFilteredBlogs(blogs);
    const filtered = blogs.filter((b) =>
      b.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [search, blogs]);

  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      {/* Hero Section */}
      <div className="bg-[#D8D2C2] py-16 text-center relative">
        {/* Top nav buttons */}
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 absolute top-6 left-1/2 transform -translate-x-1/2 w-[90%]">
          {/* Left back arrow */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-[#4A4947] font-medium hover:text-[#B17457] transition"
          >
            <FaArrowLeft />
            Back
          </button>

          {/* Right Sign In / Register */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="bg-[#B17457] text-white font-medium px-6 py-2 rounded-lg shadow-md hover:bg-[#9c5b3d] transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-[#B17457] border border-[#B17457] font-medium px-6 py-2 rounded-lg shadow-md hover:bg-[#f7f3ef] transition"
            >
              Register
            </button>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-[#4A4947] mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-[#4A4947] opacity-80 text-xl">
          Explore the latest stories, ideas, and updates.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <input
          type="text"
          placeholder="Search blogs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457]"
        />
      </div>

      {/* Blog Cards */}
      <div className="max-w-5xl mx-auto mt-10 px-4 grid gap-8">
        {loading ? (
          <p className="text-center text-[#4A4947]">Loading blogs...</p>
        ) : !filteredBlogs || filteredBlogs.length === 0 ? (
          <p className="text-center text-[#4A4947]">No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition"
            >
              <img
                src={
                  blog.image
                    ? `http://localhost:4000/${blog.image}` // make sure blog.image has 'uploads/...'
                    : "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={blog.title || "Blog Image"}
                className="w-full md:w-1/3 h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-[#4A4947] mb-2">
                    {blog.title || "Untitled"}
                  </h2>
                  <p className="text-[#4A4947] opacity-80 line-clamp-4">
                    {blog.content || "No content available."}
                  </p>
                  <p className="text-sm mt-2 text-[#4A4947] opacity-60">
                    Author: {blog.author?.name || "Unknown Author"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-[#4A4947] opacity-60">
                    {blog.createdAt
                      ? format(new Date(blog.createdAt), "PPP p")
                      : ""}
                  </span>
                  <button
                    onClick={() => navigate(`/guest/view/${blog._id}`)}
                    className="bg-[#B17457] text-white px-5 py-2 rounded-full shadow hover:opacity-90 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
