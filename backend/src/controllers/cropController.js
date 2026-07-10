const {
    addCrop,
    getCropsByUser,
    getCropById,
    updateCrop,
    deleteCrop
} = require("../models/cropModel");

// ======================================
// CREATE CROP
// ======================================

const createCrop = async (req, res) => {

    try {

        const crop = await addCrop({

            user_id: req.user.id,

            crop_name: req.body.crop_name,

            area: req.body.area,

            planting_date: req.body.planting_date,

            expected_harvest_date: req.body.expected_harvest_date,

            status: req.body.status,

            notes: req.body.notes

        });

        return res.status(201).json({

            success: true,

            message: "Crop added successfully",

            data: crop

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// GET ALL CROPS
// ======================================

const getCrops = async (req, res) => {

    try {

        const crops = await getCropsByUser(req.user.id);

        return res.json({

            success: true,

            data: crops

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// GET SINGLE CROP
// ======================================

const getCrop = async (req, res) => {

    try {

        const crop = await getCropById(

            req.params.id,

            req.user.id

        );

        if (!crop) {

            return res.status(404).json({

                success: false,

                message: "Crop not found"

            });

        }

        return res.json({

            success: true,

            data: crop

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// UPDATE CROP
// ======================================

const editCrop = async (req, res) => {

    try {

        const crop = await updateCrop(

            req.params.id,

            req.user.id,

            req.body

        );

        if (!crop) {

            return res.status(404).json({

                success: false,

                message: "Crop not found"

            });

        }

        return res.json({

            success: true,

            message: "Crop updated successfully",

            data: crop

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ======================================
// DELETE CROP
// ======================================

const removeCrop = async (req, res) => {

    try {

        const crop = await deleteCrop(

            req.params.id,

            req.user.id

        );

        if (!crop) {

            return res.status(404).json({

                success: false,

                message: "Crop not found"

            });

        }

        return res.json({

            success: true,

            message: "Crop deleted successfully"

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    createCrop,

    getCrops,

    getCrop,

    editCrop,

    removeCrop

};