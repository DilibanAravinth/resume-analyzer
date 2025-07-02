// src/utils/rateLimiter.ts
import { AnyMiddlewareFunction, TRPCError } from "@trpc/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

const hourRateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware_hour",
  points: 300,
  duration: 3600,
});

const minuteRateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware_minute",
  points: 20,
  duration: 60,
});

export const rateLimitMiddleware: AnyMiddlewareFunction = async (opts) => {
  const ip = opts.ctx.ip || "unknown";
  try {
    await Promise.all([
      minuteRateLimiter.consume(ip),
      hourRateLimiter.consume(ip),
    ]);
  } catch {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "API rate limit exceeded. Try again later.",
    });
  }

  return opts.next();
};
