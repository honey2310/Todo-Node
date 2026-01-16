import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null, // This will hold File or URL string
  });

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // For image preview

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
          image: res.data.image, // store existing image path
        });
        setPreview(`http://localhost:4000/${res.data.image}`);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id]);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle image selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file }); // store File
      setPreview(URL.createObjectURL(file)); // show preview
    }
  };

  // Submit updated blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);

      // Only append new image if user selected a file
      if (form.image instanceof File) {
        data.append("image", form.image);
      } else {
        data.append("existingImage", form.image); // send existing image path
      }

      await axios.put(`http://localhost:4000/api/blogs/${id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog updated successfully!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Failed to update blog");
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
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#B17457]"
            required
          />

          {/* Content */}
          <textarea
            name="content"
            placeholder="Edit your blog..."
            value={form.content}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#B17457] h-48 resize-none"
            required
          />

          {/* Image Upload */}
          <div>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-[#4A4947]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#B17457] text-white rounded-full shadow-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
