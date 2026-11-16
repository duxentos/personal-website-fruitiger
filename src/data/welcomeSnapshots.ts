export const welcomePhotos=[
 {id:'graduation-day',src:'/assets/about-me/photo-1.jpg',label:'graduation day',alt:'a group selfie in graduation gowns'},
 {id:'graduation-portrait',src:'/assets/about-me/photo-3.jpg',label:'a big day',alt:'a graduate in a blue gown and orange stole'},
 {id:'graduation-friends',src:'/assets/about-me/photo-5.jpg',label:'good company',alt:'friends standing together in graduation gowns'},
 {id:'portrait',src:'/assets/about-me/photo-6.jpg',label:'a quiet moment',alt:'a portrait wearing a dark cap and glasses'},
 {id:'city-walk',src:'/assets/about-me/photo-7.jpg',label:'out for a walk',alt:'a portrait beside a historic clock tower'},
 {id:'park',src:'/assets/about-me/photo-8.jpg',label:'fresh air',alt:'a portrait among green trees in a park'},
 {id:'together',src:'/assets/about-me/photo-9.jpg',label:'together',alt:'three people smiling together for a photograph'},
] as const;
export const welcomeVideo={src:'/assets/about-me/snapshot.mp4',poster:'/assets/about-me/video-poster.jpg',label:'a little motion'};
/** Two adjacent pictures advance as a pair and wrap through the whole collection. */
export function snapshotPair<T>(photos:readonly T[],step:number):T[]{
 if(!photos.length)return [];
 const start=((step*2)%photos.length+photos.length)%photos.length;
 return photos.length===1?[photos[0]]:[photos[start],photos[(start+1)%photos.length]];
}
