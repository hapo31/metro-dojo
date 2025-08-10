
# Command Beautifier

`docs/00_concepts.md` で定義された Command Beautifier を実装するにあたり、新たに追加が必要なライブラリと、想定されるディレクトリ構成についてまとめる。

## 追加ライブラリ

- **`sharp`**: Node.js で動作する高パフォーマンスな画像処理ライブラリ。SVG や、アイコンなどの画像パーツを重ね合わせて動的に画像を生成する本機能の根幹を担う。
- **`react-icons`**: 豊富なアイコンが利用できるライブラリ。ゲームのボタンやアクションを示すアイコンとして利用し、これを `sharp` で画像に焼き込む。

## ディレクトリ構成案

本機能は、`packages/api` に画像生成APIを、`apps/web` にフロントエンドを配置する形で実装します。これにより、関心の分離を図り、モノレポの利点を活かします。

```
.
├── apps
│   └── web
│       ├── ... (既存のファイル)
│       └── src
│           └── app
│               ├── ... (既存のファイル)
│               └── command-beautifier
│                   ├── page.tsx          # 画像生成フォームのメインページ
│                   └── components
│                       ├── Preview.tsx   # 生成画像のプレビュー
│                       └── Form.tsx      # パラメータ入力フォーム
└── packages
    └── api
        ├── ... (既存のファイル)
        └── src
            ├── server.ts       # tRPCルーターの結合
            └── routers
                └── image.ts    # 画像生成APIのtRPCルーター
```

### 各コンポーネントの役割

- **`packages/api/src/routers/image.ts`**:
  - 画像生成ロジックを担当する tRPC ルーター。
  - `sharp` を利用して、キャラクター、コマンド、スタイルなどの情報に基づき画像を動的に生成します。
  - Base64エンコードされた画像データなど、フロントエンドで表示可能な形式で結果を返します。
  - このルーターは `packages/api/src/server.ts` の `appRouter` に統合されます。

- **`apps/web/src/app/command-beautifier/page.tsx`**:
  - Command Beautifier 機能のトップページ。
  - `Preview` と `Form` コンポーネントを配置し、状態管理の責務を持ちます。

- **`apps/web/src/app/command-beautifier/components/Preview.tsx`**:
  - `Form` で入力されたパラメータを元に、tRPC クライアント (`api.image.generate.useQuery`) を使用して画像生成APIを呼び出します。
  - APIから受け取った画像データを表示し、ローディングやエラー状態をハンドリングします。

- **`apps/web/src/app/command-beautifier/components/Form.tsx`**:
  - ユーザーがコマンドや表示スタイルなどを入力・選択するためのフォームコンポーネント。
  - 入力値は `page.tsx` の状態として管理され、`Preview` コンポーネントに渡されます。
