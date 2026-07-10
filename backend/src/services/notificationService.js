const pool = require("../config/db");

// ===============================================
// GET ALL SMART NOTIFICATIONS
// ===============================================

const getNotifications = async () => {

    const notifications = [];

    const today = new Date();

    // ============================================
    // CROP NOTIFICATIONS
    // ============================================

    try {

        const crops = await pool.query(
            `SELECT crop_name, expected_harvest_date
             FROM crops
             WHERE expected_harvest_date IS NOT NULL`
        );

        crops.rows.forEach(crop => {

            const harvestDate = new Date(crop.expected_harvest_date);

            const diff =
                Math.ceil(
                    (harvestDate - today) /
                    (1000 * 60 * 60 * 24)
                );

            if (diff >= 0 && diff <= 5) {

                notifications.push({

                    type: "crop",

                    priority: "Medium",

                    icon: "🌾",

                    title: "Harvest Reminder",

                    message:
                        `${crop.crop_name} harvest is due in ${diff} day(s).`

                });

            }

            if (diff < 0) {

                notifications.push({

                    type: "crop",

                    priority: "High",

                    icon: "⚠",

                    title: "Harvest Overdue",

                    message:
                        `${crop.crop_name} should already have been harvested.`

                });

            }

        });

    }

    catch (err) {

        console.log("Crop Notification Error");

        console.log(err.message);

    }

    // ============================================
    // LIVESTOCK NOTIFICATIONS
    // ============================================

    try {

        const livestock = await pool.query(

            `SELECT animal_type,
                    vaccination_date,
                    health_status
             FROM livestock`

        );

        livestock.rows.forEach(animal => {

            if (animal.health_status &&
                animal.health_status.toLowerCase() !== "healthy") {

                notifications.push({

                    type: "livestock",

                    priority: "High",

                    icon: "🐄",

                    title: "Livestock Health Alert",

                    message:
                        `${animal.animal_type} health status is "${animal.health_status}".`

                });

            }

            if (animal.vaccination_date) {

                const vaccine =
                    new Date(animal.vaccination_date);

                const diff =
                    Math.ceil(
                        (vaccine - today) /
                        (1000 * 60 * 60 * 24)
                    );

                if (diff >= 0 && diff <= 5) {

                    notifications.push({

                        type: "livestock",

                        priority: "Medium",

                        icon: "💉",

                        title: "Vaccination Reminder",

                        message:
                            `${animal.animal_type} vaccination is due in ${diff} day(s).`

                    });

                }

            }

        });

    }

    catch (err) {

        console.log("Livestock Notification Error");

        console.log(err.message);

    }

    // ============================================
    // EQUIPMENT NOTIFICATIONS
    // ============================================

    try {

        const equipment = await pool.query(

            `SELECT equipment_name,
                    next_service_date,
                    status
             FROM equipment`

        );

        equipment.rows.forEach(item => {

            if (item.status &&
                item.status.toLowerCase() !== "active") {

                notifications.push({

                    type: "equipment",

                    priority: "Medium",

                    icon: "🚜",

                    title: "Equipment Status",

                    message:
                        `${item.equipment_name} is currently ${item.status}.`

                });

            }

            if (item.next_service_date) {

                const service =
                    new Date(item.next_service_date);

                const diff =
                    Math.ceil(
                        (service - today) /
                        (1000 * 60 * 60 * 24)
                    );

                if (diff >= 0 && diff <= 3) {

                    notifications.push({

                        type: "equipment",

                        priority: "Medium",

                        icon: "🔧",

                        title: "Equipment Service",

                        message:
                            `${item.equipment_name} requires servicing in ${diff} day(s).`

                    });

                }

                if (diff < 0) {

                    notifications.push({

                        type: "equipment",

                        priority: "High",

                        icon: "⚙",

                        title: "Service Overdue",

                        message:
                            `${item.equipment_name} service is overdue.`

                    });

                }

            }

        });

    }

    catch (err) {

        console.log("Equipment Notification Error");

        console.log(err.message);

    }

    // ============================================
    // SORT
    // ============================================

    notifications.sort((a, b) => {

        const priority = {

            High: 1,

            Medium: 2,

            Low: 3

        };

        return priority[a.priority] - priority[b.priority];

    });

    return {

        count: notifications.length,

        high:
            notifications.filter(n => n.priority === "High").length,

        medium:
            notifications.filter(n => n.priority === "Medium").length,

        low:
            notifications.filter(n => n.priority === "Low").length,

        notifications

    };

};

module.exports = {

    getNotifications

};