import {useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent} from 'react';
import {Minus, Plus, X} from 'lucide-react';
import {useDesktop, type WindowId} from './Desktop';
import {isTouchDesktop, touchDesktopQuery} from './desktopLayout';
import {fitWindowFrame, moveWindowFrame, resizeWindowFrame, type ResizeEdge, type WindowFrame, type WorkspaceSize} from './windowGeometry';

type Props = {id: WindowId; children: ReactNode; className?: string};
type Gesture = {
  kind: 'move' | 'resize'; pointer: number; px: number; py: number; frame: WindowFrame;
  edge?:ResizeEdge; next: WindowFrame; size: WorkspaceSize; moved: boolean;
};

export function AquaWindow({id, children, className = ''}: Props) {
  const desktop = useDesktop();
  const win = desktop.windows[id];
  const section = useRef<HTMLElement>(null);
  const gesture = useRef<Gesture | null>(null);
  const lastDrag = useRef(-Infinity);
  const pendingCommit=useRef(false);
  const measuredWorkspace=useRef<WorkspaceSize&{touch:boolean}|null>(null);
  const clearPreview=()=>{for(const key of ['--drag-x','--drag-y','--drag-w','--drag-h'])section.current?.style.removeProperty(key);section.current?.classList.remove('window-gesturing');};
  useLayoutEffect(()=>{if(pendingCommit.current){pendingCommit.current=false;clearPreview()}});
  const [workspace, setWorkspace] = useState(() => ({w: innerWidth, h: Math.max(56, innerHeight - 142), touch: isTouchDesktop()}));
  const frame = fitWindowFrame(win, workspace, workspace.touch);

  useLayoutEffect(() => {
    if (win.mode !== 'open') {gesture.current=null;pendingCommit.current=false;clearPreview();return;}
    const parent = section.current?.parentElement;
    if (!parent) return;
    const media = matchMedia(touchDesktopQuery);
    const measure = () => {
      const next = {w: parent.clientWidth, h: parent.clientHeight, touch: media.matches};
      const previous=measuredWorkspace.current;
      if(previous&&previous.w===next.w&&previous.h===next.h&&previous.touch===next.touch)return;
      measuredWorkspace.current=next;gesture.current=null;pendingCommit.current=false;clearPreview();
      setWorkspace(previous => previous.w === next.w && previous.h === next.h && previous.touch === next.touch ? previous : next);
    };
    measure();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(parent);
    window.addEventListener('resize', measure);
    media.addEventListener('change', measure);
    return () => {observer?.disconnect(); window.removeEventListener('resize', measure); media.removeEventListener('change', measure);};
  }, [win.mode]);

  function start(event: PointerEvent<HTMLElement>, kind: 'move' | 'resize', edge?:ResizeEdge) {
    if (event.button !== 0 || gesture.current || win.zoom) return;
    if (kind === 'move' && (event.target as HTMLElement).closest('button')) return;
    event.preventDefault();
    const bounds=section.current?.parentElement?.getBoundingClientRect(),rect=section.current?.getBoundingClientRect();
    const actual=rect&&bounds?{...frame,x:rect.left-bounds.left,y:rect.top-bounds.top,w:rect.width,h:rect.height}:frame;
    gesture.current = {kind, pointer: event.pointerId, px: event.clientX, py: event.clientY, frame:actual, edge, next: {...actual}, size: workspace, moved: false};
    section.current?.classList.add('window-gesturing');
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function update(event: PointerEvent<HTMLElement>) {
    const active = gesture.current;
    if (!active || active.pointer !== event.pointerId) return;
    const dx = event.clientX - active.px, dy = event.clientY - active.py;
    if (!active.moved && Math.hypot(dx, dy) < 6) return;
    active.moved = true;
    active.next = active.kind==='move' ? {...active.frame,...moveWindowFrame(active.frame,dx,dy,active.size)} : resizeWindowFrame(active.frame,dx,dy,active.edge||'se',active.size);
    section.current?.style.setProperty('--drag-x', `${active.next.x-active.frame.x}px`);
    section.current?.style.setProperty('--drag-y', `${active.next.y-active.frame.y}px`);
    if(active.kind==='resize'){
      section.current?.style.setProperty('--drag-w', `${active.next.w}px`);
      section.current?.style.setProperty('--drag-h', `${active.next.h}px`);
    }
  }

  function finish(event: PointerEvent<HTMLElement>, cancelled = false) {
    const active = gesture.current;
    if (!active || active.pointer !== event.pointerId) return;
    if(!cancelled)update(event); // Include the pointer-up position, even if no final move was delivered.
    gesture.current = null;
    if(active.moved)lastDrag.current=performance.now();
    if(active.moved&&!cancelled){pendingCommit.current=true;desktop.change(id,active.next);}
    else clearPreview();
  }

  if (win.mode !== 'open') return null;
  const style = {
    left: frame.x, top: frame.y, width: frame.w, height: frame.h, zIndex: win.layer,
    '--window-x': `${frame.x}px`, '--window-y': `${frame.y}px`, '--window-w': `${frame.w}px`, '--window-h': `${frame.h}px`, '--window-layer': win.layer,
  } as CSSProperties;

  return <section ref={section} className={`aqua-window ${className} ${win.zoom ? 'window-zoomed' : ''} ${desktop.active === id ? 'is-active' : ''}`}
    style={style} aria-label={win.title}
    onPointerDown={() => {if (desktop.active !== id) desktop.focus(id);}}
    onFocusCapture={() => {if (desktop.active !== id) desktop.focus(id);}}>
    <div className="window-bar" tabIndex={0}
      aria-label={`${win.title}. drag this title bar to move; arrow keys also move; Home arranges windows; double click to expand.`}
      onPointerDown={event => start(event, 'move')} onPointerMove={update}
      onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)} onLostPointerCapture={event => finish(event, true)}
      onDoubleClick={event => {if (!(event.target as HTMLElement).closest('button') && performance.now() - lastDrag.current > 350) desktop.zoom(id);}}
      onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'Home') {event.preventDefault(); desktop.arrange(); return;}
        if (win.zoom || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        const step = event.shiftKey ? 30 : 10;
        desktop.change(id, moveWindowFrame(frame, event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0, event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0, workspace));
      }}>
      <button className="window-back" aria-label="back to desktop" onClick={desktop.showDesktop}>‹</button>
      <span className="lights">
        <button className="close-control" aria-label={`close ${win.title}`} onClick={() => desktop.close(id)}><X size={9}/></button>
        <button className="minimize-control" aria-label={`minimize ${win.title}`} onClick={() => desktop.minimize(id)}><Minus size={9}/></button>
        <button className="zoom-control" aria-label={`${win.zoom ? 'restore' : 'expand'} ${win.title}`} onClick={() => desktop.zoom(id)}><Plus size={9}/></button>
      </span>
      <span className="window-name">{win.title}</span>
    </div>
    <div className="window-content">{children}</div>
    {!win.zoom&&(['n','s','e','w','ne','nw','se','sw'] as ResizeEdge[]).map(edge=><button key={edge} className={`window-resize resize-${edge}`} aria-label={`resize ${win.title} ${edge}; use arrow keys`}
      onPointerDown={event=>start(event,'resize',edge)} onPointerMove={update}
      onPointerUp={event=>finish(event)} onPointerCancel={event=>finish(event,true)} onLostPointerCapture={event=>finish(event,true)}
      onKeyDown={event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();desktop.change(id,resizeWindowFrame(frame,event.key==='ArrowLeft'?-15:event.key==='ArrowRight'?15:0,event.key==='ArrowUp'?-15:event.key==='ArrowDown'?15:0,edge,workspace));}}/>)}
  </section>;
}
