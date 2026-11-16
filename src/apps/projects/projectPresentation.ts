import type {Project} from './projectModel.ts';
export function projectPageTitle(path:string,projects:readonly Pick<Project,'id'|'name'>[]){
 const project=projects.find(item=>path==='/projects/'+item.id);
 return project?project.name+' — azaan khan':path==='/projects'?'project files — azaan khan':path.startsWith('/projects/')?'project not found — azaan khan':'azaan khan — personal desktop';
}
