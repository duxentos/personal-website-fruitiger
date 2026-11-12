export type MiiAnimation={id:string;src:string;category:'locomotion'|'idle'|'playful'|'greeting';durationMs:number;weight:number;cooldownMs:number;fullStage?:boolean};
// Durations measured from GIF frame metadata. Source clips own their traversal.
export const miiAnimations:MiiAnimation[]=[
{id:'scenic-route',src:'https://github.com/user-attachments/assets/3fe2ea08-f625-461e-b6cc-5f95eab8d33d',category:'locomotion',durationMs:7000,weight:3,cooldownMs:7000,fullStage:true},
{id:'shortcut',src:'https://github.com/user-attachments/assets/39808990-5c40-44e5-ab98-85bcbcef7a3d',category:'locomotion',durationMs:7000,weight:2,cooldownMs:7000,fullStage:true},
{id:'little-hop',src:'https://github.com/user-attachments/assets/1011e8a3-93bb-44be-97e6-ae993bc75366',category:'locomotion',durationMs:7000,weight:2,cooldownMs:7000,fullStage:true},
{id:'happy',src:'https://github.com/user-attachments/assets/a0c24fd4-9726-40bb-83a3-4b33f0b8044c',category:'playful',durationMs:1000,weight:2,cooldownMs:4000},
{id:'intro',src:'https://github.com/user-attachments/assets/818d59fb-4ecf-46c3-a6a9-6ebb692fa713',category:'greeting',durationMs:4000,weight:2,cooldownMs:5000},
{id:'curious',src:'https://github.com/user-attachments/assets/de9a2123-b680-4373-ac87-caa9feb613f1',category:'idle',durationMs:2420,weight:1,cooldownMs:6000},
{id:'wave',src:'https://github.com/user-attachments/assets/12484d35-ce6c-4cad-865c-041b0fb78edd',category:'greeting',durationMs:220,weight:2,cooldownMs:1000}
];
export function selectAnimation(pool:MiiAnimation[],previous:string|undefined,last:Record<string,number>,now:number,random=Math.random()):MiiAnimation|undefined{const eligible=pool.filter(a=>last[a.id]===undefined||now-last[a.id]>=a.cooldownMs);const choices=eligible.length>1?eligible.filter(a=>a.id!==previous):eligible;if(!choices.length)return undefined;const total=choices.reduce((sum,a)=>sum+a.weight,0);let cursor=random*total;for(const item of choices){cursor-=item.weight;if(cursor<0)return item}return choices.at(-1)}
