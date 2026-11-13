import {AnnotatedPhrase} from '../../components/ui/AnnotatedText';
import {useState} from 'react';
import {blogPosts} from '../../data/blogs';
export function StoriesApp(){
 const [selected,setSelected]=useState(blogPosts[0]?.id);
 const post=blogPosts.find(item=>item.id===selected);
 return <div className="blog-app"><header className="blog-toolbar"><h2>blogs</h2><span>a little journal</span></header><div className="blog-body"><nav className="blog-index" aria-label="blog posts">{blogPosts.map(item=><button key={item.id} aria-current={post?.id===item.id?'page':undefined} onClick={()=>setSelected(item.id)}><small>{item.date}</small><strong>{item.title}</strong><span>{item.excerpt}</span></button>)}</nav>{post?<article key={post.id} className="blog-paper"><span className="blog-date">{post.date}</span><h1><AnnotatedPhrase text={post.title} keyword={post.keyword} variant={post.annotation}/></h1>{post.placeholder&&<span className="blog-placeholder">a page waiting to be written</span>}{post.body.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article>:<p className="empty">a new page, soon.</p>}</div></div>;
}
