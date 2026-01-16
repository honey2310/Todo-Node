// import { OtpModel } from "../Models/Otp_Model.js";
// import { sendOtpMail } from "../Services/otp_service.js";

// export const sendOTP = async (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 90000);
//   const expiry = new Date(Date.now() + 2 * 60 * 1000);

//   try {
//     await OtpModel.create({ email, otp, expiry });
//     const status = sendOtpMail(email, otp);
//     if (status) {
//       res.json({ message: "OTP Send Successfully!!" });
//     } else {
//       res.json({ message: "Fail to Sent Email!!" });
//     }
//   } catch (err) {
//     res.json({ message: "OTP Fail To Send !!" });
//   }
// };

// export const verifyOTP = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const data = await OtpModel.findOne({ email, otp }).lean();

//     if (!data) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     if (data.expiry < new Date()) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     // ✅ Delete OTP after success
//     await OtpModel.deleteOne({ _id: data._id });

//     return res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//     });
//   } catch (error) {
//     console.error("OTP Verify Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "OTP verification failed",
//     });
//   }
// };

import { OtpModel } from "../Models/Otp_Model.js";
import { Auth } from "../Models/AuthModel.js"; // import Auth model
import { sendOtpMail } from "../Services/otp_service.js";

// SEND OTP
export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Check if email exists in Auth
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6 digits
    const expiry = new Date(Date.now() + 2 * 60 * 1000); // 2 min

    // 3️⃣ Save OTP in DB
    await OtpModel.create({ email, otp, expiry });

    // 4️⃣ Send email
    const status = await sendOtpMail(email, otp); // make sure sendOtpMail returns a promise
    if (status) {
      return res.status(200).json({ success: true, message: "OTP sent successfully!" });
    } else {
      return res.status(500).json({ success: false, message: "Failed to send OTP email" });
    }
  } catch (err) {
    console.error("Send OTP Error:", err);
    return res.status(500).json({ success: false, message: "OTP fail to send" });
  }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1️⃣ Check if user exists
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // 2️⃣ Find OTP for that email
    const data = await OtpModel.findOne({ email, otp }).lean();
    if (!data) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // 3️⃣ Check expiry
    if (data.expiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // 4️⃣ Delete OTP after successful verification
    await OtpModel.deleteOne({ _id: data._id });

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("OTP Verify Error:", error);
    return res.status(500).json({ success: false, message: "OTP verification failed" });
  }
};
