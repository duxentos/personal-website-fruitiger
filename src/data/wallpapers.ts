export const wallpapers = {plaza:'/assets/mii-plaza-background.png',vista:'/vista-aurora.svg'} as const;
export type Wallpaper = keyof typeof wallpapers;
// Retired XP/meadow selections follow the author's replacement wallpaper.
export function resolveWallpaper(value:unknown):Wallpaper {return value==='vista'?'vista':'plaza';}
