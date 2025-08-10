import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello";
  }),
});

export type AppRouter = typeof appRouter;
