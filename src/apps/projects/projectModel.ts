export type DirectoryId='software'|'hardware';
export type ProjectState='completed'|'in-progress';
export type ProjectImage={id:string;src:string;alt:string;caption:string;width:number;height:number;source:string};
export type ArchitectureNode={id:string;title:string;detail:string;planned?:boolean};
export type Project={
 id:string;name:string;directory:DirectoryId;category:string;state:ProjectState;status:string;date?:string;
 icon:'brain'|'pulse'|'goose'|'circuit'|'phone'|'robot'|'laundry'|'calipers';accent:string;note:string;description:string;
 technologies:string[];features:string[];screenshots:ProjectImage[];motivation?:string;
 contributions?:string[];planned?:string[];lessons?:string[];
 sections?:{title:string;body?:string;points?:string[]}[];
 architecture?:{nodes:ArchitectureNode[];edges:{from:string;to:string;label:string}[]};
 timeline?:{title:string;body:string;imageId?:string}[];
 metric?:{value:string;label:string;qualifier:string};
 github?:string;demo?:string;devpost?:string;video?:string;sources:string[];todo?:string[];
};
export const directories=[
 {id:'software',name:'Software',description:'Health technology, machine learning and desktop companions.'},
 {id:'hardware',name:'Hardware',description:'Embedded prototypes, robotics, CAD and restoration.'},
] as const;
export type ProjectFilter='all'|ProjectState;
export function filterProjects(projects:readonly Project[],options:{directory:DirectoryId|'root';filter:ProjectFilter;query:string;sort:'name'|'category'|'status'}){
 const query=options.query.trim().toLowerCase();
 return projects.filter(project=>(options.directory==='root'||project.directory===options.directory)&&(options.filter==='all'||project.state===options.filter)&&[project.name,project.category,project.description,...project.technologies].join(' ').toLowerCase().includes(query)).sort((a,b)=>a[options.sort].localeCompare(b[options.sort]));
}
export type DirectoryHistory={entries:(DirectoryId|'root')[];cursor:number};
export function enterDirectory(history:DirectoryHistory,directory:DirectoryId|'root'):DirectoryHistory{
 if(history.entries[history.cursor]===directory)return history;
 return {entries:[...history.entries.slice(0,history.cursor+1),directory],cursor:history.cursor+1};
}
export function galleryIndex(index:number,step:number,count:number){return count?((index+step)%count+count)%count:0}
