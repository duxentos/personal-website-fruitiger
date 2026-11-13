import {useLayoutEffect,useRef,useState,type CSSProperties,type ReactNode,type PointerEvent as ReactPointerEvent} from 'react';
import {Minus,Plus,X} from 'lucide-react';
import {useDesktop,type WindowId} from './Desktop';
import {isTouchDesktop,touchDesktopQuery} from './desktopLayout';
import {fitWindowFrame,moveWindowFrame,resizeWindowFrame,type ResizeEdge,type WindowFrame,type WorkspaceSize} from './windowGeometry';
import {beginWindowGesture,updateWindowGesture,localPointer,sameWindowFrame,type WindowGesture} from './windowGesture';

type Props={id:WindowId;children:ReactNode;className?:string};
type ActiveGesture={model:WindowGesture;parent:HTMLElement;host:HTMLElement;cleanup:()=>void};
export function AquaWindow({id,children,className=''}:Props){
 const desktop=useDesktop(),win=desktop.windows[id];
 const latestDesktop=useRef(desktop);latestDesktop.current=desktop;
 const section=useRef<HTMLElement>(null),active=useRef<ActiveGesture|null>(null),pending=useRef<WindowFrame|null>(null),lastDrag=useRef(-Infinity);
 const [workspace,setWorkspace]=useState(()=>({w:innerWidth,h:Math.max(56,innerHeight-142),touch:isTouchDesktop()}));
 const frame=fitWindowFrame(win,workspace,workspace.touch);
 function clearPreview(){for(const key of ['--gesture-x','--gesture-y','--gesture-w','--gesture-h','--drag-x','--drag-y','--drag-w','--drag-h'])section.current?.style.removeProperty(key);section.current?.classList.remove('window-gesturing')}
 function paint(next:WindowFrame){const node=section.current;if(!node)return;for(const key of ['x','y','w','h'] as const)node.style.setProperty(`--gesture-${key}`,`${next[key]}px`);node.classList.add('window-gesturing')}
 function parentSize(parent:HTMLElement):WorkspaceSize{return{w:parent.clientWidth,h:parent.clientHeight}}
 function move(event:globalThis.PointerEvent){
  const gesture=active.current;if(!gesture||event.pointerId!==gesture.model.pointerId)return;
  if(event.cancelable)event.preventDefault();
  const size=parentSize(gesture.parent),point=localPointer({x:event.clientX,y:event.clientY},gesture.parent.getBoundingClientRect(),size);
  const next=updateWindowGesture(gesture.model,point,size);if(next)paint(next);
  if(event.pointerType==='mouse'&&event.buttons===0)finish(event);
 }
 function finish(event?:globalThis.PointerEvent,cancelled=false){
  const gesture=active.current;if(!gesture||(event&&event.pointerId!==gesture.model.pointerId))return;
  const size=parentSize(gesture.parent);
  if(event&&!cancelled){const point=localPointer({x:event.clientX,y:event.clientY},gesture.parent.getBoundingClientRect(),size);updateWindowGesture(gesture.model,point,size)}
  active.current=null;gesture.cleanup();
  if(!cancelled&&gesture.model.moved){
   const next=fitWindowFrame({...gesture.model.current,zoom:false},size,gesture.model.touch);
   lastDrag.current=performance.now();pending.current=next;paint(next);latestDesktop.current.change(id,next);
  }else{pending.current=null;clearPreview()}
 }
 useLayoutEffect(()=>{
  if(win.mode!=='open'){finish(undefined,true);pending.current=null;clearPreview();return}
  // Only acknowledge this gesture's actual committed frame, never an unrelated focus render.
  if(pending.current&&sameWindowFrame(win,pending.current)){pending.current=null;clearPreview()}
 },[win.mode,win.x,win.y,win.w,win.h,win.zoom]);
 useLayoutEffect(()=>{
  if(win.mode!=='open')return;const parent=section.current?.parentElement;if(!parent)return;
  const media=matchMedia(touchDesktopQuery);
  const measure=()=>{const next={...parentSize(parent),touch:media.matches};setWorkspace(previous=>{if(previous.w===next.w&&previous.h===next.h&&previous.touch===next.touch)return previous;return next})};
  const changed=()=>{if(active.current)finish();measure()};
  measure();let lastW=parent.clientWidth,lastH=parent.clientHeight;
  const observer=new ResizeObserver(()=>{if(parent.clientWidth===lastW&&parent.clientHeight===lastH)return;lastW=parent.clientWidth;lastH=parent.clientHeight;changed()});
  observer.observe(parent);window.addEventListener('resize',changed);media.addEventListener('change',changed);
  return()=>{observer.disconnect();window.removeEventListener('resize',changed);media.removeEventListener('change',changed)};
 },[win.mode]);
 useLayoutEffect(()=>()=>{active.current?.cleanup();active.current=null},[]);
 function start(event:ReactPointerEvent<HTMLElement>,kind:'move'|'resize',edge?:ResizeEdge){
  if(event.button!==0||active.current||(kind==='resize'&&win.zoom))return;
  if(kind==='move'&&(event.target as Element).closest('button'))return;
  const node=section.current,parent=node?.parentElement;if(!node||!parent)return;
  event.preventDefault();event.currentTarget.focus({preventScroll:true});
  const size=parentSize(parent),bounds=parent.getBoundingClientRect(),rect=node.getBoundingClientRect();
  const point=localPointer({x:event.clientX,y:event.clientY},bounds,size),origin=localPointer({x:rect.left,y:rect.top},bounds,size);
  const actual={x:origin.x,y:origin.y,w:rect.width*size.w/Math.max(1,bounds.width),h:rect.height*size.h/Math.max(1,bounds.height),zoom:win.zoom};
  const host=event.currentTarget,model=beginWindowGesture({pointerId:event.pointerId,kind,edge,point,frame:actual,restore:win,zoomed:win.zoom,touch:isTouchDesktop()});
  const up=(e:globalThis.PointerEvent)=>finish(e),cancel=(e:globalThis.PointerEvent)=>finish(e,true),blur=()=>finish(),hidden=()=>{if(document.hidden)finish()},key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();finish(undefined,true)}};
  window.addEventListener('pointermove',move,{capture:true,passive:false});window.addEventListener('pointerup',up,true);window.addEventListener('pointercancel',cancel,true);window.addEventListener('blur',blur);window.addEventListener('keydown',key,true);document.addEventListener('visibilitychange',hidden);
  active.current={model,parent,host,cleanup:()=>{
   window.removeEventListener('pointermove',move,true);window.removeEventListener('pointerup',up,true);window.removeEventListener('pointercancel',cancel,true);window.removeEventListener('blur',blur);window.removeEventListener('keydown',key,true);document.removeEventListener('visibilitychange',hidden);
   try{if(host.hasPointerCapture(model.pointerId))host.releasePointerCapture(model.pointerId)}catch{}
  }};
  // Global listeners still finish the gesture if capture is unavailable or is lost during focus changes.
  try{host.setPointerCapture(event.pointerId)}catch{}
 }
 if(win.mode!=='open')return null;
 const style={left:frame.x,top:frame.y,width:frame.w,height:frame.h,zIndex:win.layer,'--window-x':`${frame.x}px`,'--window-y':`${frame.y}px`,'--window-w':`${frame.w}px`,'--window-h':`${frame.h}px`,'--window-layer':win.layer} as CSSProperties;
 return <section ref={section} className={`aqua-window ${className} ${win.zoom?'window-zoomed':''} ${desktop.active===id?'is-active':''}`} style={style} aria-label={win.title} onPointerDown={()=>{if(desktop.active!==id)desktop.focus(id)}} onFocusCapture={()=>{if(desktop.active!==id)desktop.focus(id)}}>
  <div className="window-bar" tabIndex={0} aria-label={`${win.title}. drag to move; dragging an expanded window restores it. arrow keys move; home arranges windows.`} onPointerDown={event=>start(event,'move')} onDoubleClick={event=>{if(!(event.target as Element).closest('button')&&performance.now()-lastDrag.current>350)desktop.zoom(id)}} onKeyDown={event=>{
   if(event.target!==event.currentTarget)return;if(event.key==='Home'){event.preventDefault();desktop.arrange();return}
   if(win.zoom||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();const step=event.shiftKey?30:10;
   desktop.change(id,moveWindowFrame(frame,event.key==='ArrowLeft'?-step:event.key==='ArrowRight'?step:0,event.key==='ArrowUp'?-step:event.key==='ArrowDown'?step:0,workspace));
  }}>
   <button className="window-back" aria-label="back to desktop" onClick={desktop.showDesktop}>‹</button><span className="lights"><button className="close-control" aria-label={`close ${win.title}`} onClick={()=>desktop.close(id)}><X size={9}/></button><button className="minimize-control" aria-label={`minimize ${win.title}`} onClick={()=>desktop.minimize(id)}><Minus size={9}/></button><button className="zoom-control" aria-label={`${win.zoom?'restore':'expand'} ${win.title}`} onClick={()=>desktop.zoom(id)}><Plus size={9}/></button></span><span className="window-name">{win.title}</span>
  </div>
  <div className="window-content">{children}</div>
  {!win.zoom&&(['n','s','e','w','ne','nw','se','sw'] as ResizeEdge[]).map(edge=><button key={edge} className={`window-resize resize-${edge}`} aria-label={`resize ${win.title} ${edge}; use arrow keys`} onPointerDown={event=>start(event,'resize',edge)} onKeyDown={event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();desktop.change(id,resizeWindowFrame(frame,event.key==='ArrowLeft'?-15:event.key==='ArrowRight'?15:0,event.key==='ArrowUp'?-15:event.key==='ArrowDown'?15:0,edge,workspace))}}/>)}
 </section>;
}
