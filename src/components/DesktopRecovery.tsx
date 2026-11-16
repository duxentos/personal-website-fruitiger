import {Component,type ReactNode} from 'react';
import {RotateCw} from 'lucide-react';

/** Keep an unexpected app error from leaving visitors on a blank desktop. */
export class DesktopRecovery extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return{failed:true}}
 render(){
  if(!this.state.failed)return this.props.children;
  return <main className="desktop-recovery"><section role="alert"><span className="micro">azaan's desktop</span><h1>let's try that again.</h1><p>The desktop couldn't finish opening. Reload to try again; your saved notes and preferences stay in this browser.</p><button className="aqua-button" onClick={()=>location.reload()}><RotateCw size={16}/> reload desktop</button></section></main>;
 }
}
