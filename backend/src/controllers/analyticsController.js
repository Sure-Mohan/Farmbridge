const {
    getDashboardStats,
    getMonthlyCropTrend,
    getLivestockDistribution,
    getEquipmentStatus,
} = require("../models/analyticsModel");

// ==============================
// Dashboard Analytics
// ==============================

const dashboardAnalytics = async (req, res) => {

    try {

        console.log("================================");
        console.log("Logged In User :", req.user);

        const user_id = req.user.id;

        console.log("User ID :", user_id);
        console.log("================================");

        const stats = await getDashboardStats(user_id);

        console.log("Dashboard Stats :", stats);

        const monthlyTrend =
            await getMonthlyCropTrend(user_id);

        const livestock =
            await getLivestockDistribution(user_id);

        const equipment =
            await getEquipmentStatus(user_id);

        res.status(200).json({

            success: true,

            data: {

                stats,

                monthlyTrend,

                livestock,

                equipment

            }

        });

    }

    catch (error) {

        console.error("Dashboard Analytics Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to load dashboard analytics",

            error: error.message

        });

    }

};

module.exports = {

    dashboardAnalytics

};