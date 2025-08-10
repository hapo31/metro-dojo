import "server-only";

import { appRouter, createTRPCContext } from "@metro-dojo/api";
import { headers } from "next/headers";

/**
 * これはServer Componentsで使用できるサーバーサイドのtRPCクライアントです。
 * 各リクエストに対して新しい呼び出し元を作成し、適切なコンテキストとヘッダーが渡されるようにします。
 */
let cachedCaller: ReturnType<typeof appRouter.createCaller> | null = null;

export const createSsrApi = async () => {
  if (cachedCaller) {
    return cachedCaller;
  }
  const context = await createTRPCContext({
    headers: await headers(),
  });
  cachedCaller = appRouter.createCaller(context);
  return cachedCaller;
};
