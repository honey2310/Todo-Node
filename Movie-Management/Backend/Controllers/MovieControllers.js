import { movie } from "../Models/MovieModel.js";

export const addMovies = async (req, res) => {
  try {
    const { title, genre, year } = req.body;
    const result = await movie.create({
      title,
      genre,
      year,
      poster: "/uploads" + req.file.filename,
    });
    res.json({ message: "Movie added successfully!!" });
  } catch (err) {
    res.json({ message: "Fail to add movie" ,err});
  }
};

export const getMovies = async (req, res) => {
  try {
    const data = await movie.find();
    res.json(data);
  } catch (err) {
    res.json({ message: "Fail to get movie" ,err});
  }
};
