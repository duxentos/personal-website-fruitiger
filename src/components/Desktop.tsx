import {createContext,useContext,useEffect,useReducer,useState,type ReactNode} from 'react';
import {playSound} from '../audio/SoundEngine';
import {resolveWallpaper,type Wallpaper} from '../data/wallpapers';
import {finite,object,settingsStore} from '../settings/store';
import {initialSession,restoreSession,windowReducer,windowIds,windowTitles,type WindowId,type WindowState} from './windowModel';
export {windowIds,windowTitles};export type {WindowId,WindowState};
export type Preferences={wallpaper:Wallpaper;theme:'aqua'|'bliss'|'aurora'|'sunset'|'candy';accent:string;bubbles:boolean;density:'low'|'medium'|'high';speed:number;interactive:boolean;icons:boolean;startup:boolean;randomMii:boolean;miiInteractions:boolean;miiFrequency:number;miiSounds:boolean;reducedMotion:boolean;};
export const defaults:Preferences={wallpaper:'plaza',theme:'aqua',accent:'#2888ce',bubbles:true,density:'low',speed:.9,interactive:true,icons:true,startup:true,randomMii:true,miiInteractions:true,miiFrequency:10,miiSounds:true,reducedMotion:false};
function validate(value:unknown):Preferences{const v=object(value),p={...defaults};for(const key of Object.keys(defaults) as (keyof Preferences)[])if(typeof defaults[key]==='boolean'&&typeof v[key]==='boolean')(p as unknown as Record<string,unknown>)[key]=v[key];p.wallpaper=resolveWallpaper(v.wallpaper);p.theme=['aqua','bliss','aurora','sunset','candy'].includes(String(v.theme))?v.theme as Preferences['theme']:'aqua';p.density=['low','medium','high'].includes(String(v.density))?v.density as Preferences['density']:'low';p.accent=typeof v.accent==='string'&&/^#[0-9a-f]{6}$/i.test(v.accent)?v.accent:defaults.accent;p.speed=finite(v.speed,.9,.2,1.5);p.miiFrequency=finite(v.miiFrequency,10,5,60);return p;}
const size=()=>({w:typeof innerWidth==='number'?innerWidth:1280,h:Math.max(180,(typeof innerHeight==='number'?innerHeight:850)-150)});
type Layout='list'|'grid'|'icons'|'columns';
type DesktopAPI={windows:Record<WindowId,WindowState>;active:WindowId|null;open:(id:WindowId)=>void;focus:(id:WindowId)=>void;change:(id:WindowId,values:Partial<WindowState>)=>void;close:(id:WindowId|null)=>void;minimize:(id:WindowId|null)=>void;zoom:(id:WindowId|null)=>void;arrange:()=>void;restart:()=>void;showDesktop:()=>void;wallpaper:Preferences['wallpaper'];setWallpaper:(value:Preferences['wallpaper'])=>void;preferences:Preferences;setPreference:<K extends keyof Preferences>(key:K,value:Preferences[K])=>void;layout:Layout;setLayout:(value:Layout)=>void;sort:'name'|'category'|'status';setSort:(value:'name'|'category'|'status')=>void};
const Context=createContext<DesktopAPI|null>(null);
export function DesktopProvider({children}:{children:ReactNode}){
 const[session,dispatch]=useReducer(windowReducer,undefined,()=>settingsStore.read('session',value=>restoreSession(value,size())));
 const[preferences,setPreferences]=useState(()=>settingsStore.read('desktop',validate));
 const[view,setView]=useState(()=>settingsStore.read('view',value=>{const v=object(value);return{layout:['list','grid','icons','columns'].includes(String(v.layout))?v.layout as Layout:'list',sort:['name','category','status'].includes(String(v.sort))?v.sort as 'name'|'category'|'status':'name'};}));
 useEffect(()=>{settingsStore.write('desktop',preferences)},[preferences]);
 useEffect(()=>{settingsStore.write('session',session)},[session]);
 useEffect(()=>{settingsStore.write('view',view)},[view]);
 function open(id:WindowId){playSound('desktop.icon');if(session.windows[id].mode!=='open')playSound('desktop.open');if(id==='ipod')window.dispatchEvent(new Event('ipod-open'));dispatch({type:'open',id});}
 function control(type:'close'|'minimize'|'zoom',id:WindowId|null){if(!id)return;playSound(type==='close'?'desktop.close':type==='minimize'?'desktop.minimize':'desktop.maximize');dispatch({type,id});}
 function arrange(){const fresh=initialSession(size());for(const id of windowIds){fresh.windows[id].mode=session.windows[id].mode;fresh.windows[id].layer=session.windows[id].layer;}fresh.active=session.active;dispatch({type:'reset',session:fresh});}
 return <Context.Provider value={{windows:session.windows,active:session.active,open,focus:id=>dispatch({type:'focus',id}),change:(id,values)=>dispatch({type:'change',id,values}),close:id=>control('close',id),minimize:id=>control('minimize',id),zoom:id=>control('zoom',id),arrange,restart:()=>{window.dispatchEvent(new CustomEvent('desktop-boot'));},showDesktop:()=>dispatch({type:'home'}),wallpaper:preferences.wallpaper,setWallpaper:value=>setPreferences(p=>({...p,wallpaper:value})),preferences,setPreference:(key,value)=>setPreferences(p=>validate({...p,[key]:value})),layout:view.layout,setLayout:layout=>setView(v=>({...v,layout})),sort:view.sort,setSort:sort=>setView(v=>({...v,sort}))}}>{children}</Context.Provider>;
}
export function useDesktop(){const value=useContext(Context);if(!value)throw new Error('DesktopProvider is required');return value;}
