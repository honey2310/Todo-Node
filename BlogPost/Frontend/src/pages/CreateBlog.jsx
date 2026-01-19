import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file)); // Create a temporary URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.title || !form.content) {
      return alert("Title and content are required");
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      if (form.image) data.append("image", form.image); // image is optional

      const res = await axios.post("http://localhost:4000/api/blogs", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog created successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-[#4A4947] mb-6 text-center">
          Create New Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457]"
            required
          />

          <textarea
            name="content"
            placeholder="Write your blog here..."
            value={form.content}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B17457] h-48 resize-none"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full text-[#4A4947]"
          />
          {preview && (
            <img
              src={preview}
              className="h-40 w-full object-cover rounded-xl mb-4"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#B17457] text-white rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
