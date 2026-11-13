import test from 'node:test';
import assert from 'node:assert/strict';
import {createSettingsStore,SETTINGS_KEY,object,finite} from '../src/settings/store.ts';
import {initialSession,restoreSession,windowReducer} from '../src/components/windowModel.ts';
import {resizeWindowFrame} from '../src/components/windowGeometry.ts';
import {validateNotebook,deleteNote,undoDelete} from '../src/apps/notes/noteModel.ts';
function storage(){const data=new Map<string,string>();return{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>{data.set(k,v)},removeItem:(k:string)=>{data.delete(k)}};}
test('settings migrate valid legacy values and preserve independent sections',()=>{
 const db=storage();db.setItem('azaan-ipod',JSON.stringify({volume:.3}));const store=createSettingsStore(db);
 assert.equal(store.read('music',v=>finite(object(v).volume,.5,0,1)),.3);
 store.write('sound',{enabled:false});store.write('music',{volume:.3});
 assert.deepEqual(store.read('sound',object),{enabled:false});
 db.setItem(SETTINGS_KEY,'corrupt');assert.equal(store.read('desktop',v=>finite(object(v).speed,.7,.2,2)),.7);
});
test('future settings are not overwritten; restore defaults keeps notes',()=>{
 const db=storage();const future=JSON.stringify({version:99,sections:{}});db.setItem(SETTINGS_KEY,future);const store=createSettingsStore(db);
 assert.equal(store.write('sound',{}),false);assert.equal(db.getItem(SETTINGS_KEY),future);
 db.removeItem(SETTINGS_KEY);store.write('notes',{items:[]});store.write('desktop',{theme:'candy'});store.restoreDefaults();
 assert.deepEqual(store.read('notes',object),{items:[]});assert.deepEqual(store.read('desktop',object),{});
});
test('fresh launch has four apps; returning sessions respect closed and minimized windows',()=>{
 const size={w:1280,h:720};let session=initialSession(size);
 assert.deepEqual(Object.values(session.windows).filter(w=>w.mode==='open').map(w=>w.id),['welcome','stories','projects','connect']);
 session=windowReducer(session,{type:'close',id:'welcome'});session=windowReducer(session,{type:'minimize',id:'projects'});
 session.windows.connect.x=9000;const restored=restoreSession(session,size);
 assert.equal(restored.windows.welcome.mode,'closed');assert.equal(restored.windows.projects.mode,'minimized');assert.ok(restored.windows.connect.x+restored.windows.connect.w<=size.w);
 assert.equal(restored.windows[restored.active!].mode,'open');
 const opened=windowReducer(restored,{type:'open',id:'projects'});assert.equal(Object.values(opened.windows).filter(w=>w.id==='projects').length,1);
});
test('edge resize anchors the opposite side and clamps to the workspace',()=>{
 const frame={x:100,y:100,w:500,h:400};const size={w:1000,h:800};
 const west=resizeWindowFrame(frame,900,0,'w',size);assert.equal(west.x+west.w,600);assert.equal(west.w,260);
 const north=resizeWindowFrame(frame,0,-900,'n',size);assert.equal(north.y,0);assert.equal(north.h,500);
 const corner=resizeWindowFrame(frame,2000,2000,'se',size);assert.equal(corner.w,900);assert.equal(corner.h,700);
});
test('notebook deletion is recoverable and an intentionally empty notebook stays empty',()=>{
 const book=validateNotebook(undefined);const deleted=deleteNote(book,'welcome');assert.equal(deleted.items.length,0);
 assert.equal(validateNotebook(deleted).items.length,0);assert.equal(undoDelete(deleted).items[0].body,book.items[0].body);
 const malformed=validateNotebook({items:[{},book.items[0],book.items[0]],selectedId:'missing'});assert.equal(malformed.items.length,1);assert.equal(malformed.selectedId,'welcome');
});
test('a maximized session retains its floating restore frame after refresh',()=>{
 const size={w:1280,h:720};const session=initialSession(size);session.windows.notes={...session.windows.notes,x:50,y:40,w:600,h:450,mode:'open',zoom:true};
 const restored=restoreSession(session,size);assert.equal(restored.windows.notes.zoom,true);assert.equal(restored.windows.notes.w,600);assert.equal(restored.windows.notes.x,50);
 const unzoomed=windowReducer(restored,{type:'zoom',id:'notes'});assert.equal(unzoomed.windows.notes.zoom,false);assert.equal(unzoomed.windows.notes.h,450);
});

test('retired plaza sessions cannot reopen the removed app',()=>{
 const initial=initialSession({w:1280,h:720});const value={...initial,active:'mii',windows:{...initial.windows,mii:{mode:'open',layer:500}}};
 const restored=restoreSession(value,{w:1280,h:720});assert.equal('mii' in restored.windows,false);assert.equal(restored.windows.avatar.mode,'closed');assert.notEqual(restored.active,'mii');
});
