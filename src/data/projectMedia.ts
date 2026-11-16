export type ProjectMedia={id:string;kind:'photo'|'video';label:string;alt:string;src:string;source:string;poster?:string;width:number;height:number;duration?:number};
/** Supplied projectphotos.md media. Captions describe visible content without inferring project identity. */
export const projectMedia:ProjectMedia[]=[
 {id:'mcmaster',kind:'photo',label:'mcmaster engineering',alt:'Two people holding projector boxes in front of a McMaster Engineering backdrop.',src:'/assets/project-photos/mcmaster.jpg',source:'https://github.com/user-attachments/assets/0884cddc-b152-41dd-9e64-afe484125d32',width:1201,height:1602},
 {id:'workbench',kind:'photo',label:'at the workbench',alt:'Hands working with electronics beside a laptop showing an ESP32 wiring diagram.',src:'/assets/project-photos/workbench.jpg',source:'https://github.com/user-attachments/assets/d22472f2-4955-4cd1-90a6-b5157c8b2e62',width:1201,height:1602},
 {id:'campus-film',kind:'video',label:'out and about · full video',alt:'An outdoor video with friends wearing yellow hard hats.',src:'/assets/project-photos/campus-film.mp4',poster:'/assets/project-photos/video-poster.jpg',source:'https://photos.app.goo.gl/a1uhoubiH3JsiBxa6',width:360,height:640,duration:51.533333},
];
