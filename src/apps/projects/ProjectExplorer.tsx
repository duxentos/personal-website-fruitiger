import {useEffect,useLayoutEffect,useRef,useState,type CSSProperties,type PointerEvent} from 'react';
import {ArrowLeft,ArrowRight,Columns3,Folder,Grid2X2,List,Search} from 'lucide-react';
import {useDesktop} from '../../components/Desktop';
import {ProjectMedia} from '../../components/ProjectMedia';
import {projects} from '../../projects';
import {directories,enterDirectory,filterProjects,type DirectoryHistory,type DirectoryId,type Project,type ProjectFilter} from './projectModel';
import {ProjectIcon} from './ProjectIcon';
import {ProjectImage} from './ProjectGallery';
export {ProjectDetails} from './ProjectDetails';
export type ProjectReturn={directory:DirectoryId|'root';focusId:string;token:number};
function highlight(event:PointerEvent<HTMLButtonElement>){if(event.pointerType!=='mouse')return;const rect=event.currentTarget.getBoundingClientRect();event.currentTarget.style.setProperty('--pointer-x',((event.clientX-rect.left)/rect.width*100)+'%');event.currentTarget.style.setProperty('--pointer-y',((event.clientY-rect.top)/rect.height*100)+'%');event.currentTarget.style.setProperty('--parallax-x',((event.clientX-rect.left)/rect.width-.5)*6+'px');event.currentTarget.style.setProperty('--parallax-y',((event.clientY-rect.top)/rect.height-.5)*6+'px')}
function ProjectCard({project,onOpen,onFocus}:{project:Project;onOpen:()=>void;onFocus:()=>void}){
 return <button className="directory-project-card" data-project-id={project.id} style={{'--project-accent':project.accent} as CSSProperties} onPointerMove={highlight} onFocus={onFocus} onClick={onOpen}>
  <span className="project-card-thumbnail" aria-hidden="true">{project.screenshots[0]?<ProjectImage image={project.screenshots[0]}/>:<ProjectIcon project={project} size={44}/>}</span>
  <span className="project-card-copy"><span className="project-card-category">{project.category}</span><strong>{project.name}</strong><span className="project-card-description">{project.note}</span><span className="project-card-state">{project.status}</span><span className="project-card-technologies">{project.technologies.slice(0,4).map(technology=><span key={technology}>{technology}</span>)}</span></span>
  <ArrowRight className="project-card-arrow" size={17} aria-hidden="true"/>
 </button>;
}
export function ProjectExplorer({onOpen,returnTo}:{onOpen:(id:string)=>void;returnTo?:ProjectReturn}){
 const desktop=useDesktop(),root=useRef<HTMLDivElement>(null);
 const[navigation,setNavigation]=useState<DirectoryHistory>({entries:['root'],cursor:0}),[filter,setFilter]=useState<ProjectFilter>('all'),[query,setQuery]=useState(''),[selectedId,setSelectedId]=useState<string|null>(null),[focusTarget,setFocusTarget]=useState<string|null>(null);
 const folder=navigation.entries[navigation.cursor];
 const visible=filterProjects(projects,{directory:folder,filter,query,sort:desktop.sort}),showFolders=folder==='root'&&filter==='all'&&!query.trim();
 const selected=visible.find(project=>project.id===selectedId)??visible[0];
 const navigate=(directory:DirectoryId|'root')=>{setNavigation(previous=>enterDirectory(previous,directory));setFilter('all');setQuery('')};
 useEffect(()=>{if(!returnTo)return;setNavigation(previous=>enterDirectory(previous,returnTo.directory));setFilter('all');setQuery('');setSelectedId(returnTo.focusId);setFocusTarget(returnTo.focusId)},[returnTo]);
 useLayoutEffect(()=>{if(!focusTarget)return;const selector=focusTarget.startsWith('folder:')?'[data-folder-id="'+focusTarget.slice(7)+'"]':'[data-project-id="'+focusTarget+'"]';const node=root.current?.querySelector<HTMLButtonElement>(selector);if(node){node.focus({preventScroll:true});setFocusTarget(null)}},[focusTarget,navigation,filter,query]);
 return <div ref={root} className="project-directory-app" onKeyDown={event=>{
  if((event.target as HTMLElement).matches('input'))return;
  if(event.key==='Escape'&&folder!=='root'){event.preventDefault();const previous=folder;navigate('root');setFocusTarget('folder:'+previous);return}
  const target=(event.target as HTMLElement).closest('button[data-project-id],button[data-folder-id]');if(!target||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;
  event.preventDefault();const cards=Array.from(root.current?.querySelectorAll<HTMLButtonElement>('button[data-project-id],button[data-folder-id]')??[]),current=cards.indexOf(target as HTMLButtonElement),step=event.key==='ArrowLeft'||event.key==='ArrowUp'?-1:1;
  cards[event.key==='Home'?0:event.key==='End'?cards.length-1:Math.max(0,Math.min(cards.length-1,current+step))]?.focus();
 }}>
  <header className="directory-toolbar"><div className="directory-history"><button aria-label="previous project directory" disabled={navigation.cursor===0} onClick={()=>{setNavigation(previous=>({...previous,cursor:previous.cursor-1}));setQuery('');setFilter('all')}}><ArrowLeft size={17}/></button><button aria-label="next project directory" disabled={navigation.cursor===navigation.entries.length-1} onClick={()=>{setNavigation(previous=>({...previous,cursor:previous.cursor+1}));setQuery('');setFilter('all')}}><ArrowRight size={17}/></button></div>
   <div className="directory-view-controls">{([{view:'icons',label:'project cards',Icon:Grid2X2},{view:'list',label:'project list',Icon:List},{view:'columns',label:'project columns',Icon:Columns3}] as const).map(({view,label,Icon})=><button key={view} aria-label={label} aria-pressed={desktop.layout===view} onClick={()=>desktop.setLayout(view)}><Icon size={17}/></button>)}</div>
   <label className="directory-search"><Search size={15}/><input id="project-search" type="search" aria-label="search projects" placeholder="search projects" value={query} onChange={event=>setQuery(event.target.value)}/></label>
  </header>
  <nav className="directory-breadcrumb" aria-label="project directory path"><button onClick={()=>navigate('root')}><Folder size={14}/> projects</button>{folder!=='root'&&<><span>/</span><strong>{folder}</strong></>}</nav>
  <div className="directory-filters" role="group" aria-label="filter projects">
   <button aria-pressed={folder==='root'&&filter==='all'} onClick={()=>navigate('root')}>all</button>
   {directories.map(directory=><button key={directory.id} aria-pressed={folder===directory.id} onClick={()=>navigate(directory.id)}>{directory.name}</button>)}
   <span aria-hidden="true"/>
   <button aria-pressed={filter==='completed'} onClick={()=>setFilter(value=>value==='completed'?'all':'completed')}>completed</button>
   <button aria-pressed={filter==='in-progress'} onClick={()=>setFilter(value=>value==='in-progress'?'all':'in-progress')}>in progress</button>
  </div>
  <div className="directory-browser" key={folder}>
   <div className="directory-introduction"><span className="micro">a few things i've been building</span><h2>{showFolders?'project files':folder==='root'?'all projects':folder}</h2><p>{showFolders?'open a folder to look around.':visible.length+' '+(visible.length===1?'project':'projects')+' · select a file to open its window'}</p></div>
   {showFolders?<div className="project-folder-grid">{directories.map(directory=>{const contents=projects.filter(project=>project.directory===directory.id);return <button key={directory.id} data-folder-id={directory.id} className={'project-folder project-folder-'+directory.id} onPointerMove={highlight} onClick={()=>navigate(directory.id)} aria-label={'open '+directory.name+' directory, '+contents.length+' projects'}><span className="directory-folder-art" aria-hidden="true"><Folder size={56}/><span>{contents.slice(0,3).map(project=><ProjectIcon key={project.id} project={project} size={18}/>)}</span></span><span className="directory-folder-thumbnails" aria-hidden="true">{contents.slice(0,2).map(project=><span key={project.id}>{project.screenshots[0]?<ProjectImage image={project.screenshots[0]}/>:<ProjectIcon project={project} size={28}/>}</span>)}</span><strong>{directory.name}</strong><span>{directory.description}</span><small>{contents.length} project files <ArrowRight size={14}/></small></button>})}</div>:<div className={'directory-results directory-view-'+desktop.layout}><ul className="directory-project-grid" aria-label={folder==='root'?'matching projects':folder+' project files'}>{visible.map(project=><li key={project.id}><ProjectCard project={project} onFocus={()=>setSelectedId(project.id)} onOpen={()=>{setSelectedId(project.id);onOpen(project.id)}}/></li>)}</ul>{!visible.length&&<p className="directory-empty">no matching projects. try a different search or filter.</p>}{desktop.layout==='columns'&&selected&&<aside className="directory-inspector"><ProjectIcon project={selected} size={35}/><h3>{selected.name}</h3><p>{selected.note}</p><small>{selected.status}</small><button className="aqua-button fj-button fj-button--md fj-button--aero" onClick={()=>onOpen(selected.id)}>open project <ArrowRight size={14}/></button></aside>}</div>}
   <ProjectMedia placement="inline"/>
  </div>
  <footer className="directory-status"><span>{showFolders?'2 directories · '+projects.length+' projects':visible.length+' project files'}</span><span>arrow keys to browse · enter to open</span></footer>
 </div>;
}
