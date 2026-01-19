import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./Config/db.js"; // fixed typo
import cors from "cors";
import router from "./Routes/AuthRoutes.js";
import blogrouter from "./Routes/blogRoutes.js";
import dotenv from 'dotenv'
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// CORS setup
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // serve images

// Routes
app.use("/api/auth", router);
app.use("/api/blogs", blogrouter);

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
