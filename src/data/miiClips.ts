/** Original supplied Mii.md files, committed locally. Frame timing is measured from each GIF. */
export const miiClips={
 jump:{src:'/mii-intro.gif',frames:200,durationMs:4000},
 wave:{src:'/mii-wave.gif',frames:11,durationMs:220},
 dance:{src:'/mii-music-dance.gif',frames:100,durationMs:2000},
 happy:{src:'/mii-happy.gif',frames:50,durationMs:1000},
 curious:{src:'/mii-curious.gif',frames:121,durationMs:2420},
 crossing:{src:'/mii-crossing.gif',frames:175,durationMs:7000},
 shortcut:{src:'/mii-shortcut.gif',frames:175,durationMs:7000},
 littleHop:{src:'/mii-little-hop.gif',frames:175,durationMs:7000},
} as const;
export const miiStill='/mii-still.png';

/** Improvement 8 selects the original supplied happy GIF for Rick Astley. */
export const miiRick=miiClips.happy.src;
