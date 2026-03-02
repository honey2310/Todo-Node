import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import auth_routes from "./routes/auth_Routes.js";
import cors from "cors";
import user_routes from "./routes/user_Routes.js";
import donor_routes from "./routes/donor_Routes.js";
import inventoryRoutes from "./routes/inventory_Routes.js";
import dashboardRoutes from "./routes/dashboard_Routes.js";
import patientCaseRoutes from "./routes/patientCaseRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

connectDB();
app.use("/api/auth", auth_routes);
app.use("/api/admin", user_routes);
app.use("/api/donor", donor_routes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/cases", patientCaseRoutes);
app.use("/api/hospital", hospitalRoutes);

app.listen(process.env.PORT || 5050, () =>
  console.log("server started successfully!")
);
