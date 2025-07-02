import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { rateLimitMiddleware } from "../middlewares/rateLimiter";
// import { logMiddleware } from "./middlewares/logMiddleware";

const trpc = initTRPC.context<Context>().create();
export const router = trpc.router;
export const publicProcedure = trpc.procedure
// .use(logMiddleware)
.use(rateLimitMiddleware);

