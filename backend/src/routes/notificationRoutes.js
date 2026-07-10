const express = require("express");

const router = express.Router();

const {
    getNotifications
} = require("../controllers/notificationController");


// GET NOTIFICATIONS

router.get("/", getNotifications);


module.exports = router;