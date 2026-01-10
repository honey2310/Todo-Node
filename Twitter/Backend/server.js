import express from "express";
import cors from "cors";
import tweetRoutes from "./Routes/tweetRoutes.js";
import logger from "./Middleware/logger.js";

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Application-level middleware ----------
app.use(logger);

// ---------- Routes ----------
app.use("/api/tweets", tweetRoutes);

// ---------- Server ----------
app.listen(1515, () => {
  console.log("Server started on port 1515");
});
