import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {miiClips,miiStill,miiRick} from '../src/data/miiClips.ts';
import {inspectGif} from './read-gif.ts';

for(const [name,clip] of Object.entries(miiClips))test(`packaged ${name} clip contains its original animated GIF frames`,async()=>{
 const bytes=await readFile(new URL('../public'+clip.src,import.meta.url));
 const info=inspectGif(bytes);
 assert.ok(info.frames>1,'A still image cannot replace an animation');
 assert.equal(info.frames,clip.frames);assert.equal(info.durationMs,clip.durationMs);
 assert.ok(info.width>0&&info.height>0);
});
test('packaged reduced-motion fallback is a PNG',async()=>{
 const data=await readFile(new URL('../public'+miiStill,import.meta.url));assert.equal(data.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
});
test('an HTML SPA fallback is rejected as an animation even with an HTTP 200 response',()=>{
 assert.throws(()=>inspectGif(Buffer.from('<!doctype html><html><div id="root"></div></html>')),/Expected GIF/);
});

