import { appRouter } from "@metro-dojo/api";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";

/**
 * tRPCのコンテキストを作成します。
 * ここでは、リクエストヘッダーなどの情報に基づいて、
 * データベース接続やセッション情報などをコンテキストに追加できます。
 * 今回はコンテキストを使用しないため、空のオブジェクトを返します。
 */
const createContext = async (_req: NextRequest) => {
  return {};
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
  });

export { handler as GET, handler as POST };
