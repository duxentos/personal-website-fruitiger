import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {projects} from '../src/projects.ts';
import {filterProjects,enterDirectory,galleryIndex} from '../src/apps/projects/projectModel.ts';

test('directory, status and search filters combine without mutating the project catalogue',()=>{
 const order=projects.map(project=>project.id);
 const software=filterProjects(projects,{directory:'software',filter:'in-progress',query:' TypeScript ',sort:'name'});
 assert.deepEqual(software.map(project=>project.name),['ClinTempo','GOOSE']);
 const hardware=filterProjects(projects,{directory:'hardware',filter:'completed',query:'iphone',sort:'name'});
 assert.equal(hardware[0]?.id,'iphone-4-restoration');assert.equal(hardware.length,1);
 assert.equal(filterProjects(projects,{directory:'root',filter:'all',query:'no matching project',sort:'status'}).length,0);
 assert.deepEqual(projects.map(project=>project.id),order);
});
test('directory history supports back navigation and truncates an abandoned forward branch',()=>{
 const root={entries:['root'] as ('root'|'software'|'hardware')[],cursor:0};
 const software=enterDirectory(root,'software');const hardware=enterDirectory(software,'hardware');
 assert.deepEqual(enterDirectory({...hardware,cursor:0},'hardware'),{entries:['root','hardware'],cursor:1});
 assert.equal(enterDirectory(software,'software'),software);assert.deepEqual(root.entries,['root']);
});
test('gallery navigation wraps in both directions and safely handles a single or empty gallery',()=>{
 assert.equal(galleryIndex(0,-1,6),5);assert.equal(galleryIndex(5,1,6),0);
 assert.equal(galleryIndex(1,19,6),2);assert.equal(galleryIndex(0,-1,1),0);assert.equal(galleryIndex(0,1,0),0);
});
test('all supplied project photographs are packaged with their actual image dimensions and source captions',()=>{
 const images=projects.flatMap(project=>project.screenshots);assert.equal(images.length,13);
 for(const image of images){
  assert.ok(image.caption&&image.alt&&image.source);assert.ok(image.src.startsWith('/assets/projects/'));
  const file=new URL('../public'+image.src,import.meta.url);assert.ok(existsSync(file));
  const bytes=readFileSync(file);if(bytes.readUInt32BE(0)===0x89504e47){assert.equal(bytes.readUInt32BE(16),image.width);assert.equal(bytes.readUInt32BE(20),image.height);continue}assert.equal(bytes.readUInt16BE(0),0xffd8);
  let offset=2,dimensions:undefined|{width:number;height:number};
  while(offset<bytes.length){if(bytes[offset]!==0xff){offset++;continue}const marker=bytes[offset+1];if(marker===0xd9||marker===0xda)break;const length=bytes.readUInt16BE(offset+2);if([0xc0,0xc1,0xc2].includes(marker)){dimensions={height:bytes.readUInt16BE(offset+5),width:bytes.readUInt16BE(offset+7)};break}offset+=length+2}
  assert.deepEqual(dimensions,{width:image.width,height:image.height},image.src);
 }
 const iphone=projects.find(project=>project.id==='iphone-4-restoration')!;assert.equal(iphone.screenshots.length,6);
 assert.ok(iphone.timeline?.every(stage=>!stage.imageId||iphone.screenshots.some(image=>image.id===stage.imageId)));
});
test('project architecture references real components and distinguishes planned integrations',()=>{
 for(const project of projects){const diagram=project.architecture;if(!diagram)continue;const nodes=new Set(diagram.nodes.map(node=>node.id));assert.equal(nodes.size,diagram.nodes.length);for(const edge of diagram.edges){assert.ok(nodes.has(edge.from));assert.ok(nodes.has(edge.to))}}
 const goose=projects.find(project=>project.icon==='goose')!;assert.ok(goose.architecture?.nodes.find(node=>node.id==='integrations')?.planned);
 const clinical=projects.find(project=>project.id==='clintempo')!;assert.equal(clinical.metric?.value,'45%');assert.match(clinical.metric!.qualifier,/reported/i);assert.ok(clinical.planned?.some(point=>/cloud/i.test(point)));
 const ece=projects.find(project=>project.id==='rehabilitation-device')!;assert.ok(ece.technologies.includes('ESP32'));assert.ok(ece.todo?.length);
 assert.ok(projects.some(project=>project.id==='biotron-exoskeleton'&&project.id!==ece.id));
});
