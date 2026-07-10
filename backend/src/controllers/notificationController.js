const notificationService = require("../services/notificationService");

// ==========================================
// GET ALL NOTIFICATIONS
// ==========================================

const getNotifications = async (req, res) => {

    try {

        const notifications =
            await notificationService.getNotifications();

        return res.status(200).json({

            success: true,

            message: "Notifications fetched successfully",

            ...notifications

        });

    }

    catch (error) {

        console.log("Notification Controller Error");

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch notifications"

        });

    }

};

module.exports = {

    getNotifications

};