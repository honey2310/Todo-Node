import { userCollection } from "../models/user_Model.js";
import jwt from "jsonwebtoken";

export const getAllUser = async (req, res) => {
  try {
    const users = await userCollection.find();
    res.json({
      status: true,
      message: "All users fetched successfully",
      users,
    });
  } catch (err) {
    res.json({ status: false, message: "Fail to fetch users" });
  }
};

export const getuser = async (req, res) => {
  try {
    const users = await userCollection.find();
    return res.json({
      status: true,
      message: "user fetched successfully",
      users,
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const updateuser = async (req, res) => {
  const { email } = req.body;
  try {
    await userCollection.findOneAndUpdate({ email }, { $set: req.body });
    return res.json({ status: true, message: "user updated successfully" });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};

export const getcurrentuser = async (req, res) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) return res.json({ status: false, message: "No token" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ fetch profile from DB
    const user = await userCollection.findOne({
      email: decoded.email,
    });

    return res.json({
      status: true,
      user: {
        ...decoded,
        ...user?._doc, // merge auth + profile
      },
    });
  } catch (err) {
    return res.json({ status: false, message: err.message });
  }
};
