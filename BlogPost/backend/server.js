import express from "express";
import cookieParser from "cookie-parser";
import { connetcDB } from "./Config/db.js";
import router from "./Routes/AuthRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";
import cors from 'cors'

const app = express();
connetcDB();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

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

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/", router);
app.use("/api/blogs", blogRoutes);

app.listen(4000, () => console.log("server started successfully on 4000"));
