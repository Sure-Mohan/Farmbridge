const express = require("express");
const router = express.Router();

const {
  addEquipment,
  getEquipment,
  getSingleEquipment,
  editEquipment,
  removeEquipment,
} = require("../controllers/equipmentController");

const authMiddleware = require("../middleware/authMiddleware");

// All Equipment routes are protected
router.use(authMiddleware);

// Add Equipment
router.post("/", addEquipment);

// Get All Equipment
router.get("/", getEquipment);

// Get Equipment by ID
router.get("/:id", getSingleEquipment);

// Update Equipment
router.put("/:id", editEquipment);

// Delete Equipment
router.delete("/:id", removeEquipment);

module.exports = router;