const marketService = require("../services/priceService");

const getMarketPrice = async (req, res) => {

    console.log("===== PRICE API HIT =====");
    console.log("Query:", req.query);

    try {

        const { crop } = req.query;

        if (!crop) {

            return res.status(400).json({
                success: false,
                message: "Crop name is required"
            });

        }

        console.log("Searching crop:", crop);

        const market = await marketService.getMarketPrice(crop);

        console.log("Market Service Result:", market);

        if (!market) {

            return res.status(404).json({
                success: false,
                message: "No market data found"
            });

        }

        const min = Number(market.minPrice);
        const max = Number(market.maxPrice);
        const modal = Number(market.modalPrice);

        // ==========================================
        // MARKET TREND
        // ==========================================

        let trend = "Stable";

        if (modal >= max - ((max - min) * 0.20)) {

            trend = "Rising";

        }
        else if (modal <= min + ((max - min) * 0.20)) {

            trend = "Falling";

        }

        // ==========================================
        // EXISTING RECOMMENDATION
        // ==========================================

        let recommendationType;
        let recommendation;
        let stars;
        let risk;

        if (trend === "Rising") {

            recommendationType = "SELL NOW";

            recommendation =
                "Excellent market price. Selling now is recommended.";

            stars = 5;

            risk = "Low";

        }
        else if (trend === "Stable") {

            recommendationType = "SELL";

            recommendation =
                "Market prices are stable.";

            stars = 4;

            risk = "Medium";

        }
        else {

            recommendationType = "WAIT";

            recommendation =
                "Current price is low. Wait if possible.";

            stars = 2;

            risk = "High";

        }

        // ==========================================
        // SMART FARM ADVISOR
        // ==========================================

        let cropAdvice = "";
        let transportAdvice = "";
        let storageAdvice = "";
        let farmerTip = "";

        switch (crop.toLowerCase()) {

            case "rice":
            case "paddy":

                cropAdvice =
                    "Rice demand is generally stable. Compare prices in nearby markets before selling.";

                transportAdvice =
                    "Transport only after proper drying.";

                storageAdvice =
                    "Store in a dry and ventilated warehouse.";

                break;

            case "wheat":

                cropAdvice =
                    "Compare procurement prices before selling.";

                transportAdvice =
                    "Use moisture-free bags while transporting.";

                storageAdvice =
                    "Store in dry storage to prevent fungus.";

                break;

            case "maize":

                cropAdvice =
                    "Demand mainly depends on poultry and feed industries.";

                transportAdvice =
                    "Protect from rain during transport.";

                storageAdvice =
                    "Store after proper drying.";

                break;

            case "groundnut":

                cropAdvice =
                    "Groundnut quality improves selling price. Dry properly before sale.";

                transportAdvice =
                    "Use ventilated bags.";

                storageAdvice =
                    "Store only after complete drying.";

                break;

            case "banana":

                cropAdvice =
                    "Harvest at proper maturity for better market value.";

                transportAdvice =
                    "Use ventilated crates.";

                storageAdvice =
                    "Sell quickly after harvesting.";

                break;

            case "tomato":

                cropAdvice =
                    "Tomatoes are highly perishable. Early selling is usually beneficial.";

                transportAdvice =
                    "Use plastic crates instead of bags.";

                storageAdvice =
                    "Avoid storing for long periods.";

                break;

            case "potato":

                cropAdvice =
                    "Cold storage can help if prices are low.";

                transportAdvice =
                    "Protect from sunlight.";

                storageAdvice =
                    "Cold storage recommended.";

                break;

            case "onion":

                cropAdvice =
                    "Monitor nearby market prices because onion prices fluctuate frequently.";

                transportAdvice =
                    "Keep sacks dry.";

                storageAdvice =
                    "Store in well-ventilated storage.";

                break;

            default:

                cropAdvice =
                    "Compare nearby market prices before selling.";

                transportAdvice =
                    "Transport during cooler hours.";

                storageAdvice =
                    "Store only if suitable facilities are available.";

        }

        // ==========================================
        // PROFIT SCORE
        // ==========================================

        let profitPercentage =
            Math.round(((modal - min) / ((max - min) || 1)) * 100);

        // ==========================================
        // FARMER TIP
        // ==========================================

        if (profitPercentage >= 80) {

            farmerTip =
                "Excellent opportunity. Selling today is recommended.";

        }
        else if (profitPercentage >= 50) {

            farmerTip =
                "Monitor tomorrow's prices before making a final decision.";

        }
        else {

            farmerTip =
                "If storage is available, waiting may increase profit.";

        }

        // ==========================================
        // RESPONSE
        // ==========================================

        res.json({

            success: true,

            data: {

                ...market,

                trend,

                recommendationType,

                recommendation,

                stars,

                risk,

                cropAdvice,

                transportAdvice,

                storageAdvice,

                farmerTip,

                profitPercentage

            }

        });

    }

    catch (error) {

        console.log("PRICE CONTROLLER ERROR");

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    getMarketPrice

};