import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {tools,categories} from '../dist/catalog.mjs';
import {networkSites} from '../dist/network.mjs';
const dist=fileURLToPath(new URL('../dist/',import.meta.url));
const read=p=>readFile(path.join(dist,p),'utf8');
test('Static tool documents expose headings, canonical metadata, guides and schema before JavaScript',async()=>{const config=JSON.parse(await read('site-config.json')),descriptions=new Set();for(const t of tools){const html=await read('tools/'+t.id+'/index.html');assert.equal((html.match(/<h1\b/g)||[]).length,1,t.id);assert.ok(html.includes(t.title.replace(/&/g,'&amp;')),t.id);assert.match(html,/<link rel="canonical" href="https?:\/\//);assert.ok(html.includes(config.site_url+'tools/'+t.id+'/'));assert.match(html,/<meta name="description" content="[^"]+"/);descriptions.add(html.match(/<meta name="description" content="([^"]+)"/)[1]);assert.match(html,/A real use case/);assert.match(html,/Questions, answered/);const schema=JSON.parse(html.match(/<script type="application\/ld\+json" id="site-structured-data">([\s\S]*?)<\/script>/)[1]);assert.ok(schema['@graph'].find(x=>x['@type']==='WebApplication'));assert.ok(schema['@graph'].find(x=>x['@type']==='BreadcrumbList'));assert.doesNotMatch(html,/href="#\/tool\//);}assert.equal(descriptions.size,tools.length);});
test('Sitemap contains only real indexable pages and essential SEO assets exist',async()=>{const xml=await read('sitemap.xml'),locations=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);assert.equal(locations.length,JSON.parse(await read('site-config.json')).sitemap_urls);assert.equal(new Set(locations).size,locations.length);assert.ok(!locations.some(x=>/favorites|notfound/.test(x)));const cfg=JSON.parse(await read('site-config.json'));for(const loc of locations){const relative=loc.slice(cfg.site_url.length);assert.ok((await stat(path.join(dist,relative,'index.html'))).size>500);}for(const file of ['robots.txt','assets/social-card.png','assets/fonts/manrope-latin.woff2','assets/fonts/dm-sans-latin.woff2','404.html','favicon.ico','assets/favicon-32.png','assets/apple-touch-icon.png','assets/icon-192.png','assets/icon-512.png'])assert.ok((await stat(path.join(dist,file))).size>0);assert.match(await read('favorites/index.html'),/noindex,follow/);assert.match(await read('404.html'),/noindex,follow/);assert.match(await read('robots.txt'),/Sitemap: https?:\/\//);});
test('Static local asset references resolve for every generated tool page',async()=>{for(const t of tools){const html=await read('tools/'+t.id+'/index.html');for(const [,asset]of html.matchAll(/(?:src|href)="\.\/(assets\/[^"#?]+|[a-z-]+\.(?:mjs|css|webmanifest))"/g))assert.ok((await stat(path.join(dist,asset))).isFile(),`${t.id}: ${asset}`);}});


test('Homepage and client navigation preserve the searchable directory and canonical identity', async () => {
 const {pageHTML}=await import('../dist/views.mjs');
 const built=await read('index.html');
 const runtime=pageHTML({type:'home'});
 const graph=JSON.parse(built.match(/<script type="application\/ld\+json" id="site-structured-data">([\s\S]*?)<\/script>/)[1])['@graph'];
 const websites=graph.filter(x=>x['@type']==='WebSite');assert.equal(websites.length,1);
 assert.equal(websites[0].name,'Nepocore');assert.ok(websites[0].alternateName.includes('Nepocore Tools'));
 assert.ok(websites[0].alternateName.includes(new URL(websites[0].url).hostname));
 const org=graph.find(x=>x['@type']==='Organization');assert.equal(websites[0].publisher['@id'],org['@id']);assert.equal(org.alternateName,'Nepocore Tools');

 for(const html of [built,runtime]){
  assert.match(html,/<h1>Free Tools<\/h1>/);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.match(html,/data-tool-search role="search" action="\.\/tools\/" method="get"/);
  assert.match(html,/name="q" type="search"/);
  for(const id of ["image-converter","qr-code","calculator","pdf-merge","background-remover","ielts-overall"])assert.ok(html.includes("./tools/"+id+"/"),id);
  assert.match(html,/href="https:\/\/resume\.nepocore\.com\/"/);
  assert.doesNotMatch(html,/<section class="atelier-hero">/);
 }
});

test('Crawler and LLM discovery files link to real canonical public resources',async()=>{
 const cfg=JSON.parse(await read('site-config.json')),base=new URL(cfg.site_url);
 const brief=await read('llms.txt'),full=await read('llms-full.txt');
 assert.match(brief,/^# Nepocore\n\n>/);
 assert.match(brief,/llms-full\.txt/);
 assert.ok(brief.length<12000,'Keep the discovery overview concise');
 for(const t of tools)assert.ok(full.includes(new URL('tools/'+t.id+'/',base).href),t.id);
 for(const content of [brief,full])for(const [,value]of content.matchAll(/\]\((https?:\/\/[^)]+)\)/g)){
  const u=new URL(value);assert.equal(u.search,'');assert.equal(u.hash,'');
  if(u.origin!==base.origin){assert.ok(networkSites.some(s=>s.url===value),'Only declared official network destinations belong in the directory: '+value);continue;}
  const relative=decodeURIComponent(u.pathname.slice(base.pathname.length));
  assert.doesNotMatch(relative,/^(?:favorites|notfound|admin)(?:\/|$)/);
  const file=path.join(dist,relative,(!relative||relative.endsWith('/'))?'index.html':'');
  assert.ok((await stat(file)).isFile(),value);
 }
 assert.match(await read('_headers'),/Link: <https?:\/\/[^>]+\/llms\.txt>; rel="describedby"/);
 assert.match(await read('_redirects'),/\/llm\.txt \/llms\.txt 301/);
});
