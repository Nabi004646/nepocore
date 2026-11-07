import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {networkSites,preferredToolURL} from '../dist/network.mjs';
import {href} from '../dist/catalog-view.mjs';
import {parsePage} from '../dist/views.mjs';
import {schemaData} from '../dist/content.mjs';
const read=name=>readFile(new URL('../dist/'+name,import.meta.url),'utf8');
test('The network keeps planned services explicit and routes only launched dedicated products',()=>{
 assert.equal(networkSites.length,11);assert.equal(new Set(networkSites.map(s=>s.url)).size,11);
 assert.deepEqual(networkSites.filter(s=>s.status==='live').map(s=>s.id),['tools','resume']);
 assert.equal(href('tool','resume-builder'),'https://resume.nepocore.com/');
 assert.equal(href('tool','cover-letter'),'https://resume.nepocore.com/builder/?section=cover');
 for(const id of ['qr-code','typing-test','pdf-merge','unicode-preeti','kids-worksheets'])assert.equal(href('tool',id),'./tools/'+id+'/');
 assert.equal(preferredToolURL('unknown'),null);
 assert.deepEqual(parsePage('/sites/'),{type:'notfound'});
});
test('The retired showcase redirects while actual product addresses remain consistent',async()=>{
 const data=JSON.parse(await read('sites.json')),short=await read('llms.txt'),full=await read('llms-full.txt'),home=await read('index.html');
 assert.deepEqual(data.sites,networkSites);assert.equal(data.directory,undefined);
 for(const site of networkSites){assert.ok(short.includes(site.url));assert.ok(full.includes(site.url));}
 assert.match(short,/PLANNED — not yet launched/);
 assert.doesNotMatch(home,/Our sites|Nepocore websites|directory-resume|href="\.\/sites\/"/);
 assert.doesNotMatch(await read('sitemap.xml'),/<loc>https:\/\/nepocore\.com\/sites\/<\/loc>/);
 assert.match(await read('_redirects'),/^\/sites \/ 301$/m);assert.match(await read('_redirects'),/^\/sites\/ \/ 301$/m);
 await assert.rejects(stat(new URL('../dist/sites/index.html',import.meta.url)),{code:'ENOENT'});
 const site=schemaData({type:'home'},'https://nepocore.com/')['@graph'].find(x=>x['@type']==='WebSite');
 assert.deepEqual(site.hasPart.map(x=>x.url),['https://resume.nepocore.com/']);
});
