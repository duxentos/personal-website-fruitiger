import {useEffect,useState,type CSSProperties} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowUpRight,FolderOpen} from 'lucide-react';
import {useReducedMotion} from 'motion/react';
import {projects} from './projects';
import {AquaWindow} from './components/AquaWindow';
import {DesktopProvider,useDesktop} from './components/Desktop';
import {Dock,MenuBar} from './components/DesktopChrome';
import {BubbleLayer,PreferencesPanel} from './components/DesktopExtras';
import {MusicProvider} from './apps/ipod/MusicProvider';
import {IPodApp} from './apps/ipod/IPodApp';
import './apps/ipod/ipod.css';
import {TerminalApp} from './apps/terminal/TerminalApp';
import {NotesApp} from './apps/notes/NotesApp';
import {StoriesApp} from './apps/stories/StoriesApp';
import {MiiApp} from './apps/mii/MiiApp';
import {ProjectExplorer,ProjectDetails} from './apps/projects/ProjectExplorer';
import {SoundProvider} from './audio/SoundProvider';
import {BootProvider} from './components/boot/BootScreen';
import {MiiCompanion} from './components/MiiCompanion';
import './components/boot/boot.css';
import {SocialIcon} from './components/SocialIcon';
import {DesktopShortcuts} from './components/DesktopShortcuts';
import {profile} from './profile';
import './style.css';
import './apps/refinement.css';
function App(){const d=useDesktop();const[path,setPath]=useState(location.pathname);const reduce=useReducedMotion();
 useEffect(()=>{const pop=()=>{setPath(location.pathname);if(location.pathname.startsWith('/projects/'))d.open('detail');else if(location.pathname==='/projects')d.open('projects');else{d.close('detail')}};window.addEventListener('popstate',pop);if(location.pathname.startsWith('/projects/'))d.open('detail');else if(location.pathname==='/projects')d.open('projects');else{d.close('detail')};return()=>window.removeEventListener('popstate',pop)},[]);
 function openProject(id:string){const url='/projects/'+id;history.pushState({},'',url);setPath(url);d.open('detail')}
 const selected=projects.find(p=>path===`/projects/${p.id}`);
 return <div style={{'--accent':d.preferences.accent} as CSSProperties} className={`os-desktop wallpaper-${d.wallpaper} theme-${d.preferences.theme} ${d.preferences.reducedMotion?'motion-reduced':''}`}><MenuBar/><BubbleLayer/><div className="wallpaper-art" aria-hidden="true"><span/><span/><span/><span/></div><main className="desktop-workspace" aria-label="azaan's desktop"><DesktopShortcuts/>
 <AquaWindow id="welcome" className="welcome-app"><div className="welcome-content"><MiiCompanion compact context="about"/><span className="micro">personal desktop / azaan khan</span><h1>azaan khan<span>.</span></h1><p className="hero-sub">computer engineering @ university of waterloo</p><p className="hero-description">a home for projects, experiments, and things i'm learning along the way.</p><div className="hero-actions"><button className="aqua-button" onClick={()=>d.open('projects')}><FolderOpen size={15}/> explore my projects</button><button className="plain-link" onClick={()=>d.open('connect')}>want to find me? <ArrowUpRight size={15}/></button></div><div className="welcome-status"><span/> a work in progress <small>make yourself at home.</small></div></div></AquaWindow>
 <AquaWindow id="notes" className="notes-app"><NotesApp/></AquaWindow>
 <AquaWindow id="projects" className="projects-app"><ProjectExplorer onOpen={openProject}/></AquaWindow>
 <AquaWindow id="stories" className="stories-window"><StoriesApp/></AquaWindow>
 <AquaWindow id="avatar" className="mii-only-window"><MiiApp/></AquaWindow>
 <AquaWindow id="connect" className="connect-app"><div className="connect-content"><div><span className="micro">somewhere else on the internet</span><h2>want to find me?</h2><p>let's connect. you'll find me on linkedin.</p><div className="social-pills">{(['linkedin','github','devpost','instagram'] as const).map(name=><a key={name} className="aqua-button" href={profile[name]} target="_blank" rel="noreferrer"><SocialIcon name={name}/>{name} <ArrowUpRight size={13}/></a>)}</div></div><div className="curious-stage"><img src={reduce||d.preferences.reducedMotion?profile.avatar.still:profile.avatar.curious} alt="azaan’s confused mii looking around"/></div></div></AquaWindow>
 <AquaWindow id="detail" className="detail-app">{selected?<ProjectDetails project={selected} onBack={()=>{d.close('detail');d.open('projects');history.pushState({},'','/');setPath('/')}}/>:<p className="empty">Choose a project from Project Files.</p>}</AquaWindow>
 <AquaWindow id="terminal" className="terminal-window"><TerminalApp/></AquaWindow><AquaWindow id="resume" className="resume-window"><div className="resume-toolbar"><MiiCompanion compact context="resume"/><span>azaan khan — résumé</span><a className="aqua-button" href={profile.resume} target="_blank" rel="noreferrer">open PDF <ArrowUpRight size={13}/></a><a className="aqua-button" href={profile.resume} download>download</a></div><iframe className="resume-document" title="azaan khan résumé" src={profile.resume}/></AquaWindow><AquaWindow id="ipod" className="ipod-window"><IPodApp/></AquaWindow><AquaWindow id="settings" className="settings-app"><PreferencesPanel/></AquaWindow></main><Dock/></div>
}
createRoot(document.getElementById('root')!).render(<SoundProvider><MusicProvider><DesktopProvider><BootProvider><App/></BootProvider></DesktopProvider></MusicProvider></SoundProvider>);

