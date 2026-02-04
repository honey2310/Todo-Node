import express from "express";
import { getAllUser, getcurrentuser, getuser, updateuser } from "../controllers/admin_controllers.js";

const user_routes = express.Router();

user_routes.put("/update-user", updateuser);
user_routes.get("/get-user", getuser);
user_routes.get("/get-alluser", getAllUser);
user_routes.get("/get-currentUser", getcurrentuser);

export default user_routes;
