export type SnapshotPhoto={id:string;src:string;label:string;alt:string;orientation:'landscape'|'portrait';position:string;width:number;height:number;wide?:boolean};
/** Focal points are chosen from the supplied photos so faces remain in the crop. */
export const welcomePhotos:SnapshotPhoto[]=[
 {id:'graduation-day',src:'/assets/about-me/photo-1.jpg',width:1000,height:750,label:'graduation day',alt:'a group selfie in graduation gowns',orientation:'landscape',position:'50% 32%'},
 {id:'graduation-portrait',src:'/assets/about-me/photo-3.jpg',width:563,height:1000,label:'a big day',alt:'a graduate in a blue gown and orange stole',orientation:'portrait',position:'50% 18%'},
 {id:'graduation-friends',wide:true,src:'/assets/about-me/photo-5.jpg',width:1000,height:563,label:'good company',alt:'friends standing together in graduation gowns',orientation:'landscape',position:'50% 28%'},
 {id:'portrait',src:'/assets/about-me/photo-6.jpg',width:666,height:1000,label:'a quiet moment',alt:'a portrait wearing a dark cap and glasses',orientation:'portrait',position:'55% 32%'},
 {id:'city-walk',src:'/assets/about-me/photo-7.jpg',width:666,height:1000,label:'out for a walk',alt:'a portrait beside a historic clock tower',orientation:'portrait',position:'60% 52%'},
 {id:'park',src:'/assets/about-me/photo-8.jpg',width:747,height:1000,label:'fresh air',alt:'a portrait among green trees in a park',orientation:'portrait',position:'55% 34%'},
 {id:'together',src:'/assets/about-me/photo-9.jpg',width:1000,height:667,label:'together',alt:'three people smiling together for a photograph',orientation:'landscape',position:'50% 30%'},
 {id:'desk',src:'/assets/about-me/photo-10.jpg',width:750,height:1000,label:'at the desk',alt:'two laptops on a desk in a study space',orientation:'portrait',position:'50% 55%'},
 {id:'tower',src:'/assets/about-me/photo-11.jpg',width:1000,height:750,label:'looking up',alt:'a low-angle portrait beside a tall observation tower',orientation:'landscape',position:'46% 42%'},
 {id:'stage',wide:true,src:'/assets/about-me/photo-12.jpg',width:1000,height:563,label:'on stage',alt:'a graduate standing on a stage beside a presenter',orientation:'landscape',position:'48% 27%'},
 {id:'occasion',src:'/assets/about-me/photo-13.jpg',width:838,height:1000,label:'an occasion',alt:'three people standing together in formal clothing',orientation:'portrait',position:'50% 27%'},
 {id:'water',src:'/assets/about-me/photo-14.jpg',width:750,height:1000,label:'by the water',alt:'a seated portrait beside water and green trees',orientation:'portrait',position:'42% 32%'},
 {id:'train',src:'/assets/about-me/photo-15.jpg',width:563,height:1000,label:'window seat',alt:'a person sitting beside a train window',orientation:'portrait',position:'52% 56%'},
 {id:'gown',src:'/assets/about-me/photo-16.jpg',width:750,height:1000,label:'one to remember',alt:'a smiling graduate wearing a black gown and glasses',orientation:'portrait',position:'50% 24%'},
 {id:'winter',src:'/assets/about-me/photo-17.jpg',width:750,height:1000,label:'after dark',alt:'a person standing in a snowy courtyard under an arch',orientation:'portrait',position:'60% 62%'},
];
export const welcomeVideo={src:'/assets/about-me/snapshot.mp4',poster:'/assets/about-me/video-poster.jpg',label:'a little motion',width:272,height:480};
export const snapshotFrames=[
 {id:'landscape',orientation:'landscape',ratio:'4 / 3',offset:0},
 {id:'portrait',orientation:'portrait',ratio:'3 / 4',offset:0},
 {id:'wide',orientation:'landscape',ratio:'16 / 9',offset:2},
 {id:'square',orientation:'portrait',ratio:'1',offset:4},
 {id:'tall',orientation:'portrait',ratio:'4 / 5',offset:3},
] as const;
/** Prefer the correct orientation and never repeat a photo in the same five-frame set. */
export function snapshotFramePhotos(photos:readonly SnapshotPhoto[],step:number){
 if(!photos.length)return [];
 const used=new Set<string>();
 return snapshotFrames.flatMap(frame=>{
  const preferred=photos.filter(photo=>photo.orientation===frame.orientation&&(frame.id==='wide'?photo.wide:frame.id==='landscape'?!photo.wide:true));
  const pool=preferred.length?preferred:photos;
  const start=((step+frame.offset)%pool.length+pool.length)%pool.length;
  const photo=Array.from({length:pool.length},(_,i)=>pool[(start+i)%pool.length]).find(item=>!used.has(item.id))??photos.find(item=>!used.has(item.id));
  if(!photo)return [];used.add(photo.id);return [{frame,photo}];
 });
}
