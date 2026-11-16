import {useEffect,useRef,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import {useDesktop} from './Desktop';
import {welcomePhotos,welcomeVideo,snapshotPair} from '../data/welcomeSnapshots';

export function WelcomeSnapshots(){
 const {preferences,windows}=useDesktop(),systemReduced=useReducedMotion();
 const root=useRef<HTMLElement>(null),video=useRef<HTMLVideoElement>(null);
 const [hidden,setHidden]=useState(document.hidden),[inView,setInView]=useState(false),[paused,setPaused]=useState(false),[step,setStep]=useState(0);
 const reduced=Boolean(systemReduced||preferences.reducedMotion);
 const animate=windows.welcome.mode==='open'&&inView&&!hidden&&!reduced&&!paused;
 const photos=snapshotPair(welcomePhotos,step);
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{if(!root.current)return;if(!('IntersectionObserver' in window)){setInView(true);return;}const observer=new IntersectionObserver(entries=>setInView(entries.some(entry=>entry.isIntersecting)),{threshold:.1});observer.observe(root.current);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!animate)return;const timer=setInterval(()=>setStep(value=>value+1),5500);return()=>clearInterval(timer)},[animate]);
 useEffect(()=>{const player=video.current;if(!player)return;if(animate){player.muted=true;void player.play().catch(()=>{})}else player.pause();return()=>player.pause()},[animate]);
 return <aside ref={root} className="welcome-snapshot-gallery" aria-label="personal photos and film" data-animate={animate}>
  <div className="welcome-snapshot-strip">
   <figure className="media-print snapshot-video"><div className="snapshot-viewport"><video ref={video} src={welcomeVideo.src} poster={welcomeVideo.poster} muted loop playsInline autoPlay={animate} preload="metadata" aria-label="silent looping personal film"/></div><figcaption>{welcomeVideo.label}</figcaption></figure>
   {photos.map((photo,index)=><figure className={`media-print snapshot-photo snapshot-photo-${index}`} key={index}><div className="snapshot-viewport"><img key={photo.id} src={photo.src} alt={photo.alt} className="snapshot-changing-image" loading="lazy" decoding="async"/></div><figcaption>{photo.label}</figcaption></figure>)}
  </div>
  <div className="snapshot-controls"><button className="snapshot-toggle" aria-pressed={paused} onClick={()=>setPaused(value=>!value)} disabled={reduced}>{paused||reduced?<Play size={12}/>:<Pause size={12}/>}<span>{reduced?'motion reduced':paused?'resume snapshots':'pause snapshots'}</span></button><div><button aria-label="previous photos" onClick={()=>setStep(value=>value-1)}><ChevronLeft size={15}/></button><button aria-label="next photos" onClick={()=>setStep(value=>value+1)}><ChevronRight size={15}/></button></div></div>
 </aside>;
}
