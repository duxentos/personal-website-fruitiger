import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {snapshotFramePhotos,welcomePhotos,welcomeVideo,snapshotFrames} from '../src/data/welcomeSnapshots.ts';
test('five mixed photo frames rotate through all fifteen photos without duplicate images',()=>{
 const seen=new Set<string>();
 for(let step=0;step<60;step++){
  const selection=snapshotFramePhotos(welcomePhotos,step);assert.equal(selection.length,5);assert.equal(new Set(selection.map(item=>item.photo.id)).size,5);
  for(const {frame,photo}of selection){assert.equal(photo.orientation,frame.orientation);if(frame.id==='wide')assert.equal(photo.wide,true);if(frame.id==='landscape')assert.notEqual(photo.wide,true);seen.add(photo.id);}
 }
 assert.equal(welcomePhotos.length,15);assert.equal(seen.size,welcomePhotos.length);assert.equal(snapshotFrames.length,5);
});
test('photo navigation wraps backward and gracefully handles small or empty libraries',()=>{
 assert.deepEqual(snapshotFramePhotos([],1),[]);assert.equal(snapshotFramePhotos(welcomePhotos.slice(0,1),10).length,1);
 assert.equal(snapshotFramePhotos(welcomePhotos,-1).length,5);assert.notDeepEqual(snapshotFramePhotos(welcomePhotos,0).map(x=>x.photo.id),snapshotFramePhotos(welcomePhotos,1).map(x=>x.photo.id));
});
test('selected personal photos and film are real packaged media, not SPA fallback documents',async()=>{
 for(const photo of welcomePhotos){const bytes=await readFile(new URL('../public'+photo.src,import.meta.url));assert.equal(bytes.subarray(0,2).toString('hex'),'ffd8');}
 const bytes=await readFile(new URL('../public'+welcomeVideo.src,import.meta.url));assert.equal(bytes.subarray(4,8).toString(),'ftyp');assert.ok(bytes.includes(Buffer.from('vide')));assert.equal(bytes.includes(Buffer.from('soun')),false,'film must contain no audio track');
 const poster=await readFile(new URL('../public'+welcomeVideo.poster,import.meta.url));assert.equal(poster.subarray(0,2).toString('hex'),'ffd8');
 assert.equal(welcomeVideo.width/welcomeVideo.height,272/480);
});
