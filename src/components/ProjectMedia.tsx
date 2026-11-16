import {Expand,Image as ImageIcon,Play,X,Download,ExternalLink} from 'lucide-react';
import {createPortal} from 'react-dom';
import {useEffect,useId,useLayoutEffect,useRef,useState,type CSSProperties} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from './Desktop';
import {useDialogFocus} from './useDialogFocus';
import {projectMedia,type ProjectMedia as Media} from '../data/projectMedia';
import {projectPhotoLayout} from './projectPhotoLayout';

function FramePreview({item}:{item:Media}){
 const[failed,setFailed]=useState(false);
 if(failed)return <span className="project-photo-fallback" role="img" aria-label={item.alt}><ImageIcon size={24}/><span>open original media</span></span>;
 return item.kind==='video'?<><video src={item.src} poster={item.poster} width={item.width} height={item.height} muted loop playsInline preload="none" aria-label={item.alt} onError={()=>setFailed(true)}/><span className="project-photo-play"><Play size={20}/><span>full video · 0:52</span></span></>:<img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" decoding="async" onError={()=>setFailed(true)}/>;
}
function MediaViewer({item,onClose}:{item:Media;onClose:()=>void}){
 const panel=useRef<HTMLElement>(null),titleId=useId(),[failed,setFailed]=useState(false);
 useDialogFocus(panel);
 useEffect(()=>{const pause=()=>{if(document.hidden)panel.current?.querySelector('video')?.pause()};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause)},[]);
 return createPortal(<div className="project-photo-backdrop" onPointerDown={event=>{if(event.target===event.currentTarget)onClose()}}><section ref={panel} tabIndex={-1} className="project-photo-viewer" role="dialog" aria-modal="true" aria-labelledby={titleId} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();onClose()}}}>
  <header><h2 id={titleId}>{item.label}</h2><button aria-label="close project media" onClick={onClose}><X size={22}/></button></header>
  <div className="project-photo-viewer-stage">{failed?<p>this media could not load. you can open the original below.</p>:item.kind==='video'?<video src={item.src} poster={item.poster} width={item.width} height={item.height} controls playsInline autoPlay muted preload="metadata" aria-label={item.alt} onError={()=>setFailed(true)}/>:<img src={item.src} width={item.width} height={item.height} alt={item.alt} onError={()=>setFailed(true)}/>}</div>
  <footer><span>{item.kind==='video'?'full 51.5-second video · starts muted':'full photo'}</span><div><a href={item.src} download><Download size={15}/> download</a><a href={item.source} target="_blank" rel="noreferrer"><ExternalLink size={15}/> original</a></div></footer>
 </section></div>,document.body);
}
export function ProjectMedia({placement='orbit'}:{placement?:'orbit'|'inline'}){
 const {windows,preferences}=useDesktop(),win=windows.projects;
 const root=useRef<HTMLElement>(null),reduced=useReducedMotion();
 const[size,setSize]=useState(()=>({w:innerWidth,h:Math.max(180,innerHeight-150)})),[hidden,setHidden]=useState(document.hidden),[inView,setInView]=useState(false),[selected,setSelected]=useState<Media|null>(null);
 useLayoutEffect(()=>{const workspace=document.querySelector('.desktop-workspace');if(!workspace)return;const measure=()=>{const next={w:workspace.clientWidth,h:workspace.clientHeight};setSize(previous=>previous.w===next.w&&previous.h===next.h?previous:next)};measure();const observer=new ResizeObserver(measure);observer.observe(workspace);return()=>observer.disconnect()},[]);
 const plan=projectPhotoLayout(win,size,projectMedia),shown=win.mode==='open'&&plan.mode===placement;
 const animate=shown&&inView&&!hidden&&!reduced&&!preferences.reducedMotion&&!selected;
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 useEffect(()=>{if(!shown||!root.current)return;if(!('IntersectionObserver' in window)){setInView(true);return}const observer=new IntersectionObserver(entries=>setInView(entries.some(entry=>entry.isIntersecting)));observer.observe(root.current);return()=>observer.disconnect()},[shown]);
 useEffect(()=>{const videos=Array.from(root.current?.querySelectorAll('video')??[]);videos.forEach(video=>{if(animate)void video.play().catch(()=>{});else video.pause()});return()=>videos.forEach(video=>video.pause())},[animate,shown]);
 useEffect(()=>{if(win.mode!=='open')setSelected(null)},[win.mode]);
 function closeViewer(){const id=selected?.id;setSelected(null);if(id)requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('[data-project-media-id="'+id+'"] button')?.focus({preventScroll:true}))}
 // Keep an open viewer mounted if resizing moves the frame collection between desktop and window.
 return <>{shown&&<aside ref={root} className={'project-photo-collection project-photo-'+placement} aria-label="project photos and full video" data-animate={animate} style={placement==='orbit'?{zIndex:Math.max(0,win.layer-1)}:undefined}>
  {placement==='inline'&&<header><h3>along the way</h3><span>photos & a little film · tap to open</span></header>}
  <div className="project-photo-prints">{projectMedia.map((item,index)=>{const frame=plan.frames[index];return <figure key={item.id} data-project-media-id={item.id} className={'project-photo-print project-photo-print-'+(index+1)} style={{...(placement==='orbit'&&frame?{left:frame.x,top:frame.y,width:frame.w}:{}),'--media-aspect':item.width+' / '+item.height} as CSSProperties}>
   <button className="project-photo-open" aria-label={(item.kind==='video'?'play full video: ':'view full photo: ')+item.label} onClick={()=>setSelected(item)}><FramePreview item={item}/>{item.kind==='photo'&&<span className="project-photo-expand"><Expand size={14}/></span>}</button><figcaption>{item.label}</figcaption>
  </figure>})}</div>
 </aside>}{selected&&win.mode==='open'&&<MediaViewer key={selected.id} item={selected} onClose={closeViewer}/>}</>;
}
