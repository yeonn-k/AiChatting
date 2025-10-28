import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth";
import chatRouter from "./routes/chat";
import characterRouter from "./routes/character";

const app = express();

// CORS: 프런트 포트 허용
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// 업로드 정적 서빙 (프로젝트 루트 기준)
const uploadsPath = path.join(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsPath));
console.log("[static] serving uploads from:", uploadsPath);

// 라우터
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/addchar", characterRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
});
