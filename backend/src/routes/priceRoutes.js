const express = require("express");
const router = express.Router();

const { fetchMarketPrice } = require("../controllers/priceController");

router.get("/", fetchMarketPrice);

module.exports = router;