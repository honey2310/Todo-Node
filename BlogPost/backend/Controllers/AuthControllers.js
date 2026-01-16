import { Auth } from "../Models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await Auth.create({ email: email, password: hashedPassword });
    res.json({ message: "siginup successfully" });
  } catch (err) {
    res.json({ message: "siginup fail" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid user or not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("Auth_token", token, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "User Signin Successfully" });
  } catch (err) {
    console.error("Signin Error:", err);
    res.status(500).json({
      message: "User Signin fail",
      error: err.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("Auth_token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

export const home = async (req, res) => {
  const users = await Auth.find();
  res.json(users);
};
