import {useCallback,useEffect,useRef,useState,type CSSProperties,type ReactNode,type PointerEvent} from 'react';
import {AnimatePresence,LazyMotion,domAnimation,m,useMotionValue,useReducedMotion,useSpring,useTransform,type MotionValue} from 'motion/react';

export type DockItemData={id:string;label:string;icon:ReactNode;onClick?:()=>void;isActive?:boolean;isRunning?:boolean;isMinimized?:boolean;badge?:number};
export type MagneticDockProps={items:DockItemData[];iconSize?:number;maxScale?:number;magneticDistance?:number;showLabels?:boolean;position?:'bottom'|'top'|'left'|'right';variant?:'glass'|'solid'|'transparent';className?:string;reducedMotion?:boolean};
const spring={damping:20,stiffness:300,mass:.5};
function DockItem({item,pointer,iconSize,maxScale,magneticDistance,showLabels,vertical,reduced,touch}:{item:DockItemData;pointer:MotionValue<number>;iconSize:number;maxScale:number;magneticDistance:number;showLabels:boolean;vertical:boolean;reduced:boolean;touch:boolean}){
 const ref=useRef<HTMLButtonElement>(null),focusScale=useMotionValue(1);
 const [hovered,setHovered]=useState(false),[focused,setFocused]=useState(false);
 const distance=useTransform(pointer,value=>{const rect=ref.current?.getBoundingClientRect();return rect?value-(vertical?rect.top+rect.height/2:rect.left+rect.width/2):Infinity});
 const proximity=useTransform(distance,[-magneticDistance,0,magneticDistance],[1,maxScale,1]);
 const target=useTransform(()=>reduced||touch?1:Math.max(proximity.get(),focusScale.get()));
 const scale=useSpring(target,spring),size=useTransform(scale,value=>value*iconSize);
 const lift=useSpring(useTransform(scale,value=>(value-1)*-10),spring);
 useEffect(()=>{if(reduced||touch){focusScale.set(1);scale.jump(1);lift.jump(0)}},[reduced,touch,focusScale,scale,lift]);
 const label=showLabels&&(hovered||focused||touch);
 return <m.button ref={ref} type="button" className={`magnetic-dock-item ${item.isActive?'is-active':''}`} aria-label={`${item.label}${item.isMinimized?', minimized':''}`} aria-current={item.isActive?'page':undefined} onClick={item.onClick}
  onFocus={()=>{setFocused(true);focusScale.set(reduced||touch?1:maxScale)}} onBlur={()=>{setFocused(false);focusScale.set(1)}}
  onPointerEnter={event=>{if(event.pointerType==='mouse'&&!touch)setHovered(true)}} onPointerLeave={()=>setHovered(false)}
  style={{width:reduced||touch?iconSize:size,height:reduced||touch?iconSize:size,x:vertical&&!reduced&&!touch?lift:0,y:!vertical&&!reduced&&!touch?lift:0}}
  whileTap={reduced?undefined:{scale:.94}}>
  <m.span className="magnetic-dock-art" aria-hidden="true" style={{width:iconSize,height:iconSize,scale:reduced||touch?1:scale}}>{item.icon}<m.span className="magnetic-shine" animate={{opacity:hovered ? .8 : .4}}/><m.span className="magnetic-glow" animate={{opacity:hovered||focused?1:0}}/></m.span>
  <AnimatePresence initial={false}>{item.badge!==undefined&&item.badge>0&&<m.span className="magnetic-badge" initial={reduced?false:{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{opacity:0}}>{item.badge>99?'99+':item.badge}</m.span>}</AnimatePresence>
  <AnimatePresence initial={false}>{(item.isRunning||item.isActive)&&<m.span aria-hidden="true" className={`magnetic-running-dot ${item.isActive?'active':''}`} initial={reduced?false:{scale:0,opacity:0}} animate={{scale:1,opacity:1}} exit={{opacity:0}}/>}</AnimatePresence>
  <AnimatePresence initial={false}>{label&&<m.span aria-hidden="true" className={`magnetic-label ${touch?'touch-label':''}`} initial={reduced||touch?false:{opacity:0,y:6,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0}} transition={{duration:reduced?0:.15}}>{item.label}</m.span>}</AnimatePresence>
 </m.button>;
}
/** Adapted from Improvements #4 using the existing motion/react dependency and Aqua icons. */
export function MagneticDock({items,iconSize=48,maxScale=1.5,magneticDistance=150,showLabels=true,position='bottom',variant='glass',className='',reducedMotion=false}:MagneticDockProps){
 const pointer=useMotionValue(Infinity),systemReduce=useReducedMotion();
 const [touch,setTouch]=useState(()=>matchMedia('(hover:none), (pointer:coarse), (max-width:599px)').matches);
 const reduced=Boolean(systemReduce||reducedMotion),vertical=position==='left'||position==='right';
 useEffect(()=>{const media=matchMedia('(hover:none), (pointer:coarse), (max-width:599px)');const update=()=>setTouch(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
 useEffect(()=>{if(touch||reduced)pointer.set(Infinity)},[touch,reduced,pointer]);
 const move=useCallback((event:PointerEvent<HTMLElement>)=>{if(!touch&&!reduced&&event.pointerType==='mouse')pointer.set(vertical?event.clientY:event.clientX)},[pointer,vertical,touch,reduced]);
 const baseSize=touch?40:iconSize;
 return <LazyMotion features={domAnimation} strict><nav className={`desktop-dock magnetic-dock magnetic-${variant} ${className}`} aria-label="application dock" data-position={position} data-touch={touch} data-reduced={reduced} onPointerMove={move} onPointerLeave={()=>pointer.set(Infinity)} style={{'--magnetic-base':`${baseSize}px`} as CSSProperties}>
  {items.map(item=><DockItem key={item.id} item={item} pointer={pointer} iconSize={baseSize} maxScale={maxScale} magneticDistance={magneticDistance} showLabels={showLabels} vertical={vertical} reduced={reduced} touch={touch}/>)}
 </nav></LazyMotion>;
}
