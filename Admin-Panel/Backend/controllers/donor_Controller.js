import { authCollection } from "../models/auth_Model.js";
import { donorCollection } from "../models/donor_Model.js";

// ================= GET CURRENT DONOR =================
export const getCurrentDonor = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ status: false, message: "Unauthorized" });

    const authUser = await authCollection.findById(userId).select("-password");
    if (!authUser)
      return res.status(404).json({ status: false, message: "User not found" });

    const donor = await donorCollection.findOne({ auth: userId });
    if (!donor)
      return res
        .status(404)
        .json({ status: false, message: "Donor profile not found" });

    res.json({
      status: true,
      donor: {
        ...donor._doc,
        email: authUser.email,
        name: authUser.name,
        phone: authUser.phone,
      },
    });
  } catch (err) {
    console.error("Get Current Donor Error:", err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch donor",
      error: err.message,
    });
  }
};

// ================= COMPLETE ONBOARDING FORM =================
export const completeDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // Destructure the address object from req.body
    const {
      firstName,
      lastName,
      dob,
      bloodGroup,
      email,
      address,
      hospital,
      hb,
      bp,
    } = req.body;

    // Correctly mapping the nested values
    const updatedData = {
      firstName,
      lastName,
      dob,
      bloodGroup,
      email,
      hospital,
      health: {
        hemoglobin: hb,
        bp: bp,
      },
      address: {
        line: address?.line || "", // Extract the string from the object
        city: address?.city || "",
        state: address?.state || "",
      },
      profileCompleted: true,
    };

    const donor = await donorCollection.findOneAndUpdate(
      { auth: userId },
      { $set: updatedData },
      { new: true, upsert: true },
    );

    res.json({
      status: true,
      message: "Clinical Record Synchronized",
      donor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= UPDATE DASHBOARD PROFILE =================
export const updateDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      name,
      email,
      phone,
      address,
      city,
      dob,
      bloodGroup,
      hospital,
      hemoglobin,
      bp,
    } = req.body;

    // 1. Update Auth info
    await authCollection.findByIdAndUpdate(userId, { name, email, phone });

    // 2. Update Donor info
    const donor = await donorCollection.findOne({ auth: userId });

    if (!donor)
      return res
        .status(404)
        .json({ status: false, message: "Donor profile not found" });

    // Merge health info to avoid overwriting
    const updatedHealth = {
      hemoglobin: hemoglobin ?? donor.health?.hemoglobin,
      bp: bp ?? donor.health?.bp,
    };

    // Merge address object
    const updatedAddress = {
      line: address ?? donor.address?.line ?? "",
      city: city ?? donor.address?.city ?? "",
    };

    donor.dob = dob ?? donor.dob;
    donor.bloodGroup = bloodGroup ?? donor.bloodGroup;
    donor.hospital = hospital ?? donor.hospital;
    donor.address = updatedAddress;
    donor.health = updatedHealth;

    await donor.save();

    res.json({ status: true, message: "Profile updated successfully", donor });
  } catch (err) {
    console.error("Update Donor Profile Error:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= REGISTER DONOR (PHONE SIGNUP) =================
export const registerDonor = async (req, res) => {
  try {
    const { name, email, phone, dob, bloodGroup, hospital, hemoglobin, bp } =
      req.body;

    // Check if donor already exists via auth id or phone/email
    const existingAuth = await authCollection.findOne({ phone });
    if (!existingAuth) {
      return res
        .status(400)
        .json({ status: false, message: "Auth record not found" });
    }

    const existingDonor = await donorCollection.findOne({
      auth: existingAuth._id,
    });
    if (existingDonor)
      return res
        .status(409)
        .json({ status: false, message: "Donor already exists" });

    const donor = await donorCollection.create({
      auth: existingAuth._id,
      name: name ?? existingAuth.name,
      email: email ?? existingAuth.email,
      dob,
      bloodGroup,
      hospital,
      address: { line: "", city: "" },
      health: {
        hemoglobin,
        bp,
      },
      profileCompleted: true,
    });

    res.json({ status: true, message: "Donor registered successfully", donor });
  } catch (err) {
    console.error("Register Donor Error:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= GET DONOR BY ID =================
export const getDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await donorCollection.findById(id);
    if (!donor)
      return res
        .status(404)
        .json({ status: false, message: "Donor not found" });

    res.json({ status: true, donor });
  } catch (err) {
    console.error("Get Donor Error:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= GET ALL DONORS =================
export const getAllDonors = async (req, res) => {
  try {
    const donors = await donorCollection.find().sort({ createdAt: -1 });
    res.json({ status: true, donors });
  } catch (err) {
    console.error("Get All Donors Error:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= DELETE DONOR =================
export const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await donorCollection.findByIdAndDelete(id);
    if (!donor)
      return res
        .status(404)
        .json({ status: false, message: "Donor not found" });

    res.json({ status: true, message: "Donor deleted successfully" });
  } catch (err) {
    console.error("Delete Donor Error:", err);
    res.status(500).json({ status: false, message: err.message });
  }
};

// ================= GET DONATION HISTORY =================
export const getDonationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    // Populate the donor profile linked to this auth user
    const donor = await donorCollection.findOne({ auth: userId });

    if (!donor) {
      return res.status(404).json({
        status: false,
        message: "HemoHub Profile not initialized.",
      });
    }

    // Map the donationFeed to the structure the Frontend expects
    const history = (donor.donationFeed || []).map((item) => {
      return {
        id: item._id, // This becomes the "Secure Trace ID" in your modal
        date: item.date
          ? new Date(item.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Processing",
        hospital: item.hospitalName || "External Facility",
        units: item.units || 1,
        // Using clinical data from the specific donation record if available,
        // otherwise falling back to the donor's current general health stats
        hb: item.hemoglobin || donor.health?.hemoglobin || "N/A",
        bp: item.bp || donor.health?.bp || "N/A",
        pulse: item.pulse || "72",
        // If your schema doesn't have a status field yet,
        // we default to 'Pending' for new entries
        status: item.status || "Pending",
      };
    });

    // Sort by date (Newest first)
    history.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json({
      status: true,
      history,
    });
  } catch (err) {
    console.error("Donation History Error:", err);
    res.status(500).json({
      status: false,
      message: "Network protocol error: Unable to retrieve vault.",
    });
  }
};
