import {miiAnimations,selectAnimation} from '../../data/miiAnimations.ts';
export const BOOT_ASSET_TIMEOUT_MS=3800;
const runners=miiAnimations.filter(animation=>animation.category==='locomotion');
/** Choose once per boot; a deliberate restart avoids the previous runner. */
export function selectBootRunner(previous?:string,randomized=true,random=Math.random()){
 return randomized?selectAnimation(runners,previous,{},0,random)!:runners[0];
}
/** Start the crossing clock only when its image loads, never while downloading. */
export function bootRemainingMs({assetsSettled,startedAt,durationMs,now,reduced,failed}:{assetsSettled:boolean;startedAt:number|null;durationMs:number;now:number;reduced:boolean;failed:boolean}):number|null{
 if(!assetsSettled)return null;
 if(reduced||failed)return 0;
 if(startedAt===null)return null;
 return Math.max(0,durationMs-(now-startedAt));
}
