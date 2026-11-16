import {Activity,Bird,Bot,BrainCircuit,CircuitBoard,Smartphone,WashingMachine,Ruler} from 'lucide-react';
import type {Project} from './projectModel';
const icons={brain:BrainCircuit,pulse:Activity,goose:Bird,circuit:CircuitBoard,phone:Smartphone,robot:Bot,laundry:WashingMachine,calipers:Ruler};
export function ProjectIcon({project,size=26}:{project:Project;size?:number}){const Icon=icons[project.icon];return <span className="project-symbol" aria-hidden="true"><Icon size={size}/></span>}

