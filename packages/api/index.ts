import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  // この後、ここにプロシージャを追加していきます
  // 例:
  // greeting: t.procedure.input(z.object({ name: z.string() })).query(({ input }) => {
  //   return `Hello, ${input.name}!`;
  // }),
});

// フロントエンドとバックエンドで型を共有するためにエクスポートします
export type AppRouter = typeof appRouter;
