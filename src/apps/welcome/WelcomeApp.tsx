import {ArrowRight,FolderOpen} from 'lucide-react';
import {useDesktop} from '../../components/Desktop';
import {WelcomeSnapshots} from '../../components/WelcomeSnapshots';
import {AnnotatedText} from '../../components/ui/AnnotatedText';

export function WelcomeApp(){
 const desktop=useDesktop();
 return <div className="welcome-page">
  <div className="welcome-intro">
   <div className="welcome-copy"><span className="micro">hey everyone, welcome to my corner of the internet</span>
    <h1>azaan khan<span>.</span></h1>
    <p className="welcome-degree">first-year <AnnotatedText variant="underline" className="annotation-subtle">engineering</AnnotatedText> student</p>
    <p className="welcome-university">computer engineering · university of waterloo</p>
    <p className="welcome-description">i'm interested in machine learning and embedded systems, and i'm exploring the intersection of health and tech through biomedical engineering projects.</p>
    <p className="welcome-hobbies">outside engineering, i enjoy listening to music, playing cricket and football / soccer, photography, and trying new sports.</p>
    <p className="welcome-invitation">feel free to connect with me :)</p>
   </div>
  </div>
  <div className="welcome-actions"><button className="aqua-button fj-button fj-button--md fj-button--aero" onClick={()=>desktop.open('projects')}><FolderOpen size={16}/> explore projects</button><button className="aqua-button fj-button fj-button--md fj-button--glass" onClick={()=>desktop.open('connect')}>find me <ArrowRight size={15}/></button></div>
  <footer className="welcome-footer"><div><span>little snapshots</span><small>a few moments along the way</small></div><WelcomeSnapshots/></footer>
 </div>;
}
