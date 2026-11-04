import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {searchIntents} from '../dist/search-intents.mjs';
import {seoMeta} from '../dist/content.mjs';
import {posts} from '../dist/blog-content/all.mjs';
import {practicePack} from '../dist/practice-pack.mjs';
import {calculate,ieltsOverall} from '../dist/core.mjs';
import {escapeHTML} from '../dist/core.mjs';
const read=name=>readFile(new URL('../dist/'+name,import.meta.url),'utf8');
test('Reviewed tool intents have visible matching headings, truthful task answers and unique metadata',async()=>{
 assert.equal(Object.keys(searchIntents).length,12);
 const titles=new Set();for(const [id,intent]of Object.entries(searchIntents)){
  const meta=seoMeta('tool',id),html=await read('tools/'+id+'/index.html');
  assert.equal(meta.title,intent.title);assert.ok(meta.description.length<=159);
  assert.ok(html.includes('<h1>'+escapeHTML(intent.heading)+'</h1>'),id);
  for(const [q,a]of intent.questions){assert.ok(html.includes(escapeHTML(q)),id);assert.ok(html.includes(escapeHTML(a)),id);}
  titles.add(meta.title);
 }assert.equal(titles.size,12);
});
test('Every example in the new calculation guides matches the shipped arithmetic',()=>{
 for(const [expression,value]of [['sin(30)',.5],['cos(60)',.5],['2^5',32],['sqrt(144)',12],['log(1000)',3],['5!',120],['(12+8)*3',60],['12+8*3',36],['1200*(1-15/100)',1020]])assert.ok(Math.abs(calculate(expression)-value)<1e-10,expression);
 for(const [scores,band]of [[[8,7.5,7,6.5],7.5],[[8,8,7.5,7.5],8],[[7.5,7,6.5,7],7],[[6,6,5.5,6],6]])assert.equal(ieltsOverall(scores),band);
 for(const slug of ['scientific-calculator-degrees-sin-log-factorial','ielts-overall-band-rounding-worked-examples','create-chibi-anime-avatar-transparent-png-svg'])assert.ok(posts.some(p=>p.slug===slug&&p.date==='2026-11-05'),slug);
});
test('The printable resource has sixty checked problems, separated keys and accessible HTML equivalents',async()=>{
 assert.equal(practicePack.length,3);
 const page=await read('resources/index.html');let count=0;
 for(const set of practicePack){
  assert.equal(set.problems.length,20);assert.equal(new Set(set.problems.map(p=>[p.a,p.op,p.b].join('|'))).size,20);
  assert.ok(page.includes(set.title));
  for(const p of set.problems){const expected=p.op==='multiply'?p.a*p.b:p.op==='add'?p.a+p.b:p.a-p.b;assert.equal(p.answer,expected);assert.ok(page.includes('<td>'+p.answer+'</td>'));count++;}
 }assert.equal(count,60);
 const manifest=JSON.parse(await read('assets/resources/practice-pack.json'));
 assert.deepEqual(manifest.question_pages,[1,3,5]);assert.deepEqual(manifest.answer_pages,[2,4,6]);
 assert.ok((await stat(new URL('../dist/assets/resources/nepocore-math-practice-pack.pdf',import.meta.url))).size>5000);
 assert.match(page,/source mention is welcome but optional/);
 assert.match(await read('index.html'),/href="\.\/resources\/"/);
 assert.match(await read('worksheets/index.html'),/href="\/resources\/"/);
});
test('The keyword map covers the catalogue and labels unmeasured metrics honestly',async()=>{
 const evidence=JSON.parse(await readFile(new URL('../research/search-evidence.json',import.meta.url),'utf8'));
 assert.match(evidence.method,/were not measured/);
 const csv=await readFile(new URL('../research/keyword-map.csv',import.meta.url),'utf8');
 assert.equal(csv.trim().split('\n').length,228);
 assert.match(csv,/Catalogue-derived candidate; individual query not reviewed/);
 assert.doesNotMatch(csv,/search_volume|keyword_difficulty/);
 const notes=await readFile(new URL('../research/BACKLINK_OPPORTUNITIES.md',import.meta.url),'utf8');assert.match(notes,/not been sent/);assert.match(notes,/not submitted/);
});
