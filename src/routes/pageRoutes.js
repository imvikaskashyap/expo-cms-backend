import express from "express";
import {listPages, createPage, getPage, updatePage, deletePage} from "../controllers/pageController.js";
import { auth } from "../middleware/auth.js";
import { validateJoi } from "../middleware/validateJoi.js";
import { pageSchema } from "../validators/pageSchema.js";

const pageRouter = express.Router();

pageRouter.post("/", auth, validateJoi(pageSchema), createPage);
pageRouter.get("/", auth, listPages); 
pageRouter.get("/:id", auth, getPage);
pageRouter.put("/:id", auth, validateJoi(pageSchema), updatePage);
pageRouter.delete("/:id", auth, deletePage);

export default pageRouter;
