import {readFile,writeFile} from 'node:fs/promises';
import {tools,categories} from '../dist/catalog.mjs';
import {blogIndex} from '../dist/blog-index.mjs';
const cfg=JSON.parse(await readFile('dist/site-config.json','utf8'));
const root=new URL(cfg.site_url);
const url=path=>new URL(path,root).href;
const text=s=>String(s).replace(/\s+/g,' ').replace(/[\\[\]]/g,'\\$&').trim();
const link=(label,path,description)=>`- [${text(label)}](${url(path)}): ${text(description)}`;
const notes=`Nepocore is a free collection of ${tools.length} browser-based tools and ${blogIndex.length} practical guides. Interactive tools require JavaScript; the guides and tool instructions are available in static HTML. Most tools process input on the visitor's device. Some optional engines download models or libraries from third-party services, and online system voices may use their provider. The privacy policy describes these exceptions. Health, financial and study outputs have tool-specific assumptions and limits.`;
const core=[
 link('Home','','Overview and tool discovery.'),
 link('All tools','tools/','Searchable catalogue of all free tools.'),
 link('Teaching resource pack','resources/','Original printable arithmetic sheets, separate answer keys and an accessible text version.'),
 link('Practical guides','blog/','Original walkthroughs, worked examples and source references.'),
 link('Worksheet Studio','worksheets/','Printable worksheet generators with browser previews and downloads.'),
 link('Worksheet guides','worksheets/guides/','Practical instructions for planning and printing practice sheets.'),
];
const policies=[
 ['About','about/','Project background.'],['Privacy','privacy/','Local processing, browser storage and service exceptions.'],
 ['Terms','terms/','Terms of use.'],['Editorial policy','editorial-policy/','Content preparation and corrections.'],
 ['Accessibility','accessibility/','Accessibility information.'],['Contact','contact/','Contact and feedback.'],
];
const intro=`# Nepocore\n\n> Free browser tools for everyday work, study and creativity.\n\n${notes}\n\n## Start here\n\n${core.join('\n')}\n\n## Tool collections\n\n${['images','pdf','calculators','creators','study','developer','nepal','education'].map(id=>{const c=categories.find(c=>c.id===id);return link(c.name,'categories/'+id+'/',`${tools.filter(t=>t.category===id).length} tools in this collection.`);}).join('\n')}\n\n## Optional\n\n${link('Expanded public directory','llms-full.txt','All tool and guide links, organized by subject.')}\n${link('XML sitemap','sitemap.xml','Canonical indexable page URLs for search discovery.')}\n${link('RSS feed','blog/feed.xml','Practical guide updates.')}\n${policies.map(([label,path,description])=>link(label,path,description)).join('\n')}\n`;
const full=`# Nepocore: expanded public directory\n\n> Canonical links and descriptions for the public tool catalogue and practical guides. This is a directory, not the full text of every page.\n\n${notes}\n\n## Main resources\n\n${core.join('\n')}\n\n${categories.filter(c=>c.id!=='all').map(c=>`## ${text(c.name)}\n\n${link(c.name,'categories/'+c.id+'/', 'Collection index.')}\n${tools.filter(t=>t.category===c.id).map(t=>link(t.title,'tools/'+t.id+'/',t.description)).join('\n')}`).join('\n\n')}\n\n## Practical guides\n\n${blogIndex.map(p=>link(p.title,'blog/'+p.slug+'/',p.summary)).join('\n')}\n\n## Worksheet resources\n\n${[
 ['Weekly practice packs','worksheets/weekly-practice-pack/','Five-day practice sheet packs.'],
 ['Spelling sheets','worksheets/spelling-worksheet-maker/','Practice sheets made from a visitor-supplied spelling list.'],
 ['Word searches','worksheets/word-search-generator/','Printable puzzles from a visitor-supplied word list.'],
 ['Handwriting sheets','worksheets/handwriting-practice-maker/','Writing and tracing practice.'],
 ['Weekly practice guide','worksheets/guides/build-a-week-of-math-practice/','Plan a manageable practice week.'],
 ['Spelling practice guide','worksheets/guides/spelling-with-your-own-words/','Use a personal spelling list effectively.'],
 ['Printing guide','worksheets/guides/print-worksheets-a4-letter/','Print cleanly on A4 or US Letter.'],
].map(([label,path,description])=>link(label,path,description)).join('\n')}\n\n## Policies and site resources\n\n${policies.map(([label,path,description])=>link(label,path,description)).join('\n')}\n${link('Robots instructions','robots.txt','Crawler access instructions.')}\n${link('XML sitemap','sitemap.xml','Canonical indexable page URLs.')}\n${link('RSS feed','blog/feed.xml','Guide updates.')}\n`;
const readable=`\n## Readable text versions\n\nThese Markdown companions contain the same public instructions or guide content as their canonical HTML pages. Interactive tools still require the HTML page and JavaScript.\n\n${tools.map(t=>link(t.title+' instructions','tools/'+t.id+'/index.md',t.description)).join('\n')}\n${blogIndex.map(p=>link(p.title,'blog/'+p.slug+'/index.md',p.summary)).join('\n')}\n`;
await writeFile('dist/llms.txt',intro.replace('## Optional', '## Readable text\n\n'+link('Image converter instructions','tools/image-converter/index.md','Plain text instructions, example and limits.')+'\n'+link('Image format guide','blog/jpeg-png-webp-choose-image-format/index.md','Full guide with quick answer and references.')+'\n\n## Optional'));
await writeFile('dist/llms-full.txt',full+readable);
console.log(JSON.stringify({discovery_files:['llms.txt','llms-full.txt'],tools:tools.length,guides:blogIndex.length}));
