const { getWeather } = require("../services/weatherService");

const fetchWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required"
      });
    }

    const weather = await getWeather(city);

    if (!weather) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch weather"
      });
    }

    res.status(200).json({
      success: true,
      data: weather
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  fetchWeather
};