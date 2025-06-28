import { z } from "zod";
import { characterSchema, moveSchema } from "./schema";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

import { kv } from "@vercel/kv";

const characterRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const characters = await kv.get<z.infer<typeof characterSchema>[]>("characters");
    return characters ?? [];
  }),
  findById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const characters = await kv.get<z.infer<typeof characterSchema>[]>("characters");
    const character = characters?.find((c) => c.id === input.id);
    return character ?? null;
  }),
});

const moveRouter = createTRPCRouter({
  findByCharacter: publicProcedure
    .input(z.object({ characterId: z.string() }))
    .query(async ({ input }) => {
      const moves = await kv.get<z.infer<typeof moveSchema>[]>(`moves:${input.characterId}`);
      return moves ?? [];
    }),
});

export const appRouter = createTRPCRouter({
  character: characterRouter,
  move: moveRouter,
});

const server = createHTTPServer({
  router: appRouter,
});
server.listen(3000);

export type AppRouter = typeof appRouter;
