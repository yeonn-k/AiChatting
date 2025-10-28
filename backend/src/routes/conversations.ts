import { Router } from "express";
import type { Response } from "express";
import { PrismaClient } from "@prisma/client";
import type { AuthedRequest } from "../auth.js";
import { requireAuth } from "../auth.js";

const prisma = new PrismaClient();

export const conversationsRouter = Router();

conversationsRouter.post(
  "/",
  requireAuth,
  async (req: AuthedRequest, res: Response) => {
    const { characterId } = req.body ?? {};
    if (!characterId)
      return res.status(400).json({ error: "characterId required" });

    const conv = await prisma.conversation.create({
      data: { userId: req.userId!, characterId },
    });
    res.json(conv);
  }
);

conversationsRouter.get(
  "/",
  requireAuth,
  async (req: AuthedRequest, res: Response) => {
    const { characterId, cursor, take = 20 } = req.query as any;
    if (!characterId)
      return res.status(400).json({ error: "characterId required" });

    const convs = await prisma.conversation.findMany({
      where: { userId: req.userId!, characterId },
      orderBy: { createdAt: "desc" },
      take: Number(take),
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: String(cursor) } : undefined,
    });
    res.json(convs);
  }
);

conversationsRouter.get(
  "/:id/messages",
  requireAuth,
  async (req: AuthedRequest, res: Response) => {
    const { id } = req.params;
    const { cursor, take = 30 } = (req.query as any) ?? {};
    const msgs = await prisma.message.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: "desc" },
      take: Number(take),
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: String(cursor) } : undefined,
    });
    res.json(msgs);
  }
);
