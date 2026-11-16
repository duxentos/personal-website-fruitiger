export type ProjectMedia={id:string;kind:'photo'|'video';label:string;src?:string;poster?:string;width:number;height:number};
/** Distinct existing landscape artwork. Replace URLs here to use personal photos/films. */
export const projectMedia:ProjectMedia[]=[
 {id:'e7',kind:'photo',label:'e7 · glass & sky',src:'/assets/improvement6-wallpaper.png',width:1370,height:768},
 {id:'meadow',kind:'photo',label:'green hills',src:'/meadow.svg',width:1920,height:1200},
 {id:'aurora',kind:'photo',label:'blue aurora',src:'/vista-aurora.svg',width:1920,height:1200},
];
