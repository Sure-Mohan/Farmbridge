const { addCrop, getCropsByUser } = require("../models/cropModel");

// Add Crop
const createCrop = async (req, res) => {
  try {
    const user_id = req.user.id; // from JWT middleware

    const {
      crop_name,
      area,
      planting_date,
      expected_harvest_date,
      status,
      notes
    } = req.body;

    const newCrop = await addCrop({
      user_id,
      crop_name,
      area,
      planting_date,
      expected_harvest_date,
      status,
      notes
    });

    res.status(201).json({
      success: true,
      message: "Crop added successfully",
      crop: newCrop
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// Get Crops
const getCrops = async (req, res) => {
  try {
    const user_id = req.user.id;

    const crops = await getCropsByUser(user_id);

    res.status(200).json({
      success: true,
      crops
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

module.exports = {
  createCrop,
  getCrops
};