import express from "express";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { errorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.routes.js";

const app = express();

const uploadDir = process.env.UPLOAD_DIR || "uploads";

app.use(cors()); // allow all origins
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// serve uploaded files
app.use(`/${uploadDir}`, express.static(path.join(process.cwd(), uploadDir)));

app.use("/api/v1", router);

// Server check endpoint
app.get("/running", (req, res) => res.json({ ok: true }));

app.use(errorHandler);

export default app;
