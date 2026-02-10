import express from "express";
import {
  changeCurrentPassword,
  checkUserStatus,
  forgetPassword,
  setNewPassword,
  signin,
  signout,
  signup,
  verifyOtp,
} from "../controllers/auth_Controller.js";

const auth_routes = express.Router();

auth_routes.post("/signin", signin);
auth_routes.post("/signup", signup);
auth_routes.post("/verifyOtp", verifyOtp);

auth_routes.post("/signout", signout);
auth_routes.post("/checkUserStatus", checkUserStatus);

auth_routes.post("/changeCurrentPassword", changeCurrentPassword); // email,old and new
auth_routes.post("/forgetPassword", forgetPassword); // email
auth_routes.post("/setNewPassword", setNewPassword); // email,otp,new

export default auth_routes;
