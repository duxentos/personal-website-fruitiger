import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {projectMedia} from '../src/data/projectMedia.ts';
import {projectPhotoLayout} from '../src/components/projectPhotoLayout.ts';
import {fitWindowFrame} from '../src/components/windowGeometry.ts';

const overlaps=(a:{x:number;y:number;w:number;h:number},b:{x:number;y:number;w:number;h:number})=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
test('floating project photos fit fully outside the project window without overlapping each other',()=>{
 let floating=0;
 for(const size of [{w:1024,h:600},{w:1280,h:700},{w:1470,h:650},{w:1920,h:900}]){
  for(const x of [0,100,400,850])for(const y of [0,120,450])for(const w of [360,740]){
   const win=fitWindowFrame({x,y,w,h:440,zoom:false},size,false),plan=projectPhotoLayout(win,size,projectMedia);
   if(plan.mode!=='orbit'){assert.equal(plan.frames.length,0);continue}
   floating++;assert.equal(plan.frames.length,3);
   plan.frames.forEach((frame,index)=>{
    assert.ok(frame.x>=10&&frame.y>=10);assert.ok(frame.x+frame.w<=size.w-10&&frame.y+frame.h<=size.h-10);
    assert.equal(overlaps(frame,win),false);assert.ok(frame.h>=167);
    assert.ok(Math.abs((frame.w-16)/(frame.h-42)-projectMedia[index].width/projectMedia[index].height)<.00001);
    plan.frames.slice(index+1).forEach(other=>assert.equal(overlaps(frame,other),false));
   });
  }
 }
 assert.ok(floating>20);
});
test('phones, tablets, expanded and space-constrained project windows keep media inline',()=>{
 for(const size of [{w:375,h:517},{w:768,h:874},{w:1023,h:600}]){
  assert.equal(projectPhotoLayout({x:0,y:0,w:350,h:450,zoom:false},size,projectMedia).mode,'inline');
 }
 assert.equal(projectPhotoLayout({x:0,y:0,w:1000,h:700,zoom:true},{w:1470,h:700},projectMedia).mode,'inline');
 assert.equal(projectPhotoLayout({x:5,y:5,w:1270,h:690,zoom:false},{w:1280,h:700},projectMedia).mode,'inline');
 assert.equal(projectPhotoLayout({x:5,y:5,w:500,h:400,zoom:false},{w:1280,h:700},[]).mode,'inline');
});
test('all new photo and film files match their source manifest and intrinsic proportions',()=>{
 const manifest=JSON.parse(readFileSync(new URL('../src/data/projectPhotoSources.json',import.meta.url),'utf8'));
 assert.equal(projectMedia.filter(item=>item.kind==='photo').length,2);
 for(const asset of manifest.files){const bytes=readFileSync(new URL('../public'+asset.path,import.meta.url));assert.equal(bytes.length,asset.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256)}
 for(const item of projectMedia){
  assert.ok(item.source.startsWith('https://'));
  const path=item.kind==='video'?item.poster:item.src;assert.ok(path);
  const bytes=readFileSync(new URL('../public'+path,import.meta.url));assert.equal(bytes.readUInt16BE(0),0xffd8);
  let offset=2,dimensions:number[]=[];
  while(offset<bytes.length){if(bytes[offset]!==0xff){offset++;continue}const marker=bytes[offset+1],length=bytes.readUInt16BE(offset+2);if([0xc0,0xc1,0xc2].includes(marker)){dimensions=[bytes.readUInt16BE(offset+7),bytes.readUInt16BE(offset+5)];break}offset+=length+2}
  assert.deepEqual(dimensions,[item.width,item.height]);
 }
});
test('the packaged film retains its full duration, video dimensions, audio and fast-start metadata',()=>{
 const film=projectMedia.find(item=>item.kind==='video')!,bytes=readFileSync(new URL('../public'+film.src,import.meta.url));
 assert.equal(bytes.subarray(4,8).toString(),'ftyp');assert.ok(bytes.indexOf('moov')<bytes.indexOf('mdat'));
 const mvhd=bytes.indexOf('mvhd');assert.ok(mvhd>0);const version=bytes[mvhd+4];assert.ok(version===0||version===1);
 const duration=version===1?Number(bytes.readBigUInt64BE(mvhd+28))/bytes.readUInt32BE(mvhd+24):bytes.readUInt32BE(mvhd+20)/bytes.readUInt32BE(mvhd+16);
 assert.ok(Math.abs(duration-film.duration!)<.05);assert.ok(duration>51.4&&duration<51.7,'must not be a trimmed preview');
 assert.ok(bytes.includes(Buffer.from('vide')));assert.ok(bytes.includes(Buffer.from('soun')),'preserve the supplied audio track');
 const tkhd=bytes.indexOf('tkhd'),size=bytes.readUInt32BE(tkhd-4),end=tkhd-4+size;
 assert.equal(bytes.readUInt32BE(end-8)/65536,film.width);assert.equal(bytes.readUInt32BE(end-4)/65536,film.height);
});
