const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const smartRoutes = require("./routes/smartRoutes");
const priceRoutes = require("./routes/priceRoutes");
const livestockRoutes = require("./routes/livestockRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const app = express();

// =====================
// Middlewares
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// Test Route
// =====================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to FarmBridge API 🚜",
  });
});

// =====================
// Routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/smart", smartRoutes);
app.use("/api/price", priceRoutes);
app.use("/api/livestock", livestockRoutes);
app.use("/api/equipment", equipmentRoutes);

// =====================
// 404 Handler
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

module.exports = app;