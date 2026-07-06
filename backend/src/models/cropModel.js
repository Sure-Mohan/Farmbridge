const pool = require("../config/db");

// Add Crop
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
    (user_id, crop_name, area, planting_date, expected_harvest_date, status, notes)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
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

// Get Crops by User
const getCropsByUser = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM crops WHERE user_id = $1 ORDER BY created_at DESC",
    [user_id]
  );
  return result.rows;
};

module.exports = {
  addCrop,
  getCropsByUser
};