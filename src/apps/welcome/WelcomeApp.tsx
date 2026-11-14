import {ArrowUpRight,FolderOpen} from 'lucide-react';
import {useDesktop} from '../../components/Desktop';
import {ProjectMedia} from '../../components/ProjectMedia';
import {AnnotatedText} from '../../components/ui/AnnotatedText';

export function WelcomeApp(){
 const desktop=useDesktop();
 return <div className="welcome-page">
  <div className="welcome-intro">
   <div className="welcome-copy"><span className="micro">hey, welcome to my corner of the internet</span>
    <h1>azaan khan<span>.</span></h1>
    <p className="welcome-degree">first-year <AnnotatedText variant="underline" className="annotation-subtle">engineering</AnnotatedText> student</p>
    <p className="welcome-university">computer engineering · university of waterloo</p>
    <p className="welcome-description">a home for my projects, experiments, and the things i'm learning. away from the desk, my favourite hobby is cricket.</p>
   </div>
  </div>
  <div className="welcome-actions"><button className="aqua-button fj-button fj-button--md fj-button--aero" onClick={()=>desktop.open('projects')}><FolderOpen size={16}/> explore projects</button><button className="aqua-button fj-button fj-button--md fj-button--glass" onClick={()=>desktop.open('connect')}>find me <ArrowUpRight size={15}/></button></div>
  <footer className="welcome-footer"><div><span>little snapshots</span><small>from around my desktop</small></div><ProjectMedia placement="footer"/></footer>
 </div>;
}
