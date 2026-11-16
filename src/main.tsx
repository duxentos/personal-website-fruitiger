import {useEffect,useRef,useState,type CSSProperties} from 'react';
import {createRoot} from 'react-dom/client';
import {projects} from './projects';
import {AquaWindow} from './components/AquaWindow';
import {DesktopProvider,useDesktop} from './components/Desktop';
import {Dock,MenuBar} from './components/DesktopChrome';
import {BubbleLayer,PreferencesPanel} from './components/DesktopExtras';
import {MusicProvider} from './apps/ipod/MusicProvider';
import {IPodApp} from './apps/ipod/IPodApp';
import './apps/ipod/ipod.css';
import {TerminalApp} from './apps/terminal/TerminalApp';
import {ResumeApp} from './apps/resume/ResumeApp';
import {NotesApp} from './apps/notes/NotesApp';
import {StoriesApp} from './apps/stories/StoriesApp';
import {ProjectExplorer,ProjectDetails,type ProjectReturn} from './apps/projects/ProjectExplorer';
import {SoundProvider} from './audio/SoundProvider';
import {BootProvider} from './components/boot/BootScreen';
import {MiiApp} from './apps/mii/MiiApp';
import {WelcomeApp} from './apps/welcome/WelcomeApp';
import './components/boot/boot.css';
import {SocialIcon} from './components/SocialIcon';
import {ProjectMedia} from './components/ProjectMedia';
import {DesktopShortcuts} from './components/DesktopShortcuts';
import {profile} from './profile';
import './style.css';
import './apps/refinement.css';
import './vendor/frutiger-buttons.css';
import './apps/improvement6.css';
import './apps/aquaPalette.css';
import './apps/mii/mii.css';
import './apps/connect/connect.css';
import './apps/welcome/snapshots.css';
import './apps/improvement9.css';
import './apps/polish.css';
import './apps/projects/projects.css';
import {useDesktopViewport} from './components/useDesktopViewport';
function App(){const d=useDesktop();const[path,setPath]=useState(location.pathname);
 const[projectReturn,setProjectReturn]=useState<ProjectReturn>();const detailWasOpen=useRef(false);
 const selected=projects.find(p=>path===`/projects/${p.id}`);
 useDesktopViewport();
 useEffect(()=>{
  const route=()=>{const url=location.pathname;setPath(url);if(url.startsWith('/projects/')){d.open('detail');if(innerWidth<600)d.change('detail',{zoom:true})}else{d.close('detail');if(url==='/projects')d.open('projects')}};
  route();window.addEventListener('popstate',route);return()=>window.removeEventListener('popstate',route);
 },[]);
 function openProject(id:string){const url='/projects/'+id;history.pushState({},'',url);setPath(url);d.open('detail');if(innerWidth<600)d.change('detail',{zoom:true})}
 function closeProject(){d.close('detail');d.open('projects');if(selected)setProjectReturn({directory:selected.directory,focusId:selected.id,token:Date.now()});history.pushState({},'','/projects');setPath('/projects')}
 useEffect(()=>{
  const wasOpen=detailWasOpen.current;detailWasOpen.current=d.windows.detail.mode==='open';
  if(wasOpen&&d.windows.detail.mode==='closed'&&selected)closeProject();
 },[d.windows.detail.mode,path]);
 return <div style={{'--accent':d.preferences.accent} as CSSProperties} className={`os-desktop wallpaper-${d.wallpaper} theme-${d.preferences.theme} ${d.preferences.reducedMotion?'motion-reduced':''}`}><MenuBar/><BubbleLayer/><div className="wallpaper-art" aria-hidden="true"><span/><span/><span/><span/></div><main className="desktop-workspace" aria-label="azaan's desktop"><DesktopShortcuts/><ProjectMedia/>
 <AquaWindow id="avatar" className="mii-app-window"><MiiApp/></AquaWindow>
 <AquaWindow id="welcome" className="welcome-app"><WelcomeApp/></AquaWindow>
 <AquaWindow id="notes" className="notes-app"><NotesApp/></AquaWindow>
 <AquaWindow id="projects" className="projects-app"><ProjectExplorer onOpen={openProject} returnTo={projectReturn}/></AquaWindow>
 <AquaWindow id="stories" className="stories-window"><StoriesApp/></AquaWindow>
 <AquaWindow id="connect" className="connect-app"><div className="connect-content"><div><span className="micro">somewhere else on the internet</span><h2>want to find me?</h2><p>let's connect. you'll find me on linkedin.</p><div className="social-pills">{(['linkedin','github','devpost','instagram'] as const).map(name=><a key={name} className="aqua-button fj-button fj-button--md fj-button--aero" href={profile[name]} target="_blank" rel="noreferrer"><SocialIcon name={name}/>{name}</a>)}</div></div></div></AquaWindow>
 <AquaWindow id="detail" className="detail-app" title={selected?.name} onClose={closeProject}>{selected?<ProjectDetails key={selected.id} project={selected} onBack={closeProject}/>:<div className="empty"><p>Choose a project from Project Files.</p><button className="aqua-button" onClick={closeProject}>open project files</button></div>}</AquaWindow>
 <AquaWindow id="terminal" className="terminal-window"><TerminalApp/></AquaWindow><AquaWindow id="resume" className="resume-window"><ResumeApp/></AquaWindow><AquaWindow id="ipod" className="ipod-window"><IPodApp/></AquaWindow><AquaWindow id="settings" className="settings-app"><PreferencesPanel/></AquaWindow></main><Dock/></div>
}
createRoot(document.getElementById('root')!).render(<SoundProvider><MusicProvider><DesktopProvider><BootProvider><App/></BootProvider></DesktopProvider></MusicProvider></SoundProvider>);

