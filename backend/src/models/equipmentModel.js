const db = require("../config/db");

// =======================
// CREATE EQUIPMENT
// =======================
const createEquipment = async ({
  user_id,
  equipment_name,
  category,
  purchase_date,
  last_service_date,
  next_service_date,
  status,
  notes,
}) => {
  const query = `
    INSERT INTO equipment
    (
      user_id,
      equipment_name,
      category,
      purchase_date,
      last_service_date,
      next_service_date,
      status,
      notes
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *;
  `;

  const values = [
    user_id,
    equipment_name,
    category,
    purchase_date,
    last_service_date,
    next_service_date,
    status,
    notes,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};

// =======================
// GET ALL EQUIPMENT
// =======================
const getUserEquipment = async (user_id) => {
  const result = await db.query(
    "SELECT * FROM equipment WHERE user_id=$1 ORDER BY created_at DESC",
    [user_id]
  );

  return result.rows;
};

// =======================
// GET EQUIPMENT BY ID
// =======================
const getEquipmentById = async (id, user_id) => {
  const result = await db.query(
    "SELECT * FROM equipment WHERE id=$1 AND user_id=$2",
    [id, user_id]
  );

  return result.rows[0];
};

// =======================
// UPDATE EQUIPMENT
// =======================
const updateEquipment = async (
  id,
  user_id,
  {
    equipment_name,
    category,
    purchase_date,
    last_service_date,
    next_service_date,
    status,
    notes,
  }
) => {
  const query = `
    UPDATE equipment
    SET
      equipment_name=$1,
      category=$2,
      purchase_date=$3,
      last_service_date=$4,
      next_service_date=$5,
      status=$6,
      notes=$7
    WHERE id=$8
    AND user_id=$9
    RETURNING *;
  `;

  const values = [
    equipment_name,
    category,
    purchase_date,
    last_service_date,
    next_service_date,
    status,
    notes,
    id,
    user_id,
  ];

  const result = await db.query(query, values);

  return result.rows[0];
};

// =======================
// DELETE EQUIPMENT
// =======================
const deleteEquipment = async (id, user_id) => {
  const result = await db.query(
    "DELETE FROM equipment WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, user_id]
  );

  return result.rows[0];
};

module.exports = {
  createEquipment,
  getUserEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};