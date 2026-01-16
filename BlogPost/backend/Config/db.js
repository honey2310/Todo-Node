import mongoose from "mongoose";

export const connetcDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/BlogPost");
    console.log("MongoDB Connected SuccessFully!");
  } catch (err) {
    console.log("Fail to Connect MongoDB");
  }
};
