// import express from "express";
// import multer from "multer";
// import { uploadsPath } from "../server.js";
// import path from "path";
// import { addMovies, getMovies } from "../Controllers/MovieControllers.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, "movie-img-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// router.post("/api", upload.single("poster"), addMovies);
// router.get("/api",getMovies);

// export default router;

import express from "express";
import multer from "multer";
import path from "path";
import { uploadsPath } from "../server.js";
import {
  addMovies,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  searchMovies,
} from "../Controllers/MovieControllers.js";

const router = express.Router();

// Multer setup for poster uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsPath),
  filename: (req, file, cb) =>
    cb(null, `movie-img-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// Routes
router.post("/movies", upload.single("poster"), addMovies); // add movie
router.get("/movies", getMovies); // get all
router.get("/movies/:id", getMovieById); // get by id
router.put("/movies/:id", upload.single("poster"), updateMovie); // update with optional poster
router.delete("/movies/:id", deleteMovie); // delete
router.get("/movies/search", searchMovies); // search by title (q=)

export default router;

