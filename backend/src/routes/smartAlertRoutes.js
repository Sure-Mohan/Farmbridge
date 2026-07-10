const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  fetchSmartAlerts
} = require("../controllers/smartAlertController");

router.get(
  "/",
  authMiddleware,
  fetchSmartAlerts
);

module.exports = router;