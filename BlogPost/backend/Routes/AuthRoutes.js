import express from "express";
import {
  signin,
  signup,
  home,
  logout
} from "../Controllers/AuthControllers.js";
import { sendOTP, verifyOTP } from "../Controllers/Otp_Controllers.js";
import { isAuthentication } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout); // ✅ Added logout route

// OTP routes
router.post("/send", sendOTP);
router.post("/verify", verifyOTP);

// Protected route
router.get("/home", isAuthentication, home);

export default router;
