import express from "express";
import multer from "multer";
import { uploadsPath } from "../server.js";
import path from "path";
import { addMovies, getMovies } from "../Controllers/MovieControllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    cd(null, "movie-img-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/api", upload.single("poster"), addMovies);
router.get("/api",getMovies);

export default router;