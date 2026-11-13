export const BOOT_CROSSINGS=1.25;
export const BOOT_ASSET_TIMEOUT_MS=3800;
export const BOOT_FALLBACK_MS=1200;
/** One supplied traversal clip is one crossing (175 frames, measured 7000ms). */
export function crossingDuration(durationMs:number,crossings=BOOT_CROSSINGS){return Math.round((Number.isFinite(durationMs)&&durationMs>0?durationMs:7000)*crossings);}
export function canEnterDesktop(crossingComplete:boolean,criticalResolved:boolean){return crossingComplete&&criticalResolved;}
