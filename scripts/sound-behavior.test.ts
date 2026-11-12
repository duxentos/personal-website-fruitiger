import {test} from 'node:test';import assert from 'node:assert/strict';import {SoundEngine,defaultSoundPreferences,type SoundHandle} from '../src/audio/SoundEngine.ts';
function fixture(){let created=0,plays=0,time=1000;const handles:SoundHandle[]=[];const engine=new SoundEngine(()=>{created++;const audio:SoundHandle={volume:0,currentTime:0,preload:'',play:async()=>{plays++},pause:()=>{},onended:null,onerror:null};handles.push(audio);return audio},()=>time);return{engine,handles,get created(){return created},get plays(){return plays},advance:()=>{time+=1000}}}
test('effects remain silent before interaction; cached and rate limited afterward',async()=>{const f=fixture();assert.equal(await f.engine.play('menu.open'),false);assert.equal(f.created,0);f.engine.unlock();assert.equal(await f.engine.play('menu.open'),true);assert.equal(f.created,1);assert.equal(await f.engine.play('menu.open'),false);f.handles[0].onended?.(new Event('ended'));f.advance();await f.engine.play('menu.open');assert.equal(f.created,1);assert.equal(f.plays,2)});
test('master and category preferences control effects independently',async()=>{const f=fixture();f.engine.unlock();f.engine.configure({...defaultSoundPreferences,masterVolume:.2,categories:{...defaultSoundPreferences.categories,menu:false}});assert.equal(await f.engine.play('menu.open'),false);assert.equal(await f.engine.play('desktop.open'),true);assert.equal(f.handles[0].volume,.2)});
test('missing audio is skipped without repeated network attempts',async()=>{const f=fixture();f.engine.unlock();await f.engine.play('bubbles.pop');f.handles[0].onerror?.(new Event('error'));f.advance();assert.equal(await f.engine.play('bubbles.pop'),false);assert.equal(f.created,1)});
test('sound overlap is bounded to four different effects',async()=>{const f=fixture();f.engine.unlock();for(const key of ['menu.open','desktop.open','mii.greeting','ipod.select'] as const)assert.equal(await f.engine.play(key),true);assert.equal(await f.engine.play('bubbles.pop'),false)});


test('rapid click feedback retriggers its cached sound instead of dropping taps',async()=>{
 const f=fixture();f.engine.unlock();
 assert.equal(await f.engine.play('desktop.click'),true);
 assert.equal(await f.engine.play('desktop.click'),true);
 assert.equal(f.created,1);assert.equal(f.plays,2);
});
