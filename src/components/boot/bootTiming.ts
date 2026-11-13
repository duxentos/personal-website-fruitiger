/** Fixed startup presentation time; optional artwork cannot extend it. */
export const BOOT_DURATION_MS = 5000;

export function canEnterDesktop(minimumElapsed:boolean,criticalResolved:boolean){return minimumElapsed&&criticalResolved;}
