import { PatientCollection } from "../models/patientCaseModel.js";
import { hospitalCollection } from "../models/hospitalModel.js";
import { autoUpdateStatus } from "../services/autoStatusUpdater.js";

export const registerCase = async (req, res) => {
  try {
    const {
      patientName,
      caseId,
      bloodGroup,
      units,
      priority,
      reason,
      hospitalId,
    } = req.body;

    if (!hospitalId) {
      return res
        .status(400)
        .json({ status: false, message: "hospitalId is required" });
    }

    // Make sure hospital exists
    const hospital = await hospitalCollection.findById(hospitalId);
    if (!hospital) {
      return res
        .status(404)
        .json({ status: false, message: "Hospital not found" });
    }

    const newCase = await PatientCollection.create({
      patientName,
      caseId,
      bloodGroup,
      units: Number(units),
      priority,
      reason,
      hospital: hospitalId,
    });

    // AUTO FLOW FOR URGENT CASES
    if (["High", "Emergency", "Medium"].includes(priority)) {
      autoUpdateStatus(newCase._id);
    }

    await hospitalCollection.findByIdAndUpdate(hospitalId, {
      $push: { requests: newCase._id },
    });

    res.json({
      status: true,
      message: "Case registered",
      case: newCase,
    });
  } catch (err) {
    console.log("CASE REGISTER ERROR:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

export const getAllCases = async (req, res) => {
  try {
    const cases = await PatientCollection.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      total: cases.length,
      cases,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch cases",
      error: error.message,
    });
  }
};

export const getSingleCase = async (req, res) => {
  try {
    const singleCase = await PatientCollection.findById(req.params.id);

    if (!singleCase) {
      return res.status(404).json({
        status: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      status: true,
      case: singleCase,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching case",
      error: error.message,
    });
  }
};

export const updateCase = async (req, res) => {
  try {
    const updatedCase = await PatientCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedCase) {
      return res.status(404).json({
        status: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Case updated successfully",
      case: updatedCase,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

export const deleteCase = async (req, res) => {
  try {
    const deletedCase = await PatientCollection.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedCase) {
      return res.status(404).json({
        status: false,
        message: "Case not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Case deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};

export const filterCases = async (req, res) => {
  try {
    const {
      bloodGroup,
      priority,
      logisticsStatus,
      search,
      startDate,
      endDate,
    } = req.query;

    let filter = {};

    // Blood Group filter
    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    // Priority filter
    if (priority) {
      filter.priority = priority;
    }

    // Logistics Status filter
    if (logisticsStatus) {
      filter.logisticsStatus = logisticsStatus;
    }

    // Search by name or caseId
    if (search) {
      filter.$or = [
        { patientName: { $regex: search, $options: "i" } },
        { caseId: { $regex: search, $options: "i" } },
      ];
    }

    // Date range filter
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    const cases = await PatientCollection.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: true,
      total: cases.length,
      cases,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Filtering failed",
      error: error.message,
    });
  }
};
