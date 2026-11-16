export function orderMusicFiles(files,sourceNames,lastName){
 const order=new Map(sourceNames.map((name,index)=>[name,index]));
 return [...files].sort((a,b)=>{
  if(a===lastName)return b===lastName?0:1;
  if(b===lastName)return -1;
  const ai=order.get(a)??Number.MAX_SAFE_INTEGER,bi=order.get(b)??Number.MAX_SAFE_INTEGER;
  return ai-bi||a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'});
 });
}
