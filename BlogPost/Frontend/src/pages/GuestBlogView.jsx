import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function GuestBlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`, {
          withCredentials: true,
        });
        setBlog(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-20 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF7] to-[#F2EDE3] px-6 py-12 flex justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Hero Image with Overlay */}
        <div className="relative h-80 md:h-96">
          <img
            src={
              blog.image
                ? `http://localhost:4000/${blog.image}`
                : "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={blog.title || "Blog Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg">
              {blog.title}
            </h1>
          </div>
        </div>

        {/* Blog Info */}
        <div className="p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-[#F3E1D7] text-sm text-[#B17457]">
              📅 {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F3E1D7] text-sm text-[#B17457]">
              ⏰ {new Date(blog.createdAt).toLocaleTimeString()}
            </span>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-[#4A4947] opacity-80">
                ✍️ {blog.author?.name || blog.author?.email || "Author"}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg prose-stone max-w-none text-[#4A4947] leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>

          {/* Guest Interaction / Footer */}
          <div className="mt-12 flex flex-col md:flex-row md:justify-between items-center gap-4">
            <button
              onClick={() => navigate("/blogs")}
              className="px-6 py-3 rounded-full bg-[#B17457] text-white shadow-lg hover:scale-105 transition transform"
            >
              ← Back to blogs
            </button>

            <span className="text-sm text-[#6B6A67] italic">
              Thank you for visiting ✨
            </span>
          </div>

          {/* Optional placeholder for guest interaction */}
          <div className="mt-10 p-4 border-t border-[#E0DCD2]">
            <p className="text-[#6B6A67] italic text-center">
              Guests can leave comments or share this blog soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
