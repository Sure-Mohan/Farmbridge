const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createCrop,
    getCrops,
    getCrop,
    editCrop,
    removeCrop
} = require("../controllers/cropController");

// =========================
// CREATE CROP
// =========================

router.post(
    "/",
    authMiddleware,
    createCrop
);

// =========================
// GET ALL CROPS
// =========================

router.get(
    "/",
    authMiddleware,
    getCrops
);

// =========================
// GET SINGLE CROP
// =========================

router.get(
    "/:id",
    authMiddleware,
    getCrop
);

// =========================
// UPDATE CROP
// =========================

router.put(
    "/:id",
    authMiddleware,
    editCrop
);

// =========================
// DELETE CROP
// =========================

router.delete(
    "/:id",
    authMiddleware,
    removeCrop
);

module.exports = router;