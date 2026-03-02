import express from "express";

import {
  registerCase,
  getAllCases,
  getSingleCase,
  updateCase,
  deleteCase,
  filterCases,
} from "../controllers/patientCaseController.js";
import { getHospitalRequests } from "../controllers/dashboard_Controller.js";

const router = express.Router();

// ================= PROFILE =================
// router.get("/profile", getCurrentUser);

// ================= CASE CRUD =================

// Register new patient case
router.post("/register", registerCase);
router.get("/:id/requests", getHospitalRequests);

// Get all cases
router.get("/", getAllCases);

// Filter cases
router.get("/filter", filterCases);

// Get single case
router.get("/:id", getSingleCase);

// Update case
router.put("/:id", updateCase);

// Delete case
router.delete("/:id", deleteCase);

export default router;
