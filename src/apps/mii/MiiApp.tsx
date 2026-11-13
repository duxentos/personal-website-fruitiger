import {useEffect,useState} from 'react';
import {useReducedMotion} from 'motion/react';
import {useDesktop} from '../../components/Desktop';
import {profile} from '../../profile';

/** Only the author's supplied Mii.md artwork; window controls belong to AquaWindow. */
export function MiiApp(){
 const {preferences}=useDesktop();
 const reduce=useReducedMotion();
 const [hidden,setHidden]=useState(document.hidden);
 const [failed,setFailed]=useState(false);
 useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update)},[]);
 const src=reduce||preferences.reducedMotion||hidden||failed?profile.avatar.still:profile.avatar.wave;
 return <div className={`mii-only-app ${src===profile.avatar.wave?'mii-waving':'mii-still'}`}><img src={src} alt="Azaan’s Mii from the supplied Mii.md artwork" onError={()=>setFailed(true)}/></div>;
}
