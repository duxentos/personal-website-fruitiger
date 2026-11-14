import {miiClips} from '../data/miiClips.ts';
export type MiiReaction='still'|'jump'|'wave'|'dance'|'curious';
export type GreetingPhase='jump'|'wave'|null;
/** Explicit reactions replace random clips. Placement and reduced motion win. */
export function resolveMiiReaction({context,visible,reduced,enabled,greeting,playing,ipodHovered}:{context:'about'|'connect';visible:boolean;reduced:boolean;enabled:boolean;greeting:GreetingPhase;playing:boolean;ipodHovered:boolean}):MiiReaction{
 if(!visible||reduced||!enabled)return 'still';
 if(context==='connect')return 'curious';
 if(ipodHovered)return 'dance';
 if(greeting)return greeting;
 if(playing)return 'dance';
 return 'still';
}
export function nextGreeting(phase:GreetingPhase):GreetingPhase{return phase==='jump'?'wave':null;}
export const greetingDuration={jump:miiClips.jump.durationMs,wave:miiClips.wave.durationMs*5} as const;
/** Explicit taps always replay; only automatic hover/open events are throttled. */
export function canStartGreeting(now:number,last:number,explicit=false){return explicit||now-last>=5500;}

