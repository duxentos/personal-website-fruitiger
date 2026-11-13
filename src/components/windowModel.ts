import {finite, object} from '../settings/store.ts';
import {fitWindowFrame, type WorkspaceSize} from './windowGeometry.ts';
export const windowIds = ['welcome','stories','projects','connect','notes','avatar','detail','settings','ipod','terminal','resume'] as const;
export type WindowId = typeof windowIds[number];
export type WindowState = {id: WindowId; title: string; x: number; y: number; w: number; h: number; mode: 'open'|'minimized'|'closed'; zoom: boolean; layer: number};
export const windowTitles: Record<WindowId,string> = {welcome:'about me',stories:'blogs',projects:'projects',connect:'where to connect',notes:'notes',avatar:'mii',detail:'project info',settings:'system preferences',ipod:'ipod',terminal:'terminal',resume:'résumé'};
export type DesktopSession = {windows: Record<WindowId,WindowState>; active: WindowId | null};
export function initialSession(size: WorkspaceSize): DesktopSession {
  const small = size.w < 600;
  const aboutW=Math.min(500,size.w*.42),projectW=Math.min(570,size.w*.48);
  const aboutH=Math.min(340,size.h*.62),projectH=Math.min(350,size.h*.65);
  const defaults: Record<WindowId, [number,number,number,number]> = {
    welcome:[24,24,aboutW,aboutH], stories:[65,35,660,500],
    projects:[size.w-projectW-38,Math.min(105,size.h-projectH-24),projectW,projectH], connect:[75,55,640,420],
    notes:[50,30,660,520],avatar:[65,35,430,470],detail:[80,45,740,500],settings:[90,40,590,520],ipod:[40,25,345,610],terminal:[70,55,650,420],resume:[60,35,760,600],
  };
  const primary = ['welcome','projects'];
  const windows = Object.fromEntries(windowIds.map((id,index) => {
    const [x,y,w,h] = defaults[id];
    const geometry = fitWindowFrame({x,y,w:small?size.w:w,h:small?size.h:h,zoom:small&&primary.includes(id)}, size, false);
    return [id,{id,title:windowTitles[id],...geometry,mode:primary.includes(id)?'open':'closed',zoom:small&&primary.includes(id),layer:index+1}];
  })) as Record<WindowId,WindowState>;
  windows.welcome.layer=20;
  return {windows,active:'welcome'};
}
export function restoreSession(value: unknown, size: WorkspaceSize): DesktopSession {
  const root = object(value), saved = object(root.windows), initial = initialSession(size);
  if (!Object.keys(saved).length) return initial;
  for (const id of windowIds) {
    const item = object(saved[id]), fallback = initial.windows[id];
    const geometry = fitWindowFrame({x:finite(item.x,fallback.x,0,10000),y:finite(item.y,fallback.y,0,10000),w:finite(item.w,fallback.w,180,4000),h:finite(item.h,fallback.h,140,4000),zoom:false},size,false);
    initial.windows[id] = {...fallback,...geometry,zoom:item.zoom===true,mode:['open','closed','minimized'].includes(String(item.mode))?item.mode as WindowState['mode']:fallback.mode,layer:finite(item.layer,fallback.layer,1,100000)};
  }
  initial.active = windowIds.includes(root.active as WindowId) && initial.windows[root.active as WindowId].mode==='open' ? root.active as WindowId : topWindow(initial.windows);
  return initial;
}
/** Entry/reboot opens only the requested pair, while retaining their saved geometry. */
export const LAUNCH_LAYOUT_REVISION=3;
export function launchSession(value:unknown,size:WorkspaceSize):DesktopSession{
 const session=restoreSession(value,size),root=object(value),fresh=initialSession(size);
 for(const id of windowIds){
  if(root.layoutRevision!==LAUNCH_LAYOUT_REVISION&&(id==='welcome'||id==='projects'))session.windows[id]={...fresh.windows[id]};
  session.windows[id].mode=id==='welcome'||id==='projects'?'open':'closed';
 }
 session.active='welcome';session.windows.welcome.layer=Math.max(...Object.values(session.windows).map(w=>w.layer))+1;
 return session;
}
export function topWindow(windows: Record<WindowId,WindowState>): WindowId|null {return windowIds.filter(id=>windows[id].mode==='open').sort((a,b)=>windows[b].layer-windows[a].layer)[0]??null;}
export type WindowAction = {type:'open'|'focus'|'close'|'minimize'|'zoom';id:WindowId|null}|{type:'change';id:WindowId;values:Partial<WindowState>}|{type:'home'}|{type:'reset';session:DesktopSession};
export function windowReducer(state: DesktopSession, action: WindowAction): DesktopSession {
  if(action.type==='reset') return action.session;
  if(action.type==='home') return {active:null,windows:Object.fromEntries(windowIds.map(id=>[id,{...state.windows[id],mode:state.windows[id].mode==='open'?'minimized':state.windows[id].mode}])) as Record<WindowId,WindowState>};
  const id=action.id;if(!id)return state;const current=state.windows[id];
  if(action.type==='focus'&&current.mode!=='open')return state;
  if(action.type==='focus'&&state.active===id)return state;
  if((action.type==='close'&&current.mode==='closed')||(action.type==='minimize'&&current.mode!=='open'))return state;
  let next={...current};let active=state.active;
  if(action.type==='change')next={...current,...action.values,id,title:current.title};
  else if(action.type==='close'||action.type==='minimize'){next.mode=action.type==='close'?'closed':'minimized';if(action.type==='close')next.zoom=false;}
  else {next.mode='open';next.layer=Math.max(...Object.values(state.windows).map(w=>w.layer))+1;if(action.type==='zoom')next.zoom=!current.zoom;active=id;}
  const windows={...state.windows,[id]:next};
  if((action.type==='close'||action.type==='minimize')&&active===id)active=topWindow(windows);
  return {windows,active};
}
