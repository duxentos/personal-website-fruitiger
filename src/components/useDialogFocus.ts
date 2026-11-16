import {useEffect,type RefObject} from 'react';

/** Keep keyboard focus inside an open modal and return it to its opener. */
export function useDialogFocus(ref:RefObject<HTMLElement|null>,open=true){
 useEffect(()=>{
  const panel=ref.current;if(!open||!panel)return;
  const previous=document.activeElement;
  const controls=()=>Array.from(panel.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')).filter(node=>node.getClientRects().length>0);
  (controls()[0]??panel).focus({preventScroll:true});
  const trap=(event:KeyboardEvent)=>{
   if(event.key!=='Tab')return;
   const items=controls(),first=items[0],last=items.at(-1);
   if(!first){event.preventDefault();panel.focus();return}
   if(!panel.contains(document.activeElement)||(event.shiftKey?document.activeElement===first:document.activeElement===last)){
    event.preventDefault();(event.shiftKey?last:first)?.focus();
   }
  };
  panel.addEventListener('keydown',trap);
  return()=>{panel.removeEventListener('keydown',trap);if(previous instanceof HTMLElement&&previous.isConnected)previous.focus({preventScroll:true})};
 },[open,ref]);
}
