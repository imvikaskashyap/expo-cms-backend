import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { sequelize, User } from "./models/index.js";

const run = async () => {
  try {
    // await sequelize.sync({ alter: true });
    await sequelize.sync();

    const email = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      console.log("Admin already exists:", email);
      process.exit(0);
    }
    const password = process.env.SEED_ADMIN_PASS || "Admin@123";
    const hash = await bcrypt.hash(password, 10);
    const u = await User.create({ name: "Admin", email, password: hash, role: "admin" });
    console.log("Created admin:", u.email, "password:", password);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
