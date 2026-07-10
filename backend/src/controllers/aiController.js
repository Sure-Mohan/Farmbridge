const { getCropRecommendation } = require("../services/mistralService");


const cropRecommendation = async (req, res) => {

    try {

        const weather = req.body;

        console.log("Weather Data Received:", weather);

        const recommendation = await getCropRecommendation(weather);

        res.status(200).json({

            success: true,

            recommendation

        });

    } 
    catch (error) {

        console.error("Mistral Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to generate crop recommendation.",

            error: error.message

        });

    }
};


module.exports = {
    cropRecommendation
};