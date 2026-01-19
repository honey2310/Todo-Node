import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { format } from "date-fns";

export default function Home() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [user, setUser] = useState(null); // logged-in user

  // Fetch user info and blogs
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1️⃣ Get user info
      const userRes = await axios.get("http://localhost:4000/api/auth/home", {
        withCredentials: true,
      });
      const loggedInUser = userRes.data;
      setUser(loggedInUser); // { _id, name, email }

      // 2️⃣ Get all blogs with author populated
      const blogRes = await axios.get("http://localhost:4000/api/blogs", {
        withCredentials: true,
      });
      const data = Array.isArray(blogRes.data) ? blogRes.data : [];
      setBlogs(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to fetch user or blogs. Try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to logout");
    }
  };

  // Confirm delete modal
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  // Delete blog
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await axios.delete(`http://localhost:4000/api/blogs/${selectedId}`, {
        withCredentials: true,
      });
      // Remove deleted blog from state immediately
      setBlogs(blogs.filter((b) => b._id !== selectedId));
      setShowDelete(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete blog");
      setShowDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#4A4947] text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#4A4947]">My Blogs</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/create")}
              className="bg-[#B17457] text-white px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
            >
              + Add Blog
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-300 text-[#4A4947] px-6 py-3 rounded-full shadow hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-[#D8D2C2] rounded-2xl p-8 mb-8 text-center shadow-md">
          <h2 className="text-3xl font-semibold text-[#4A4947] mb-2">
            Welcome Back, {user?.name || "User"}!
          </h2>
          <p className="text-[#4A4947] opacity-80 text-lg">
            Every Blog Tells a Story – Dive Into Yours.
          </p>
        </div>

        {/* Blog Cards */}
        {blogs.length === 0 ? (
          <p className="text-center text-[#4A4947]">No blogs yet!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              const isOwner =
                blog.author?._id === user?._id || blog.author?._id === user?.id;
              return (
                <div
                  key={blog._id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  <div className="relative h-60">
                    <img
                      src={
                        blog.image
                          ? `http://localhost:4000/${blog.image}`
                          : "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#B17457] text-white px-3 py-1 rounded-full text-sm shadow-lg">
                      {format(new Date(blog.createdAt), "PPP")}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/70 text-[#4A4947] px-3 py-1 rounded-full text-sm shadow">
                      {format(new Date(blog.createdAt), "p")}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between h-60">
                    <div>
                      <h2 className="text-2xl font-semibold text-[#4A4947] mb-1">
                        {blog.title}
                      </h2>
                      <span className="text-sm text-[#4A4947] opacity-80 mb-2 block">
                        ✍️ {blog.author?.name || blog.author?.email || "Author"}
                      </span>
                      <p className="text-[#4A4947] opacity-80 line-clamp-3">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => navigate(`/view/${blog._id}`)}
                        className="text-[#B17457] font-semibold hover:underline"
                      >
                        View
                      </button>
                      {isOwner && (
                        <div className="space-x-2">
                          <button
                            onClick={() => navigate(`/edit/${blog._id}`)}
                            className="text-[#B17457] font-semibold hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => confirmDelete(blog._id)}
                            className="text-red-500 font-semibold hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Confirm Delete Modal */}
        {showDelete && (
          <ConfirmModal
            isOpen={showDelete}
            title="Delete Blog"
            message="This action cannot be undone."
            onCancel={() => setShowDelete(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
