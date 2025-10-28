import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthedRequest, requireAuth } from "../auth.js";

const prisma = new PrismaClient();
export const charactersRouter = Router();

// 최초 로그인시 기본 3개 없으면 생성
charactersRouter.get(
  "/bootstrap",
  requireAuth,
  async (req: AuthedRequest, res) => {
    const defaults = [
      {
        name: "Mentor",
        prompt: "You are a concise senior mentor...",
        builtIn: true,
      },
      {
        name: "Cheer",
        prompt: "You are a warm, encouraging buddy...",
        builtIn: true,
      },
      { name: "Critic", prompt: "You are a strict reviewer...", builtIn: true },
    ];
    for (const d of defaults) {
      const exist = await prisma.character.findFirst({
        where: { userId: req.userId!, name: d.name },
      });
      if (!exist)
        await prisma.character.create({ data: { userId: req.userId!, ...d } });
    }
    const list = await prisma.character.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: "asc" },
    });
    res.json(list);
  }
);

charactersRouter.get("/", requireAuth, async (req: AuthedRequest, res) => {
  const list = await prisma.character.findMany({
    where: { userId: req.userId! },
    orderBy: { createdAt: "asc" },
  });
  res.json(list);
});

charactersRouter.post("/", requireAuth, async (req: AuthedRequest, res) => {
  const { name, prompt, thumbnail } = req.body ?? {};
  if (!name || !prompt)
    return res.status(400).json({ error: "Missing fields" });
  const c = await prisma.character.create({
    data: { userId: req.userId!, name, prompt, thumbnail },
  });
  res.json(c);
});
