import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceBubble,collideBubbles,confineBubble,type BubbleBody} from '../src/components/bubblePhysics.ts';
import {resolveWallpaper,wallpapers} from '../src/data/wallpapers.ts';
const bubble=(patch:Partial<BubbleBody>={}):BubbleBody=>({x:100,y:100,r:20,vx:30,vy:20,phase:0,...patch});
test('bubble collisions exchange approaching velocity and separate overlapping surfaces',()=>{
 const a=bubble({x:100,vx:30,vy:0}),b=bubble({x:135,vx:-30,vy:0});
 assert.equal(collideBubbles(a,b),true);assert.ok(a.vx<0&&b.vx>0);assert.ok(b.x-a.x>=a.r+b.r);
 assert.ok(Math.abs(a.vx+b.vx)<1e-8);
});
test('separating bubbles do not bounce again; coincident centres remain finite',()=>{
 const a=bubble({x:100,vx:-30}),b=bubble({x:135,vx:30});
 assert.equal(collideBubbles(a,b),false);assert.equal(a.vx,-30);assert.equal(b.vx,30);
 collideBubbles(a,bubble({x:a.x,y:a.y}));assert.ok(Number.isFinite(a.x)&&Number.isFinite(a.vx));
});
test('wall bounces point inward and remain bounded after rotation',()=>{
 const b=bubble({x:-20,y:1000,vx:-40,vy:30});assert.equal(confineBubble(b,320,568),true);
 assert.ok(b.vx>0&&b.vy<0);assert.equal(b.x,0);assert.equal(b.y,448);
 const outgoing=b.vx;assert.equal(confineBubble(b,320,568),false);assert.equal(b.vx,outgoing);
 confineBubble(b,200,180);assert.ok(b.x>=0&&b.y<=60);
});
test('time-based bubble motion and speed limits tolerate slow frames',()=>{
 const a=bubble(),b=bubble();advanceBubble(a,1/60,0,1);advanceBubble(b,1/30,0,1);
 assert.ok(Math.abs((b.x-100)/(a.x-100)-2)<.01);
 const fast=bubble({vx:400,vy:400});advanceBubble(fast,10,1,1.5);assert.ok(Math.hypot(fast.vx,fast.vy)<=90.00001);assert.ok(fast.x<110);
});
test('the plaza replaces saved XP wallpaper while preserving explicit Vista choice',()=>{
 assert.equal(resolveWallpaper('meadow'),'plaza');assert.equal(resolveWallpaper(undefined),'plaza');assert.equal(resolveWallpaper('vista'),'vista');assert.equal(wallpapers.plaza,'/assets/mii-plaza-background.png');
});
