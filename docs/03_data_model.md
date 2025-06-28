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
  id: z.string().uuid().describe('技ごとの一意なID'),
  name: z.string().describe('技名 (例: 波動拳)'),
  command: z.string().describe('コマンド (例: 236P)'),
  type: z.enum(['special', 'super', 'normal', 'throw']).describe('技の種類'),
  startup: z.string().describe('発生フレーム'),
  active: z.string().describe('持続フレーム'),
  recovery: z.string().describe('硬直フレーム'),
  onHit: z.string().describe('ヒット時フレーム'),
  onBlock: z.string().describe('ガード時フレーム'),
  damage: z.string().describe('ダメージ'),
  stun: z.string().describe('スタン値'),
  driveGauge: z.string().describe('ドライブゲージ増減'),
  notes: z.string().optional().describe('備考'),
});

export type Move = z.infer<typeof moveSchema>;
```

### Vercel KVでの保存形式

キャラクターごとに技リストを保存します。キーにキャラクターIDを含めることで、特定のキャラクターの技データを効率的に取得できるようにします。

-   **Key**: `moves:[characterId]` (例: `moves:ryu`)
-   **Type**: `JSON`
-   **Value**: `Move[]` (上記スキーマの配列)
-   **Example (`moves:ryu`):**
    ```json
    [
      {
        "id": "...",
        "name": "波動拳",
        "command": "236P",
        "type": "special",
        "startup": "14F",
        "active": "...",
        "recovery": "33F",
        "onHit": "+1",
        "onBlock": "-6",
        "damage": "600",
        "stun": "100",
        "driveGauge": "+1000"
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
