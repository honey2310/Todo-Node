import express from "express";
import {
  getAllHospitals,
  getSingleHospital,
  updateHospital,
  deleteHospital,
  getCurrentHospitalUser
} from "../controllers/hospitalController.js";

const router = express.Router();

// ================= ROUTES =================

// Get logged hospital profile
router.get("/get-currentuser", getCurrentHospitalUser);

// Get all hospitals
router.get("/", getAllHospitals);

// Get single hospital
router.get("/:id", getSingleHospital);

// Update hospital
router.put("/:id", updateHospital);

// Delete hospital
router.delete("/:id", deleteHospital);

export default router;