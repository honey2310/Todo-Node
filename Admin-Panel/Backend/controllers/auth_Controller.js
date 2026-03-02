import { authCollection } from "../models/auth_Model.js";
import bcrypt from "bcrypt";
import { sendOTP } from "../services/otp_services.js";
import { OtpCollection } from "../models/otp_Model.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { userCollection } from "../models/user_Model.js";
import { donorCollection } from "../models/donor_Model.js";
import { hospitalCollection } from "../models/hospitalModel.js";

export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    if (role === "admin") {
      return res.json({
        status: false,
        message: "Admin account cannot be created here",
      });
    }

    const existingUser = await authCollection.findOne({ email });
    if (existingUser) {
      return res.json({
        status: false,
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await authCollection.create({
      name,
      email,
      password: hashedPassword,
      role: role || "donor",
      isApproved: role === "donor",
    });

    // 🔥 CREATE EMPTY DONOR PROFILE
    if (newUser.role === "donor") {
      await donorCollection.create({
        auth: newUser._id,
      });
    }

    res.json({
      status: true,
      message:
        role === "hospital"
          ? "Hospital registered. Waiting for admin approval."
          : "Signup successful!",
    });
  } catch (err) {
    console.log("Signup Error:", err); // 🔥 log the real error
    res.json({ status: false, message: err.message });
  }
};

export const signin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!email || !password || !role) {
      return res.json({ status: false, message: "Missing fields" });
    }

    // ❌ Donor cannot signin using email anymore
    if (role === "donor") {
      return res.json({
        status: false,
        message: "Donor login uses phone OTP",
      });
    }

    const user = await authCollection.findOne({ email, role });

    if (!user) return res.json({ status: false, message: "User not found" });

    // hospital approval check
    if (user.role === "hospital" && !user.isApproved) {
      return res.json({
        status: false,
        message: "Waiting for admin approval",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ status: false, message: "Invalid password" });

    // send OTP (email OTP only for admin/hospital)
    const otpSent = await sendOTP(email, role);

    if (!otpSent)
      return res.json({ status: false, message: "Failed to send OTP" });

    res.json({
      status: true,
      message: "OTP sent successfully",
      user: {
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.json({ status: false, message: "Signin failed" });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp, role } = req.body;

  try {
    const record = await OtpCollection.findOne({
      email,
      otp: otp.toString(),
      role,
    });

    if (!record) return res.json({ status: false, message: "Invalid OTP" });

    if (record.expiry < Date.now())
      return res.json({ status: false, message: "OTP expired" });

    await OtpCollection.deleteMany({ email, role });

    const user = await authCollection.findOne({ email });

    if (!user) return res.json({ status: false, message: "User not found" });

    // ✅ Only hospital profile creation remains
    if (user.role === "hospital") {
      const existingHospital = await hospitalCollection.findOne({
        email: user.email,
      });

      if (!existingHospital) {
        await hospitalCollection.create({
          email: user.email,
          name: user.name || "",
        });
      }
    }

    // JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({
      status: true,
      message: "OTP verified successfully",
      user: { role: user.role, email: user.email },
    });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    res.json({
      status: false,
      message: "OTP verification failed",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.json({
      status: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "Logout failed",
    });
  }
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
      user: decoded,
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
    await sendOTP(email, "password_reset");
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

export const getPendingHospitals = async (req, res) => {
  try {
    const hospitals = await authCollection
      .find({
        role: "hospital",
        isApproved: false,
      })
      .select("name email createdAt");

    res.json({ status: true, hospitals });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

export const approveHospital = async (req, res) => {
  const { id } = req.body;

  try {
    await authCollection.updateOne(
      { _id: id, role: "hospital" },
      { $set: { isApproved: true } },
    );

    res.json({
      status: true,
      message: "Hospital Approved Successfully",
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // total donors
    const totalDonors = await authCollection.countDocuments({
      role: "donor",
    });

    // approved hospitals only
    const totalHospitals = await authCollection.countDocuments({
      role: "hospital",
      isApproved: true,
    });

    // temporary values (until modules built)
    const bloodUnits = 0;
    const emergencyAlerts = 0;

    res.json({
      status: true,
      stats: {
        totalDonors,
        totalHospitals,
        bloodUnits,
        emergencyAlerts,
      },
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
};

export const sendPhoneOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.json({ status: false, message: "Phone required" });

  const otpSent = await sendOTP(phone, "donor_phone"); // reuse service

  if (!otpSent) return res.json({ status: false, message: "OTP failed" });

  res.json({
    status: true,
    message: "OTP sent",
  });
};

export const verifyPhoneOtp = async (req, res) => {
  const { phone, otp } = req.body;

  const record = await OtpCollection.findOne({
    email: phone,
    otp: otp.toString(),
    role: "donor_phone",
  });

  if (!record) return res.json({ status: false, message: "Invalid OTP" });

  if (record.expiry < Date.now())
    return res.json({ status: false, message: "OTP expired" });

  await OtpCollection.deleteMany({
    email: phone,
    role: "donor_phone",
  });

  // find or create donor auth
  let user = await authCollection.findOne({
    phone,
    role: "donor",
  });

  if (!user) {
    user = await authCollection.create({
      phone,
      role: "donor",
      isApproved: true,
    });

    // create donor profile automatically
    await donorCollection.create({
      auth: user._id,
      phone,
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    status: true,
    message: "Donor login successful",
    user: { role: "donor" },
  });
};
