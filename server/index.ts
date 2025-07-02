import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { AppRouter, appRouter } from './src/routers/appRouter';
import cors from 'cors';
import { createContext } from './src/utils/context';
import * as dotenv from "dotenv";

dotenv.config();
const server = createHTTPServer<AppRouter>({
  router: appRouter,
  middleware: cors({
    origin: "*",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  }),
  createContext
});

server.listen(process.env.PORT || 3000);