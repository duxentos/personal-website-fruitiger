import test from 'node:test';
import assert from 'node:assert/strict';
import {desktopViewportHeight} from '../src/components/useDesktopViewport.ts';
import {fitWindowFrame} from '../src/components/windowGeometry.ts';
test('keyboard resize fits floating and expanded windows within visible space, then restores layout height',()=>{
 const keyboard=desktopViewportHeight(844,{height:390,scale:1});assert.equal(keyboard,390);
 const workspace={w:370,h:keyboard-140};
 for(const zoom of [true,false]){const frame=fitWindowFrame({x:200,y:400,w:600,h:600,zoom},workspace,true);assert.ok(frame.y>=0&&frame.y+frame.h<=workspace.h);assert.ok(frame.x>=0&&frame.x+frame.w<=workspace.w);}
 assert.equal(desktopViewportHeight(844,{height:844,scale:1}),844);
});
test('pinch zoom and unavailable viewport data do not shrink the desktop layout',()=>{
 assert.equal(desktopViewportHeight(844,{height:422,scale:2}),844);assert.equal(desktopViewportHeight(844),844);
 for(const height of [NaN,Infinity,0,-1])assert.equal(desktopViewportHeight(844,{height,scale:1}),844);
 assert.equal(desktopViewportHeight(390,{height:844,scale:1}),390);
});
