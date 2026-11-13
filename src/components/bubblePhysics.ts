export type BubbleBody={x:number;y:number;r:number;vx:number;vy:number;phase:number};
export function advanceBubble(b:BubbleBody,seconds:number,time:number,speed:number){
 const dt=Math.max(0,Math.min(.05,seconds))*speed;
 b.vx+=Math.sin(time*.7+b.phase)*5*dt;
 b.vy+=Math.cos(time*.6+b.phase)*4*dt;
 const velocity=Math.hypot(b.vx,b.vy);
 if(velocity>90){b.vx*=90/velocity;b.vy*=90/velocity;}
 b.x+=b.vx*dt;b.y+=b.vy*dt;
}
/** Separate overlapping circles, then apply an elastic impulse only while approaching. */
export function collideBubbles(a:BubbleBody,b:BubbleBody){
 const dx=b.x+b.r-a.x-a.r,dy=b.y+b.r-a.y-a.r,distance=Math.hypot(dx,dy),reach=a.r+b.r;
 if(distance>=reach)return false;
 const nx=distance?dx/distance:1,ny=distance?dy/distance:0;
 const invA=1/(a.r*a.r),invB=1/(b.r*b.r),total=invA+invB;
 const overlap=reach-distance+.05;
 a.x-=nx*overlap*invA/total;a.y-=ny*overlap*invA/total;
 b.x+=nx*overlap*invB/total;b.y+=ny*overlap*invB/total;
 const approach=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
 if(approach>=0)return false;
 const impulse=-(1+.97)*approach/total;
 a.vx-=impulse*nx*invA;a.vy-=impulse*ny*invA;
 b.vx+=impulse*nx*invB;b.vy+=impulse*ny*invB;
 return true;
}
export function confineBubble(b:BubbleBody,width:number,height:number){
 const maxX=Math.max(0,width-b.r*2),maxY=Math.max(0,height-b.r*2-80),minY=Math.min(35,maxY);
 let hit=false;
 if(b.x<0){b.x=0;if(b.vx<0){b.vx=-b.vx*.98;hit=true;}}
 if(b.x>maxX){b.x=maxX;if(b.vx>0){b.vx=-b.vx*.98;hit=true;}}
 if(b.y<minY){b.y=minY;if(b.vy<0){b.vy=-b.vy*.98;hit=true;}}
 if(b.y>maxY){b.y=maxY;if(b.vy>0){b.vy=-b.vy*.98;hit=true;}}
 return hit;
}
