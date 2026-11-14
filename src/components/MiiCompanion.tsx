import {useCallback,useEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from './Desktop';
import {useMusic} from '../apps/ipod/MusicProvider';
import {playSound} from '../audio/SoundEngine';
import {miiClips,miiStill} from '../data/miiClips';
import {canStartGreeting,greetingDuration,nextGreeting,resolveMiiReaction,type GreetingPhase,type MiiReaction} from './miiReaction';

// Every active clip is included in public/ and verified during the build.
const clips:Record<MiiReaction,string>={still:miiStill,jump:miiClips.jump.src,wave:miiClips.wave.src,dance:miiClips.dance.src,curious:miiClips.curious.src};
export function MiiCompanion({context}:{context:'about'|'connect'}){
 const {preferences:p}=useDesktop(),music=useMusic(),systemReduce=useReducedMotion();
 const [hidden,setHidden]=useState(document.hidden),[inView,setInView]=useState(false),[ipodHovered,setIpodHovered]=useState(false);
 const [greeting,setGreeting]=useState<GreetingPhase>(null),[cycle,setCycle]=useState(0),[loaded,setLoaded]=useState('');
 const [failed,setFailed]=useState<string[]>([]);const root=useRef<HTMLDivElement>(null),lastGreet=useRef(-Infinity);
 const reduced=Boolean(systemReduce||p.reducedMotion),visible=!hidden&&inView;
 const greet=useCallback((sound=false,explicit=false)=>{
  if(context!=='about'||!p.miiInteractions||reduced||document.hidden||!canStartGreeting(performance.now(),lastGreet.current,explicit))return;
  lastGreet.current=performance.now();setGreeting('jump');setCycle(n=>n+1);
  if(sound&&p.miiSounds)playSound('mii.interaction');
 },[context,p.miiInteractions,p.miiSounds,reduced]);
 useEffect(()=>{
  const visibility=()=>setHidden(document.hidden),hover=(event:Event)=>setIpodHovered(Boolean((event as CustomEvent<boolean>).detail)),hello=()=>greet();
  document.addEventListener('visibilitychange',visibility);window.addEventListener('ipod-hover',hover);window.addEventListener('mii-greet',hello);
  return()=>{document.removeEventListener('visibilitychange',visibility);window.removeEventListener('ipod-hover',hover);window.removeEventListener('mii-greet',hello)};
 },[greet]);
 useEffect(()=>{
  if(!root.current)return;
  if(!('IntersectionObserver' in window)){setInView(true);return;}
  const observer=new IntersectionObserver(entries=>setInView(entries.some(entry=>entry.isIntersecting)),{threshold:.15});observer.observe(root.current);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{if(visible)greet();else setGreeting(null)},[visible,greet]);
 // A newly started song/hover interrupts a greeting; later explicit greetings may play over ongoing music.
 useEffect(()=>{if(music.playing||ipodHovered)setGreeting(null)},[music.playing,ipodHovered]);
 const reaction=resolveMiiReaction({context,visible,reduced,enabled:p.miiInteractions,greeting,playing:music.playing,ipodHovered});
 const base=clips[reaction],src=failed.includes(base)?clips.still:greeting&&reaction===greeting?`${base}${base.includes('?')?'&':'?'}reaction=${cycle}`:base;
 useEffect(()=>{
  if(!visible||reduced||!greeting)return;
  if(failed.includes(base)){setGreeting(null);return;}
  if(loaded!==src)return;
  const timer=setTimeout(()=>setGreeting(nextGreeting),greetingDuration[greeting]);return()=>clearTimeout(timer);
 },[visible,reduced,greeting,src,base,loaded,failed]);
 return <div ref={root} className={`context-mii context-mii-${context}`} data-reaction={reaction}>
  {context==='about'?<button className="context-mii-button" aria-label="say hi to azaan’s mii" disabled={!p.miiInteractions} onClick={()=>greet(true,true)}><img key={src} src={src} alt="Azaan’s Mii" onLoad={()=>setLoaded(src)} onError={()=>setFailed(value=>value.includes(base)?value:[...value,base])}/><span>say hi ↗</span></button>:<img key={src} src={src} alt="Azaan’s confused Mii looking around" onError={()=>setFailed(value=>value.includes(base)?value:[...value,base])}/>}
 </div>;
}
