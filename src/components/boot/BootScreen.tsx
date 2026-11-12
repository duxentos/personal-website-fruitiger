import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from '../Desktop';
import {miiAnimations, selectAnimation, type MiiAnimation} from '../../data/miiAnimations';
import {playSound} from '../../audio/SoundEngine';
import {pickBootDurationMs} from './bootTiming.ts';

export function BootProvider({children}: {children: ReactNode}) {
  const {preferences} = useDesktop();
  const directPreview = useRef(new URLSearchParams(location.search).get('startup') === 'preview').current;
  const returnFocus = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(preferences.startup || directPreview);
  const [session, setSession] = useState(1);

  useEffect(() => {
    const start = (event: Event) => {
      const preview = (event as CustomEvent<{preview?: boolean}>).detail?.preview === true;
      if (!preferences.startup && !preview) return;
      returnFocus.current = document.activeElement as HTMLElement;
      setSession(n => n + 1);
      setVisible(true);
    };
    window.addEventListener('desktop-boot', start);
    return () => window.removeEventListener('desktop-boot', start);
  }, [preferences.startup]);

  return <>
    <div className="desktop-session" inert={visible}>{children}</div>
    {visible && <BootScreen key={session} onDone={() => {
      setVisible(false);
      requestAnimationFrame(() => {
        if (returnFocus.current?.isConnected) returnFocus.current.focus();
      });
    }}/>}
  </>;
}

function loadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    const timer = setTimeout(() => {
      image.onload = null;
      image.onerror = null;
      reject(new Error('image timeout'));
    }, 4500);
    image.onload = () => {clearTimeout(timer); resolve();};
    image.onerror = () => {clearTimeout(timer); reject(new Error('image unavailable'));};
    image.src = src;
  });
}

function BootScreen({onDone}: {onDone: () => void}) {
  const {preferences: p} = useDesktop();
  const systemReduce = useReducedMotion();
  const reduced = Boolean(systemReduce || p.reducedMotion);
  const [durationMs] = useState(() => pickBootDurationMs());
  const [last, setLast] = useState(() => {
    let previous = '';
    try {previous = sessionStorage.getItem('mii-last-boot') || '';} catch {}
    return selectAnimation(miiAnimations.filter(a => a.category === 'locomotion'), previous, {}, Date.now()) || miiAnimations[0];
  });
  const [phase, setPhase] = useState<'loading' | 'ready' | 'error'>('loading');
  const [state, setState] = useState<'running' | 'reacting'>('running');
  const [imageReady, setImageReady] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [cycle, setCycle] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const seen = useRef<Record<string, number>>({});
  const failed = useRef(new Set<string>());
  const pendingReaction = useRef(false);
  const transition = useRef(0);
  const mounted = useRef(true);
  const done = useRef(false);
  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    transition.current += 1;
    try {sessionStorage.setItem('mii-last-boot', last.id);} catch {}
    onDone();
  }, [last.id, onDone]);
  const finishRef = useRef(finish);
  useEffect(() => {finishRef.current = finish;}, [finish]);

  useEffect(() => {
    mounted.current = true;
    return () => {mounted.current = false; transition.current += 1;};
  }, []);

  // The requested short 1–2 second presentation is independent of network speed.
  // Slow or missing optional artwork must never hold the desktop behind it.
  useEffect(() => {
    const close = setTimeout(() => finishRef.current(), durationMs);
    return () => clearTimeout(close);
  }, [durationMs]);

  useEffect(() => {
    let cancelled = false;
    const wallpaper = p.wallpaper === 'meadow'
      ? 'https://github.com/user-attachments/assets/c879a033-99eb-4dd1-acda-c36fa5b9bf3e'
      : '/vista-aurora.svg';
    const character = reduced ? Promise.resolve() : loadImage(last.src).then(() => {
      if (!cancelled) setImageReady(true);
    });
    Promise.allSettled([document.fonts.ready, loadImage(wallpaper), loadImage('/mii-still.png'), character]).then(results => {
      if (!cancelled) setPhase(results.some(r => r.status === 'rejected') ? 'error' : 'ready');
    });
    return () => {cancelled = true;};
  }, []);

  const showAnimation = useCallback(async (next: MiiAnimation, nextState: 'running' | 'reacting') => {
    const token = ++transition.current;
    try {
      await loadImage(next.src);
      if (done.current || !mounted.current || token !== transition.current) return false;
      seen.current[next.id] = Date.now();
      setLast(next);
      setImageReady(true);
      setState(nextState);
      return true;
    } catch {
      failed.current.add(next.id);
      return false;
    } finally {
      if (!done.current && mounted.current && token === transition.current) setCycle(n => n + 1);
    }
  }, []);

  useEffect(() => {
    const update = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (reduced || hidden || !imageReady || (!p.randomMii && state !== 'reacting')) return;
    const timer = setTimeout(() => {
      if (pendingReaction.current) {setCycle(n => n + 1); return;}
      const next = selectAnimation(miiAnimations.filter(a => a.category === 'locomotion' && !failed.current.has(a.id)), last.id, seen.current, Date.now());
      if (next) void showAnimation(next, 'running');
      else setState('running');
    }, last.id === 'wave' ? last.durationMs * 5 : last.durationMs);
    return () => clearTimeout(timer);
  }, [last, state, hidden, reduced, imageReady, p.randomMii, cycle, showAnimation]);

  async function react() {
    if (reduced || !p.miiInteractions || state === 'reacting' || pendingReaction.current) return;
    const reaction = selectAnimation(miiAnimations.filter(a => (a.category === 'greeting' || a.category === 'playful') && !failed.current.has(a.id)), last.id, seen.current, Date.now());
    if (!reaction) return;
    pendingReaction.current = true;
    try {
      const played = await showAnimation(reaction, 'reacting');
      if (played && !done.current && p.miiSounds) playSound('mii.interaction');
    } finally {pendingReaction.current = false;}
  }

  const animated = !reduced && !hidden && imageReady;
  return <div ref={dialog} className={`boot-overlay ${reduced ? 'boot-reduced' : ''}`}
    role="dialog" aria-modal="true" aria-label="starting desktop" onKeyDown={event => {
      if (event.key === 'Escape') {event.preventDefault(); finish();}
      if (event.key !== 'Tab') return;
      const buttons = dialog.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');
      if (!buttons?.length) return;
      const first = buttons[0], final = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); final.focus();}
      else if (!event.shiftKey && document.activeElement === final) {event.preventDefault(); first.focus();}
    }}>
    <div className="boot-ambient" aria-hidden="true"><i/><i/><i/></div>
    <main className="boot-world">
      <div className="boot-logo">azaanOS<span>your own little corner of the internet</span></div>
      <div className="boot-stage">
        <div className="boot-horizon" aria-hidden="true"/>
        <button className={`boot-character ${animated && last.fullStage ? 'full-stage' : ''}`}
          disabled={!p.miiInteractions || reduced} onClick={react} aria-label="greet the startup Mii">
          <img key={animated ? last.id : 'still'} src={animated ? last.src : '/mii-still.png'}
            alt="Azaan's Mii" onError={() => {failed.current.add(last.id); setImageReady(false);}}/>
        </button>
      </div>
      <div className="boot-status">
        <div className="boot-dots" aria-hidden="true"><i/><i/><i/></div>
        <h1>welcome to my desktop</h1>
        <p role="status">{phase === 'loading' ? 'preparing the artwork…' : phase === 'error' ? 'opening with available artwork' : 'everything is ready. see you inside.'}</p>
        <button autoFocus className="aqua-button boot-skip" onClick={finish}>skip intro</button>
      </div>
    </main>
    <span className="boot-edition">personal edition · azaan khan</span>
  </div>;
}
