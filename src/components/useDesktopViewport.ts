import {useLayoutEffect} from 'react';

/** Account for an on-screen keyboard without changing the layout during pinch zoom. */
export function desktopViewportHeight(layoutHeight:number,visual?:{height:number;scale:number}){
 return visual&&Math.abs(visual.scale-1)<.02&&Number.isFinite(visual.height)&&visual.height>0?Math.min(layoutHeight,visual.height):layoutHeight;
}
export function useDesktopViewport(){
 useLayoutEffect(()=>{
  const viewport=window.visualViewport;
  const update=()=>document.documentElement.style.setProperty('--desktop-height',`${desktopViewportHeight(innerHeight,viewport??undefined)}px`);
  update();viewport?.addEventListener('resize',update);window.addEventListener('resize',update);
  return()=>{viewport?.removeEventListener('resize',update);window.removeEventListener('resize',update);document.documentElement.style.removeProperty('--desktop-height')};
 },[]);
}
