import express from "express";
import {
  getPublishedPageBySlug,
  getPublishedPostBySlug,
  listPublishedPosts,
} from "../controllers/publicController.js";

const publicRouter = express.Router();

publicRouter.get("/posts", listPublishedPosts);
publicRouter.get("/posts/:slug", getPublishedPostBySlug);
publicRouter.get("/pages/:slug", getPublishedPageBySlug);

export default publicRouter;
