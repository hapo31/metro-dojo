# 02. 実装計画

このドキュメントでは、開発の進め方とタスクをフェーズごとに定義します。

## Phase 1: プロジェクト初期設定

このフェーズでは、`docs/00_setup.md` に基づいてプロジェクトの基盤を構築します。

-   [x] pnpm ワークスペースの初期化 (`package.json`, `pnpm-workspace.yaml`)
-   [x] Next.js アプリケーションの作成 (`apps/web`)
-   [x] 共通パッケージディレクトリの作成 (`packages/api`, `packages/ui`, `packages/tsconfig`)
-   [x] 依存ライブラリのインストール
    -   [x] Next.js & tRPC 関連
    -   [x] Vercel KV
-   [x] Storybook のセットアップ
-   [x] tRPC の設定
    -   [x] `packages/api` に tRPC ルーターの雛形を作成
    -   [x] `apps/web` に tRPC クライアントの設定を追加
-   [x] `packages/tsconfig` に共通の `tsconfig.json` を作成し、各パッケージから参照するように設定
-   [x] Prettier, ESLint の設定

## Phase 2: バックエンド実装 (tRPC & Vercel KV)

技データを管理するためのバックエンド機能を実装します。

-   [x] `docs/03_data_model.md` にて技データのスキーマを定義
-   [ ] Vercel KV にマスターデータを投入するためのseedスクリプトを作成
    -   [ ] 全キャラクターリスト
    -   [ ] 各キャラクターの技データ
-   [x] `packages/api` に tRPC プロシージャを実装
    -   [x] `character.list`: 全キャラクターのリストを取得する
    -   [x] `move.findByCharacter`: 指定されたキャラクターの技リストを取得する
-   [x] Zod を用いて、APIの入力と出力の型を定義

## Phase 3: UIコンポーネント実装 (Storybook)

`packages/ui` に、アプリケーション全体で利用する共通UIコンポーネントを実装します。

-   [ ] `Header`: アプリケーションヘッダー
-   [ ] `Footer`: アプリケーションフッター
-   [ ] `Card`: 情報を表示するためのカードコンポーネント
-   [ ] `CharacterCard`: キャラクター情報を表示するカード
-   [ ] `MoveTable`: 技データを表形式で表示するコンポーネント
-   [ ] `Select`: キャラクター選択などのためのセレクトボックス
-   [ ] 上記すべてのコンポーネントに対する Storybook の Story を作成

## Phase 4: フロントエンド画面実装

UIコンポーネントとバックエンドAPIを組み合わせて、各ページを実装します。

-   [ ] **トップページ (`/`)**
    -   [ ] 全キャラクターを一覧表示する
    -   [ ] `character.list` プロシージャをサーバーコンポーネントで呼び出してデータを取得
    -   [ ] `CharacterCard` を使用して各キャラクターを表示
-   [ ] **キャラクター詳細ページ (`/characters/[characterId]`)**
    -   [ ] 特定キャラクターの技データを表示する
    -   [ ] `move.findByCharacter` プロシージャをクライアントコンポーネントで呼び出してデータを取得 (`@trpc/react-query` を使用)
    -   [ ] `MoveTable` を使用して技データを表示
-   [ ] キャラクター間を移動するためのナビゲーションを実装

## Phase 5: コンボ共有機能 (拡張機能)

基本機能が完成した後の拡張機能として、コンボ共有機能を実装します。

-   [ ] コンボデータのデータモデルを設計
-   [ ] コンボを投稿・閲覧するための tRPC プロシージャを実装
-   [ ] コンボ投稿フォームのUIコンポーネントを作成
-   [ ] コンボ表示用のUIコンポーネントを作成
-   [ ] コンボ投稿・一覧ページを実装
