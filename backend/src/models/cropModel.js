const pool = require("../config/db");

// ==============================
// ADD CROP
// ==============================

const addCrop = async (crop) => {
    const {
        user_id,
        crop_name,
        area,
        planting_date,
        expected_harvest_date,
        status,
        notes
    } = crop;

    const query = `
        INSERT INTO crops
        (
            user_id,
            crop_name,
            area,
            planting_date,
            expected_harvest_date,
            status,
            notes
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *;
    `;

    const values = [
        user_id,
        crop_name,
        area,
        planting_date,
        expected_harvest_date,
        status,
        notes
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};

// ==============================
// GET ALL CROPS
// ==============================

const getCropsByUser = async (user_id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM crops
        WHERE user_id=$1
        ORDER BY created_at DESC
        `,
        [user_id]
    );

    return result.rows;
};

// ==============================
// GET SINGLE CROP
// ==============================

const getCropById = async (id, user_id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM crops
        WHERE id=$1
        AND user_id=$2
        `,
        [id, user_id]
    );

    return result.rows[0];
};

// ==============================
// UPDATE CROP
// ==============================

const updateCrop = async (id, user_id, crop) => {

    const {
        crop_name,
        area,
        planting_date,
        expected_harvest_date,
        status,
        notes
    } = crop;

    const result = await pool.query(
        `
        UPDATE crops
        SET
            crop_name=$1,
            area=$2,
            planting_date=$3,
            expected_harvest_date=$4,
            status=$5,
            notes=$6
        WHERE id=$7
        AND user_id=$8
        RETURNING *;
        `,
        [
            crop_name,
            area,
            planting_date,
            expected_harvest_date,
            status,
            notes,
            id,
            user_id
        ]
    );

    return result.rows[0];
};

// ==============================
// DELETE CROP
// ==============================

const deleteCrop = async (id, user_id) => {

    const result = await pool.query(
        `
        DELETE FROM crops
        WHERE id=$1
        AND user_id=$2
        RETURNING *;
        `,
        [id, user_id]
    );

    return result.rows[0];
};

module.exports = {
    addCrop,
    getCropsByUser,
    getCropById,
    updateCrop,
    deleteCrop
};