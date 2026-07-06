const { getMarketPrice } = require("../services/priceService");

const fetchMarketPrice = async (req, res) => {
  try {
    const { crop } = req.query;

    if (!crop) {
      return res.status(400).json({
        success: false,
        message: "Crop is required",
      });
    }

    const data = await getMarketPrice(crop);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No market data found for this crop",
      });
    }

    // Market Recommendation
    let recommendation = "";

    if (data.modalPrice >= 2500) {
      recommendation = "✅ Good time to sell. Market prices are high.";
    } else if (data.modalPrice >= 1800) {
      recommendation = "📊 Market prices are average. Sell based on your needs.";
    } else {
      recommendation = "⏳ Market prices are low. Consider waiting if you can store the crop.";
    }

    res.status(200).json({
      success: true,
      data,
      recommendation,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  fetchMarketPrice,
};