import test from 'node:test';
import assert from 'node:assert/strict';
import {canStartGreeting,resolveMiiReaction,nextGreeting,greetingDuration} from '../src/components/miiReaction.ts';
const idle={context:'about' as const,visible:true,reduced:false,enabled:true,greeting:null,playing:false,ipodHovered:false};
test('welcome greets with a jump then a wave before returning to music or idle',()=>{
 assert.equal(resolveMiiReaction({...idle,greeting:'jump'}),'jump');
 assert.equal(nextGreeting('jump'),'wave');assert.equal(nextGreeting('wave'),null);
 assert.equal(greetingDuration.jump,4000);assert.equal(resolveMiiReaction({...idle,greeting:'wave',playing:true}),'wave');assert.equal(resolveMiiReaction({...idle,playing:true}),'dance');assert.equal(resolveMiiReaction(idle),'still');
});
test('iPod hover dances without playback, while Find Me stays confused',()=>{
 assert.equal(resolveMiiReaction({...idle,greeting:'jump',ipodHovered:true}),'dance');assert.equal(resolveMiiReaction({...idle,context:'connect',playing:true,greeting:'jump'}),'curious');
});
test('hidden, reduced-motion and disabled companions stay static during any reaction',()=>{
 for(const override of [{visible:false},{reduced:true},{enabled:false}])assert.equal(resolveMiiReaction({...idle,playing:true,greeting:'jump',...override}),'still');
});

test('an explicit second tap replays the greeting while automatic hover stays throttled',()=>{
 assert.equal(canStartGreeting(1000,900),false);assert.equal(canStartGreeting(1000,900,true),true);assert.equal(canStartGreeting(6400,900),true);
});
