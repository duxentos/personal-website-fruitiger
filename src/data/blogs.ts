import type {AnnotationVariant} from '../components/ui/AnnotatedText';
export type BlogPost={id:string;title:string;keyword:string;annotation:AnnotationVariant;date:string;excerpt:string;body:string[];placeholder:boolean};
/** Replace placeholders with the author's posts. No autobiographical events are invented. */
export const blogPosts:BlogPost[]=[
 {id:'first-post',title:'a first entry',keyword:'first',annotation:'circle',date:'coming soon',excerpt:'a space for the next thought.',body:['the first blog post will live here.'],placeholder:true},
 {id:'project-notes',title:'notes from a project',keyword:'project',annotation:'wavy',date:'coming soon',excerpt:'ideas, sketches, and lessons along the way.',body:['a future post about something i am building.'],placeholder:true},
 {id:'small-discoveries',title:'small discoveries',keyword:'discoveries',annotation:'highlight',date:'coming soon',excerpt:'a few things worth remembering.',body:['photos, stories, and thoughts to come.'],placeholder:true},
];
