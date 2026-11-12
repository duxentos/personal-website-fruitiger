/** A per-startup presentation duration; independent of network readiness. */
export function pickBootDurationMs(random = Math.random()): number {
  const value = Number.isFinite(random) ? Math.max(0, Math.min(1, random)) : 0;
  return 3000 + Math.round(value * 4000);
}
