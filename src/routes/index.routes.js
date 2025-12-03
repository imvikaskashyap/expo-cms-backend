import express from "express";
import authRouter from "./authRoutes.js";
import pageRouter from "./pageRoutes.js";
import postRouter from "./postRoutes.js";
import publicRouter from "./publicRoutes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/pages", pageRouter);
router.use("/posts", postRouter);
router.use("/public", publicRouter);

export default router;
