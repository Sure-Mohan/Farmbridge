const getCropAdvice = (crop, weather) => {
  if (!weather || !weather.main) {
    return {
      risk: "unknown",
      message: "Weather data not available",
    };
  }

  const temp = weather.main.temp;
  const humidity = weather.main.humidity;

  let advice = {
    crop,
    temperature: temp,
    humidity: humidity,
    risk: "low",
    message: "Conditions are normal for farming",
    suggestions: [],
  };

  // 🌾 RICE LOGIC
  if (crop.toLowerCase() === "rice") {
    if (temp > 35) {
      advice.risk = "high";
      advice.message = "High temperature stress for rice crop";
      advice.suggestions.push("Increase irrigation");
      advice.suggestions.push("Water field in evening");
    }

    if (humidity < 50) {
      advice.risk = "medium";
      advice.suggestions.push("Maintain water level in field");
    }
  }

  // 🌽 MAIZE LOGIC
  if (crop.toLowerCase() === "maize") {
    if (temp < 15 || temp > 32) {
      advice.risk = "high";
      advice.message = "Maize crop not suitable in current temperature";
      advice.suggestions.push("Monitor crop growth closely");
    }
  }

  // 🌿 COTTON LOGIC
  if (crop.toLowerCase() === "cotton") {
    if (humidity > 80) {
      advice.risk = "medium";
      advice.message = "High humidity may cause pest attacks";
      advice.suggestions.push("Use pest control measures");
    }
  }

  return advice;
};

module.exports = {
  getCropAdvice,
};