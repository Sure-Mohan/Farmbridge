const pool = require("../config/db");

// Dashboard Statistics
const getDashboardStats = async (user_id) => {
  const totalCrops = await pool.query(
    `SELECT COUNT(*) FROM crops WHERE user_id = $1`,
    [user_id]
  );

  const totalLivestock = await pool.query(
    `SELECT COALESCE(SUM(quantity),0) AS total FROM livestock WHERE user_id = $1`,
    [user_id]
  );

  const totalEquipment = await pool.query(
    `SELECT COUNT(*) FROM equipment WHERE user_id = $1`,
    [user_id]
  );

  const growing = await pool.query(
    `SELECT COUNT(*) FROM crops
     WHERE user_id = $1
     AND LOWER(status)='growing'`,
    [user_id]
  );

  const planted = await pool.query(
    `SELECT COUNT(*) FROM crops
     WHERE user_id = $1
     AND LOWER(status)='planted'`,
    [user_id]
  );

  const harvested = await pool.query(
    `SELECT COUNT(*) FROM crops
     WHERE user_id = $1
     AND LOWER(status)='harvested'`,
    [user_id]
  );

  return {
    totalCrops: Number(totalCrops.rows[0].count),
    totalLivestock: Number(totalLivestock.rows[0].total),
    totalEquipment: Number(totalEquipment.rows[0].count),

    cropStatus: {
      growing: Number(growing.rows[0].count),
      planted: Number(planted.rows[0].count),
      harvested: Number(harvested.rows[0].count)
    }
  };
};

// Monthly Crop Trend
const getMonthlyCropTrend = async (user_id) => {

  const result = await pool.query(

`SELECT
EXTRACT(MONTH FROM planting_date) AS month,
COUNT(*) AS total
FROM crops
WHERE user_id=$1
GROUP BY month
ORDER BY month;`

,[user_id]);

  return result.rows;

};

// Livestock Distribution
const getLivestockDistribution = async(user_id)=>{

const result = await pool.query(

`SELECT
animal_type,
SUM(quantity) AS total
FROM livestock
WHERE user_id=$1
GROUP BY animal_type
ORDER BY animal_type;`

,[user_id]);

return result.rows;

};

// Equipment Status
const getEquipmentStatus = async(user_id)=>{

const result = await pool.query(

`SELECT
status,
COUNT(*) AS total
FROM equipment
WHERE user_id=$1
GROUP BY status;`

,[user_id]);

return result.rows;

};

module.exports={

getDashboardStats,
getMonthlyCropTrend,
getLivestockDistribution,
getEquipmentStatus

};