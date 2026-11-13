import {Image as ImageIcon,Film} from 'lucide-react';
import {useDesktop} from './Desktop';
import {projectMedia} from '../data/projectMedia';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {useReducedMotion} from 'motion/react';
export function ProjectMedia(){
 const {windows,preferences}=useDesktop(),win=windows.projects;
 const reduced=useReducedMotion(),root=useRef<HTMLElement>(null);const [hidden,setHidden]=useState(document.hidden);
 const animate=win.mode==='open'&&!win.zoom&&!hidden&&!reduced&&!preferences.reducedMotion;
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{root.current?.querySelectorAll('video').forEach(video=>{if(animate)void video.play().catch(()=>{});else video.pause()})},[animate]);
 if(win.mode!=='open'||win.zoom)return null;
 return <aside ref={root} className="project-media-orbit" aria-label="project photos and films" style={{'--project-x':`${win.x}px`,'--project-y':`${win.y}px`,'--project-w':`${win.w}px`,'--project-h':`${win.h}px`,zIndex:Math.max(0,win.layer-1)} as CSSProperties}>{projectMedia.map((item,index)=><figure key={item.id} className={`media-print media-print-${index+1}`}>
 {item.src?item.kind==='video'?<video src={item.src} poster={item.poster} muted loop autoPlay={animate} playsInline preload="metadata" aria-label={item.label}/>:<img src={item.src} alt={item.label} loading="lazy"/>:<div className="media-placeholder" role="img" aria-label={`${item.kind} placeholder`}>{item.kind==='video'?<Film size={25}/>:<ImageIcon size={25}/>}</div>}
 <figcaption>{item.label}</figcaption></figure>)}</aside>;
}
