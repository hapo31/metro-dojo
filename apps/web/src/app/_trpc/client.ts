import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@metro-dojo/api";

// FIXME: 型推論が正しく機能せず、`ts(2742)`エラーが発生するため、明示的に型注釈を追加しています。
// pnpm workspaceとTypeScriptの組み合わせで発生する既知の問題の可能性が高いです。
// tsconfig.jsonやpackage.jsonの設定を見直すことで、根本解決できる可能性があります。
export const api: AppRouter = createTRPCReact<AppRouter>();
