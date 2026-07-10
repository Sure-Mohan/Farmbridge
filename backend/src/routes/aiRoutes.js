const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { cropRecommendation } = require("../controllers/aiController");

router.post(
    "/crop-recommendation",
    authMiddleware,
    cropRecommendation
);

module.exports = router;