import React, { useState } from "react";
import MovieForm from "./Components/MovieForm";
import MovieList from "./Components/MovieList";
import MovieSearch from "./Components/MovieSearch";

export default function App() {
  const [showHome, setShowHome] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleMovieAdded = () => {
    setRefreshFlag(!refreshFlag);
    setEditingMovie(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF3D5] via-[#D6DAC8] to-[#FBF3D5] text-gray-800">
      {!showHome ? (
        /* COVER PAGE */
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#D6A99D] via-[#D6DAC8] to-[#FBF3D5]">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center max-w-lg border border-white/40">
            <h1 className="text-4xl font-extrabold mb-4 tracking-wide">🎬 Movie Management</h1>
            <p className="mb-8 text-gray-600 text-lg">
              A modern dashboard to manage, explore and organize your movies
            </p>
            <button
              onClick={() => setShowHome(true)}
              className="px-10 py-4 rounded-2xl bg-[#D6A99D] text-white text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* TOP NAVBAR */}
          <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl shadow-md border-b border-white/40">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold tracking-wide text-[#D6A99D]">
                  Movie Management
                </h2>
              </div>
              <button
                onClick={() => {
                  setEditingMovie(null);
                  setShowForm(true);
                }}
                className="bg-[#D6A99D] text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all"
              >
                + Add Movie
              </button>
            </div>
          </header>

          {/* SEARCH SECTION */}
          <div className="max-w-5xl mx-auto mt-10 px-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/40">
              <MovieSearch onSearchResults={setSearchResults} />
            </div>
          </div>

          {/* MOVIE LIST */}
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <MovieList
              refreshFlag={refreshFlag}
              onEdit={(movie) => {
                setEditingMovie(movie);
                setShowForm(true);
              }}
              movies={searchResults}
            />
          </div>

          {/* ADD / EDIT MODAL */}
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  ✕
                </button>
                <MovieForm
                  onMovieAdded={handleMovieAdded}
                  editingMovie={editingMovie}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}