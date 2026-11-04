import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {tools} from '../dist/catalog.mjs';
import {searchIntents} from '../dist/search-intents.mjs';
const evidence=JSON.parse(await readFile('research/search-evidence.json','utf8'));
const rows=tools.map(t=>{const cluster=evidence.clusters.find(c=>c.tool_ids.includes(t.id)),intent=searchIntents[t.id],base=t.title.toLowerCase().replace(/↔/g,'to and from');return {tool_id:t.id,page:'https://nepocore.com/tools/'+t.id+'/',category:t.category,primary_keyword:intent?.keyword||base+' online',secondary_keywords:[base,'free '+base,'how to use '+base].join(' | '),intent:'Use a working browser tool',priority:cluster?'P1': ['health','pregnancy','family','money'].includes(t.category)?'P3':'P2',evidence:cluster?'Public search-result review':'Catalogue-derived candidate; individual query not reviewed',evidence_urls:cluster?.evidence.join(' | ')||'',implemented:intent?'Specific title, description, heading and task questions':'Existing unique tool page and instructions',reviewed_on:evidence.reviewed_on};});
const columns=Object.keys(rows[0]),quote=v=>'"'+String(v).replace(/"/g,'""')+'"';
await mkdir('research',{recursive:true});await writeFile('research/keyword-map.csv',columns.join(',')+'\n'+rows.map(r=>columns.map(c=>quote(r[c])).join(',')).join('\n')+'\n');
console.log(JSON.stringify({keyword_map_rows:rows.length,reviewed_tool_intents:rows.filter(r=>r.evidence==='Public search-result review').length,implemented_intent_pages:Object.keys(searchIntents).length,volume_measured:false}));
