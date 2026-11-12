import {test} from 'node:test';import assert from 'node:assert/strict';import {nextIndex,angleDelta,timeLabel} from '../src/apps/ipod/logic.ts';
test('repeat all wraps, off stops, one repeats on natural ending',()=>{assert.equal(nextIndex(1,2,0,'all',false),0);assert.equal(nextIndex(1,2,0,'off',false),null);assert.equal(nextIndex(1,2,0,'one',false),1);assert.equal(nextIndex(0,2,1,'one',false),1);assert.equal(nextIndex(0,0,1,'all',false),null)});
test('shuffle avoids repeating current track with multiple tracks',()=>{for(let i=0;i<10;i++)assert.notEqual(nextIndex(1,4,1,'all',true,i/10),1)});
test('click wheel crosses angle boundary without jumping',()=>{assert.equal(angleDelta(175,-175),10);assert.equal(angleDelta(-175,175),-10);assert.equal(angleDelta(0,150),0)});
test('time values handle unloaded media',()=>{assert.equal(timeLabel(NaN),'0:00');assert.equal(timeLabel(Infinity),'0:00');assert.equal(timeLabel(125),'2:05')});
