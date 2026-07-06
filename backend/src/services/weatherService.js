const axios = require("axios");

const getWeather = async (city) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;

    console.log("API KEY:", apiKey); // 🔥 DEBUG LINE

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log("URL:", url); // 🔥 DEBUG LINE

    const response = await axios.get(url);

    return response.data;

  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    return null;
  }
};

module.exports = { getWeather };