const axios = require("axios");

const getMarketPrice = async (crop) => {
  try {
    const apiKey = process.env.DATA_GOV_API_KEY;
    const resourceId = process.env.DATA_GOV_RESOURCE_ID;

    if (!apiKey || !resourceId) {
      throw new Error("Missing API key or Resource ID in .env");
    }

    const url = `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=1000`;

    const response = await axios.get(url);

    const records = response.data.records;

    if (!records || records.length === 0) {
      return null;
    }

    const cropData = records.find((item) =>
      item.commodity?.toLowerCase().includes(crop.toLowerCase())
    );

    if (!cropData) return null;

    return {
      crop: cropData.commodity,
      market: cropData.market,
      state: cropData.state,
      minPrice: cropData.min_price,
      maxPrice: cropData.max_price,
      modalPrice: cropData.modal_price,
    };

  } catch (error) {
    console.error("Price API Error:", error.response?.data || error.message);
    return null;
  }
};

module.exports = { getMarketPrice };