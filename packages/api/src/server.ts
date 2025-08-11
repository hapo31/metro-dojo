import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter, createTRPCContext } from "./index";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const server = createHTTPServer({
  router: appRouter,
  createContext: () => createTRPCContext({ headers: new Headers() }),
});

server.listen(port);
console.log(`tRPC server listening on port ${port}`);
