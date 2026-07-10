const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  dashboardAnalytics,
} = require("../controllers/analyticsController");

router.get(
  "/dashboard",
  authMiddleware,
  dashboardAnalytics
);

module.exports = router;