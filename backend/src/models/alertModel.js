const pool = require("../config/db");

// =======================
// GET ALERTS
// =======================

const getAlertsByUser = async (user_id) => {

    const result = await pool.query(

        `SELECT *
         FROM alerts
         WHERE user_id=$1
         ORDER BY created_at DESC`,

        [user_id]

    );

    return result.rows;

};

// =======================
// CREATE ALERT
// =======================

const createAlert = async (alert) => {

    const {

        user_id,

        title,

        message,

        type

    } = alert;

    const result = await pool.query(

        `INSERT INTO alerts

        (
            user_id,
            title,
            message,
            type
        )

        VALUES

        ($1,$2,$3,$4)

        RETURNING *`,

        [

            user_id,

            title,

            message,

            type

        ]

    );

    return result.rows[0];

};

// =======================
// MARK READ
// =======================

const markAsRead = async(id)=>{

const result=await pool.query(

`UPDATE alerts

SET is_read=true

WHERE id=$1

RETURNING *`,

[id]

);

return result.rows[0];

};

module.exports={

getAlertsByUser,

createAlert,

markAsRead

};