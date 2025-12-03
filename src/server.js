import dotenv from "dotenv";
dotenv.config();
import { sequelize } from "./models/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    // Sync DB
    // await sequelize.sync({ alter: true });
    await sequelize.sync();
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
