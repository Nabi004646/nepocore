import test from 'node:test';
import assert from 'node:assert/strict';
import {encodeToTarget} from '../dist/compression-core.mjs';
import {resumeBody} from '../dist/resume-core.mjs';
import {age,ieltsOverall} from '../dist/core.mjs';
import {priorityTools} from '../dist/priority-tools.mjs';
import {tools} from '../dist/catalog.mjs';

test('Target compression returns measured output within a limit with bounded work',async()=>{
 let calls=0;
 const encode=async q=>{calls++;return new Blob(['x'.repeat(Math.ceil(1000+q*100000))]);};
 const r=await encodeToTarget(encode,50000);
 assert.ok(r.met);assert.ok(r.blob.size<=50000);assert.ok(r.quality>.48);assert.ok(calls<=9);
 const unchanged=await encodeToTarget(encode,101000);assert.equal(unchanged.quality,1);assert.equal(unchanged.met,true);
});
test('An impossible image limit is reported honestly and cancellation stops encoding',async()=>{
 const r=await encodeToTarget(async()=>new Blob(['x'.repeat(2500)]),1000);
 assert.equal(r.met,false);assert.equal(r.blob.size,2500);
 let calls=0;await assert.rejects(encodeToTarget(async()=>{calls++;return new Blob(['a']);},1000,{cancelled:()=>true}),/cancelled/);assert.equal(calls,0);
 await assert.rejects(encodeToTarget(async()=>new Blob(),0),/positive/);
});
test('Resume sections are optional and all user text is escaped in the exported document',()=>{
 const html=resumeBody({name:'<script>alert(1)</script>',role:'Developer',contact:'hello@example.com',summary:'',experience:'Built <canvas> tools',education:' ',skills:''});
 assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('&lt;canvas&gt;'));
 assert.ok(!html.includes('<script>'));assert.ok(!html.includes('<h2>Education</h2>'));assert.ok(!html.includes('<h2>Profile</h2>'));
 assert.ok(html.includes('<h2>Experience</h2>'));
});
test('Published worked examples agree with the shipped arithmetic and task links resolve',()=>{
 for(const [birth,asof,expected]of [['2006-06-15','2027-03-01',[20,8,14]],['2026-01-31','2026-03-01',[0,1,1]],['2000-02-29','2025-02-28',[25,0,0]]]){
  const r=age(birth,asof);assert.deepEqual([r.years,r.months,r.days],expected);
 }
 for(const row of priorityTools['ielts-overall'].sections[0].table.rows){
  const scores=row[0].split('/').map(Number);assert.equal(scores.reduce((a,b)=>a+b)/4,Number(row[1]));assert.equal(ieltsOverall(scores),Number(row[2]));
 }
 for(const p of Object.values(priorityTools))for(const [id]of p.related)assert.ok(tools.some(t=>t.id===id),id);
});
