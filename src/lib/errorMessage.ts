/** Gemini SDKのエラーは生JSONで飛んでくるので、表示できる一文だけ取り出す */
export function readableError(raw: string): string {
  const match = raw.match(/"message"\s*:\s*("(?:[^"\\]|\\.)*")/)
  if (match) {
    try {
      return JSON.parse(match[1])
    } catch {}
  }
  return raw
}
