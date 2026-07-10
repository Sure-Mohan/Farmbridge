const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    register,
    login,
    forgotPassword,
    changePassword
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post(
    "/change-password",
    authMiddleware,
    changePassword
);

module.exports = router;