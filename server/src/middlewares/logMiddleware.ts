// src/middleware/logMiddleware.ts
import type { AnyMiddlewareFunction } from "@trpc/server";

export const logMiddleware: AnyMiddlewareFunction = async ({
  ctx,
  next,
  meta,
  getRawInput,
  path,
  type,
  input,
  signal,
}) => {
  console.log({
    ctx,
    next,
    meta,
    getRawInput: getRawInput(),
    path,
    type,
    input,
    signal,
  });
  return next();
};
