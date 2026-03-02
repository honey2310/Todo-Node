import jwt from "jsonwebtoken";
import { hospitalCollection } from "../models/hospitalModel.js";

export const getCurrentHospitalUser = async (req, res) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) return res.json({ status: false, message: "No token" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // ✅ find hospital profile using email
    const hospital = await hospitalCollection.findOne({
      email: decoded.email,
    });

    return res.json({
      status: true,
      hospital: {
        ...decoded,
        ...hospital?._doc,
      },
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalCollection.find().populate({
      path: "requests",
      select: "patientName caseId bloodGroup units priority", // only fetch needed fields
    });

    res.status(200).json({
      status: true,
      count: hospitals.length,
      hospitals,
    });
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getSingleHospital = async (req, res) => {
  try {
    const hospital = await hospitalCollection.findById(req.params.id).populate({
      path: "requests",
      select: "patientName caseId bloodGroup units priority",
    });

    if (!hospital) {
      return res
        .status(404)
        .json({ status: false, message: "Hospital not found" });
    }

    res.status(200).json({ status: true, hospital });
  } catch (error) {
    console.error("Error fetching hospital:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

export const updateHospital = async (req, res) => {
  try {
    const hospital = await hospitalCollection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!hospital) {
      return res.status(404).json({
        status: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Hospital updated",
      hospital,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const deleteHospital = async (req, res) => {
  try {
    const hospital = await hospitalCollection.findByIdAndDelete(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        status: false,
        message: "Hospital not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Hospital deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
