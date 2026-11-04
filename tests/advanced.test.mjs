import test from 'node:test';
import assert from 'node:assert/strict';
import {parseNumbers,statistics,fraction,baseConvert,randomIntegers,durationSeconds,formatDuration,weightedGPA,studyPlan,dateOffset,businessDays,addBusinessDays,csvRecords,jsonDifference,decodeEntities,makeSlug,fluidClamp,paletteColors} from '../dist/advanced-core.mjs';
import {filteredTools,parsePage} from '../dist/views.mjs';

test('Statistics match a reference population and reject unsafe magnitude',()=>{
 const r=statistics(parseNumbers('2, 4; 4 4\n5 5 7 9'));
 assert.equal(r.mean,5);assert.equal(r.median,4.5);assert.deepEqual(r.modes,[4]);assert.equal(r.populationSD,2);assert.equal(r.sampleSD,Math.sqrt(32/7));
 assert.throws(()=>parseNumbers('2 Infinity'));assert.throws(()=>parseNumbers('1e301'));assert.throws(()=>parseNumbers(''));
});
test('Fractions reduce signs exactly, preserve large integers and reject division by zero',()=>{
 assert.equal(fraction(1,3,1,6,'add').text,'1/2');assert.equal(fraction(1,-2,1,4,'subtract').text,'-3/4');
 assert.equal(fraction('99999999999999999999',3,3,1,'multiply').text,'99999999999999999999');
 assert.equal(fraction(0,3,5,7,'multiply').text,'0');assert.equal(fraction(3,5,9,10,'divide').text,'2/3');
 assert.throws(()=>fraction(1,0,1,2,'add'));assert.throws(()=>fraction(1,2,0,3,'divide'));
});
test('Number bases round-trip integers beyond JavaScript number precision',()=>{
 const big='123456789012345678901234567890',hex=baseConvert(big,10,16);
 assert.equal(baseConvert(hex,16,10),big);assert.equal(baseConvert('-0xFF',16,2),'-11111111');assert.equal(baseConvert('0b101010',2,10),'42');
 assert.throws(()=>baseConvert('102',2,10));assert.throws(()=>baseConvert('',10,2));
});
test('Random selections respect inclusive bounds and uniqueness',()=>{
 const a=randomIntegers(-3,3,7,true);assert.equal(new Set(a).size,7);assert.deepEqual([...a].sort((a,b)=>a-b),[-3,-2,-1,0,1,2,3]);
 assert.deepEqual(randomIntegers(5,5,3,false),[5,5,5]);assert.throws(()=>randomIntegers(1,2,3,true));
});
test('Duration calculations handle hours beyond 24 and negative differences',()=>{
 assert.equal(durationSeconds('25:30'),91800);assert.equal(formatDuration(durationSeconds('01:35:20')+durationSeconds('00:45:50')),'02:21:10');
 assert.equal(formatDuration(-75),'-00:01:15');assert.throws(()=>durationSeconds('01:60:00'));assert.throws(()=>durationSeconds('bad'));
});
test('GPA weights credits and study plans keep complete blocks within available time',()=>{
 assert.equal(weightedGPA('3,3\n4,1',4).gpa,3.25);assert.throws(()=>weightedGPA('5,3',4));assert.throws(()=>weightedGPA('3,0',4));
 const r=studyPlan(120,25,5);assert.equal(r.blocks,4);assert.equal(r.focusMinutes,100);assert.equal(r.breakMinutes,15);assert.equal(r.unused,5);assert.equal(r.lines.at(-1).end,115);
 assert.equal(studyPlan(60,20,0).blocks,3);assert.throws(()=>studyPlan(20,25,5));
});
test('Date offsets cross leap days and business days exclude weekends and entered holidays',()=>{
 assert.equal(dateOffset('2024-02-28',2),'2024-03-01');assert.equal(dateOffset('2024-03-01',-1),'2024-02-29');
 assert.equal(businessDays('2026-10-23','2026-10-27'),3);assert.equal(businessDays('2026-10-23','2026-10-27',['2026-10-26']),2);
 assert.equal(addBusinessDays('2026-10-23',1,['2026-10-26']),'2026-10-27');assert.equal(addBusinessDays('2026-10-24',0),'2026-10-24');
 assert.throws(()=>dateOffset('9999-12-31',1));assert.throws(()=>businessDays('2026-10-27','2026-10-23'));
});
test('CSV import preserves commas, escaped quotes, newlines and literal special keys',()=>{
 const r=csvRecords('name,note\r\n"Nabi, N","Line one\nLine ""two"""\r\nAarya,hello');
 assert.deepEqual(r,[{name:'Nabi, N',note:'Line one\nLine "two"'},{name:'Aarya',note:'hello'}]);
 assert.equal(Object.hasOwn(csvRecords('__proto__,value\nx,1')[0],'__proto__'),true);
 assert.throws(()=>csvRecords('a,a\n1,2'));assert.throws(()=>csvRecords('a,b\n1'));assert.throws(()=>csvRecords('a\n"unclosed'));
});
test('JSON comparison ignores object key order and reports nested additions and changes',()=>{
 assert.deepEqual(jsonDifference({a:1,b:2},{b:2,a:1}),[]);
 const r=jsonDifference({list:[1,2]},{list:[1,3],ok:true});assert.equal(r[0].path,'$["list"][1]');assert.equal(r[0].type,'changed');assert.equal(r[1].type,'added');
 assert.equal(jsonDifference([],Array(500).fill(1)).length,300);
});
test('Text and CSS helpers preserve Unicode and match reference color harmonies',()=>{
 assert.equal(decodeEntities('&lt;Nabi&gt; &amp; &#x1f60a;'),'<Nabi> & 😊');assert.equal(makeSlug('नेपाली Tool'),'नेपाली-tool');assert.equal(makeSlug('Café résumé',true),'cafe-resume');
 assert.equal(fluidClamp(16,32,400,1200),'font-size: clamp(1rem, 0.5rem + 2vw, 2rem);');
 assert.deepEqual(paletteColors('#ff0000','triadic'),['#ff0000','#00ff00','#0000ff']);assert.throws(()=>fluidClamp(32,16,400,1200));
});
test('Search recognizes task phrases and routes reject extra path segments',()=>{
 assert.equal(filteredTools('all','JPG to PNG')[0].id,'image-converter');assert.equal(filteredTools('all','crop photo')[0].id,'image-cropper');
 assert.ok(filteredTools('all','gpa calculator').some(t=>t.id==='gpa-calculator'));assert.equal(filteredTools('web','GPA').length,0);
 for(const path of ['/tools/statistics/extra/','/categories/web/extra/','/privacy/extra/','/favorites/extra/'])assert.equal(parsePage(path).type,'notfound',path);
});
