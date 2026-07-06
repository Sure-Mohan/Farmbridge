const livestockService = require("../services/livestockService");

const addLivestock = async (req, res) => {
  try {
    const livestock = await livestockService.addLivestock(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: livestock,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to add livestock",
    });
  }
};

const getLivestock = async (req, res) => {
  try {
    const livestock = await livestockService.getLivestock(req.user.id);

    res.json({
      success: true,
      data: livestock,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch livestock",
    });
  }
};

const getLivestockById = async (req, res) => {
  try {
    const livestock = await livestockService.getLivestockById(
      req.params.id,
      req.user.id
    );

    if (!livestock) {
      return res.status(404).json({
        success: false,
        message: "Livestock not found",
      });
    }

    res.json({
      success: true,
      data: livestock,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching livestock",
    });
  }
};

const updateLivestock = async (req, res) => {
  try {
    const livestock = await livestockService.updateLivestock(
      req.params.id,
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      data: livestock,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};

const deleteLivestock = async (req, res) => {
  try {
    await livestockService.deleteLivestock(req.params.id, req.user.id);

    res.json({
      success: true,
      message: "Livestock deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

module.exports = {
  addLivestock,
  getLivestock,
  getLivestockById,
  updateLivestock,
  deleteLivestock,
};