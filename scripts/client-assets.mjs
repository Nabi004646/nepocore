import {readFile} from 'node:fs/promises';
import path from 'node:path';
// Only static ESM dependencies belong in the startup budget and offline shell.
export async function clientAssets(dist,entry='app.mjs'){
 const files=new Map();
 async function visit(name){
  if(files.has(name))return;
  const content=await readFile(path.join(dist,name),'utf8');files.set(name,content);
  const imports=/^\s*(?:import\s+(?:[^\n]*?\s+from\s+)?|export\s+[^\n]*?\s+from\s+)["']([^"']+)["']/gm;
  for(const [,href]of content.matchAll(imports))if(href.startsWith('.'))await visit(path.posix.normalize(path.posix.join(path.posix.dirname(name),href)));
 }
 await visit(entry);return files;
}
