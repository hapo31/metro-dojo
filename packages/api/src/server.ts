import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "../index";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const server = createHTTPServer({
  router: appRouter,
});

server.listen(port);
console.log(`tRPC server listening on port ${port}`);
