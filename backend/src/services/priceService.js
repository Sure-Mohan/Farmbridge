const axios = require("axios");

// --------------------------------------
// Crop Name Mapping
// --------------------------------------

const cropAliases = {
    rice: "paddy",
    paddy: "paddy",

    wheat: "wheat",

    maize: "maize",
    corn: "maize",

    onion: "onion",

    tomato: "tomato",

    potato: "potato",

    banana: "banana",

    mango: "mango",

    groundnut: "groundnut",
    peanut: "groundnut",

    chilli: "green chilli",
    chili: "green chilli",
    "green chilli": "green chilli",

    brinjal: "brinjal",
    eggplant: "brinjal",

    cabbage: "cabbage",

    cauliflower: "cauliflower",

    pumpkin: "pumpkin",

    cucumber: "cucumbar",

    ridgegourd: "ridgeguard",
    "ridge gourd": "ridgeguard",

    bottlegourd: "bottle gourd",
    "bottle gourd": "bottle gourd",

    bhindi: "bhindi",
    okra: "bhindi",
    "lady finger": "bhindi",

    carrot: "carrot",

    beetroot: "beetroot",

    amaranthus: "amaranthus"
};

// --------------------------------------
// Get Market Price
// --------------------------------------

const getMarketPrice = async (crop) => {

    try {

        const apiKey = process.env.DATA_GOV_API_KEY;
        const resourceId = process.env.DATA_GOV_RESOURCE_ID;

        if (!apiKey || !resourceId) {
            throw new Error("DATA_GOV_API_KEY or DATA_GOV_RESOURCE_ID missing");
        }

        const url =
            `https://api.data.gov.in/resource/${resourceId}?api-key=${apiKey}&format=json&limit=1000`;

        const response = await axios.get(url);

        const records = response.data.records || [];

        console.log("Total Records:", records.length);

        if (records.length === 0) {
            return null;
        }

        //-------------------------------------
        // Normalize user input
        //-------------------------------------

        const searchCrop =
            cropAliases[crop.trim().toLowerCase()] ||
            crop.trim().toLowerCase();

        //-------------------------------------
        // Find crop
        //-------------------------------------

        const cropData = records.find(item => {

            if (!item.commodity) return false;

            const commodity = item.commodity.toLowerCase();

            return commodity.includes(searchCrop);

        });

        if (!cropData) {

            console.log("Crop not found:", crop);

            console.log(
                "Available Crops:",
                [...new Set(records.map(r => r.commodity))]
            );

            return null;

        }

        //-------------------------------------
        // Return formatted data
        //-------------------------------------

        return {

            crop: cropData.commodity,

            market: cropData.market,

            district: cropData.district || "",

            state: cropData.state,

            minPrice: Number(cropData.min_price),

            maxPrice: Number(cropData.max_price),

            modalPrice: Number(cropData.modal_price)

        };

    }

    catch (error) {

        console.error(
            "Price API Error:",
            error.response?.data || error.message
        );

        return null;

    }

};

module.exports = {
    getMarketPrice
};