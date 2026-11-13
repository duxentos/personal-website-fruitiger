export type RepeatMode='all'|'one'|'off';
export function nextIndex(current:number,count:number,direction:number,repeat:RepeatMode,shuffle:boolean,random=Math.random()):number|null{if(!count)return null;if(repeat==='one'&&direction===0)return current;if(shuffle&&count>1)return(current+1+Math.floor(random*(count-1)))%count;const next=current+(direction||1);if(next>=0&&next<count)return next;return repeat==='all'?(next+count)%count:null}
export function angleDelta(previous:number,current:number){let delta=current-previous;while(delta>180)delta-=360;while(delta< -180)delta+=360;return Math.abs(delta)>90?0:delta}
export function timeLabel(seconds:number){if(!Number.isFinite(seconds)||seconds<0)return'0:00';return Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0')}
