const { getSmartAlerts } = require("../models/smartAlertModel");

const fetchSmartAlerts = async (req, res) => {
  try {

    const alerts = await getSmartAlerts(req.user.id);

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });

  } catch (error) {

    console.error("Smart Alert Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  fetchSmartAlerts
};