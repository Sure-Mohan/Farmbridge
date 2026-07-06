const express = require("express");
const router = express.Router();

const { getSmartFarmingAdvice } = require("../controllers/smartController");

// Smart farming route
router.get("/advice", getSmartFarmingAdvice);

module.exports = router;