const db = require("../config/db");

// Add Livestock
const addLivestock = async (userId, livestock) => {
  const {
    animal_type,
    breed,
    quantity,
    age,
    health_status,
    vaccination_date,
    notes,
  } = livestock;

  const query = `
    INSERT INTO livestock
    (user_id, animal_type, breed, quantity, age, health_status, vaccination_date, notes)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  const values = [
    userId,
    animal_type,
    breed,
    quantity,
    age,
    health_status,
    vaccination_date,
    notes,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all livestock
const getLivestock = async (userId) => {
  const result = await db.query(
    "SELECT * FROM livestock WHERE user_id=$1 ORDER BY created_at DESC",
    [userId]
  );

  return result.rows;
};

// Get livestock by ID
const getLivestockById = async (id, userId) => {
  const result = await db.query(
    "SELECT * FROM livestock WHERE id=$1 AND user_id=$2",
    [id, userId]
  );

  return result.rows[0];
};

// Update livestock
const updateLivestock = async (id, userId, livestock) => {
  const {
    animal_type,
    breed,
    quantity,
    age,
    health_status,
    vaccination_date,
    notes,
  } = livestock;

  const result = await db.query(
    `UPDATE livestock
     SET animal_type=$1,
         breed=$2,
         quantity=$3,
         age=$4,
         health_status=$5,
         vaccination_date=$6,
         notes=$7
     WHERE id=$8 AND user_id=$9
     RETURNING *`,
    [
      animal_type,
      breed,
      quantity,
      age,
      health_status,
      vaccination_date,
      notes,
      id,
      userId,
    ]
  );

  return result.rows[0];
};

// Delete livestock
const deleteLivestock = async (id, userId) => {
  const result = await db.query(
    "DELETE FROM livestock WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, userId]
  );

  return result.rows[0];
};

module.exports = {
  addLivestock,
  getLivestock,
  getLivestockById,
  updateLivestock,
  deleteLivestock,
};