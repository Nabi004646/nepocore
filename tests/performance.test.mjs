import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {clientAssets} from '../scripts/client-assets.mjs';
import {tools,categories,icon} from '../dist/catalog.mjs';
import * as client from '../dist/catalog-client.mjs';
const dist=fileURLToPath(new URL('../dist/',import.meta.url));
const read=name=>readFile(new URL('../dist/'+name,import.meta.url),'utf8');
test('The initial application stays within a small ESM budget and excludes editorial payloads',async()=>{
 const files=await clientAssets(dist),bytes=[...files.values()].reduce((sum,value)=>sum+Buffer.byteLength(value),0);
 assert.ok(files.size<=9,`${files.size} startup modules`);
 assert.ok(bytes<105000,`${bytes} startup bytes before compression`);
 for(const name of files.keys())assert.doesNotMatch(name,/^(?:blog|content|views|social|info|.*-data|collections\/)/,name);
});
test('The generated browser catalogue preserves every tool, category and icon',()=>{
 assert.deepEqual(client.tools,tools);assert.deepEqual(client.categories,categories);
 for(const t of tools)assert.equal(client.icon(t.icon),icon(t.icon));
});
test('The homepage has one content-addressed stylesheet and its offline shell includes only startup resources',async()=>{
 const html=await read('index.html'),styles=[...html.matchAll(/<link rel="stylesheet" href="\.\/([^"]+)"/g)].map(x=>x[1]);
 assert.equal(styles.length,1);assert.match(styles[0],/^site-[a-f0-9]{12}\.css$/);
 const css=await read(styles[0]),digest=createHash('sha256').update(css).digest('hex').slice(0,12);
 assert.equal(styles[0],`site-${digest}.css`);
 const precache=JSON.parse(await read('precache.json'));
 assert.ok(precache.includes('./'+styles[0]));
 for(const name of (await clientAssets(dist)).keys())assert.ok(precache.includes('./'+name),name);
 assert.ok(precache.length<16);assert.ok(!precache.some(x=>/social-images|blog|content\.mjs|views\.mjs/.test(x)));
 for(const name of precache)if(name!=='./')assert.ok((await read(name.slice(2))).length>0,name);
 assert.match(await read('_headers'),/\/site-\*\.css\n  Cache-Control: public, max-age=31536000, immutable/);
});
