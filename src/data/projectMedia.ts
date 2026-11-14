export type ProjectMedia={id:string;kind:'photo'|'video';label:string;src?:string;poster?:string};
/** Add local image/MP4 URLs when supplied. Empty src values render placeholders. */
export const projectMedia:ProjectMedia[]=[
 {id:'photo-one',kind:'photo',label:'e7 · glass & sky',src:'/assets/improvement6-wallpaper.png'},
 {id:'film-one',kind:'video',label:'a little film, soon'},
 {id:'photo-two',kind:'photo',label:'another memory, soon'},
];
