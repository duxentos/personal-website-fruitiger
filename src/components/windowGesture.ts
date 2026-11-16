import {fitWindowFrame,moveWindowFrame,resizeWindowFrame,type ResizeEdge,type WindowFrame,type WorkspaceSize} from './windowGeometry.ts';
export type Point={x:number;y:number};
export type WindowGesture={pointerId:number;kind:'move'|'resize';edge:ResizeEdge;start:Point;anchor:WindowFrame;current:WindowFrame;restore:WindowFrame;zoomed:boolean;moved:boolean;ratio:number;grabY:number;touch:boolean};
export function beginWindowGesture(options:{pointerId:number;kind:'move'|'resize';edge?:ResizeEdge;point:Point;frame:WindowFrame;restore:WindowFrame;zoomed:boolean;touch:boolean}):WindowGesture{
 const {frame,point}=options;return{...options,edge:options.edge??'se',start:{...point},anchor:{...frame},current:{...frame},moved:false,ratio:Math.max(0,Math.min(1,(point.x-frame.x)/Math.max(1,frame.w))),grabY:Math.max(0,Math.min(32,point.y-frame.y))};
}
/** Shared by pointer moves and pointer-up so the release cannot lose its final position. */
export function updateWindowGesture(g:WindowGesture,point:Point,size:WorkspaceSize):WindowFrame|null{
 let dx=point.x-g.start.x,dy=point.y-g.start.y;
 if(!g.moved&&Math.hypot(dx,dy)<6)return null;
 g.moved=true;
 if(g.zoomed&&g.kind==='move'){
  const restored=fitWindowFrame({...g.restore,zoom:false},size,g.touch);
  g.anchor=fitWindowFrame({...restored,x:point.x-g.ratio*restored.w,y:point.y-g.grabY},size,g.touch);
  g.start={...point};g.zoomed=false;dx=dy=0;
 }
 const next=g.kind==='move'?{...g.anchor,...moveWindowFrame(g.anchor,dx,dy,size),zoom:false}:resizeWindowFrame(g.anchor,dx,dy,g.edge,size);
 g.current=fitWindowFrame(next,size,g.touch);return g.current;
}
export function localPointer(client:Point,parent:{left:number;top:number;width:number;height:number},size:WorkspaceSize):Point{
 return{x:(client.x-parent.left)*size.w/Math.max(1,parent.width),y:(client.y-parent.top)*size.h/Math.max(1,parent.height)};
}
export function sameWindowFrame(a:WindowFrame,b:WindowFrame){return ['x','y','w','h'].every(key=>Math.abs(a[key as 'x']-b[key as 'x'])<.1)&&Boolean(a.zoom)===Boolean(b.zoom);}
