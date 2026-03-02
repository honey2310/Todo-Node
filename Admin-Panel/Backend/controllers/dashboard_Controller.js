import { inventoryCollection } from "../models/inventory_Model.js";
import { authCollection } from "../models/auth_Model.js";
import { PatientCollection } from "../models/patientCaseModel.js";
import { hospitalCollection } from "../models/hospitalModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const inventory = await inventoryCollection.find();

    const bloodUnits = inventory.reduce((sum, item) => sum + item.units, 0);

    const totalDonors = await authCollection.countDocuments({
      role: "donor",
    });

    const totalHospitals = await authCollection.countDocuments({
      role: "hospital",
      isApproved: true,
    });

    const emergencyAlerts = await inventoryCollection.countDocuments({
      status: "Critical",
    });

    // ⭐ convert inventory -> object
    const inventoryUnits = {};
    inventory.forEach((item) => {
      inventoryUnits[item.bloodGroup] = item.units;
    });

    res.json({
      status: true,
      stats: {
        totalDonors,
        totalHospitals,
        bloodUnits,
        emergencyAlerts,
      },
      inventory: inventoryUnits, // ⭐ NEW
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

// Get all requests for a specific hospital
export const getHospitalRequests = async (req, res) => {
  try {
    const { id } = req.params; // hospital id

    const hospital = await hospitalCollection.findById(id);
    if (!hospital) {
      return res
        .status(404)
        .json({ status: false, message: "Hospital not found" });
    }

    const requests = await PatientCollection.find({ hospital: id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: true,
      requests,
    });
  } catch (err) {
    console.error("Error fetching hospital requests:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};
