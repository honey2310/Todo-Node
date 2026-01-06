import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieList = ({ refreshFlag, onEdit, movies: searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [deleteMovieId, setDeleteMovieId] = useState(null);

  const getMovies = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:2000/movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchResults) getMovies();
  }, [refreshFlag, searchResults]);

  const movieList = searchResults ?? movies;

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:2000/movies/${deleteMovieId}`);
      setDeleteMovieId(null);
      getMovies();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="px-16 mt-12">
      {loading && (
        <p className="text-center text-gray-500">Loading movies...</p>
      )}

      {!loading && movieList.length === 0 && (
        <p className="text-center text-gray-500">No movies found</p>
      )}

      <div className="space-y-8">
        {movieList.map((movie) => (
          <div
            key={movie._id}
            className="
              flex gap-6 p-4
              bg-white/60 backdrop-blur-xl
              rounded-2xl border border-white/40
              shadow-lg hover:shadow-2xl
              transition
            "
          >
            {/* Poster */}
            <div className="w-32 h-40 rounded-xl overflow-hidden shadow-md">
              <img
                src={`http://localhost:2000${movie.poster}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between h-40">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-600">🎭 {movie.genre}</p>
                <p className="text-sm text-gray-500">📅 {movie.year}</p>
                <p className="text-sm text-gray-500">{movie.description}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMovie(movie)}
                  className="
                    px-4 py-2 rounded-lg
                    bg-[#E8E3D3]
                    hover:bg-[#D6A99D] hover:text-white
                    transition
                  "
                >
                  View
                </button>

                <button
                  onClick={() => onEdit(movie)}
                  className="
                    px-4 py-2 rounded-lg
                    bg-yellow-500 text-white
                    hover:bg-yellow-600
                    transition
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteMovieId(movie._id)}
                  className="
                    px-4 py-2 rounded-lg
                    bg-red-500 text-white
                    hover:bg-red-600
                    transition
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <img
              src={`http://localhost:2000${selectedMovie.poster}`}
              alt={selectedMovie.title}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
            <p>Genre: {selectedMovie.genre}</p>
            <p>Year: {selectedMovie.year}</p>
            <p className="mt-2 text-gray-700">{selectedMovie.description}</p>

            <button
              onClick={() => setSelectedMovie(null)}
              className="
                mt-6 w-full py-3 rounded-xl
                bg-[#D6A99D] text-white
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deleteMovieId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-xl font-bold mb-2">Delete this movie?</h3>
            <p className="text-gray-600 mb-6">This action cannot be undone.</p>

            <div className="flex gap-4">
              <button
                onClick={() => setDeleteMovieId(null)}
                className="flex-1 py-2 rounded-xl bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
