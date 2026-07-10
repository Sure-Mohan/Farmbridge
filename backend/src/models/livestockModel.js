const pool = require("../config/db");


// ADD LIVESTOCK

const addLivestock = async(data)=>{


const {
user_id,
animal_type,
breed,
quantity,
age,
health_status,
vaccination_date,
notes
}=data;


const result=await pool.query(

`
INSERT INTO livestock
(
user_id,
animal_type,
breed,
quantity,
age,
health_status,
vaccination_date,
notes
)

VALUES($1,$2,$3,$4,$5,$6,$7,$8)

RETURNING *;
`,

[
user_id,
animal_type,
breed,
quantity,
age,
health_status,
vaccination_date,
notes
]

);


return result.rows[0];

};



// GET USER LIVESTOCK

const getLivestockByUser=async(user_id)=>{


const result=await pool.query(
`
SELECT *
FROM livestock
WHERE user_id=$1
ORDER BY created_at DESC
`,
[user_id]
);


return result.rows;

};



// GET BY ID

const getLivestockById=async(id,user_id)=>{


const result=await pool.query(
`
SELECT *
FROM livestock
WHERE id=$1
AND user_id=$2
`,
[id,user_id]
);


return result.rows[0];

};



// DELETE

const deleteLivestock=async(id,user_id)=>{


const result=await pool.query(
`
DELETE FROM livestock
WHERE id=$1
AND user_id=$2
RETURNING *
`,
[id,user_id]
);


return result.rows[0];

};

// UPDATE LIVESTOCK

const updateLivestock = async (id, user_id, data) => {

    const {
        animal_type,
        breed,
        quantity,
        age,
        health_status,
        vaccination_date,
        notes
    } = data;

    const result = await pool.query(
        `
        UPDATE livestock
        SET
            animal_type=$1,
            breed=$2,
            quantity=$3,
            age=$4,
            health_status=$5,
            vaccination_date=$6,
            notes=$7
        WHERE id=$8
        AND user_id=$9
        RETURNING *;
        `,
        [
            animal_type,
            breed,
            quantity,
            age,
            health_status,
            vaccination_date,
            notes,
            id,
            user_id
        ]
    );

    return result.rows[0];
};

module.exports = {
    addLivestock,
    getLivestockByUser,
    getLivestockById,
    updateLivestock,
    deleteLivestock
};