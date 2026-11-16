import test from 'node:test';
import assert from 'node:assert/strict';
import {beginWindowGesture,updateWindowGesture,localPointer,sameWindowFrame} from '../src/components/windowGesture.ts';
import {initialSession,windowReducer} from '../src/components/windowModel.ts';
const size={w:1280,h:800};
const frame={x:100,y:100,w:400,h:300,zoom:false};
function begin(){return beginWindowGesture({pointerId:1,kind:'move',point:{x:150,y:120},frame,restore:frame,zoomed:false,touch:false})}
test('release coordinates are committed even without a preceding move event',()=>{
 const g=begin();assert.equal(updateWindowGesture(g,{x:153,y:122},size),null);
 const released=updateWindowGesture(g,{x:410,y:240},size)!;assert.equal(released.x,360);assert.equal(released.y,220);
 const desktop=initialSession(size),next=windowReducer(desktop,{type:'change',id:'welcome',values:released});
 assert.ok(sameWindowFrame(next.windows.welcome,released));assert.ok(!sameWindowFrame(desktop.windows.welcome,released));
});
test('subsequent drags start where the previous release left the window',()=>{
 const g=begin(),first=updateWindowGesture(g,{x:350,y:220},size)!;
 const second=beginWindowGesture({pointerId:2,kind:'move',point:{x:first.x+50,y:first.y+20},frame:first,restore:first,zoomed:false,touch:false});
 const next=updateWindowGesture(second,{x:first.x+90,y:first.y+50},size)!;assert.equal(next.x,first.x+40);assert.equal(next.y,first.y+30);
 const edge=updateWindowGesture(second,{x:-10000,y:10000},size)!;assert.equal(edge.x,0);assert.equal(edge.y,size.h-edge.h);
});
test('dragging a maximized window restores it under the same grab point',()=>{
 const restore={x:80,y:50,w:500,h:350,zoom:true};
 const g=beginWindowGesture({pointerId:1,kind:'move',point:{x:640,y:16},frame:{x:0,y:0,w:1280,h:800,zoom:true},restore,zoomed:true,touch:false});
 const first=updateWindowGesture(g,{x:700,y:50},size)!;assert.equal(first.zoom,false);assert.equal(first.w,500);assert.equal(first.x,450);assert.equal(first.y,34);
 const second=updateWindowGesture(g,{x:740,y:80},size)!;assert.equal(second.x,490);assert.equal(second.y,64);
});
test('touch drag-to-restore leaves room inside a phone viewport',()=>{
 const phone={w:355,h:570};const g=beginWindowGesture({pointerId:3,kind:'move',point:{x:178,y:20},frame:{x:0,y:0,w:355,h:570,zoom:true},restore:{x:0,y:0,w:355,h:570},zoomed:true,touch:true});
 const moved=updateWindowGesture(g,{x:190,y:75},phone)!;assert.ok(moved.w<phone.w&&moved.h<phone.h);assert.ok(moved.x>=0&&moved.y>=0);assert.ok(moved.x+moved.w<=phone.w&&moved.y+moved.h<=phone.h);
});
test('scaled/offset desktop coordinates preserve the pointer grab offset',()=>{
 assert.deepEqual(localPointer({x:700,y:450},{left:100,top:50,width:2000,height:1400},{w:1000,h:700}),{x:300,y:200});
});
test('edge resizing keeps its opposite corner while moving to final release',()=>{
 const g=beginWindowGesture({pointerId:1,kind:'resize',edge:'nw',point:{x:100,y:100},frame,restore:frame,zoomed:false,touch:false});
 const released=updateWindowGesture(g,{x:50,y:60},size)!;assert.equal(released.x+released.w,500);assert.equal(released.y+released.h,400);assert.equal(released.x,50);assert.equal(released.y,60);
});
