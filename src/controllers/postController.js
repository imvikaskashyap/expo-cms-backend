import { Post } from "../models/index.js";
import { Op } from "sequelize";
import { makeSlug } from "../utils/slugify.js";

// Create post
export const createPost = async (req, res, next) => {
  try {
    const {
      title,
      content,
      excerpt,
      status,
      metaTitle,
      metaDescription,
      category,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "title and content required" });
    }

    let slug = makeSlug(title);
    let exists = await Post.findOne({ where: { slug } });
    let suffix = 1;
    while (exists) {
      slug = makeSlug(`${title}-${suffix++}`);
      exists = await Post.findOne({ where: { slug } });
    }

    const finalStatus = status || "published";

    // Upload image
    let imageUrl = null;
    if (req.file) {
      const uploadDir = (process.env.UPLOAD_DIR || "uploads").replace(
        /^\/+|\/+$/g,
        ""
      );
      const baseUrl =
        (process.env.BASE_URL && process.env.BASE_URL.replace(/\/+$/, "")) ||
        `${req.protocol}://${req.get("host")}`;

      imageUrl = `${baseUrl}/${uploadDir}/${req.file.filename}`;
    }

    const post = await Post.create({
      title,
      slug,
      content,
      excerpt,
      status: finalStatus,
      metaTitle,
      metaDescription,
      category,
      imageUrl,
      publishedAt: finalStatus === "published" ? new Date() : null,
      authorId: req.user?.id ?? null,
    });

    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// List posts
export const listPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get post
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Update post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "POst Not found" });

    const {
      title,
      content,
      excerpt,
      status,
      metaTitle,
      metaDescription,
      category,
      imageUrl,
    } = req.body;

    // If title changed -  regenerate slug
    if (title && title !== post.title) {
      let slug = makeSlug(title);
      let exists = await Post.findOne({
        where: { slug, id: { [Op.ne]: post.id } },
      });
      let suffix = 1;
      while (exists) {
        slug = makeSlug(`${title}-${suffix++}`);
        exists = await Post.findOne({
          where: { slug, id: { [Op.ne]: post.id } },
        });
      }
      post.slug = slug;
    }

    post.title = title ?? post.title;
    post.content = content ?? post.content;
    post.excerpt = excerpt ?? post.excerpt;
    post.metaTitle = metaTitle ?? post.metaTitle;
    post.metaDescription = metaDescription ?? post.metaDescription;
    post.category = category ?? post.category;
    post.imageUrl = imageUrl ?? post.imageUrl;

    if (status) {
      post.status = status;
      if (status === "published" && !post.publishedAt) {
        post.publishedAt = new Date();
      }
      if (status === "unpublished") {
        post.publishedAt = null;
      }
    }

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });
    await post.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// Toggle publish
export const togglePublish = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }

    const { published } = req.body;

    if (typeof published !== "boolean") {
      return res
        .status(400)
        .json({ message: "published must be true or false" });
    }

    post.status = published ? "published" : "unpublished";
    post.publishedAt = published ? new Date() : null;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};
