import { createCanvas } from "@napi-rs/canvas";
import { z } from "zod";
import { createTRPCContext, createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello";
  }),
  generateImage: publicProcedure
    .input(
      z
        .object({
          width: z.number().min(1).max(2000),
          height: z.number().min(1).max(2000),
        })
        .optional(),
    )
    .query(({ input }) => {
      const { width, height } = input ?? { width: 400, height: 400 };

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);

      const buffer = canvas.toBuffer("image/png");
      return buffer;
    }),
});

export type AppRouter = typeof appRouter;
export { createTRPCContext };
