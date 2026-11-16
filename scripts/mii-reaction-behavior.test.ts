import test from 'node:test';
import assert from 'node:assert/strict';
import {miiContextForActiveApp,resolveMiiAppReaction,isRickDance} from '../src/components/miiReaction.ts';
const home={context:'home' as const,playing:false,musicInteracted:false,visible:true,reduced:false,enabled:true};
test('arrival/home plays jumping only, without a waving sequence',()=>{assert.equal(resolveMiiAppReaction(home),'jump');assert.equal(resolveMiiAppReaction({...home,playing:true}),'jump')});
test('using iPod dances even when paused; ongoing music also dances',()=>{assert.equal(resolveMiiAppReaction({...home,context:'ipod'}),'dance');assert.equal(resolveMiiAppReaction({...home,playing:true,musicInteracted:true}),'dance')});
test('Find Me thinking takes priority over music playback',()=>{assert.equal(resolveMiiAppReaction({...home,context:'find',playing:true}),'curious')});
test('focusing Mii preserves the app context, while closing that app releases it',()=>{assert.equal(miiContextForActiveApp('avatar','find',true,false),'find');assert.equal(miiContextForActiveApp('avatar','find',false,false),'home');assert.equal(miiContextForActiveApp('avatar','ipod',false,true),'ipod')});
test('other app navigation returns to jumping and Find Me/iPod select their context',()=>{assert.equal(miiContextForActiveApp('welcome','find',true,true),'home');assert.equal(miiContextForActiveApp('connect','home',true,false),'find');assert.equal(miiContextForActiveApp('ipod','home',false,true),'ipod')});
test('hidden, reduced-motion or disabled Mii app uses the supplied still',()=>{for(const override of [{visible:false},{reduced:true},{enabled:false}])assert.equal(resolveMiiAppReaction({...home,context:'find',playing:true,...override}),'still')});

test('only Rick Astley selects the supplied Rick pose and thinking still wins',()=>{
 assert.equal(isRickDance('dance',{id:'track-three',miiDance:'rick'}),true);
 assert.equal(isRickDance('dance',{id:'track-four'}),false);
 assert.equal(isRickDance('curious',{id:'track-three'}),false);
 assert.equal(isRickDance('still',{id:'track-three'}),false);
 assert.equal(isRickDance('jump',{id:'track-three'}),false);
});
