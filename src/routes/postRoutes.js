import express from "express";
import {
  createPost,
  updatePost,
  listPosts,
  getPost,
  deletePost,
  togglePublish,
} from "../controllers/postController.js";
import { auth } from "../middleware/auth.js";
import { validateJoi } from "../middleware/validateJoi.js";
import { postSchema } from "../validators/postSchema.js";
import { uploadSingle } from "../utils/upload.js";

const postRouter = express.Router();

// Upload single file
const handleUpload = (req, res, next) => {
  uploadSingle(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

postRouter.post("/", auth, handleUpload, validateJoi(postSchema), createPost);
postRouter.get("/", auth, listPosts);
postRouter.get("/:id", getPost);
postRouter.put("/:id", auth, handleUpload, validateJoi(postSchema), updatePost);
postRouter.delete("/:id", auth, deletePost);
postRouter.patch("/:id/publish", auth, togglePublish);

export default postRouter;
