# 00. 環境構築

このドキュメントでは、開発環境の構築手順について説明します。

## 1. 必要なツールのインストール

### 1.1. pnpm

プロジェクトのパッケージ管理には `pnpm` を使用します。以下のコマンドでインストールしてください。

```bash
npm install -g pnpm
```

### 1.2. Node.js

`nvm` (Node Version Manager) を使用して、プロジェクトで利用する Node.js のバージョンを管理することを推奨します。

```bash
# nvm のインストール（未インストールの場合）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Node.js のインストール
nvm install --lts
nvm use --lts
```

プロジェクトルートに `.nvmrc` ファイルを配置することで、`nvm use` コマンドで自動的にバージョンが切り替わるようになります。

## 2. プロジェクトのセットアップ

### 2.1. pnpm ワークスペースの初期化

まず、プロジェクトのルートディレクトリで `package.json` と `pnpm-workspace.yaml` を作成します。

`package.json`:
```json
{
  "name": "metro-dojo",
  "private": true,
  "scripts": {
    "dev": "pnpm --filter web dev",
    "build": "pnpm --filter web build",
    "start": "pnpm --filter web start",
    "lint": "pnpm --filter \"./packages/**\" lint && pnpm --filter web lint",
    "storybook": "pnpm --filter web storybook",
    "build-storybook": "pnpm --filter web build-storybook"
  }
}
```

`pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### 2.2. Next.js (フロントエンド) のセットアップ

`apps/web` ディレクトリに Next.js プロジェクトを作成します。

```bash
pnpm create next-app apps/web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2.3. バックエンド (tRPCサーバー) のセットアップ

`packages/api` ディレクトリに tRPC サーバーのロジックを配置します。

```bash
mkdir -p packages/api
touch packages/api/package.json
touch packages/api/index.ts
touch packages/api/tsconfig.json
```

### 2.4. 共通パッケージのセットアップ

`packages/ui` に Storybook で管理するUIコンポーネントを配置し、`packages/tsconfig` に共通のTypeScript設定を配置します。

```bash
mkdir -p packages/ui
mkdir -p packages/tsconfig
```

## 3. 依存ライブラリのインストール

### 3.1. フロントエンド (`apps/web`)

```bash
pnpm --filter web add @trpc/client @trpc/server @trpc/react-query @trpc/next @tanstack/react-query zod
```

### 3.2. バックエンド (`packages/api`)

```bash
pnpm --filter api add @trpc/server zod
```

### 3.3. Vercel KV

Vercel KV を利用するためのライブラリをインストールします。

```bash
pnpm add @vercel/kv
```

### 3.4. Storybook

UIコンポーネントを管理するために Storybook をセットアップします。

```bash
pnpm --filter web dlx storybook@latest init
```

## 4. エディタ設定

### 4.1. VSCode 推奨拡張機能

プロジェクトルートに `.vscode/extensions.json` を作成し、推奨拡張機能を定義します。

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "csstools.postcss"
  ]
}
