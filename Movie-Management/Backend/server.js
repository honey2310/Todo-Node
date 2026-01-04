import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import router from "./Routes/MovieRoutes.js";
import { connectDB } from "./Config/db.js";

const app = express();
app.use(express.json());
const PORT = 2000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const uploadsPath = path.join(__dirname, "Uploads");

connectDB();
app.use("/", router);

app.listen(PORT, () => {
  console.log("server started successfully!");
});
