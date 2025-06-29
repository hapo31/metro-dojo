import { initTRPC } from "@trpc/server";
import superjson from "superjson";

/**
 * tRPCの初期化
 * ここでコンテキストの型などを定義することも可能
 */
const t = initTRPC.create({
  transformer: superjson,
});

/**
 * tRPCルーターを作成するためのヘルパー
 * 例: `export const appRouter = createTRPCRouter({ ... })`
 */
export const createTRPCRouter = t.router;

/**
 * 認証などを必要としない、公開されたプロシージャを作成するためのヘルパー
 */
export const publicProcedure = t.procedure;
