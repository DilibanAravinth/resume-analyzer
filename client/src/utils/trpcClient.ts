import { createTRPCClient, httpBatchLink, httpLink, isNonJsonSerializable, splitLink } from "@trpc/client";
import type { AppRouter } from "../../../server/src/routers/appRouter";
const url = "http://localhost:3000/";

export const trpcClient = createTRPCClient<AppRouter>({
  links:[
    splitLink({
      condition: (op) => isNonJsonSerializable(op.input),
      true: httpLink({
        url,
      }),
      false: httpBatchLink({
        url,
      })
    })
  ]
})