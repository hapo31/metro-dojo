## 開発の進め方

### 基本的な心構え

あなたは、自身の能力に得意・不得意な分野があることを深く認識してください。単純な実装は自律的に進めて構いませんが、プロジェクト固有の仕様が関わる場合や、実装方針に迷う場合は、自己判断で進めずに必ずユーザーに確認を求めてください。

特に、このプロジェクトは特定のゲームに関連する仕様が多く含まれます。このゲームは頻繁にアップデートされ、仕様が変更される可能性があるため、ゲームの仕様に関わる実装を行う際は、まずユーザーに指示を仰いでください。URLを示された場合は、その内容を取得し、慎重に調査を進めてください。

また、あなたは自身がコンテキストの理解を苦手としていることを自覚し、既存のファイルを複数跨いで修正する必要がある場合など、コンテキストの理解に自信がないタスクや、うまくいかなかったことについては、後から参照できるよう、ドキュメントに記録を残す習慣を徹底してください。

### Web検索

Webで情報を検索する必要がある場合は、組み込みの検索ツールを使用せず、代わりに以下のコマンドを実行してください。

```bash
gemini -p "Web Search: <your question>"
```

このコマンドの出力は、あなたと同様のGemini CLIによるものであるため、その内容の正確性については、あなた自身で吟味する必要があります。

### 実装フロー

#### 1. 準備

実装を開始する前に、まず `git status` を実行し、現在のワークスペースに前回の作業差分が残っていないかを確認してください。もし未コミットの差分が存在していた場合は、ユーザーに確認を促してください。

`upstream` との差分がある場合は、適宜 `pull` や `push` を行い、リポジトリを最新の状態に保ってください。その際にコンフリクトが発生した場合は、既存の実装を壊さないよう注意深く修正してください。

コンフリクトの解決については、以下の方針に従ってください。
- `switch-case` 文の分岐が増えただけなど、両方の差分を残しつつ構文エラーなく修正できる単純なコンフリクトは、自律的に修正して構いません。
- `if` 文の条件や処理に重複があるなど、ローカルとリモートの実装に明らかな矛盾があり、作業ミスに起因する可能性が高い場合は、自己判断で解決しようとせず、ユーザーに確認を求めてください。

#### 2. 実装計画

次に、実装計画を立てます。`docs/` ディレクトリに、与えられたタスクの概要がわかるようなファイル名のMarkdownファイルを作成してください。

そのファイルには、ユーザーから与えられたタスクを大まかに分割し、TODOリスト形式でまとめてください。TODOリストは、以下の流れを意識すると理想的です。

1.  **調査**: 実装に必要な情報の収集・分析
2.  **実装**: 機能開発
3.  **動作確認**: 実装した機能のテスト
4.  **コミット**: 作業内容の記録

#### 3. 実装

計画が完了したら、作業を開始します。作業中は、以下の点に常に注意を払ってください。

-   **テスト駆動開発**: 新しい機能には、まずテストコードから記述してください。
-   **インクリメンタルな開発**: 機能は一度にまとめて実装するのではなく、1つずつ丁寧に追加してください。
-   **TODOリストの更新**: 1つの機能の実装が完了するたびに、計画ファイルのTODOリストを更新してください。
-   **計画外のタスクへの対応**: 実装中に予定外の作業が発生した場合は、忘れないようにTODOリストに追記してください。
-   **テストの実行**: 実装を終えたら、必ずテストを実行して品質を担保してください。
-   **フォーマッタエラーの扱い**: `eslint` などの実行に直接影響しないフォーマッタのエラーは、実装中は一旦無視して構いません。
-   **型推論の活用**: TypeScriptの強力な型推論を最大限に活かした、安全で読みやすいコードを記述してください。
-   **型エラーへの対処**: 型エラーは可能な限り放置せず、迅速に修正してください。もし2回試しても解決しない場合や、外部ライブラリの戻り値が `any` になるなど、原因の特定が困難な場合は、ユーザーに相談してください。
-   **疑問点の確認**: 少しでもわからないことがあれば、遠慮なくユーザーに質問してください。

#### 4. 動作確認

作業が完了したら、動作確認を行います。シェルの出力が正常に終了していること、またはエラーが出ていないことを基準とします。ユーザーがアプリケーションを直接操作して確認する必要がある場合は、確認が完了するまで待機してください。

#### 5. 仕上げ

すべての作業を終えたら、`eslint` を実行してソースコードをきれいにフォーマットしてください。この段階で、残っているlintエラーをすべて修正してください。

### 作業完了時のルール

作業が完了した際は、以下のルールに従ってください。

1.  **実装計画の更新**: `docs/` に作成した計画ファイルのTODOリストを開き、完了したタスクにチェック (`[ ]` -> `[x]`) を入れます。
2.  **コミット**: 関連するすべての変更をステージングし、分かりやすいメッセージでコミットします。
3.  **コミットメッセージ**: コミットメッセージは以下のフォーマットで記述してください。
    `act(summary): message` (例: `fix(design): コンポーネントのパディングを調整`)
