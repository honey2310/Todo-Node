import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import auth_routes from "./routes/auth_route.js";
import cors from "cors";
import user_routes from "./routes/user_route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

connectDB();
app.use("/api/auth", auth_routes);
app.use("/api/admin", user_routes);

app.listen(process.env.PORT, () => console.log("server started successfully!"));
