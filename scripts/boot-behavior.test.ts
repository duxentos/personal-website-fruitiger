import test from 'node:test';
import assert from 'node:assert/strict';
import {selectBootRunner,bootRemainingMs} from '../src/components/boot/bootTiming.ts';

test('startup randomizes among all three supplied local running clips without consecutive repeats',()=>{
 const selected=[0,.5,.99].map(random=>selectBootRunner(undefined,true,random));
 assert.deepEqual(selected.map(clip=>clip.id),['scenic-route','shortcut','little-hop']);
 for(const clip of selected){assert.ok(clip.src.startsWith('/mii-'));assert.equal(clip.durationMs,7000);assert.equal(clip.fullStage,true);assert.notEqual(selectBootRunner(clip.id,true,0).id,clip.id);}
 assert.equal(selectBootRunner('scenic-route',false,.99).id,'scenic-route');
});
test('desktop waits for a loaded runner to finish one measured crossing and for critical assets',()=>{
 const state={assetsSettled:true,startedAt:null as number|null,durationMs:7000,now:1000,reduced:false,failed:false};
 assert.equal(bootRemainingMs(state),null);
 assert.equal(bootRemainingMs({...state,startedAt:1000,now:7999}),1);
 assert.equal(bootRemainingMs({...state,startedAt:1000,now:8000}),0);
 assert.equal(bootRemainingMs({...state,startedAt:1000,now:9000,assetsSettled:false}),null);
 assert.equal(bootRemainingMs({...state,startedAt:1000,now:9000}),0);
});
test('failed or reduced-motion runners never extend settled startup',()=>{
 const state={assetsSettled:true,startedAt:null,durationMs:7000,now:0,reduced:false,failed:false};
 assert.equal(bootRemainingMs({...state,reduced:true}),0);
 assert.equal(bootRemainingMs({...state,failed:true}),0);
 assert.equal(bootRemainingMs({...state,assetsSettled:false,failed:true}),null);
});
