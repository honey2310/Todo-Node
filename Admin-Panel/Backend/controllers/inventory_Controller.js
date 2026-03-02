import { inventoryCollection } from "../models/inventory_Model.js";

export const getInventory = async (req, res) => {
  try {
    const stock = await inventoryCollection.find().sort({ bloodGroup: 1 });

    res.json({
      status: true,
      stock,
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

export const addUnits = async (req, res) => {
  const { bloodGroup, units } = req.body;

  try {
    const item = await inventoryCollection.findOne({ bloodGroup });

    if (!item) return res.json({ status: false, message: "Group not found" });

    item.units += Number(units);

    // Auto status update
    if (item.units < 15) item.status = "Critical";
    else if (item.units < 30) item.status = "Moderate";
    else item.status = "Healthy";

    await item.save();

    res.json({
      status: true,
      message: "Units Added Successfully",
      item,
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};

export const removeUnits = async (req, res) => {
  const { bloodGroup, units } = req.body;

  try {
    const item = await inventoryCollection.findOne({ bloodGroup });

    if (!item) return res.json({ status: false, message: "Group not found" });

    if (item.units < units)
      return res.json({ status: false, message: "Not enough stock" });

    item.units -= Number(units);

    // Update status
    if (item.units < 10) item.status = "Critical";
    else if (item.units < 25) item.status = "Moderate";
    else item.status = "Healthy";

    await item.save();

    res.json({
      status: true,
      message: "Units Dispatched",
      item,
    });
  } catch (err) {
    res.json({ status: false, message: err.message });
  }
};
