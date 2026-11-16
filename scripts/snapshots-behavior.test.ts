import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {snapshotPair,welcomePhotos,welcomeVideo} from '../src/data/welcomeSnapshots.ts';
test('rotating pairs reach every supplied selected photo without duplicating a pair member',()=>{
 const seen=new Set<string>();for(let step=0;step<welcomePhotos.length;step++){const pair=snapshotPair(welcomePhotos,step);assert.notEqual(pair[0].id,pair[1].id);pair.forEach(photo=>seen.add(photo.id));}assert.equal(seen.size,welcomePhotos.length);
 assert.deepEqual(snapshotPair([1,2,3],-1),[2,3]);assert.deepEqual(snapshotPair([],1),[]);assert.deepEqual(snapshotPair([1],4),[1]);
});
test('selected personal photos and film are real packaged media, not SPA fallback documents',async()=>{
 for(const photo of welcomePhotos){const bytes=await readFile(new URL('../public'+photo.src,import.meta.url));assert.equal(bytes.subarray(0,2).toString('hex'),'ffd8');}
 const bytes=await readFile(new URL('../public'+welcomeVideo.src,import.meta.url));assert.equal(bytes.subarray(4,8).toString(),'ftyp');assert.ok(bytes.includes(Buffer.from('vide')));assert.equal(bytes.includes(Buffer.from('soun')),false,'film must contain no audio track');
 const poster=await readFile(new URL('../public'+welcomeVideo.poster,import.meta.url));assert.equal(poster.subarray(0,2).toString('hex'),'ffd8');
});
