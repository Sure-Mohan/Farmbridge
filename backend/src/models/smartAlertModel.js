const pool = require("../config/db");

// =============================
// SMART ALERT ENGINE
// =============================

const getSmartAlerts = async (user_id) => {

    const alerts = [];

    // ==========================
    // Crop Harvest Alerts
    // ==========================

    const cropResult = await pool.query(

        `SELECT crop_name,
                expected_harvest_date
         FROM crops
         WHERE user_id = $1
         AND expected_harvest_date IS NOT NULL`,

        [user_id]

    );

    const today = new Date();

    cropResult.rows.forEach(crop => {

        const harvestDate = new Date(crop.expected_harvest_date);

        const diffDays = Math.ceil(
            (harvestDate - today) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 0 && diffDays <= 7) {

            alerts.push({

                type: "crop",

                title: "Harvest Reminder",

                message: `${crop.crop_name} should be harvested in ${diffDays} day(s).`

            });

        }

    });

    // ==========================
    // Livestock Vaccination
    // ==========================

    const livestockResult = await pool.query(

        `SELECT animal_type,
                vaccination_date
         FROM livestock
         WHERE user_id=$1
         AND vaccination_date IS NOT NULL`,

        [user_id]

    );

    livestockResult.rows.forEach(animal => {

        const vaccineDate = new Date(animal.vaccination_date);

        const diffDays = Math.ceil(
            (vaccineDate - today) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 0 && diffDays <= 3) {

            alerts.push({

                type: "livestock",

                title: "Vaccination Due",

                message: `${animal.animal_type} vaccination is due in ${diffDays} day(s).`

            });

        }

    });

    // ==========================
    // Equipment Service
    // ==========================

    const equipmentResult = await pool.query(

        `SELECT equipment_name,
                next_service_date
         FROM equipment
         WHERE user_id=$1
         AND next_service_date IS NOT NULL`,

        [user_id]

    );

    equipmentResult.rows.forEach(item => {

        const serviceDate = new Date(item.next_service_date);

        const diffDays = Math.ceil(
            (serviceDate - today) / (1000 * 60 * 60 * 24)
        );

        if (diffDays >= 0 && diffDays <= 5) {

            alerts.push({

                type: "equipment",

                title: "Maintenance Reminder",

                message: `${item.equipment_name} requires servicing in ${diffDays} day(s).`

            });

        }

    });

    return alerts;

};

module.exports = {

    getSmartAlerts

};