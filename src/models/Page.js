import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

const Page = sequelize.define(
  "Page",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("unpublished", "published"),
      defaultValue: "published",
    },
    metaTitle: {
      type: DataTypes.STRING,
    },
    metaDescription: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

export default Page;
