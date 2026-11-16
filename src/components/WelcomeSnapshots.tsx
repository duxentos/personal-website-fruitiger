import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {useReducedMotion} from 'motion/react';
import {ChevronLeft,ChevronRight,Pause,Play,Image as ImageIcon} from 'lucide-react';
import {useDesktop} from './Desktop';
import {welcomePhotos,welcomeVideo,snapshotFramePhotos,type SnapshotPhoto} from '../data/welcomeSnapshots';

function SnapshotImage({photo}:{photo:SnapshotPhoto}){
 const[loaded,setLoaded]=useState(false),[failed,setFailed]=useState(false);
 return <div className="snapshot-image-stack" data-loaded={loaded} style={{'--photo-position':photo.position} as CSSProperties}>
  {failed?<div className="snapshot-missing" role="img" aria-label={photo.alt}><ImageIcon size={22}/><span>photo unavailable</span></div>:<img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" onLoad={()=>setLoaded(true)} onError={()=>setFailed(true)}/>}
  <span className="snapshot-gel-highlight" aria-hidden="true"/><span className="snapshot-pop-bubbles" aria-hidden="true"><i/><i/><i/></span>
 </div>;
}

export function WelcomeSnapshots(){
 const {preferences,windows}=useDesktop(),systemReduced=useReducedMotion();
 const root=useRef<HTMLElement>(null),video=useRef<HTMLVideoElement>(null);
 const [hidden,setHidden]=useState(document.hidden),[inView,setInView]=useState(false),[paused,setPaused]=useState(false),[step,setStep]=useState(0);
 const reduced=Boolean(systemReduced||preferences.reducedMotion);
 const animate=windows.welcome.mode==='open'&&inView&&!hidden&&!reduced&&!paused;
 const photos=snapshotFramePhotos(welcomePhotos,step);
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{if(!root.current)return;if(!('IntersectionObserver' in window)){setInView(true);return;}const observer=new IntersectionObserver(entries=>setInView(entries.some(entry=>entry.isIntersecting)),{threshold:.1});observer.observe(root.current);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!animate)return;const timer=setInterval(()=>setStep(value=>value+1),6500);return()=>clearInterval(timer)},[animate]);
 useEffect(()=>{const player=video.current;if(!player)return;if(animate){player.muted=true;void player.play().catch(()=>{})}else player.pause();return()=>player.pause()},[animate]);
 return <aside ref={root} className="welcome-snapshot-gallery" aria-label="personal photos and film" data-animate={animate}>
  <div className="welcome-snapshot-strip">
   <figure className="media-print snapshot-video" style={{'--snapshot-ratio':`${welcomeVideo.width} / ${welcomeVideo.height}`} as CSSProperties}><div className="snapshot-viewport"><video ref={video} width={welcomeVideo.width} height={welcomeVideo.height} src={welcomeVideo.src} poster={welcomeVideo.poster} muted loop playsInline autoPlay={animate} preload="metadata" aria-label="silent looping personal film"/></div><figcaption>{welcomeVideo.label}</figcaption></figure>
   {photos.map(({frame,photo})=><figure className={`media-print snapshot-photo snapshot-frame-${frame.id}`} key={frame.id} style={{'--snapshot-ratio':frame.ratio} as CSSProperties}><div className="snapshot-viewport"><SnapshotImage key={photo.id} photo={photo}/></div><figcaption>{photo.label}</figcaption></figure>)}
  </div>
  <div className="snapshot-controls"><button className="snapshot-toggle" aria-pressed={paused} onClick={()=>setPaused(value=>!value)} disabled={reduced}>{paused||reduced?<Play size={12}/>:<Pause size={12}/>}<span>{reduced?'motion reduced':paused?'resume snapshots':'pause snapshots'}</span></button><div><button aria-label="previous photos" onClick={()=>setStep(value=>value-1)}><ChevronLeft size={15}/></button><button aria-label="next photos" onClick={()=>setStep(value=>value+1)}><ChevronRight size={15}/></button></div></div>
 </aside>;
}
