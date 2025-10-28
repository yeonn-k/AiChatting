import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthedRequest, requireAuth } from "../auth.js";
import { completeChat } from "../openai.js";

const prisma = new PrismaClient();
export const chatRouter = Router();

chatRouter.post("/send", requireAuth, async (req: AuthedRequest, res) => {
  const { conversationId, content } = req.body ?? {};
  if (!conversationId || typeof content !== "string")
    return res.status(400).json({ error: "Invalid" });
  if (content.length > 200)
    return res.status(400).json({ error: "Message exceeds 200 chars" });

  const conv = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: { character: true },
  });
  if (!conv || conv.userId !== req.userId)
    return res.status(404).json({ error: "Not found" });

  // 저장: 유저 메시지
  const userMsg = await prisma.message.create({
    data: { conversationId, role: "user", content },
  });

  // 최근 N=10 메시지 + system prompt 구성
  const recent = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    take: 30,
  });

  const messages = [
    { role: "system", content: conv.character.prompt },
    ...recent.map((m) => ({ role: m.role as any, content: m.content })),
    { role: "user", content },
  ];

  try {
    const reply = await completeChat(
      process.env.OPENAI_MODEL!,
      messages as any
    );
    const botMsg = await prisma.message.create({
      data: { conversationId, role: "assistant", content: reply },
    });
    res.json({ user: userMsg, assistant: botMsg });
  } catch (e: any) {
    res
      .status(502)
      .json({ error: "AI upstream error", detail: String(e?.message ?? e) });
  }
});
