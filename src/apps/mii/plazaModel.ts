export type Point={x:number;y:number};
export type Visitor={id:string;name:string;color:string;zone:number;x:number;y:number;target:Point;pose:'walking'|'idle'|'waving'|'turning';until:number;direction:number};
export const walkableZones:Point[][]=[[{x:.12,y:.77},{x:.55,y:.75},{x:.75,y:.82},{x:.28,y:.87}],[{x:.31,y:.84},{x:.66,y:.82},{x:.78,y:.96},{x:.36,y:.98}]];
export function inZone(point:Point,polygon:Point[]){let inside=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a.y>point.y)!==(b.y>point.y)&&point.x<(b.x-a.x)*(point.y-a.y)/(b.y-a.y)+a.x)inside=!inside;}return inside;}
export function destination(zone:number,random=Math.random):Point{const polygon=walkableZones[zone];const a=polygon[0],b=polygon[1],c=polygon[2],d=polygon[3];const u=random(),v=random();return{x:(1-u)*(1-v)*a.x+u*(1-v)*b.x+u*v*c.x+(1-u)*v*d.x,y:(1-u)*(1-v)*a.y+u*(1-v)*b.y+u*v*c.y+(1-u)*v*d.y};}
export function characterHeight(y:number,width:number){const near=Math.max(80,Math.min(150,width*.15)),depth=Math.max(0,Math.min(1,(y-.74)/.24));return near*(.45+.55*depth);}
export function createVisitors():Visitor[]{return[{id:'azaan',name:'Azaan',color:'#387acc',zone:1},{id:'mint',name:'Mint visitor',color:'#64aa51',zone:0},{id:'rose',name:'Rose visitor',color:'#db719e',zone:0},{id:'violet',name:'Violet visitor',color:'#8a72bc',zone:1}].map((v,i)=>{const p=destination(v.zone,()=>[.2,.45,.65,.8][i]);return{...v,...p,target:destination(v.zone),pose:i%2?'idle':'walking',until:i*.8,direction:i%2?-1:1};});}
export function advanceVisitor(v:Visitor,dt:number,time:number,speed:number,random=Math.random){
 if(v.pose!=='walking'){if(time<v.until)return;if(v.pose==='turning'){v.pose='walking';return;}v.target=destination(v.zone,random);const direction=v.target.x>=v.x?1:-1;if(direction!==v.direction){v.direction=direction;v.pose='turning';v.until=time+.3;}else v.pose='walking';return;}
 const dx=v.target.x-v.x,dy=v.target.y-v.y,distance=Math.hypot(dx,dy),step=Math.min(.1,Math.max(0,dt))*.035*speed;
 if(distance<=step){v.x=v.target.x;v.y=v.target.y;v.pose=random()<.2?'waving':'idle';v.until=time+1+random()*3;return;}
 v.x+=dx/distance*step;v.y+=dy/distance*step;
}
