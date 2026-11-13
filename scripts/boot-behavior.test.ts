import test from 'node:test';
import assert from 'node:assert/strict';
import {crossingDuration,BOOT_CROSSINGS,canEnterDesktop} from '../src/components/boot/bootTiming.ts';
import {miiAnimations} from '../src/data/miiAnimations.ts';
test('startup completes after one and a quarter measured traversals',()=>{
 const clip=miiAnimations.find(item=>item.id==='scenic-route')!;
 assert.equal(BOOT_CROSSINGS,1.25);assert.equal(clip.durationMs,7000);assert.equal(crossingDuration(clip.durationMs),8750);assert.equal(crossingDuration(NaN),8750);
});
test('desktop entry requires completed crossings and resolved critical assets',()=>{
 assert.equal(canEnterDesktop(false,true),false);assert.equal(canEnterDesktop(true,false),false);assert.equal(canEnterDesktop(true,true),true);
});
