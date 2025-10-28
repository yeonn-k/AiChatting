import express from "express";

import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRouter } from "./routes/auth.js";
import { charactersRouter } from "./routes/characters.js";
import { conversationsRouter } from "./routes/conversations.js";
import { chatRouter } from "./routes/chat.js";

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/api/auth", authRouter);
app.use("/api/characters", charactersRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/chat", chatRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API on :${port}`));
