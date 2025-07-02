import fetch from "node-fetch";
import { GeminiResponse, GeminiContentPayload } from "../constants/types";

export async function geminiClient(
  req: GeminiContentPayload
): Promise<GeminiResponse> {
  const GEMINI_API_URL = process.env.GEMINI_API_URL;
  const GEMINI_API_TOKEN = process.env.GEMINI_API_TOKEN;

  if (!GEMINI_API_URL || !GEMINI_API_TOKEN) {
    throw new Error("GEMINI_API_URL is not defined in environment variables.");
  }

  const resp = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: GEMINI_API_TOKEN,
    },
    body: JSON.stringify(req),
  });
  return (await resp.json()) as GeminiResponse;
}
