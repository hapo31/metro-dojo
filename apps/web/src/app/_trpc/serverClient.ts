import "server-only";

import { appRouter, type AppRouter } from "@metro-dojo/api";
import { createTRPCProxyClient, loggerLink, type TRPCClientError } from "@trpc/client";
import { callTRPCProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { headers } from "next/headers";
import { cache } from "react";

const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return {
    headers: heads,
  };
});

export const api = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    () =>
      ({ op }) =>
        observable((observer) => {
          const main = async () => {
            try {
              const ctx = createContext();
              const result = await callTRPCProcedure({
                router: appRouter,
                path: op.path,
                getRawInput: async () => op.input,
                ctx,
                type: op.type,
                // biome-ignore lint/style/noNonNullAssertion: <一旦無視>
                signal: op.signal!,
              });
              observer.next({ result: { data: result } });
              observer.complete();
            } catch (cause) {
              observer.error(cause as TRPCClientError<AppRouter>);
            }
          };
          main();
        }),
  ],
});
