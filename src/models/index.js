import User from "./User.js";
import Post from "./Post.js";
import Page from "./Page.js";
import { sequelize } from "../config/db.js";

// Associations
User.hasMany(Post, { foreignKey: "authorId", as: "posts" });
Post.belongsTo(User, { foreignKey: "authorId", as: "author" });

export { sequelize, User, Post, Page };
