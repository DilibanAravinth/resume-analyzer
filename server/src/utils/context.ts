import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";

export function createContext({ req }: CreateHTTPContextOptions) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = (typeof forwardedFor === "string" ? forwardedFor.split(",")[0]: null) || 
    req.socket.remoteAddress || "unknown";
    return { ip };
}

export type Context = Awaited<ReturnType<typeof createContext>>