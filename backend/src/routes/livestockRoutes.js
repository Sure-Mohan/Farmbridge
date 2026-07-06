const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addLivestock,
  getLivestock,
  getLivestockById,
  updateLivestock,
  deleteLivestock,
} = require("../controllers/livestockController");

router.post("/", auth, addLivestock);

router.get("/", auth, getLivestock);

router.get("/:id", auth, getLivestockById);

router.put("/:id", auth, updateLivestock);

router.delete("/:id", auth, deleteLivestock);

module.exports = router;