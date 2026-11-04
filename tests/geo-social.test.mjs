import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {socialImages} from '../dist/social-images.mjs';
import {socialMeta,markdownPath} from '../dist/social-meta.mjs';
import {guideAnswers} from '../dist/guide-answers.mjs';
import {posts,metadata} from '../dist/blog-content/all.mjs';
import {tools} from '../dist/catalog.mjs';
import {toolInfo} from '../dist/content.mjs';
import {escapeHTML} from '../dist/core.mjs';
const read=(path,binary=false)=>readFile(new URL('../dist/'+path,import.meta.url),binary?undefined:'utf8');
const base='https://nepocore.com/';
test('Every built page has its own matching PNG social preview, with identical OG and Twitter images',async()=>{
 const cfg=JSON.parse(await read('site-config.json'));
 assert.equal(Object.keys(socialImages).length,cfg.static_pages+cfg.worksheet_studio_pages);
 const files=new Set();
 for(const [path,entry]of Object.entries(socialImages)){
  const html=await read(path==='/notfound/'?'404.html':path.slice(1)+'index.html');
  assert.ok(html.includes('<title>'+escapeHTML(entry.title)+'</title>'),path);
  assert.ok(html.includes('<meta name="description" content="'+escapeHTML(entry.description)+'">'),path);
  const image=new URL(entry.file,base).href;
  for(const meta of ['property="og:image"','name="twitter:image"'])assert.ok(html.includes(meta+' content="'+image+'"'),path);
  assert.match(html,/<meta property="og:image:type" content="image\/png">/);
  assert.match(html,/<meta property="og:image:width" content="1200">/);
  assert.match(html,/<meta property="og:image:height" content="630">/);
  assert.ok(html.includes('content="'+escapeHTML(socialMeta(path,entry.title,base).alt)+'"'),path);
  const png=await read(entry.file,true);
  assert.equal(png.subarray(1,4).toString(),'PNG');
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
  files.add(entry.file);
 }
 assert.equal(files.size,Object.keys(socialImages).length,'Cards must be specific to every page');
});
test('Guide quick answers, references and dates agree between static HTML, schema and Markdown',async()=>{
 assert.equal(Object.keys(guideAnswers).length,posts.length);
 for(const p of posts){
  const html=await read('blog/'+p.slug+'/index.html'),md=await read('blog/'+p.slug+'/index.md');
  assert.ok(guideAnswers[p.slug].length>100,p.slug);
  assert.ok(html.includes(escapeHTML(guideAnswers[p.slug])),p.slug);
  assert.match(html,/id="quick-answer"/);assert.match(html,/id="guide-references"/);
  assert.match(md,/## Quick answer/);assert.match(md,/## References and method notes/);
  assert.doesNotMatch(md,/\nundefined(?:\n|$)|\[object Object\]/);
  for(const s of p.sections)assert.ok(md.includes(s.paragraphs[0].slice(0,35)),p.slug);
  const schema=JSON.parse(html.match(/id="site-structured-data">([\s\S]*?)<\/script>/)[1]);
  const article=schema['@graph'].find(x=>x['@type']==='BlogPosting');
  const m=metadata.find(x=>x.slug===p.slug);
  assert.equal(article.dateModified,m.updated);assert.equal(article.datePublished,m.date);
  assert.ok(html.includes('property="article:modified_time" content="'+m.updated+'"'));
  assert.equal(article.image,socialMeta('blog/'+p.slug+'/',p.title,base).image);
 }
});
test('All tool text companions preserve purpose, examples and limits and have discoverable alternates',async()=>{
 for(const t of tools){
  const route='tools/'+t.id+'/',html=await read(route+'index.html'),md=await read(route+'index.md'),info=toolInfo(t);
  assert.equal(markdownPath(route),route+'index.md');
  assert.ok(html.includes('type="text/markdown" title="Plain text version" href="'+base+route+'index.md"'));
  assert.ok(md.includes('Canonical page: '+base+route));
  assert.ok(md.includes(info.purpose.slice(0,35)),t.id);
  assert.match(md,/## Example/);assert.match(md,/## Limits and checks/);
  assert.doesNotMatch(md,/\nundefined(?:\n|$)|\[object Object\]/);
 }
 assert.equal(markdownPath('blog/category/images/'),null);
 assert.equal(markdownPath('tools/'),null);
 assert.match(await read('_headers'),/\/\*\.md\n  Content-Type: text\/markdown; charset=utf-8\n  X-Robots-Tag: noindex, follow/);
 assert.doesNotMatch(await read('sitemap.xml'),/index\.md/);
});
