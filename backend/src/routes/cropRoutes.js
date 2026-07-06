const express = require("express");
const router = express.Router();

const { createCrop, getCrops } = require("../controllers/cropController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes
router.post("/", authMiddleware, createCrop);
router.get("/", authMiddleware, getCrops);

module.exports = router;