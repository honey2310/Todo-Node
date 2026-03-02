import mongoose from "mongoose";
import { seedInventory } from "../services/seedInventory.js";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!!");
    await seedInventory();
  } catch (err) {
    console.log("Fail to connect MongoDB");
    process.exit(1);
  }
};
