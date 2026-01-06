import { Movie } from "../Models/MovieModel.js";
import fs from "fs";
import path from "path";
import { uploadsPath } from "../server.js";

/* =======================
   1️⃣ ADD MOVIE
======================= */
export const addMovies = async (req, res) => {
  try {
    const { title, genre, year, description } = req.body;

    if (!title || !genre || !year || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Poster image is required",
      });
    }

    const newMovie = new Movie({
      title,
      genre,
      year,
      description,
      reminder: false,
      poster: `/uploads/${req.file.filename}`,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({
      message: "Failed to add movie",
      err,
    });
  }
};

/* =======================
   2️⃣ GET ALL MOVIES
======================= */
export const getMovies = async (req, res) => {
  try {
    const data = await Movie.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get movies", err });
  }
};

/* =======================
   3️⃣ GET MOVIE BY ID
======================= */
export const getMovieById = async (req, res) => {
  try {
    const data = await Movie.findById(req.params.id);
    if (!data)
      return res.status(404).json({ message: "Movie not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to get movie", err });
  }
};

/* =======================
   4️⃣ UPDATE MOVIE
======================= */
export const updateMovie = async (req, res) => {
  try {
    const { title, genre, year, description } = req.body;

    const updatedData = {
      title,
      genre,
      year,
      description,
    };

    if (req.file) {
      updatedData.poster = `/uploads/${req.file.filename}`;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ message: "Failed to update movie", err });
  }
};

/* =======================
   5️⃣ DELETE MOVIE
======================= */
export const deleteMovie = async (req, res) => {
  try {
    const movieToDelete = await Movie.findById(req.params.id);

    if (!movieToDelete)
      return res.status(404).json({ message: "Movie not found" });

    if (movieToDelete.poster) {
      const posterPath = path.join(
        uploadsPath,
        path.basename(movieToDelete.poster)
      );
      if (fs.existsSync(posterPath)) fs.unlinkSync(posterPath);
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete movie", err });
  }
};

/* =======================
   6️⃣ SEARCH MOVIES
======================= */
export const searchMovies = async (req, res) => {
  try {
    const { q } = req.query;

    const results = await Movie.find({
      title: { $regex: q, $options: "i" },
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Failed to search movies", err });
  }
};
