# 01. アーキテクチャ設計

このドキュメントでは、アプリケーションの全体的なアーキテクチャについて説明します。

## 1. モノレポ構成

`pnpm` のワークスペース機能を利用して、モノレポ構成を採用します。

```
.
├── apps
│   └── web         # Next.js (Frontend)
├── packages
│   ├── api         # tRPC (Backend for Frontend)
│   ├── ui          # React Components (Storybook)
│   └── tsconfig    # 共通のtsconfig
├── docs            # ドキュメント
├── package.json
└── pnpm-workspace.yaml
```

- **`apps/web`**: Next.js で構築されたフロントエンドアプリケーションです。UIの表示、ユーザーインタラクションの処理を担当します。
- **`packages/api`**: tRPC を用いて BFF (Backend for Frontend) として機能します。Vercel KV から技データを取得し、フロントエンドに提供します。
- **`packages/ui`**: Storybook で管理される再利用可能なUIコンポーネント群です。
- **`packages/tsconfig`**: ワークスペース全体で共有される TypeScript の設定を管理します。

## 2. 技術スタック

- **フロントエンド**: Next.js, React, TypeScript, Tailwind CSS
- **バックエンド (BFF)**: tRPC
- **データ永続化**: Vercel KV
- **状態管理 (API)**: TanStack Query (`@tanstack/react-query`)
- **コンポーネント管理**: Storybook
- **パッケージ管理**: pnpm

## 3. データフロー

アプリケーションの主要なデータフローは以下の通りです。

```mermaid
graph TD
    subgraph Browser
        A[Next.js / React Component] -->|1. API Call (TanStack Query)| B(tRPC Client)
    end

    subgraph Server
        B -->|2. HTTP Request| C{Next.js App Router}
        C -->|3. Procedure Call| D[tRPC Router (packages/api)]
        D -->|4. Get Data| E[Vercel KV]
        E -->|5. Return Data| D
        D -->|6. Return JSON| C
        C -->|7. Return JSON| B
    end

    B -->|8. Cache & Return Data| A

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
```

1.  **API Call**: クライアントサイドのReactコンポーネントが、`@trpc/react-query` (TanStack Query) を使ってtRPCのプロシージャを呼び出します。
2.  **HTTP Request**: tRPCクライアントが、Next.jsのApp RouterにHTTPリクエストを送信します。
3.  **Procedure Call**: App Routerがリクエストを受け取り、`packages/api` で定義されたtRPCルーターの対応するプロシージャを呼び出します。
4.  **Get Data**: tRPCプロシージャが、Vercel KVにアクセスして必要な技データを取得します。
5.  **Return Data**: Vercel KVがデータを返します。
6.  **Return JSON**: tRPCルーターが、取得したデータをJSON形式でApp Routerに返します。
7.  **Return JSON**: App Routerが、JSONをクライアントに返します。
8.  **Cache & Return Data**: tRPCクライアント (TanStack Query) がデータを受け取り、キャッシュに保存した後、Reactコンポーネントに渡します。コンポーネントは受け取ったデータを使ってUIをレンダリングします。

サーバーコンポーネントを利用する場合は、1, 2, 7, 8 のステップが省略され、サーバーサイドで直接 tRPC プロシージャを呼び出します。
