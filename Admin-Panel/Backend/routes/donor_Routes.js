import express from "express";
import {
  registerDonor,
  deleteDonor,
  getDonor,
  getAllDonors,
  getCurrentDonor,
  updateDonorProfile,
  getDonationHistory,
  completeDonorProfile,
} from "../controllers/donor_Controller.js";
import { authMiddleware } from "../middlewares/auth_middleware.js"; // your JWT middleware

const router = express.Router();

// Get current logged-in user
router.get("/me", authMiddleware, getCurrentDonor);

// Donor CRUD
router.post("/", authMiddleware, registerDonor); // Create donor
router.get("/history", authMiddleware, getDonationHistory);
router.put("/:id", authMiddleware, updateDonorProfile); // Update donor
router.delete("/:id", authMiddleware, deleteDonor); // Delete donor
router.get("/:id", authMiddleware, getDonor); // Get single donor
router.get("/", authMiddleware, getAllDonors); // Get all donors
router.post("/complete-profile", authMiddleware, completeDonorProfile);

export default router;
