import {Image as ImageIcon,Film} from 'lucide-react';
import {useDesktop} from './Desktop';
import {projectMedia} from '../data/projectMedia';
import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {useReducedMotion} from 'motion/react';
export function ProjectMedia({placement='orbit'}:{placement?:'orbit'|'footer'}){
 const {windows,preferences}=useDesktop(),win=windows[placement==='orbit'?'projects':'welcome'];
 const reduced=useReducedMotion(),root=useRef<HTMLElement>(null);const [hidden,setHidden]=useState(document.hidden),[inView,setInView]=useState(false);
 const shown=win.mode==='open'&&(placement==='footer'||!win.zoom);
 const animate=shown&&inView&&!hidden&&!reduced&&!preferences.reducedMotion;
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{if(!root.current)return;if(!('IntersectionObserver' in window)){setInView(true);return;}const observer=new IntersectionObserver(entries=>setInView(entries.some(e=>e.isIntersecting)));observer.observe(root.current);return()=>observer.disconnect()},[shown]);
 useEffect(()=>{root.current?.querySelectorAll('video').forEach(video=>{if(animate)void video.play().catch(()=>{});else video.pause()})},[animate]);
 if(!shown)return null;
 return <aside ref={root} className={placement==='orbit'?'project-media-orbit':'welcome-polaroids'} aria-label={placement==='orbit'?'project photos and films':'desktop snapshots'} data-animate={animate} style={placement==='orbit'?{'--project-x':`${win.x}px`,'--project-y':`${win.y}px`,'--project-w':`${win.w}px`,'--project-h':`${win.h}px`,zIndex:Math.max(0,win.layer-1)} as CSSProperties:undefined}>{projectMedia.map((item,index)=><figure key={item.id} className={`media-print media-print-${index+1}`}>
 {item.src?item.kind==='video'?<video src={item.src} poster={item.poster} muted loop autoPlay={animate} playsInline preload="metadata" aria-label={item.label}/>:<img src={item.src} alt={item.label} loading="lazy"/>:<div className="media-placeholder" role="img" aria-label={`${item.kind} placeholder`}>{item.kind==='video'?<Film size={25}/>:<ImageIcon size={25}/>}</div>}
 <figcaption>{item.label}</figcaption></figure>)}</aside>;
}
