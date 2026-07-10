const express = require("express");

const router = express.Router();

const { getMarketPrice } = require("../controllers/priceController");

router.get("/", getMarketPrice);

module.exports = router;