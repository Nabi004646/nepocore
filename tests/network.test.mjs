import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {networkSites,preferredToolURL,networkPageHTML} from '../dist/network.mjs';
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
 for(const s of networkSites.filter(s=>s.status==='planned')){assert.ok(networkPageHTML.includes(new URL(s.url).hostname));assert.ok(!networkPageHTML.includes('href="'+s.url+'"'));}
 assert.deepEqual(parsePage('/sites/'),{type:'sites'});
});
test('Human and machine directories agree about official addresses and availability',async()=>{
 const data=JSON.parse(await read('sites.json')),short=await read('llms.txt'),full=await read('llms-full.txt'),page=await read('sites/index.html');
 assert.deepEqual(data.sites,networkSites);
 for(const site of networkSites){assert.ok(short.includes(site.url));assert.ok(full.includes(site.url));assert.ok(page.includes(site.name));}
 assert.match(short,/PLANNED — not yet launched/);assert.match(short,/full professional resume and cover-letter product is https:\/\/resume\.nepocore\.com/);
 assert.match(page,/href="\.\/tools\/resume-builder\/"/);assert.match(page,/href="\.\/tools\/cover-letter\/"/);
 assert.match(await read('sitemap.xml'),/<loc>https:\/\/nepocore\.com\/sites\/<\/loc>/);
 assert.match(page,/id=G-R6E4FXVHNG/);
 const site=schemaData({type:'home'},'https://nepocore.com/')['@graph'].find(x=>x['@type']==='WebSite');
 assert.deepEqual(site.hasPart.map(x=>x.url),['https://resume.nepocore.com/']);
 const collection=schemaData({type:'sites'},'https://nepocore.com/')['@graph'].find(x=>x['@type']==='CollectionPage');
 assert.equal(collection.mainEntity.numberOfItems,11);
 assert.ok(collection.mainEntity.itemListElement.filter(x=>x.description.startsWith('Planned')).length===9);
});
