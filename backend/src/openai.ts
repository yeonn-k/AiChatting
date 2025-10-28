import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export async function completeChat(
  model: string,
  msgs: ChatCompletionMessageParam[]
) {
  const resp = await client.chat.completions.create({
    model,
    messages: msgs,
    temperature: 0.7,
  });
  return resp.choices[0]?.message?.content ?? "";
}
