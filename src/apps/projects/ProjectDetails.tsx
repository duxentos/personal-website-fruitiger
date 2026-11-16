import {useEffect,useRef,type CSSProperties} from 'react';
import {ArrowLeft,ArrowRight,Play} from 'lucide-react';
import type {Project} from './projectModel';
import {ProjectIcon} from './ProjectIcon';
import {ProjectGallery,ProjectImage} from './ProjectGallery';
import {GoosePreview,ProjectArchitecture} from './ProjectArchitecture';
export function ProjectDetails({project,onBack}:{project:Project;onBack:()=>void}){
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus({preventScroll:true})},[project.id]);
 const links=[project.demo?{label:'visit project',href:project.demo}:null,project.devpost?{label:'project story on Devpost',href:project.devpost}:null,project.github?{label:'GitHub',href:project.github}:null,project.video?{label:'watch demo',href:project.video}:null].filter((link):link is {label:string;href:string}=>link!==null);
 return <article className={'project-case-study project-case-'+project.icon} style={{'--project-accent':project.accent} as CSSProperties} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();onBack()}}}>
  <div className="project-case-breadcrumb"><button onClick={onBack}><ArrowLeft size={15}/> projects</button><span>/</span><span>{project.directory}</span><span>/</span><strong>{project.name}</strong></div>
  <header className="project-case-header"><ProjectIcon project={project} size={38}/><div><p>{project.category}</p><h1 ref={heading} tabIndex={-1}>{project.name}</h1><span className="project-case-status">{project.status}</span>{project.date&&<span className="project-case-date">{project.date}</span>}</div></header>
  {links.length>0&&<nav className="project-case-quick-links" aria-label="project links">{links.map(link=><a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowRight size={12}/></a>)}</nav>}
  {project.icon==='pulse'&&<svg className="project-pulse" viewBox="0 0 600 42" aria-hidden="true"><polyline points="0,23 150,23 165,16 179,29 191,4 206,37 222,21 238,23 600,23"/></svg>}
  {project.icon==='circuit'&&<svg className="project-circuit-trace" viewBox="0 0 600 42" aria-hidden="true"><path d="M0 12H130L148 30H225L248 10H350L370 30H600M60 12V34H120M400 30V9H530"/><circle cx="120" cy="34" r="4"/><circle cx="530" cy="9" r="4"/></svg>}
  <p className="project-case-overview">{project.description}</p>
  {project.screenshots.length>0&&<ProjectGallery images={project.screenshots} name={project.name}/>}
  <div className="project-case-text">
   {project.motivation&&<section><h2>problem & motivation</h2><p>{project.motivation}</p></section>}
   {project.metric&&<aside className="project-reported-metric"><strong>{project.metric.value}</strong><div><span>{project.metric.label}</span><small>{project.metric.qualifier}</small></div></aside>}
   {project.contributions&&project.contributions.length>0&&<section><h2>my contributions</h2><ul>{project.contributions.map(point=><li key={point}>{point}</li>)}</ul></section>}
   <section><h2>technical implementation</h2><ul className="project-tech-tags">{project.technologies.map(technology=><li key={technology}>{technology}</li>)}</ul><ul>{project.features.map(feature=><li key={feature}>{feature}</li>)}</ul></section>
   {project.sections?.map(section=><section key={section.title}><h2>{section.title}</h2>{section.body&&<p>{section.body}</p>}{section.points&&<ul>{section.points.map(point=><li key={point}>{point}</li>)}</ul>}</section>)}
   {project.architecture&&<ProjectArchitecture diagram={project.architecture}/>}
   {project.icon==='goose'&&<GoosePreview/>}
   {project.planned&&project.planned.length>0&&<section className="project-planned"><h2>planned / in development</h2><ul>{project.planned.map(feature=><li key={feature}>{feature}</li>)}</ul></section>}
   {project.timeline&&<section className="project-restoration-diary"><h2>restoration diary</h2><ol>{project.timeline.map((stage,index)=>{const image=project.screenshots.find(image=>image.id===stage.imageId);return <li key={stage.title}><span className="diary-number">{String(index+1).padStart(2,'0')}</span><div><h3>{stage.title}</h3><p>{stage.body}</p>{image&&<figure><ProjectImage image={image}/><figcaption>{image.caption}</figcaption></figure>}</div></li>})}</ol></section>}
   {project.lessons&&project.lessons.length>0&&<section><h2>challenges & lessons</h2><ul>{project.lessons.map(lesson=><li key={lesson}>{lesson}</li>)}</ul></section>}
  </div>
  {links.length>0&&<footer className="project-case-links">{links.map(link=><a key={link.href} className="aqua-button fj-button fj-button--md fj-button--aero" href={link.href} target="_blank" rel="noreferrer">{link.href===project.video?<Play size={15}/>:null}{link.label}<ArrowRight size={15}/></a>)}</footer>}
  <button className="project-case-return" onClick={onBack}><ArrowLeft size={15}/> return to {project.directory}</button>
 </article>;
}

