import {readdir,readFile,stat} from 'node:fs/promises';
import {join,extname} from 'node:path';

async function files(directory){const entries=await readdir(directory,{withFileTypes:true});return(await Promise.all(entries.map(entry=>entry.isDirectory()?files(join(directory,entry.name)):[join(directory,entry.name)]))).flat()}
const assets=new Set(),missing=[];
for(const path of ['index.html',...await files('src')]){
 if(!['.ts','.tsx','.css','.json','.html'].includes(extname(path)))continue;
 const source=await readFile(path,'utf8');
 for(const match of source.matchAll(/["'(]([^\s"'(){}?]+\.(?:png|jpe?g|gif|svg|mp4|mp3|pdf|otf|ogg|json))/g))if(match[1].startsWith('/'))assets.add(match[1]);
}
const library=JSON.parse(await readFile('public/music/library.json','utf8'));
for(const track of library.tracks){assets.add(track.src);if(track.cover)assets.add(track.cover)}
for(const asset of assets){if(!asset.startsWith('/')||asset.includes('..'))throw new Error(`Invalid local asset: ${asset}`);try{if(!(await stat(join('public',asset))).isFile())missing.push(asset)}catch{missing.push(asset)}}
if(missing.length)throw new Error(`Missing website assets:\n${missing.join('\n')}`);
console.log(`Asset preflight: ${assets.size} local files present, including ${library.tracks.length} music tracks.`);
