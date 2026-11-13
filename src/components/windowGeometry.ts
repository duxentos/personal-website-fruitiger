export type WindowFrame = {x: number; y: number; w: number; h: number; zoom?: boolean};
export type WorkspaceSize = {w: number; h: number};
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

/** Fit floating windows to the usable workspace, including after rotation. */
export function fitWindowFrame(frame: WindowFrame, size: WorkspaceSize, touch: boolean): WindowFrame {
  const width = Math.max(1, size.w), height = Math.max(1, size.h);
  if (frame.zoom) return {x: 0, y: 0, w: width, h: height, zoom: true};
  const maxW = touch ? Math.max(1, Math.floor(width * .9)) : width;
  const maxH = touch ? Math.min(height, Math.max(56, Math.floor(height * .88))) : height;
  const w = clamp(frame.w, Math.min(260, maxW), maxW);
  const h = clamp(frame.h, Math.min(180, maxH), maxH);
  return {x: clamp(frame.x, 0, width - w), y: clamp(frame.y, 0, height - h), w, h, zoom: false};
}

export function moveWindowFrame(frame: WindowFrame, dx: number, dy: number, size: WorkspaceSize) {
  return {
    x: clamp(frame.x + dx, 0, Math.max(0, size.w - frame.w)),
    y: clamp(frame.y + dy, 0, Math.max(0, size.h - frame.h)),
  };
}

export type ResizeEdge='n'|'s'|'e'|'w'|'ne'|'nw'|'se'|'sw';
export function resizeWindowFrame(frame:WindowFrame,dx:number,dy:number,edge:ResizeEdge,size:WorkspaceSize):WindowFrame{
 const minW=Math.min(260,size.w),minH=Math.min(180,size.h);let{x,y,w,h}=frame;
 if(edge.includes('e'))w=clamp(frame.w+dx,minW,size.w-frame.x);
 if(edge.includes('s'))h=clamp(frame.h+dy,minH,size.h-frame.y);
 if(edge.includes('w')){x=clamp(frame.x+dx,0,frame.x+frame.w-minW);w=frame.x+frame.w-x;}
 if(edge.includes('n')){y=clamp(frame.y+dy,0,frame.y+frame.h-minH);h=frame.y+frame.h-y;}
 return{x,y,w,h,zoom:false};
}
