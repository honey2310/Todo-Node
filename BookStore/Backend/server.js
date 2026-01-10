// server.js
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/Book.routes.js";
import logger from "./middleware/logger.js";
import connectDB from "./config/db.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/uploads", express.static("uploads"));
app.use("/api/books", bookRoutes);

connectDB();

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
