import {object} from '../../settings/store.ts';
export type Note={id:string;title:string;body:string;updatedAt:number};
export type Notebook={items:Note[];trash:Note[];selectedId:string|null};
export const welcomeNote:Note={id:'welcome',title:'Welcome to my personal website',body:'hey my name is azaan, a first year comp eng student at the University of Waterloo.\n\nI enjoy bringing hardware and software together. I’m part of Waterloo’s Biomechatronics design team, working on an assistive exoskeleton, and I’ve been building a rehabilitation device and clinical software through ClinTempo.\n\nOutside engineering, my favourite hobby is cricket.\n\nMake yourself at home.',updatedAt:0};
export function validateNotebook(value:unknown):Notebook{
 const root=object(value);if(!Array.isArray(root.items))return{items:[{...welcomeNote}],trash:[],selectedId:'welcome'};
 const clean=(items:unknown[])=>{const seen=new Set<string>();return items.slice(0,200).flatMap(item=>{const n=object(item);if(typeof n.id!=='string'||seen.has(n.id)||typeof n.title!=='string'||typeof n.body!=='string')return[];seen.add(n.id);return[{id:n.id,title:n.title.slice(0,200),body:n.body.slice(0,100000),updatedAt:typeof n.updatedAt==='number'&&Number.isFinite(n.updatedAt)?n.updatedAt:0}];});};
 const items=clean(root.items),trash=clean(Array.isArray(root.trash)?root.trash:[]);return{items,trash,selectedId:items.some(n=>n.id===root.selectedId)?root.selectedId as string:items[0]?.id??null};
}
export function deleteNote(book:Notebook,id:string):Notebook{const note=book.items.find(n=>n.id===id);if(!note)return book;const items=book.items.filter(n=>n.id!==id);return{items,trash:[note,...book.trash].slice(0,100),selectedId:book.selectedId===id?items[0]?.id??null:book.selectedId};}
export function undoDelete(book:Notebook):Notebook{const[note,...trash]=book.trash;if(!note)return book;return{items:[note,...book.items.filter(n=>n.id!==note.id)],trash,selectedId:note.id};}
