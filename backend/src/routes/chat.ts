import { Router } from "express";
import jwt from "jsonwebtoken";
import OpenAI from "openai";

const router = Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const personas: Record<string, { name: string; prompt: string }> = {
  "1": { name: "미니빈", prompt: "You are Minibean. Calm, kind, concise." },
  "2": {
    name: "악동이",
    prompt: "You are Akdongi. Cheeky, witty, playful, short replies.",
  },
  "3": {
    name: "스푸키",
    prompt: "You are Spooky. Dry humor, analytical, a bit sarcastic.",
  },
};

// 인증 미들웨어(토큰 필수)
function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "토큰 없음" });
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "유효하지 않은 토큰" });
  }
}

router.post("/", requireAuth, async (req, res) => {
  try {
    const {
      characterId,
      message,
      history = [],
    } = req.body as {
      characterId?: string;
      message?: string;
      history?: { role: "user" | "assistant"; content: string }[];
    };

    if (!characterId || !message) {
      return res
        .status(400)
        .json({ message: "characterId와 message는 필수입니다." });
    }
    if (message.length > 200) {
      return res
        .status(400)
        .json({ message: "메시지는 200자 이내로 입력하세요." });
    }

    const persona = personas[characterId] ?? {
      name: "AI",
      prompt:
        "You are a helpful assistant. Answer briefly. If asked about your persona, say you are a default AI.",
    };

    // OpenAI Chat 구성
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `${persona.prompt}\n- Answer in Korean.\n- Keep answers concise (1~3 sentences).`,
      },
      ...history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiText =
      completion.choices[0]?.message?.content?.trim() ||
      "응답 생성에 실패했습니다.";

    return res.status(200).json({
      characterId,
      content: aiText,
      time: new Date().toISOString(),
    });
  } catch (e: any) {
    console.error(e);
    // OpenAI 키 미설정 혹은 호출 에러
    return res
      .status(500)
      .json({ message: e?.message || "AI 응답 생성 중 오류가 발생했습니다." });
  }
});

export default router;
