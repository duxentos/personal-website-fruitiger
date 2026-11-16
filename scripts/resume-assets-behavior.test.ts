import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
test('every résumé preview page is packaged and matches the exact supplied PDF version',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../src/data/resumePages.json',import.meta.url),'utf8'));
 const pdf=await readFile(new URL('../public/azaan-khan-resume.pdf',import.meta.url));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.equal(createHash('sha256').update(pdf).digest('hex'),manifest.sourceSha256,'render previews again after replacing the PDF');
 assert.ok(manifest.pageCount>0);assert.equal(manifest.pages.length,manifest.pageCount);
 for(let index=0;index<manifest.pages.length;index++){const page=manifest.pages[index];assert.equal(page.number,index+1);assert.ok(page.width>=1440&&page.height>page.width);const image=await readFile(new URL('../public'+page.src,import.meta.url));assert.equal(image.subarray(0,2).toString('hex'),'ffd8');}
});
