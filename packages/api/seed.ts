import "dotenv/config";
import { kv } from "@vercel/kv";
import { characterSchema, moveSchema } from "./schema";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const ryuMoves: Omit<z.infer<typeof moveSchema>, "id">[] = [
  // ここにリュウの技データを追加していく
  {
    name: "弱 波動拳",
    commandClassic: "236LP",
    commandModern: "N + SP",
    type: "special",
    startup: "16",
    active: "",
    recovery: "47",
    onHit: "2",
    onBlock: "-5",
    cancel: "SA3",
    damage: "700",
    scaling: "",
    driveGaugeOnHit: "1000",
    driveGaugeOnBlock: "-2500",
    driveGaugeOnPunish: "-3000",
    saGauge: "600",
    attribute: "上・弾",
    notes: "",
  },
];

async function main() {
  const characters: z.infer<typeof characterSchema>[] = [
    { id: "ryu", name: "リュウ" },
    { id: "ken", name: "ケン" },
    { id: "chun-li", name: "春麗" },
  ];

  console.log("Seeding characters...");
  await kv.set("characters", JSON.stringify(characters));

  console.log("Seeding moves for Ryu...");
  const ryuMovesWithId = ryuMoves.map((move) => ({ ...move, id: uuidv4() }));
  await kv.set("moves:ryu", JSON.stringify(ryuMovesWithId));

  console.log("Seed complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
