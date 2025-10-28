import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/chat", chatRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
