import {createContext,useContext,useState,type ReactNode} from 'react';
export type WindowId='welcome'|'notes'|'mii'|'projects'|'connect'|'detail';
export type WindowState={id:WindowId;title:string;x:number;y:number;w:number;h:number;mode:'open'|'minimized'|'closed';zoom:boolean;layer:number};
export const windowIds:WindowId[]=['welcome','notes','mii','projects','connect','detail'];
export const windowTitles:Record<WindowId,string>={welcome:'azaan’s desktop',notes:'currently.txt',mii:'say hi',projects:'project explorer',connect:'want to find me?',detail:'project file'};
function initialWindows():Record<WindowId,WindowState>{const width=typeof window==='undefined'?1280:window.innerWidth;const height=typeof window==='undefined'?850:window.innerHeight;const mainW=Math.min(660,width*.58);const left=Math.max(24,(width-1050)/2);const data:Record<WindowId,[number,number,number,number,WindowState['mode']]>= {welcome:[left,65,mainW,350,'open'],notes:[left+35,Math.max(300,Math.min(445,height-350)),270,210,'open'],mii:[left+mainW+35,100,280,350,'open'],projects:[Math.max(25,(width-940)/2),75,940,Math.min(570,height-190),'closed'],connect:[Math.max(25,(width-620)/2),110,620,360,'closed'],detail:[Math.max(25,(width-760)/2),80,760,470,'closed']};return Object.fromEntries(windowIds.map((id,i)=>[id,{id,title:windowTitles[id],x:Math.max(12,Math.min(data[id][0],width-Math.min(data[id][2],width-24)-12)),y:Math.max(8,Math.min(data[id][1],height-Math.min(data[id][3],height-150)-135)),w:Math.min(data[id][2],width-24),h:Math.max(170,Math.min(data[id][3],height-150)),mode:data[id][4],zoom:false,layer:i+1}])) as Record<WindowId,WindowState>}
type DesktopAPI={windows:Record<WindowId,WindowState>;active:WindowId;open:(id:WindowId)=>void;focus:(id:WindowId)=>void;change:(id:WindowId,values:Partial<WindowState>)=>void;close:(id:WindowId)=>void;minimize:(id:WindowId)=>void;zoom:(id:WindowId)=>void;arrange:()=>void;wallpaper:'vista'|'meadow';setWallpaper:(value:'vista'|'meadow')=>void};
const Context=createContext<DesktopAPI|null>(null);
export function DesktopProvider({children}:{children:ReactNode}){const[windows,setWindows]=useState(initialWindows);const[active,setActive]=useState<WindowId>('welcome');const[wallpaper,setWallpaper]=useState<'vista'|'meadow'>('vista');
 function change(id:WindowId,values:Partial<WindowState>){setWindows(all=>({...all,[id]:{...all[id],...values}}))}
 function focus(id:WindowId){setActive(id);setWindows(all=>({...all,[id]:{...all[id],layer:Math.max(...Object.values(all).map(w=>w.layer))+1}}))}
 function open(id:WindowId){change(id,{mode:'open'});focus(id)}
 function close(id:WindowId){change(id,{mode:'closed',zoom:false})}
 function minimize(id:WindowId){change(id,{mode:'minimized',zoom:false})}
 function zoom(id:WindowId){setWindows(all=>({...all,[id]:{...all[id],zoom:!all[id].zoom,mode:'open'}}));focus(id)}
 function arrange(){setWindows(all=>{const reset=initialWindows();for(const id of windowIds){reset[id].mode=all[id].mode;reset[id].layer=all[id].layer}return reset})}
 return <Context.Provider value={{windows,active,open,focus,change,close,minimize,zoom,arrange,wallpaper,setWallpaper}}>{children}</Context.Provider>}
export function useDesktop(){const value=useContext(Context);if(!value)throw new Error('DesktopProvider is required');return value}
