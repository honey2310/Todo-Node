import express from "express";
import {
  signin,
  signup,
  home,
  logout
} from "../Controllers/AuthControllers.js";
import { sendOTP, verifyOTP } from "../Controllers/Otp_Controllers.js";
import { isAuthentication } from "../Middleware/AuthMiddleware.js"; // updated

const router = express.Router();

// ---------- AUTH ROUTES ----------
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout); // logout

// ---------- OTP ROUTES ----------
router.post("/send", sendOTP);
router.post("/verify", verifyOTP);

// ---------- PROTECTED ROUTE ----------
router.get("/home", isAuthentication, home);

export default router;
