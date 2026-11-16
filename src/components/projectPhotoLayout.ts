import {fitWindowFrame,type WindowFrame,type WorkspaceSize} from './windowGeometry.ts';
type MediaShape={width:number;height:number};
export type PhotoFrame={x:number;y:number;w:number;h:number};
export type PhotoPlan={mode:'inline'|'orbit';frames:PhotoFrame[]};
/** Use free desktop space only when every complete frame fits outside the Projects window. */
export function projectPhotoLayout(window:WindowFrame,workspace:WorkspaceSize,media:readonly MediaShape[]):PhotoPlan{
 const inline:PhotoPlan={mode:'inline',frames:[]};
 if(window.zoom||workspace.w<1024||!media.length||media.some(item=>item.width<=0||item.height<=0))return inline;
 const win=fitWindowFrame(window,workspace,false),pad=18,gap=20,chromeW=16,chromeH=42,maxRatio=Math.max(...media.map(item=>item.width/item.height));
 const areas=[
  {x:pad,y:pad,w:win.x-2*pad,h:workspace.h-2*pad},
  {x:win.x+win.w+pad,y:pad,w:workspace.w-win.x-win.w-2*pad,h:workspace.h-2*pad},
  {x:pad,y:win.y+win.h+pad,w:workspace.w-2*pad,h:workspace.h-win.y-win.h-2*pad},
  {x:pad,y:pad,w:workspace.w-2*pad,h:win.y-2*pad},
 ];
 let best:PhotoPlan=inline,bestHeight=0;
 for(const area of areas)for(let columns=media.length;columns>=1;columns--){
  const rows=Math.ceil(media.length/columns);
  const height=Math.min(190,(area.h-gap*(rows-1))/rows-chromeH,((area.w-gap*(columns-1))/columns-chromeW)/maxRatio);
  if(height<125||height<=bestHeight)continue;
  const cellW=height*maxRatio+chromeW,cellH=height+chromeH,totalH=rows*cellH+(rows-1)*gap;
  const frames=media.map((item,index)=>{
   const row=Math.floor(index/columns),column=index%columns,count=Math.min(columns,media.length-row*columns),rowW=count*cellW+(count-1)*gap,w=height*item.width/item.height+chromeW;
   return{x:area.x+(area.w-rowW)/2+column*(cellW+gap)+(cellW-w)/2,y:area.y+(area.h-totalH)/2+row*(cellH+gap),w,h:cellH};
  });
  best={mode:'orbit',frames};bestHeight=height;
 }
 return best;
}
