import { Post, Page } from "../models/index.js";
import { Op } from "sequelize";

// List published posts
export const listPublishedPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { status: "published" },
      attributes: [
        "id",
        "title",
        "slug",
        "excerpt",
        "publishedAt",
        "metaTitle",
        "metaDescription",
        "category",
        "imageUrl",
      ],
      order: [["publishedAt", "DESC"]],
    });

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get published post
export const getPublishedPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { slug: req.params.slug, status: "published" },
    });
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// List published pages
export const getPublishedPageBySlug = async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug, status: "published" },
    });
    if (!page) return res.status(404).json({ message: "Not found" });
    res.json(page);
  } catch (err) {
    next(err);
  }
};
