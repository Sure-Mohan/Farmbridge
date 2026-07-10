const express = require("express");
const router = express.Router();

const {
    currentWeather,
    weatherForecast
}=require("../controllers/weatherController");


router.get(
    "/",
    currentWeather
);


router.get(
    "/forecast",
    weatherForecast
);


module.exports = router;