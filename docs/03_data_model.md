# 03. データモデル

このドキュメントでは、アプリケーションで利用するデータの構造（スキーマ）と、Vercel KVでの保存形式について定義します。
スキーマの定義には Zod を利用し、TypeScriptの型としても利用します。

## 1. Character (キャラクター)

キャラクターの基本情報を表すデータモデルです。

### スキーマ定義

```typescript
import { z } from 'zod';

export const characterSchema = z.object({
  id: z.string().describe('キャラクターID (例: ryu, ken)'),
  name: z.string().describe('キャラクター名 (例: リュウ, ケン)'),
  image: z.string().url().optional().describe('キャラクターの画像URL'),
});

export type Character = z.infer<typeof characterSchema>;
```

### Vercel KVでの保存形式

全キャラクターのリストを単一のキーで保存します。

-   **Key**: `characters`
-   **Type**: `JSON`
-   **Value**: `Character[]` (上記スキーマの配列)
-   **Example**:
    ```json
    [
      { "id": "ryu", "name": "リュウ" },
      { "id": "ken", "name": "ケン" },
      { "id": "chun-li", "name": "春麗" }
    ]
    ```

## 2. Move (技)

各キャラクターの技情報を表すデータモデルです。

### スキーマ定義

```typescript
import { z } from 'zod';

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
```

### Vercel KVでの保存形式

キャラクターごとに技リストを保存します。キーにキャラクターIDを含めることで、**特定のキャラクターの技データを効率的に取得**できるようにします。
この方法により、`character`データに`moveIds`のような配列を持たせる必要がなくなり、データ構造がシンプルになります。

> **将来的な拡張性について**
> 将来的に「発生フレームが5F以下の技」のように、キャラクターを横断して技の性質で検索する機能が必要になった場合、このままの構造では全キャラクターの技データを取得する必要があり非効率です。
> その際は、`index:startup:5` のような検索条件をキーにした「逆引きインデックス」を別途作成することで、高速な検索を実現できます。このインデックスは後から追加可能なため、現時点では考慮しません。

-   **Key**: `moves:[characterId]` (例: `moves:ryu`)
-   **Type**: `JSON`
-   **Value**: `Move[]` (上記スキーマの配列)
-   **Example (`moves:ryu`):**
    ```json
    [
      {
        "id": "...",
        "name": "弱 波動拳",
        "commandClassic": "236LP",
        "commandModern": "N + SP",
        "type": "special",
        "startup": "16",
        "active": "",
        "recovery": "47",
        "onHit": "2",
        "onBlock": "-5",
        "cancel": "SA3",
        "damage": "700",
        "scaling": "",
        "driveGaugeOnHit": "1000",
        "driveGaugeOnBlock": "-2500",
        "driveGaugeOnPunish": "-3000",
        "saGauge": "600",
        "attribute": "上・弾",
        "notes": ""
      }
    ]
    ```

## 3. Combo (コンボ) - 拡張機能

コンボ共有機能で利用するデータモデルです。

### スキーマ定義

```typescript
import { z } from 'zod';

export const comboSchema = z.object({
  id: z.string().uuid(),
  characterId: z.string().describe('キャラクターID'),
  combo: z.string().describe('コンボレシピ (例: J大K > 2中P > 波動拳)'),
  damage: z.number(),
  driveGaugeCost: z.number().describe('消費ドライブゲージ'),
  author: z.string().optional().describe('投稿者名'),
  createdAt: z.date(),
});

export type Combo = z.infer<typeof comboSchema>;
