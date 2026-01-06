import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieForm = ({ onMovieAdded, editingMovie }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    description: "",
    poster: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* =======================
     LOAD EDIT DATA
  ======================== */
  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title || "",
        genre: editingMovie.genre || "",
        year: editingMovie.year || "",
        description: editingMovie.description || "",
        poster: null,
      });
    } else {
      setFormData({
        title: "",
        genre: "",
        year: "",
        description: "",
        poster: null,
      });
    }
    setMessage("");
  }, [editingMovie]);

  /* =======================
     INPUT HANDLER
  ======================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  /* =======================
     SUBMIT
  ======================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.genre ||
      !formData.year ||
      !formData.description
    ) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("genre", formData.genre);
    data.append("year", formData.year);
    data.append("description", formData.description);
    if (formData.poster) data.append("poster", formData.poster);

    try {
      setLoading(true);

      if (editingMovie) {
        await axios.put(
          `http://localhost:2000/movies/${editingMovie._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("✅ Movie updated successfully");
      } else {
        await axios.post("http://localhost:2000/movies", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Movie added successfully");
      }

      onMovieAdded();
      setFormData({
        title: "",
        genre: "",
        year: "",
        description: "",
        poster: null,
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* =======================
     UI
  ======================== */
  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {editingMovie ? "🎬 Edit Movie" : "🎥 Add New Movie"}
        </h2>

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#D6A99D]"
          />

          {/* GENRE */}
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#D6A99D]"
          />

          {/* YEAR */}
          <input
            type="number"
            name="year"
            placeholder="Release Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-[#D6A99D]"
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Movie description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border resize-none focus:ring-2 focus:ring-[#D6A99D]"
          />

          {/* POSTER */}
          <input
            type="file"
            name="poster"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-[#D6A99D] to-[#C89F94]
              hover:opacity-90 transition
            "
          >
            {loading
              ? editingMovie
                ? "Updating..."
                : "Adding..."
              : editingMovie
              ? "Update Movie"
              : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
