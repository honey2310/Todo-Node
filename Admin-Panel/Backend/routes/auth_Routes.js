import express from "express";
import {
  changeCurrentPassword,
  checkUserStatus,
  forgetPassword,
  setNewPassword,
  signin,
  signup,
  verifyOtp,
  getPendingHospitals,
  approveHospital,
  getDashboardStats,
  logout,
  sendPhoneOtp,
  verifyPhoneOtp
} from "../controllers/auth_Controller.js";

const auth_routes = express.Router();

auth_routes.post("/signin", signin);
auth_routes.post("/signup", signup);
auth_routes.post("/verifyOtp", verifyOtp);
auth_routes.post("/send-phone-otp", sendPhoneOtp);
auth_routes.post("/verify-phone-otp", verifyPhoneOtp);

auth_routes.post("/logout", logout);
auth_routes.post("/checkUserStatus", checkUserStatus);

auth_routes.post("/changeCurrentPassword", changeCurrentPassword); // email,old and new
auth_routes.post("/forgetPassword", forgetPassword); // email
auth_routes.post("/setNewPassword", setNewPassword); // email,otp,new

auth_routes.get("/pending-hospitals", getPendingHospitals);
auth_routes.post("/approve-hospital", approveHospital);

auth_routes.get("/dashboard-stats", getDashboardStats);

export default auth_routes;
