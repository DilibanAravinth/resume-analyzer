import { GeminiContentPayload } from "./types";

export const prompts = {
  resumeAnalyze: (resume: string, jd: string) => ({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Analyze the candidate CV against the job description.
                Identify strengths, weaknesses, and give an overall score out of 100 based on alignment.
                Your response must be a JSON object that matches this TypeScript type:
                type UserReport = {
                  score: string; // score of the analysis
                  strengths: string[]; // list of strengths, empty if none
                  weaknesses: string[]; // list of weaknesses, empty if none
                };`,
          },
          {
            text: `---\nRESUME TEXT START\n---\n
                ${resume}
                \n---\nRESUME TEXT END\n---`,
          },
          {
            text: `---\nJOB DESCRIPTION TEXT START\n---\n
                ${jd}
                \n---\nJOB DESCRIPTION TEXT END\n---`,
          },
        ],
      },
    ],
    generationConfig: {
      response_mime_type: "application/json",
    },
  }),
};
