import {advanceBubble,collideBubbles,confineBubble} from './bubblePhysics';
import {settingsStore} from '../settings/store';
import {SoundSettings} from '../audio/SoundProvider';
import {playSound} from '../audio/SoundEngine';
import {useEffect,useRef} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from './Desktop';
export function PreferencesPanel(){const d=useDesktop();const p=d.preferences;return <div className="preferences-panel"><h2>make it yours.</h2><p>appearance and desktop effects are saved in this browser.</p><label>wallpaper<select value={p.wallpaper} onChange={e=>d.setPreference('wallpaper',e.target.value as typeof p.wallpaper)}><option value="plaza">glass plaza</option><option value="vista">vista-inspired aurora</option></select></label><label>interface theme<select value={p.theme} onChange={e=>d.setPreference('theme',e.target.value as typeof p.theme)}>{['aqua','bliss','aurora','sunset','candy'].map(t=><option key={t}>{t}</option>)}</select></label><label>accent colour<input type="color" value={p.accent} onChange={e=>d.setPreference('accent',e.target.value)}/></label><label>desktop icons<input type="checkbox" checked={p.icons} onChange={e=>d.setPreference('icons',e.target.checked)}/></label><fieldset><legend>glass bubbles</legend><label>show bubbles<input type="checkbox" checked={p.bubbles} onChange={e=>d.setPreference('bubbles',e.target.checked)}/></label><label>density<select value={p.density} onChange={e=>d.setPreference('density',e.target.value as typeof p.density)}>{['low','medium','high'].map(t=><option key={t}>{t}</option>)}</select></label><label>movement speed<input type="range" min="0.2" max="1.5" step="0.1" value={p.speed} onChange={e=>d.setPreference('speed',Number(e.target.value))}/></label><label>pointer interactions<input type="checkbox" checked={p.interactive} onChange={e=>d.setPreference('interactive',e.target.checked)}/></label><small>bubbles pause when this tab is hidden and are disabled by reduced-motion preferences.</small></fieldset><fieldset><legend>startup and Mii</legend><label>show startup animation<input type="checkbox" checked={p.startup} onChange={e=>d.setPreference('startup',e.target.checked)}/></label><label>random Mii animations<input type="checkbox" checked={p.randomMii} onChange={e=>d.setPreference('randomMii',e.target.checked)}/></label><label>Mii interactions<input type="checkbox" checked={p.miiInteractions} onChange={e=>d.setPreference('miiInteractions',e.target.checked)}/></label><label>Mii sound effects<input type="checkbox" checked={p.miiSounds} onChange={e=>d.setPreference('miiSounds',e.target.checked)}/></label><label>animation frequency<select value={p.miiFrequency} onChange={e=>d.setPreference('miiFrequency',Number(e.target.value))}><option value="18">occasional</option><option value="10">normal</option><option value="5">frequent</option></select></label><label>reduce motion<input type="checkbox" checked={p.reducedMotion} onChange={e=>d.setPreference('reducedMotion',e.target.checked)}/></label><button className="aqua-button" onClick={()=>window.dispatchEvent(new CustomEvent('desktop-boot',{detail:{preview:true}}))}>preview startup</button></fieldset><SoundSettings/><button className="aqua-button" onClick={()=>{settingsStore.restoreDefaults();location.reload();}}>Restore Defaults</button><p>Your saved notes are kept.</p></div>}
export function BubbleLayer(){
 const {preferences:p}=useDesktop();
 const reduced=useReducedMotion();
 const layer=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(reduced||p.reducedMotion||!p.bubbles||!layer.current)return;
  const root=layer.current;
  const count=innerWidth<761?Math.min(5,p.density==='low'?3:5):p.density==='low'?8:p.density==='medium'?14:22;
  const pointer={x:-1000,y:-1000,down:false};
  const bubbles=Array.from({length:count},()=>{
   const r=18+Math.random()*25,button=document.createElement('button');
   button.className='soap-bubble';button.setAttribute('aria-label','pop glass bubble');button.tabIndex=-1;
   button.style.width=button.style.height=r*2+'px';button.style.pointerEvents=p.interactive?'auto':'none';
   button.innerHTML='<span class="bubble-shine"></span>';root.appendChild(button);
   const b={button,r,x:Math.random()*Math.max(0,innerWidth-2*r),y:40+Math.random()*Math.max(0,innerHeight-180),vx:(Math.random()<.5?-1:1)*(24+Math.random()*18),vy:(Math.random()<.5?-1:1)*(18+Math.random()*18),phase:Math.random()*Math.PI*2,popped:0};
   button.addEventListener('pointerdown',()=>{playSound('bubbles.pop',.85+Math.random()*.15);b.popped=performance.now()+1200;button.classList.add('bubble-pop')});
   return b;
  });
  const move=(e:PointerEvent)=>{pointer.x=e.clientX;pointer.y=e.clientY;pointer.down=e.buttons>0};
  const leave=()=>{pointer.x=-1000;pointer.y=-1000};
  document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',leave);
  let frame=0,last=0;
  function tick(t:number){
   const dt=last?Math.min(.05,(t-last)/1000):0;last=t;
   for(const b of bubbles){
    if(b.popped){if(t<b.popped)continue;b.popped=0;b.x=Math.random()*Math.max(0,innerWidth-b.r*2);b.y=Math.max(0,innerHeight-b.r*2-80);b.vy=-Math.abs(b.vy);b.button.classList.remove('bubble-pop');}
    if(p.interactive){const dx=b.x+b.r-pointer.x,dy=b.y+b.r-pointer.y,dist=Math.hypot(dx,dy);if(dist<120&&dist>0){const force=(1-dist/120)*150*dt*(pointer.down?2:1);b.vx+=dx/dist*force;b.vy+=dy/dist*force;}}
    advanceBubble(b,dt,t/1000,p.speed);
   }
   for(let i=0;i<bubbles.length;i++)for(let j=i+1;j<bubbles.length;j++)if(!bubbles[i].popped&&!bubbles[j].popped&&collideBubbles(bubbles[i],bubbles[j]))playSound('bubbles.bounce',.25);
   for(const b of bubbles){if(b.popped)continue;if(confineBubble(b,innerWidth,innerHeight))playSound('bubbles.bounce',.4);b.button.style.transform=`translate3d(${b.x}px,${b.y}px,0)`;}
   frame=requestAnimationFrame(tick);
  }
  const visibility=()=>{cancelAnimationFrame(frame);if(!document.hidden){last=0;frame=requestAnimationFrame(tick)}};
  document.addEventListener('visibilitychange',visibility);visibility();
  return()=>{cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',visibility);document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',leave);root.replaceChildren()};
 },[p.bubbles,p.density,p.speed,p.interactive,p.reducedMotion,reduced]);
 return <div className="bubble-layer" ref={layer} aria-label="interactive desktop bubbles"/>;
}
