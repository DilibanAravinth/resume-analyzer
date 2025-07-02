import { z } from "zod";
import { geminiClient } from "../utils/geminiClient";
import { publicProcedure, router } from "../utils/trpc";
import { getTextFromPdf } from "../utils/getTextFromPdf";
import { TRPCError } from "@trpc/server";
import { GeminiResponse, GeminiContentPayload } from "../constants/types";
import { getParsedDataFromGeminiResponse } from "../utils/getTextFromGeminiResponse";
import { prompts } from "../constants/prompts";

export const appRouter = router({
  analyzeResume: publicProcedure
    .input(
      z
        .instanceof(FormData)
        .transform((fd) => Object.fromEntries(fd.entries()))
        .pipe(
          z.object({
            resume: z.instanceof(File).refine((f) => f.size > 0),
            jd: z.instanceof(File).refine((f) => f.size > 0),
          })
        )
    )
    .mutation(async ({input}) => {
      const resume = input.resume;
      const jd = input.jd;

      if (!resume || !jd) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Missing resume or job description file",
        });
      }

      const resumeText = await getTextFromPdf(resume);
      const jdText = await getTextFromPdf(jd);

      const prompt: GeminiContentPayload = prompts.resumeAnalyze(resumeText,jdText);
      

      const result: GeminiResponse = await geminiClient(prompt);
      let response = getParsedDataFromGeminiResponse(result);
      return response;
    }),
    
});

export type AppRouter = typeof appRouter;
