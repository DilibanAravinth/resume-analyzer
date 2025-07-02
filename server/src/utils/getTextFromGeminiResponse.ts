import { GeminiResponse } from "../constants/types";

export const getParsedDataFromGeminiResponse = async(result: GeminiResponse) => {
    let output = "";
  for (const part of result.candidates[0].content.parts) {
    if (part.text) {
        output += part.text;
    }
  }
  return await JSON.parse(output);
  
};