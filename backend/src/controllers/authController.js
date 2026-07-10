const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    createUser,
    findUserByEmail,
    updatePasswordByEmail,
    updatePasswordById
} = require("../models/userModel");

// =====================================
// REGISTER
// =====================================
const register = async (req, res) => {
    try {

        const { full_name, email, password, phone, role } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Full name, email and password are required"
            });
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser({
            full_name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// =====================================
// LOGIN
// =====================================
const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// =====================================
// FORGOT PASSWORD
// =====================================
const forgotPassword = async (req, res) => {

    try {

        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Email and new password are required"
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await updatePasswordByEmail(
            email,
            hashedPassword
        );

        res.json({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

// =====================================
// CHANGE PASSWORD
// =====================================
const changePassword = async (req, res) => {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        const user = await findUserByEmail(
            req.user.email
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        await updatePasswordById(
            user.id,
            hashedPassword
        );

        res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    changePassword
};