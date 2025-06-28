import { z } from "zod";
import { characterSchema, moveSchema } from "./schema";
import { createTRPCRouter, publicProcedure } from "./trpc";
import { kv } from "@vercel/kv";

const characterRouter = createTRPCRouter({
  getCharacters: publicProcedure.query(async () => {
    const characters = await kv.get<z.infer<typeof characterSchema>[]>("characters");
    return characters ?? [];
  }),
});

const moveRouter = createTRPCRouter({
  getMovesByCharacterId: publicProcedure
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

export type AppRouter = typeof appRouter;
