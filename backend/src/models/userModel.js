const pool = require("../config/db");

// Create user
const createUser = async (user) => {
  const { full_name, email, password, phone, role } = user;

  const query = `
    INSERT INTO users (full_name, email, password, phone, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, full_name, email, phone, role;
  `;

  const values = [full_name, email, password, phone, role];

  const result = await pool.query(query, values);
  return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};