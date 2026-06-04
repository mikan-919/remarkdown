const REQUESTS_PER_MINUTE = 5
const WINDOW_MS = 60_000

export class RateLimiter {
  private timestamps: number[] = []

  canRequest(): boolean {
    const now = Date.now()
    this.timestamps = this.timestamps.filter(t => now - t < WINDOW_MS)
    return this.timestamps.length < REQUESTS_PER_MINUTE
  }

  record(): void {
    this.timestamps.push(Date.now())
  }

  // 次にリクエスト可能になるまでのms。即座に可能なら0
  msUntilNext(): number {
    if (this.canRequest()) return 0
    const oldest = this.timestamps[0]
    return WINDOW_MS - (Date.now() - oldest)
  }
}
