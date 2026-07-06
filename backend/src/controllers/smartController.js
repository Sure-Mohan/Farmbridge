const { getWeather } = require("../services/weatherService");
const { getCropAdvice } = require("../services/cropAdviceService");

const getSmartFarmingAdvice = async (req, res) => {
  try {
    const { city, crop } = req.query;

    if (!city || !crop) {
      return res.status(400).json({
        success: false,
        message: "City and crop are required",
      });
    }

    // 🌦️ Get weather
    const weather = await getWeather(city);

    if (!weather) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch weather",
      });
    }

    // 🌾 Get smart advice
    const advice = getCropAdvice(crop, weather);

    return res.status(200).json({
      success: true,
      weather: {
        city,
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        condition: weather.weather?.[0]?.main,
      },
      advice,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getSmartFarmingAdvice,
};