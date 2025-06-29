import { z } from "zod";
import { characterSchema, moveSchema } from "./schema";
import { createTRPCRouter, publicProcedure } from "./trpc";

import { kv } from "@vercel/kv";

const characterRouter = createTRPCRouter({
  list: publicProcedure.query(async () => {
    const charactersJson = await kv.get<unknown>("characters");
    const characters = charactersJson
      ? (JSON.parse(charactersJson as string) as z.infer<typeof characterSchema>[])
      : [];
    return characters;
  }),
  findById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const charactersJson = await kv.get<unknown>("characters");
    const characters = charactersJson
      ? (JSON.parse(charactersJson as string) as z.infer<typeof characterSchema>[])
      : [];
    const character = characters.find((c: z.infer<typeof characterSchema>) => c.id === input.id);
    return character ?? null;
  }),
});

const moveRouter = createTRPCRouter({
  findByCharacter: publicProcedure
    .input(z.object({ characterId: z.string() }))
    .query(async ({ input }) => {
      const movesJson = await kv.get<unknown>(`moves:${input.characterId}`);
      const moves = movesJson
        ? (JSON.parse(movesJson as string) as z.infer<typeof moveSchema>[])
        : [];
      return moves;
    }),
});

export const appRouter = createTRPCRouter({
  character: characterRouter,
  move: moveRouter,
});

export type AppRouter = typeof appRouter;
