import fetch from "node-fetch";
import { GeminiResponse, GeminiContentPayload } from "../constants/types";

export async function geminiClient(
  req: GeminiContentPayload
): Promise<GeminiResponse> {
  const resp = await fetch("https://intertest.woolf.engineering/invoke", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.GEMINI_API_TOKEN ?? "token",
    },
    body: JSON.stringify(req),
  });
  return (await resp.json()) as GeminiResponse;
}
