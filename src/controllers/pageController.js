import { Page } from "../models/index.js";
import { Op } from "sequelize";
import { makeSlug } from "../utils/slugify.js";

// Create page
export const createPage = async (req, res, next) => {
  try {
    const { title, content, status, metaTitle, metaDescription } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: "title and content required" });

    let slug = makeSlug(title);
    let exists = await Page.findOne({ where: { slug } });
    let suffix = 1;
    while (exists) {
      slug = makeSlug(`${title}-${suffix++}`);
      exists = await Page.findOne({ where: { slug } });
    }

    const page = await Page.create({
      title,
      slug,
      content,
      status: status || "published",
      metaTitle,
      metaDescription,
    });
    res.status(201).json(page);
  } catch (err) {
    next(err);
  }
};

// List pages
export const listPages = async (req, res, next) => {
  try {
    const pages = await Page.findAll({ order: [["createdAt", "DESC"]] });
    res.json(pages);
  } catch (err) {
    next(err);
  }
};

// Get page
export const getPage = async (req, res, next) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ message: "Not found" });
    res.json(page);
  } catch (err) {
    next(err);
  }
};

// Update page
export const updatePage = async (req, res, next) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ message: "Not found" });

    const { title, content, status, metaTitle, metaDescription } = req.body;
    if (title && title !== page.title) {
      let slug = makeSlug(title);
      let exists = await Page.findOne({
        where: { slug, id: { [Op.ne]: page.id } },
      });
      let suffix = 1;
      while (exists) {
        slug = makeSlug(`${title}-${suffix++}`);
        exists = await Page.findOne({
          where: { slug, id: { [Op.ne]: page.id } },
        });
      }
      page.slug = slug;
    }

    page.title = title ?? page.title;
    page.content = content ?? page.content;
    page.status = status ?? page.status;
    page.metaTitle = metaTitle ?? page.metaTitle;
    page.metaDescription = metaDescription ?? page.metaDescription;

    await page.save();
    res.json(page);
  } catch (err) {
    next(err);
  }
};

// Delete page
export const deletePage = async (req, res, next) => {
  try {
    const page = await Page.findByPk(req.params.id);
    if (!page) return res.status(404).json({ message: "Not found" });
    await page.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
