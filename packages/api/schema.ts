import { z } from "zod";

export const characterSchema = z.object({
  id: z.string().describe("キャラクターID (例: ryu, ken)"),
  name: z.string().describe("キャラクター名 (例: リュウ, ケン)"),
  image: z.string().url().optional().describe("キャラクターの画像URL"),
});

export type Character = z.infer<typeof characterSchema>;

export const moveSchema = z.object({
  id: z.string().uuid().describe("技ごとの一意なID"),
  name: z.string().describe("技名 (例: 波動拳)"),
  commandClassic: z.string().describe("クラシック操作のコマンド (例: 236P)"),
  commandModern: z.string().optional().describe("モダン操作のコマンド (例: N + SP)"),
  type: z.enum(["normal", "special", "super", "throw", "system"]).describe("技の種類"),
  startup: z.string().describe("発生フレーム"),
  active: z.string().describe("持続フレーム"),
  recovery: z.string().describe("硬直フレーム"),
  onHit: z.string().describe("ヒット時硬直差"),
  onBlock: z.string().describe("ガード時硬直差"),
  cancel: z.string().optional().describe("キャンセル可否"),
  damage: z.string().describe("ダメージ"),
  scaling: z.string().optional().describe("コンボ補正値"),
  driveGaugeOnHit: z.string().optional().describe("Dゲージ増加(ヒット時)"),
  driveGaugeOnBlock: z.string().optional().describe("Dゲージ減少(ガード時)"),
  driveGaugeOnPunish: z.string().optional().describe("Dゲージ減少(パニッシュカウンター時)"),
  saGauge: z.string().optional().describe("SAゲージ増加量"),
  attribute: z.string().optional().describe("属性 (上, 中, 下, 投, 弾など)"),
  notes: z.string().optional().describe("備考"),
});

export type Move = z.infer<typeof moveSchema>;
