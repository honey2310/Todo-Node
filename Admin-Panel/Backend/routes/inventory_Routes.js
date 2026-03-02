import express from "express";
import {
  getInventory,
  addUnits,
  removeUnits,
} from "../controllers/inventory_Controller.js";

const router = express.Router();

router.get("/get-inventory", getInventory);
router.post("/add-units", addUnits);
router.post("/remove-units", removeUnits);

export default router;