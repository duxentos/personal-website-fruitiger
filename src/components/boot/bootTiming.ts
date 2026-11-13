/** Normal startup, including transition and slow-asset fallback, stays within 3–4 seconds. */
export const BOOT_DURATION_MS = 3500;
export const BOOT_ASSET_TIMEOUT_MS = 3800;
export const BOOT_EXIT_MS = 180;
export function canEnterDesktop(minimumElapsed:boolean,criticalResolved:boolean){return minimumElapsed&&criticalResolved;}
