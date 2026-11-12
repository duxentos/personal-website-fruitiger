import {useEffect, useRef, useState, type PointerEvent} from 'react';
import {AppIcon} from './DesktopChrome';
import {useDesktop} from './Desktop';
import {desktopShortcuts, isTouchDesktop} from './desktopLayout';
import {moveIcon, normalizeIconOrder, type ShortcutId} from './iconOrder';

const storageKey = 'azaan-desktop-icon-order';
function readOrder() {
  try {return normalizeIconOrder(JSON.parse(localStorage.getItem(storageKey) || 'null'));}
  catch {return normalizeIconOrder(null);}
}
type Drag = {
  id: ShortcutId; pointer: number; startX: number; startY: number; dx: number; dy: number; moved: boolean;
  origin: DOMRect; bounds: DOMRect; slots: {id: ShortcutId; x: number; y: number}[];
  button: HTMLButtonElement;
};

export function DesktopShortcuts() {
  const desktop = useDesktop();
  const [order, setOrder] = useState(readOrder);
  const [dragging, setDragging] = useState<ShortcutId | null>(null);
  const root = useRef<HTMLElement>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  useEffect(() => {
    try {localStorage.setItem(storageKey, JSON.stringify(order));} catch {}
  }, [order]);

  function start(event: PointerEvent<HTMLButtonElement>, id: ShortcutId) {
    if (event.button !== 0 || drag.current) return;
    suppressClick.current = false;
    if (!isTouchDesktop() && event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    const button = event.currentTarget;
    const origin = button.getBoundingClientRect();
    const bounds = root.current?.parentElement?.getBoundingClientRect();
    if (!bounds || !root.current) return;
    const slots = [...root.current.querySelectorAll<HTMLButtonElement>('button[data-shortcut]')].map(item => {
      const rect = item.getBoundingClientRect();
      return {id: item.dataset.shortcut as ShortcutId, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2};
    });
    drag.current = {id, pointer: event.pointerId, startX: event.clientX, startY: event.clientY, dx: 0, dy: 0, moved: false, origin, bounds, slots, button};
    button.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const gesture = drag.current;
    if (!gesture || gesture.pointer !== event.pointerId) return;
    const dx = event.clientX - gesture.startX, dy = event.clientY - gesture.startY;
    if (!gesture.moved && Math.hypot(dx, dy) < 8) return;
    event.preventDefault();
    if (!gesture.moved) {gesture.moved = true; setDragging(gesture.id);}
    gesture.dx = Math.max(gesture.bounds.left - gesture.origin.left, Math.min(gesture.bounds.right - gesture.origin.right, dx));
    gesture.dy = Math.max(gesture.bounds.top - gesture.origin.top, Math.min(gesture.bounds.bottom - gesture.origin.bottom, dy));
    gesture.button.style.transform = `translate3d(${gesture.dx}px,${gesture.dy}px,0) scale(1.06)`;
  }

  function finish(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.pointer !== event.pointerId) return;
    drag.current = null;
    gesture.button.style.removeProperty('transform');
    setDragging(null);
    suppressClick.current = gesture.moved;
    if (!gesture.moved || cancelled) return;
    const x = gesture.origin.left + gesture.origin.width / 2 + gesture.dx;
    const y = gesture.origin.top + gesture.origin.height / 2 + gesture.dy;
    const nearest = gesture.slots.reduce((best, slot) => Math.hypot(slot.x - x, slot.y - y) < Math.hypot(best.x - x, best.y - y) ? slot : best);
    setOrder(current => moveIcon(current, gesture.id, current.indexOf(nearest.id)));
  }

  return <nav ref={root} className="desktop-shortcuts" aria-label="desktop applications" hidden={!desktop.preferences.icons}>
    {order.map(id => {
      const shortcut = desktopShortcuts.find(item => item.id === id)!;
      return <button key={id} data-shortcut={id} className={dragging === id ? 'icon-dragging' : ''}
        aria-label={shortcut.label} aria-describedby="desktop-icon-hint"
        onPointerDown={event => start(event, id)} onPointerMove={move}
        onPointerUp={event => finish(event)} onPointerCancel={event => finish(event, true)}
        onLostPointerCapture={event => finish(event, true)} onDragStart={event => event.preventDefault()}
        onContextMenu={event => {if (drag.current) event.preventDefault();}}
        onClick={event => {
          if (suppressClick.current) {event.preventDefault(); suppressClick.current = false; return;}
          desktop.open(id);
        }}
        onKeyDown={event => {
          if (!event.altKey || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
          event.preventDefault();
          const direction = event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 1;
          setOrder(current => moveIcon(current, id, current.indexOf(id) + direction));
        }}>
        <AppIcon kind={id}/><span>{shortcut.label}</span>
      </button>;
    })}
    <span id="desktop-icon-hint" className="desktop-icon-hint">drag to rearrange · tap to open<span className="sr-only">. With a keyboard, hold Alt and use the arrow keys to rearrange.</span></span>
  </nav>;
}
