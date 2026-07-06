const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

db.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL Database");

    app.listen(PORT, () => {
      console.log(`🚀 FarmBridge Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });