import { inventoryCollection } from "../models/inventory_Model.js";

export const seedInventory = async () => {
  try {
    const count = await inventoryCollection.countDocuments();

    // already exists → do nothing
    if (count > 0) {
      console.log("✅ Inventory already initialized");
      return;
    }

    const defaultBloodGroups = [
      { bloodGroup: "A+", units: 20 },
      { bloodGroup: "A-", units: 15 },
      { bloodGroup: "B+", units: 25 },
      { bloodGroup: "B-", units: 10 },
      { bloodGroup: "O+", units: 30 },
      { bloodGroup: "O-", units: 12 },
      { bloodGroup: "AB+", units: 18 },
      { bloodGroup: "AB-", units: 8 },
    ];

    await inventoryCollection.insertMany(defaultBloodGroups);

    console.log("🩸 Default Inventory Created");
  } catch (error) {
    console.log("Seed Error:", error.message);
  }
};