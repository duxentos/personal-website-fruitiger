export type MiiContext='home'|'ipod'|'find';
export type MiiAppReaction='jump'|'dance'|'curious'|'still';
export function miiContextForActiveApp(active:string|null,previous:MiiContext,findOpen:boolean,ipodOpen:boolean):MiiContext{
 if(active==='connect')return 'find';
 if(active==='ipod')return 'ipod';
 if(active==='avatar')return previous==='find'&&!findOpen||previous==='ipod'&&!ipodOpen?'home':previous;
 return 'home';
}
export function resolveMiiAppReaction({context,playing,musicInteracted,visible,reduced,enabled}:{context:MiiContext;playing:boolean;musicInteracted:boolean;visible:boolean;reduced:boolean;enabled:boolean}):MiiAppReaction{
 if(!visible||reduced||!enabled)return 'still';
 if(context==='find')return 'curious';
 if(context==='ipod'||playing&&musicInteracted)return 'dance';
 return 'jump';
}

export function isRickDance(reaction:MiiAppReaction,track:{id:string;miiDance?:'rick'}|undefined){return reaction==='dance'&&(track?.miiDance==='rick'||track?.id==='track-three')};
