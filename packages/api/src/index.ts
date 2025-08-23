import { createCanvas, loadImage } from "@napi-rs/canvas";
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
          width: z.number().min(1).max(2000).optional(),
          height: z.number().min(1).max(2000).optional(),
          text: z.string().optional(),
          fontSize: z.number().min(8).max(200).optional(),
          textColor: z.string().optional(),
          backgroundColor: z.string().optional(),
          x: z.number().optional(),
          y: z.number().optional(),
          embedImage: z.boolean().optional(),
        })
        .optional(),
    )
    .query(async ({ input }) => {
      const {
        width = 400,
        height = 400,
        text = "Hello World",
        fontSize = 24,
        textColor = "black",
        backgroundColor = "white",
        x,
        y,
        embedImage = false,
      } = input ?? {};

      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext("2d");

      // 背景を描画
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // 画像を埋め込み
      if (embedImage) {
        const imagePath =
          "/workspaces/metro-dojo/packages/api/src/assets/icons/button-hk.png";
        const image = await loadImage(imagePath);

        // 画像を左上角に描画（デフォルト）
        ctx.drawImage(image, 10, 10);
      }

      // テキストを描画
      if (text) {
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // デフォルトの位置は画像の中央
        const textX = x ?? width / 2;
        const textY = y ?? height / 2;

        ctx.fillText(text, textX, textY);
      }

      const buffer = canvas.toBuffer("image/png");
      return buffer;
    }),
});

export type AppRouter = typeof appRouter;
export { createTRPCContext };
