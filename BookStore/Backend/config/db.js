import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookstore");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connectDB;
