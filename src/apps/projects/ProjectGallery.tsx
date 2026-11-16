import {useId,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {ChevronLeft,ChevronRight,Expand,Image as ImageIcon,X,Download} from 'lucide-react';
import {useDialogFocus} from '../../components/useDialogFocus';
import {galleryIndex,type ProjectImage as ImageData} from './projectModel';
export function ProjectImage({image,eager=false}:{image:ImageData;eager?:boolean}){
 const[failed,setFailed]=useState(false);
 return failed?<div className="project-image-fallback" role="img" aria-label={image.alt}><ImageIcon size={30}/><span>image unavailable</span></div>:<img className="project-image" src={image.src} width={image.width} height={image.height} style={{aspectRatio:image.width+' / '+image.height}} alt={image.alt} loading={eager?'eager':'lazy'} decoding="async" onError={()=>setFailed(true)}/>;
}
export function ProjectGallery({images,name}:{images:ImageData[];name:string}){
 const[index,setIndex]=useState(0),[expanded,setExpanded]=useState(false),panel=useRef<HTMLElement>(null),captionId=useId();
 useDialogFocus(panel,expanded);
 if(!images.length)return null;
 const current=images[index]??images[0],move=(step:number)=>setIndex(value=>galleryIndex(value,step,images.length));
 const navigation=<><button aria-label="previous project image" disabled={images.length<2} onClick={()=>move(-1)}><ChevronLeft size={18}/></button><span aria-live="polite">{index+1} / {images.length}</span><button aria-label="next project image" disabled={images.length<2} onClick={()=>move(1)}><ChevronRight size={18}/></button></>;
 return <section className="project-gallery" aria-label={name+' image gallery'} onKeyDown={event=>{if(!event.altKey&&!event.ctrlKey&&!event.metaKey&&(event.key==='ArrowLeft'||event.key==='ArrowRight')){event.preventDefault();move(event.key==='ArrowLeft'?-1:1)}}}>
  <div className="project-gallery-stage"><ProjectImage key={current.src} image={current} eager/><button className="gallery-expand" aria-label="open image fullscreen" onClick={()=>setExpanded(true)}><Expand size={17}/></button></div>
  <div className="project-gallery-caption"><p>{current.caption}</p><div className="gallery-navigation">{navigation}</div></div>
  {images.length>1&&<div className="project-gallery-thumbs" aria-label="choose a project image">{images.map((image,i)=><button key={image.id} aria-label={image.caption} aria-pressed={index===i} onClick={()=>setIndex(i)}><ProjectImage image={image}/></button>)}</div>}
  {expanded&&createPortal(<div className="project-lightbox-backdrop" onPointerDown={event=>{if(event.target===event.currentTarget)setExpanded(false)}}>
   <section ref={panel} tabIndex={-1} className="project-lightbox" role="dialog" aria-modal="true" aria-labelledby={captionId} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();setExpanded(false)}if(!event.altKey&&!event.ctrlKey&&!event.metaKey&&(event.key==='ArrowLeft'||event.key==='ArrowRight')){event.preventDefault();event.stopPropagation();move(event.key==='ArrowLeft'?-1:1)}}}>
    <header><h2 id={captionId}>{name} · {current.caption}</h2><button aria-label="close fullscreen image" onClick={()=>setExpanded(false)}><X size={22}/></button></header>
    <div className="project-lightbox-image"><ProjectImage key={current.src} image={current} eager/></div>
    <footer><div className="gallery-navigation">{navigation}</div><a href={current.src} download><Download size={17}/> download image</a></footer>
   </section>
  </div>,document.body)}
 </section>;
}

