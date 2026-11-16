import {useEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from '../../components/Desktop';
import {useMusic} from '../ipod/MusicProvider';
import {miiClips,miiStill,miiRick} from '../../data/miiClips';
import {miiContextForActiveApp,resolveMiiAppReaction,isRickDance,type MiiContext} from '../../components/miiReaction';
import {playSound} from '../../audio/SoundEngine';

/** The only rendered Mii: one app, driven by the desktop's current context. */
export function MiiApp(){
 const {active,windows,preferences:p}=useDesktop(),music=useMusic(),systemReduce=useReducedMotion();
 const [previous,setPrevious]=useState<MiiContext>('home'),[hidden,setHidden]=useState(document.hidden),[inView,setInView]=useState(false),[replay,setReplay]=useState(0),[failed,setFailed]=useState<string[]>([]);
 const root=useRef<HTMLDivElement>(null);
 const context=miiContextForActiveApp(active,previous,windows.connect.mode==='open',windows.ipod.mode==='open');
 useEffect(()=>{setPrevious(context)},[context]);
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{if(!root.current)return;if(!('IntersectionObserver' in window)){setInView(true);return;}const observer=new IntersectionObserver(entries=>setInView(entries.some(e=>e.isIntersecting)),{threshold:.15});observer.observe(root.current);return()=>observer.disconnect()},[]);
 const reaction=resolveMiiAppReaction({context,playing:music.playing,musicInteracted:music.interacted,visible:inView&&!hidden,reduced:Boolean(systemReduce||p.reducedMotion),enabled:p.miiInteractions});
 const rick=isRickDance(reaction,music.track);
 const base=reaction==='still'?miiStill:rick?miiRick:miiClips[reaction].src;
 const src=failed.includes(base)?miiStill:reaction==='still'?base:`${base}?replay=${replay}`;
 const label=rick?'rick astley dancing':reaction==='jump'?'jumping':reaction==='dance'?'dancing':reaction==='curious'?'thinking':'resting';
 return <div ref={root} className={`mii-app-stage ${rick&&!failed.includes(base)?'mii-rick-dancing':''}`} data-reaction={rick?'rick-dance':reaction}><button className="mii-app-replay" aria-label={`replay ${label} mii animation`} disabled={reaction==='still'} onClick={()=>{setReplay(n=>n+1);if(p.miiSounds)playSound('mii.interaction')}}><img key={src} src={src} alt={`Azaan’s Mii ${label}`} onError={()=>setFailed(value=>value.includes(base)?value:[...value,base])}/></button></div>;
}
