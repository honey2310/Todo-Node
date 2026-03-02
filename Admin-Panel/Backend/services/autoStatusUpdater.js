import { PatientCollection } from "../models/patientCaseModel.js";

export const autoUpdateStatus = async (caseId) => {
  try {
    // after 3 sec → Processing
    setTimeout(async () => {
      await PatientCollection.findByIdAndUpdate(caseId, {
        logisticsStatus: "Processing",
      });

      console.log("Status → Processing");
    }, 3000);

    // after 6 sec → Completed
    setTimeout(async () => {
      await PatientCollection.findByIdAndUpdate(caseId, {
        logisticsStatus: "Completed",
      });

      console.log("Status → Completed");
    }, 6000);
  } catch (err) {
    console.log("AUTO STATUS ERROR:", err.message);
  }
};