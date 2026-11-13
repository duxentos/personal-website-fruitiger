export type Story={id:string;title:string;subtitle:string;year:string;cover:'circuits'|'care'|'software'|'journey';draft:boolean;paragraphs:string[];prompt?:string};
// Edit chapters here. Facts are from the supplied résumé; reflections remain marked drafts.
export const stories:Story[]=[
 {id:'why-engineering',title:'Why engineering?',subtitle:'Making ideas useful',year:'A beginning',cover:'circuits',draft:true,paragraphs:[
  'I’d love to use engineering to make things that are useful to people. My work on assistive technology, rehabilitation devices and clinical software brings together the parts I enjoy most: code, circuits, and solving practical problems.',
  'I want to keep learning how things work, testing ideas, and turning them into something real — especially where hardware and software meet.'
 ],prompt:'Add the personal moment that made you choose engineering.'},
 {id:'biomedical',title:'Building for people',subtitle:'Where electronics meet care',year:'2026',cover:'care',draft:false,paragraphs:[
  'At Waterloo, I’m a software and electrical member of the Biomechatronics design team, contributing to an assistive exoskeleton project focused on mobility support.',
  'My ECE 198 team is also developing an interactive rehabilitation-device concept. The work involves motion sensing, embedded systems and movement-driven mini-games.'
 ],prompt:'Personal reflection to add: why biomedical engineering matters to me.'},
 {id:'clintempo',title:'A clinical workflow',subtitle:'The story behind ClinTempo',year:'2026',cover:'software',draft:false,paragraphs:[
  'ClinTempo is an AI-assisted clinical documentation extension built with React, TypeScript, Vite, Node.js and Express. It connects a medical-scribe API to customizable consultation-note templates.',
  'Feedback from licensed Canadian family physicians helped refine the interface and documentation workflow.'
 ],prompt:'Personal story to add: the specific observation that inspired this project. No origin story has been supplied yet.'},
 {id:'learning',title:'Learning by making',subtitle:'Hardware, software, and the next idea',year:'Ongoing',cover:'journey',draft:false,paragraphs:[
  'My projects include an ESP32 washing-machine notifier using accelerometer data and mobile alerts, smartphone repair and restoration, and a SolidWorks model prepared for 3D printing.',
  'I’m a first-year Computer Engineering student at the University of Waterloo. Outside engineering, my favourite hobby is cricket.'
 ],prompt:'Journal space: add a hackathon memory or a lesson from learning to program. Specific event experiences have not been supplied.'}
];
