import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import Toast from "./Toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/blogs/${id}`, {
          withCredentials: true,
        });
        setForm({
          title: res.data.title,
          content: res.data.content,
          image: res.data.image, // backend path
        });
        setPreview(
          res.data.image ? `http://localhost:4000/${res.data.image}` : null
        );
      } catch (err) {
        console.error(err);
        setToast({
          message: err.response?.data?.message || "Failed to fetch blog",
          type: "error",
        });
      }
    };
    fetchBlog();
  }, [id]);

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview && form.image instanceof File) URL.revokeObjectURL(preview);
    };
  }, [preview, form.image]);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setForm({ ...form, image: null });
    setPreview(null);
  };

  // Submit updated blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);

      if (form.image instanceof File) {
        data.append("image", form.image);
      } else if (form.image) {
        data.append("existingImage", form.image);
      }

      await axios.put(`http://localhost:4000/api/blogs/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setToast({ message: "Blog updated successfully!", type: "success" });
      setTimeout(() => navigate("/home"), 1200);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || "Failed to update blog",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-[#4A4947] mb-6 text-center">
          Edit Blog
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
            disabled={loading}
          />

          <textarea
            name="content"
            placeholder="Edit your blog..."
            value={form.content}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B17457] h-48 resize-none"
            required
            disabled={loading}
          />

          <div>
            {preview && (
              <div className="relative mb-4">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full shadow hover:opacity-90"
                >
                  Remove
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-[#4A4947]"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#B17457] text-white rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
    </div>
  );
}
