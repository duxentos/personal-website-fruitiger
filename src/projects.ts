export type Category = 'software engineering' | 'ai / machine learning' | 'biomedical engineering' | 'embedded systems' | 'hardware' | 'hackathons';
export type Project = {id:string;name:string; category:Category; accent:string; note:string};
export const projects:Project[]=[
 {id:'clintempo',name:'clintempo',category:'biomedical engineering',accent:'#fb917c',note:'project details coming soon'},
 {id:'goose-dynamic-notch',name:'goose / dynamic notch',category:'embedded systems',accent:'#79d9e7',note:'project details coming soon'},
 {id:'biotron-exoskeleton',name:'biotron exoskeleton',category:'hardware',accent:'#b0d774',note:'project details coming soon'}
];
