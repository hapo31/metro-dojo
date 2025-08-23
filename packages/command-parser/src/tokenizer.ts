/**
 * コンボレシピの文字列をトークンに分割するトークナイザー
 */

export interface Token {
  /** トークンの内容（空白除去済み） */
  value: string;
  /** 元の文字列内での開始位置 */
  start: number;
  /** 元の文字列内での終了位置 */
  end: number;
}

/**
 * コンボレシピ文字列をトークンに分割する
 * @param input コンボレシピ文字列
 * @returns トークンの配列
 */
export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  const separators = /[>＞]/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  match = separators.exec(input);
  while (match !== null) {
    // 区切り文字より前の部分をトークンとして追加
    const tokenValue = input.slice(lastIndex, match.index);
    const trimmedValue = tokenValue.trim();

    if (trimmedValue.length > 0) {
      tokens.push({
        value: trimmedValue,
        start: lastIndex,
        end: match.index,
      });
    }

    lastIndex = match.index + 1;
    match = separators.exec(input);
  }

  // 最後の区切り文字以降の部分を処理
  if (lastIndex < input.length) {
    const tokenValue = input.slice(lastIndex);
    const trimmedValue = tokenValue.trim();

    if (trimmedValue.length > 0) {
      tokens.push({
        value: trimmedValue,
        start: lastIndex,
        end: input.length,
      });
    }
  }

  return tokens;
}

/**
 * トークン配列を文字列に戻す（デバッグ用）
 * @param tokens トークン配列
 * @param separator 区切り文字（デフォルト: ">"）
 * @returns 結合された文字列
 */
export function tokensToString(tokens: Token[], separator = ">"): string {
  return tokens.map((token) => token.value).join(` ${separator} `);
}
