import {priorityMarkdown} from '../dist/priority-tools.mjs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {tools} from '../dist/catalog.mjs';
import {toolInfo} from '../dist/content.mjs';
import {collectionSources} from '../dist/collection-sources.mjs';
import {posts,metadata} from '../dist/blog-content/all.mjs';
import {sources} from '../dist/blog-content/sources.mjs';
import {guideAnswers} from '../dist/guide-answers.mjs';
const root=new URL(JSON.parse(await readFile('dist/site-config.json','utf8')).site_url);
const url=path=>new URL(path,root).href;
export const mdText=value=>String(value).replace(/\\/g,'\\\\').replace(/([`*_[\]<>|])/g,'\\$1');
const link=(label,path)=>`[${mdText(label)}](${url(path)})`;
async function save(path,title,body){
 await mkdir('dist/'+path,{recursive:true});
 await writeFile('dist/'+path+'index.md',`# ${mdText(title)}\n\nCanonical page: ${url(path)}\n\n${body}\n\n---\n\n${link('About Nepocore','about/')} · ${link('Editorial and corrections policy','editorial-policy/')} · ${link('Privacy and processing details','privacy/')}\n`);
}
for(const t of tools){
 const d=toolInfo(t);
 await save('tools/'+t.id+'/',t.title,`${mdText(d.purpose)}\n\n## How to use it\n\n${d.steps.map((s,i)=>`${i+1}. ${mdText(s)}`).join('\n')}\n\n## Example\n\n${mdText(d.example)}\n\n## Limits and checks\n\n${mdText(d.tip)}${priorityMarkdown(t.id,mdText,link)}\n\n## Access and processing\n\nFree to use without an account. Interactive processing requires JavaScript in a modern browser. ${t.id==='text-to-speech'?'Browser or operating-system voices may use an online speech provider.': ['image-to-text','background-remover'].includes(t.id)?'Processing runs on the device; an engine or model may download from a third-party CDN.':'Input is processed in the browser rather than sent to a processing server.'} Optional browser storage is not a synchronized account.\n${collectionSources[t.id]?'\n## Method and sources\n\n'+collectionSources[t.id].map(([label,href])=>`- [${mdText(label)}](${href})`).join('\n'):''}`);
}
for(const p of posts){
 const m=metadata.find(x=>x.slug===p.slug);
 if(!guideAnswers[p.slug])throw Error('Missing quick answer: '+p.slug);
 const sections=p.sections.map(s=>`## ${mdText(s.title)}\n\n${(s.paragraphs||[]).map(mdText).join('\n\n')}${s.list?'\n\n'+s.list.map((x,i)=>`${i+1}. ${mdText(x)}`).join('\n'):''}${s.table?'\n\n| '+s.table.headers.map(mdText).join(' | ')+' |\n| '+s.table.headers.map(()=>'---').join(' | ')+' |\n'+s.table.rows.map(r=>'| '+r.map(mdText).join(' | ')+' |').join('\n'):''}${s.paragraphsAfter?'\n\n'+s.paragraphsAfter.map(mdText).join('\n\n'):''}`).join('\n\n');
 await save('blog/'+p.slug+'/',p.title,`By Nepocore. Published ${m.date}; updated ${m.updated||m.date}.\n\n${mdText(p.summary)}\n\n## Quick answer\n\n${mdText(guideAnswers[p.slug])}\n\n${sections}\n\n## Put it into practice\n\n${p.tools.map(id=>`- ${link(tools.find(t=>t.id===id).title,'tools/'+id+'/')}`).join('\n')}\n\n## References and method notes\n\nThe references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.\n\n${p.sources.map(id=>`- [${mdText(sources[id][0])}](${sources[id][1]})`).join('\n')}\n\nPrepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.`);
}
console.log(JSON.stringify({markdown_companions:tools.length+posts.length,guide_answers:posts.length}));
