import React, { useState } from "react";
import axios from "axios";

const MovieSearch = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Search movies by title
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      setLoading(true);
      // Use `q` to match backend
      const res = await axios.get(
        `http://localhost:2000/movies/search?q=${query}`
      );
      onSearchResults(res.data); // send results back to App.jsx
    } catch (err) {
      console.error("Search failed", err);
      onSearchResults([]); // empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Reset search to show all movies
  const handleReset = () => {
    setQuery("");
    onSearchResults(null); // null tells MovieList to fetch all movies
  };

  return (
    <div className="flex-1 px-4 py-3 rounded-xl bg-[#FBF3D5] outline-none focus:ring-2 ring-[#D6A99D]">
      <form className="flex space-x-2" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default MovieSearch;
