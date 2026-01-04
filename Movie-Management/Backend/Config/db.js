import mongoose from "mongoose";

export const connectDB = async() => {
  try {
    await mongoose.connect("mongodb://localhost:27017/movies");
    console.log("mongoDb connected!!!");
  } catch (err) {
    console.log("Failed to connect mongoDB!!!");
  }
};
