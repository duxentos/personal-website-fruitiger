import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from '../Desktop';
import {wallpapers} from '../../data/wallpapers';
import {BOOT_ASSET_TIMEOUT_MS,bootRemainingMs,selectBootRunner} from './bootTiming.ts';
import {miiStill} from '../../data/miiClips';
import type {MiiAnimation} from '../../data/miiAnimations';

export function BootProvider({children}: {children: ReactNode}) {
  const {preferences} = useDesktop();
  const directPreview = useRef(new URLSearchParams(location.search).get('startup') === 'preview').current;
  const returnFocus = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(preferences.startup || directPreview);
  const [session, setSession] = useState(1);
  const [runner,setRunner]=useState(()=>selectBootRunner(undefined,preferences.randomMii));
  const booting=useRef(preferences.startup||directPreview);

  useEffect(() => {
    const start = (event: Event) => {
      const preview = (event as CustomEvent<{preview?: boolean}>).detail?.preview === true;
      if ((!preferences.startup && !preview)||booting.current) return;
      booting.current=true;
      returnFocus.current = document.activeElement as HTMLElement;
      setSession(n => n + 1);
      setRunner(previous=>selectBootRunner(previous.id,preferences.randomMii));
      setVisible(true);
    };
    window.addEventListener('desktop-boot', start);
    return () => window.removeEventListener('desktop-boot', start);
  }, [preferences.startup,preferences.randomMii]);

  return <>
    <div className="desktop-session" inert={visible}>{children}</div>
    {visible && <BootScreen key={session} runner={runner} session={session} onDone={() => {
      booting.current=false;
      setVisible(false);
      requestAnimationFrame(() => {
        if (returnFocus.current?.isConnected) returnFocus.current.focus();
      });
    }}/>}
  </>;
}

function loadImage(src:string){return new Promise<void>((resolve,reject)=>{const img=new Image();const timeout=setTimeout(()=>{img.onload=img.onerror=null;reject(new Error('asset fallback'))},BOOT_ASSET_TIMEOUT_MS);img.onload=()=>{clearTimeout(timeout);resolve()};img.onerror=()=>{clearTimeout(timeout);reject(new Error('asset missing'))};img.src=src;});}
function BootScreen({onDone,runner,session}:{onDone:()=>void;runner:MiiAnimation;session:number}){
 const {preferences:p}=useDesktop();const systemReduce=useReducedMotion();const reduced=Boolean(systemReduce||p.reducedMotion);
 const [phase,setPhase]=useState<'loading'|'ready'|'fallback'>('loading');
 const [startedAt,setStartedAt]=useState<number|null>(null),[runnerFailed,setRunnerFailed]=useState(false);
 const done=useRef(false),dialog=useRef<HTMLDivElement>(null),finishRef=useRef(onDone);
 finishRef.current=onDone;
 const finish=useCallback(()=>{if(done.current)return;done.current=true;finishRef.current()},[]);
 useEffect(()=>{
  let cancelled=false;let fontTimer:ReturnType<typeof setTimeout>;
  const fonts=Promise.race([document.fonts.ready,new Promise((_,reject)=>{fontTimer=setTimeout(()=>reject(new Error('font fallback')),BOOT_ASSET_TIMEOUT_MS)})]);
  Promise.allSettled([fonts,loadImage(wallpapers[p.wallpaper])]).then(results=>{
   clearTimeout(fontTimer);if(cancelled)return;
   if(results[1].status==='rejected')document.body.dataset.wallpaperFallback='true';
   setPhase(results.some(result=>result.status==='rejected')?'fallback':'ready');
  });
  return()=>{cancelled=true;clearTimeout(fontTimer)};
 },[]);
 useEffect(()=>{
  if(reduced||startedAt!==null||runnerFailed)return;
  const timer=setTimeout(()=>setRunnerFailed(true),BOOT_ASSET_TIMEOUT_MS);
  return()=>clearTimeout(timer);
 },[reduced,startedAt,runnerFailed]);
 useEffect(()=>{
  const remaining=bootRemainingMs({assetsSettled:phase!=='loading',startedAt,durationMs:runner.durationMs,now:performance.now(),reduced,failed:runnerFailed});
  if(remaining===null)return;if(remaining===0){finish();return;}
  const timer=setTimeout(finish,remaining);return()=>clearTimeout(timer);
 },[phase,startedAt,runner.durationMs,reduced,runnerFailed,finish]);
 return <div ref={dialog} className={`boot-overlay boot-refined boot-running ${reduced?'boot-reduced':''}`} role="dialog" aria-modal="true" aria-label="starting desktop" onKeyDown={event=>{
  if(event.key==='Escape'){event.preventDefault();finish()}
  if(event.key!=='Tab')return;const buttons=dialog.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');if(!buttons?.length)return;
  const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }}><div className="boot-ambient" aria-hidden="true"><i/><i/><i/></div><main className="boot-world"><div className="boot-logo">azaanos<span>your own little corner of the internet</span></div><div className="boot-stage" data-runner={runner.id}><div className="boot-horizon" aria-hidden="true"/><div className={`boot-character ${reduced||runnerFailed?'':'full-stage'}`}><img src={reduced||runnerFailed?miiStill:`${runner.src}?boot=${session}`} alt={reduced||runnerFailed?"azaan’s mii":"azaan’s mii running across the loading screen"} onLoad={()=>{if(!reduced&&!runnerFailed)setStartedAt(previous=>previous??performance.now())}} onError={()=>setRunnerFailed(true)}/></div></div><div className="boot-status"><div className="boot-dots" aria-hidden="true"><i/><i/><i/></div><h1>welcome to my desktop</h1><p role="status">{phase==='loading'?'getting everything ready…':'see you inside.'}</p><button autoFocus className="aqua-button boot-skip fj-button fj-button--md fj-button--aero" onClick={finish}>skip intro</button></div></main><span className="boot-edition">personal edition · azaan khan</span></div>;
}
