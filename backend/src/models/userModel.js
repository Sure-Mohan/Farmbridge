const pool = require("../config/db");

// =======================
// CREATE USER
// =======================

const createUser = async (user) => {

    const {
        full_name,
        email,
        password,
        phone,
        role
    } = user;

    const result = await pool.query(
        `
        INSERT INTO users
        (
            full_name,
            email,
            password,
            phone,
            role
        )
        VALUES($1,$2,$3,$4,$5)
        RETURNING id, full_name, email, phone, role;
        `,
        [
            full_name,
            email,
            password,
            phone,
            role
        ]
    );

    return result.rows[0];
};

// =======================
// FIND USER BY EMAIL
// =======================

const findUserByEmail = async (email) => {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email=$1;
        `,
        [email]
    );

    return result.rows[0];
};

// =======================
// UPDATE PASSWORD
// =======================

const updatePasswordByEmail = async (email, password) => {

    const result = await pool.query(
        `
        UPDATE users
        SET password=$1
        WHERE email=$2
        RETURNING id;
        `,
        [password, email]
    );

    return result.rows[0];
};
const updatePasswordById = async (id, password) => {

    const result = await pool.query(

        `
        UPDATE users
        SET password=$1
        WHERE id=$2
        RETURNING id;
        `,

        [
            password,
            id
        ]

    );

    return result.rows[0];

};

module.exports = {

    createUser,

    findUserByEmail,

    updatePasswordByEmail,

    updatePasswordById

};