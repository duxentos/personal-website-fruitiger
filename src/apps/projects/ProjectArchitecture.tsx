import {useId,useState} from 'react';
import {ArrowRight,Bird,ChevronDown,ChevronUp} from 'lucide-react';
import type {Project} from './projectModel';
export function ProjectArchitecture({diagram}:{diagram:NonNullable<Project['architecture']>}){
 const[selected,setSelected]=useState(diagram.nodes[0]?.id),detailId=useId();
 const current=diagram.nodes.find(node=>node.id===selected)??diagram.nodes[0];
 if(!current)return null;
 return <section className="project-architecture"><h2>architecture</h2><p className="project-section-hint">select a component to look inside</p>
  <div className="architecture-nodes">{diagram.nodes.map(node=><button key={node.id} aria-pressed={current.id===node.id} aria-controls={detailId} data-planned={node.planned===true} onClick={()=>setSelected(node.id)}><span>{node.title}</span>{node.planned&&<small>planned / developing</small>}</button>)}</div>
  <div id={detailId} className="architecture-inspector" aria-live="polite"><strong>{current.title}</strong><p>{current.detail}</p></div>
  <ul className="architecture-connections" aria-label="component relationships">{diagram.edges.map((edge,i)=><li key={i} data-connected={edge.from===current.id||edge.to===current.id}><span>{diagram.nodes.find(node=>node.id===edge.from)?.title}</span><ArrowRight size={15} aria-hidden="true"/><span>{diagram.nodes.find(node=>node.id===edge.to)?.title}</span><small>{edge.label}</small></li>)}</ul>
 </section>;
}
export function GoosePreview(){
 const[expanded,setExpanded]=useState(false);
 return <section className="goose-preview"><h2>a little desktop companion</h2><p className="project-section-hint">notch interaction study · in development</p><div className="goose-preview-screen">
  <button className={'goose-notch '+(expanded?'is-expanded':'')} aria-expanded={expanded} onClick={()=>setExpanded(value=>!value)}><span><Bird size={25}/><strong>GOOSE</strong>{expanded?<ChevronUp size={16}/>:<ChevronDown size={16}/>}</span>{expanded&&<span className="goose-notch-body"><span>study sessions</span><span>upcoming deadlines</span><small>concept preview</small></span>}</button>
  <span className="goose-preview-hint">tap the notch to {expanded?'collapse':'expand'}</span>
 </div></section>;
}

