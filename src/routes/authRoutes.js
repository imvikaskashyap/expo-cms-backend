import express from "express";
import { login, logout, me } from "../controllers/authController.js";
import { auth } from "../middleware/auth.js";

const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.post("/logout", logout); 
authRouter.get("/me", auth, me);

export default authRouter;
