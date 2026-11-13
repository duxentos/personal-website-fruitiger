import {useCallback, useEffect, useRef, useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from './Desktop';
import {miiAnimations, selectAnimation, type MiiAnimation} from '../data/miiAnimations';
import {playSound} from '../audio/SoundEngine';

type MiiContext = 'desktop' | 'about' | 'projects' | 'notes' | 'terminal' | 'resume';
const contextAnimation: Record<MiiContext, string> = {
  desktop: 'wave', about: 'intro', projects: 'little-hop', notes: 'shortcut',
  terminal: 'curious', resume: 'scenic-route',
};
function prepare(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image();
    const timer = setTimeout(() => {image.onload = null; image.onerror = null; reject(new Error('unavailable animation'));}, 4500);
    image.onload = () => {clearTimeout(timer); resolve();};
    image.onerror = () => {clearTimeout(timer); reject(new Error('unavailable animation'));};
    image.src = src;
  });
}

export function MiiCompanion({compact = false, context = 'desktop'}: {compact?: boolean; context?: MiiContext}) {
  const {preferences: p} = useDesktop();
  const systemReduce = useReducedMotion();
  const reduced = Boolean(systemReduce || p.reducedMotion);
  const base = miiAnimations.find(animation => animation.id === contextAnimation[context])!;
  const [current, setCurrent] = useState<MiiAnimation | null>(null);
  const [reaction, setReaction] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const seen = useRef<Record<string, number>>({});
  const previous = useRef(base.id);
  const failed = useRef(new Set<string>());
  const busy = useRef(false);
  const request = useRef(0);
  const mounted = useRef(true);

  const show = useCallback(async (animation: MiiAnimation, isReaction: boolean) => {
    const token = ++request.current;
    try {
      await prepare(animation.src);
      if (!mounted.current || token !== request.current) return;
      previous.current = animation.id;
      seen.current[animation.id] = Date.now();
      setCurrent(animation);
      setReaction(isReaction);
    } catch {failed.current.add(animation.id);}
  }, []);

  useEffect(() => {
    mounted.current = true;
    if (!reduced) void show(base, false);
    return () => {mounted.current = false; request.current++;};
  }, [base, reduced, show]);

  useEffect(() => {
    const visibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => document.removeEventListener('visibilitychange', visibility);
  }, []);

  useEffect(() => {
    if (!reaction || !current || hidden) return;
    const timer = setTimeout(() => {
      setReaction(false);
      void show(base, false);
    }, current.id === 'wave' ? current.durationMs * 5 : current.durationMs);
    return () => clearTimeout(timer);
  }, [reaction, current, hidden, base, show]);

  useEffect(() => {
    if (!p.randomMii || reduced || hidden || reaction) return;
    const timer = setTimeout(() => {
      if (busy.current) return;
      const next = selectAnimation(miiAnimations.filter(a => !a.fullStage && !failed.current.has(a.id)), previous.current, seen.current, Date.now());
      if (next) void show(next, true);
    }, p.miiFrequency * 1000);
    return () => clearTimeout(timer);
  }, [p.randomMii, p.miiFrequency, reduced, hidden, reaction, current, show]);

  async function greet() {
    if (!p.miiInteractions || busy.current) return;
    if (p.miiSounds) playSound('mii.interaction');
    if (reduced) return;
    const next = selectAnimation(miiAnimations.filter(a => !a.fullStage && !failed.current.has(a.id)), previous.current, seen.current, Date.now());
    if (!next) return;
    busy.current = true;
    try {await show(next, true);} finally {busy.current = false;}
  }

  const src = reduced || hidden ? '/mii-still.png' : current?.src || '/mii-still.png';
  return <div className={`${compact ? 'mii-presence' : 'mii-companion'} mii-context-${context} ${current?.fullStage ? 'mii-wide' : ''} ${hidden ? 'animation-paused' : ''}`}>
    <button className="mii-figure"
      onClick={greet} disabled={!p.miiInteractions} aria-label={`interact with Azaan's ${context === 'desktop' ? 'Mii' : context + ' Mii'}`}>
      <img key={src} src={src} alt="Azaan's Mii companion" onError={() => {if (current) failed.current.add(current.id); setCurrent(null);}}/>
    </button>
    {!compact && <div className="mii-caption"><span>{reaction ? 'a little something different' : 'tap to say hi'}</span><button onClick={greet} disabled={!p.miiInteractions}>say hi ↗</button></div>}
  </div>;
}
