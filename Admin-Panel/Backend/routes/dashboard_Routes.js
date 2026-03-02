import express from "express";
import { getDashboardStats } from "../controllers/dashboard_Controller.js";
import { getHospitalRequests } from "../controllers/dashboard_Controller.js";

const router = express.Router();

router.get("/dashboard-stats", getDashboardStats);
router.get("/:id/requests", getHospitalRequests);

export default router;
