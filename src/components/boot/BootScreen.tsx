import {useCallback, useEffect, useRef, useState, type ReactNode} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from '../Desktop';
import {miiAnimations} from '../../data/miiAnimations';
import {playSound} from '../../audio/SoundEngine';
import {wallpapers} from '../../data/wallpapers';
import {BOOT_ASSET_TIMEOUT_MS,BOOT_FALLBACK_MS,crossingDuration,canEnterDesktop} from './bootTiming.ts';

export function BootProvider({children}: {children: ReactNode}) {
  const {preferences} = useDesktop();
  const directPreview = useRef(new URLSearchParams(location.search).get('startup') === 'preview').current;
  const returnFocus = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(preferences.startup || directPreview);
  const [session, setSession] = useState(1);
  const booting=useRef(preferences.startup||directPreview);

  useEffect(() => {
    const start = (event: Event) => {
      const preview = (event as CustomEvent<{preview?: boolean}>).detail?.preview === true;
      if ((!preferences.startup && !preview)||booting.current) return;
      booting.current=true;
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
      booting.current=false;
      setVisible(false);
      requestAnimationFrame(() => {
        if (returnFocus.current?.isConnected) returnFocus.current.focus();
      });
    }}/>}
  </>;
}

function loadImage(src:string){return new Promise<void>((resolve,reject)=>{const img=new Image();const timeout=setTimeout(()=>{img.onload=img.onerror=null;reject(new Error('asset fallback'))},BOOT_ASSET_TIMEOUT_MS);img.onload=()=>{clearTimeout(timeout);resolve()};img.onerror=()=>{clearTimeout(timeout);reject(new Error('asset missing'))};img.src=src;});}
function BootScreen({onDone}:{onDone:()=>void}){
 const {preferences:p}=useDesktop();const systemReduce=useReducedMotion();const reduced=Boolean(systemReduce||p.reducedMotion);
 const [phase,setPhase]=useState<'loading'|'ready'|'fallback'>('loading');
 const [imageReady,setImageReady]=useState(false),[failed,setFailed]=useState(false),[crossed,setCrossed]=useState(false);
 const [hidden,setHidden]=useState(document.hidden),[playKey,setPlayKey]=useState(()=>Date.now());
 const done=useRef(false),dialog=useRef<HTMLDivElement>(null),finishRef=useRef(onDone);
 finishRef.current=onDone;
 const finish=useCallback(()=>{if(done.current)return;done.current=true;finishRef.current()},[]);
 const clip=miiAnimations.find(item=>item.id==='scenic-route')!;
 useEffect(()=>{
  const update=()=>{setHidden(document.hidden);if(!document.hidden){setImageReady(false);setCrossed(false);setPlayKey(Date.now())}};
  document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);
 },[]);
 useEffect(()=>{
  let cancelled=false;let fontTimer:ReturnType<typeof setTimeout>;
  const fonts=Promise.race([document.fonts.ready,new Promise((_,reject)=>{fontTimer=setTimeout(()=>reject(new Error('font fallback')),BOOT_ASSET_TIMEOUT_MS)})]);
  Promise.allSettled([fonts,loadImage(wallpapers[p.wallpaper]),loadImage('/mii-still.png')]).then(results=>{
   clearTimeout(fontTimer);if(cancelled)return;
   if(results[1].status==='rejected')document.body.dataset.wallpaperFallback='true';
   setPhase(results.some(result=>result.status==='rejected')?'fallback':'ready');
  });
  return()=>{cancelled=true;clearTimeout(fontTimer)};
 },[]);
 useEffect(()=>{
  if(imageReady||hidden)return;const timeout=setTimeout(()=>{setFailed(true);setImageReady(true)},BOOT_ASSET_TIMEOUT_MS);return()=>clearTimeout(timeout);
 },[imageReady,hidden,playKey]);
 useEffect(()=>{
  if(!imageReady||hidden)return;
  let frame=0;const started=performance.now(),duration=reduced||failed?BOOT_FALLBACK_MS:crossingDuration(clip.durationMs);
  const tick=(now:number)=>{if(now-started>=duration){setCrossed(true);return;}frame=requestAnimationFrame(tick)};
  frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
 },[imageReady,hidden,reduced,failed,clip.durationMs,playKey]);
 useEffect(()=>{if(canEnterDesktop(crossed,phase!=='loading'))finish()},[crossed,phase,finish]);
 const animated=!reduced&&!hidden&&!failed;
 return <div ref={dialog} className={`boot-overlay boot-refined ${reduced?'boot-reduced':''}`} role="dialog" aria-modal="true" aria-label="starting desktop" onKeyDown={event=>{
  if(event.key==='Escape'){event.preventDefault();finish()}
  if(event.key!=='Tab')return;const buttons=dialog.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)');if(!buttons?.length)return;
  const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 }}><div className="boot-ambient" aria-hidden="true"><i/><i/><i/></div><main className="boot-world"><div className="boot-logo">azaanos<span>your own little corner of the internet</span></div><div className="boot-stage"><div className="boot-horizon" aria-hidden="true"/><button className={`boot-character ${animated?'full-stage':''}`} disabled={!p.miiInteractions||reduced} onClick={()=>{if(p.miiSounds)playSound('mii.interaction')}} aria-label="greet the startup mii"><img key={playKey} src={animated?`/mii-crossing.gif?play=${playKey}`:'/mii-still.png'} alt="azaan's mii crossing the screen" onLoad={()=>setImageReady(true)} onError={()=>{setFailed(true);setImageReady(true)}}/></button></div><div className="boot-status"><div className="boot-dots" aria-hidden="true"><i/><i/><i/></div><h1>welcome to my desktop</h1><p role="status">{phase==='loading'?'getting everything ready…':reduced||failed?'see you inside.':'just making my way over…'}</p><button autoFocus className="aqua-button boot-skip" onClick={finish}>skip intro</button></div></main><span className="boot-edition">personal edition · azaan khan</span></div>;
}
