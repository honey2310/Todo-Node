// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import multer from "multer";
// import router from "./Routes/MovieRoutes.js";
// import { connectDB } from "./Config/db.js";

// const app = express();
// app.use(express.json());
// app.use("/uploads",express.static("uploads"));
// const PORT = 2000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// export const uploadsPath = path.join(__dirname, "uploads");

// connectDB();
// app.use("/", router);

// app.listen(PORT, () => {
//   console.log("server started successfully!");
// });

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./Routes/MovieRoutes.js";
import { connectDB } from "./Config/db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsPath = path.join(__dirname, "uploads");

// Serve static uploads folder
app.use("/uploads", express.static(uploadsPath));

connectDB();
app.use("/", router);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
