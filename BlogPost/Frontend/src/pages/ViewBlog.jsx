import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import Toast from "./Toast";
import { format } from "date-fns";

export default function ViewBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`, {
          withCredentials: true,
        });
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        setToast({
          message: err.response?.data?.message || "Failed to fetch blog",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-20 text-[#4A4947] text-xl">Loading...</p>
    );

  if (!blog) return null; // in case fetch fails

  return (
    <div className="min-h-screen bg-[#FAF7F0] px-6 py-12 flex justify-center">
      <div className="max-w-5xl w-full">
        {/* Blog Image */}
        <div className="flex justify-start mb-10">
          <img
            src={
              blog.image
                ? `http://localhost:4000/${blog.image}`
                : "https://via.placeholder.com/800x420?text=No+Image"
            }
            alt={blog.title || "Blog Image"}
            className="max-h-[420px] w-auto object-contain rounded-2xl"
          />
        </div>

        {/* Blog Header */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4A4947] mb-3">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-[#6B6A67]">
            <span>📅 {format(new Date(blog.createdAt), "PPP")}</span>
            <span>⏰ {new Date(blog.createdAt).toLocaleTimeString()}</span>
            <span>✍️ {blog.author?.name || "Unknown Author"}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#D8D2C2] my-8"></div>

        {/* Blog Content */}
        <div className="text-[#4A4947] leading-relaxed text-lg whitespace-pre-line">
          {blog.content}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex justify-between items-center">
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 rounded-full bg-[#B17457] text-white shadow-lg hover:opacity-90 transition"
          >
            ← Back to Home
          </button>

          <span className="text-sm text-[#6B6A67] italic">
            Thank you for reading ✨
          </span>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
}
