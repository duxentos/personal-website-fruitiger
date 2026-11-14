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
export const greetingDuration={jump:4000,wave:1100} as const;
