import { authCollection } from "../models/auth_model.js";
import bcrypt from "bcrypt";
import { sendOTP } from "../services/otp_services.js";
import { OtpCollection } from "../models/otp_model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await authCollection.findOne({ email });
    if (existingUser) {
      return res.json({ status: false, message: "User Register Already!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await authCollection.create({ name, email, password: hashedPassword });
    res.json({ status: true, message: "User Register Successfully!" });
  } catch (err) {
    console.log("Signup Fail", err);
    res.json({ status: false, message: "User Registeration Failed!" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authCollection.findOne({ email });
    if (!user) {
      return res.json({
        status: false,
        message: "Invalid User ! Please enter valid email or register first !!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        status: false,
        message: "Invalid Password ! Try Again",
      });
    }

    const status = await sendOTP(email);
    if (status) {
      res.json({ status: true, message: "OTP sent successfully!!" });
    } else {
      res.json({ status: false, message: "OTP fail to sent!" });
    }
  } catch (err) {
    console.log("Signin Fail", err);
    res.json({ status: false, message: "Signin Fail" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = await OtpCollection.findOne({ email, otp });
    if (!record) {
      return res.json({ status: false, message: "Invalid OTP" });
    }

    if (record.expiry < Date.now()) {
      return res.json({ status: false, message: "OTP Expired!" });
    }

    await OtpCollection.deleteMany({ email });

    const user = await authCollection.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.SECERT_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("auth_token", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({
      status: true,
      message: "OTP Verified & Signin Successfully!",
    });
  } catch (err) {
    res.json({
      status: false,
      message: "Otp Verification Failed!",
      err: err.message,
    });
  }
};

export const signout = async (req, res) => {
  res.clearCookie("auth_token");
  res.json({ status: true, message: "Signout Successfully!" });
};

export const checkUserStatus = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.json({ status: false, message: "Signin First" });
    }
    const decoded = jwt.verify(token, process.env.SECERT_KEY, {
      expiresIn: "1h",
    });
    return res.json({
      status: true,
      message: "Already Logged In",
      user: decoded.payload,
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "Logged out, login First!",
      err,
    });
  }
};

export const changeCurrentPassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    if (!email || !oldPassword || !newPassword) {
      return res.json({
        status: false,
        message: "Email, old password and new password are required",
      });
    }

    const user = await authCollection.findOne({ email });
    if (!user) {
      return res.json({ status: false, message: "User not found!" });
    }

    const isMatch = await bcrypt.compare(String(oldPassword), user.password);

    if (!isMatch) {
      return res.json({
        status: false,
        message: "Invalid Current Password!",
      });
    }

    const newHashedPassword = await bcrypt.hash(String(newPassword), 12);

    await authCollection.updateOne(
      { email },
      { $set: { password: newHashedPassword } },
    );

    res.json({
      status: true,
      message: "New Password Set Successfully!",
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const status = await sendOTP(email);
    res.json({ status: true, message: "otp sent to your mail" });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
export const setNewPassword = async (req, res) => {
  const { email, otp, password } = req.body;
  try {
    const record = await OtpCollection.findOne({ email, otp });

    if (!record) {
      return res.json({ status: false, message: "Invalid otp" });
    }

    if (record.expiry < new Date(Date.now())) {
      return res.json({ status: false, message: "Otp Expired" });
    }

    const user = await authCollection.findOne({ email });
    const newHashedPassword = await bcrypt.hash(password, 12);
    await authCollection.updateOne(
      { email },
      {
        $set: {
          password: newHashedPassword,
        },
      },
    );
    res.json({ status: true, message: "New Password Update Successfully!" });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
