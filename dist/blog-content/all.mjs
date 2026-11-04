import images from './images.mjs';
import documents from './documents.mjs';
import planning from './planning.mjs';
import security from './security.mjs';
import business from './business.mjs';
export const posts=[...images,...documents,...planning,...security,...business];
export const groups={images,documents,planning,security,business};
export const wordCount=post=>JSON.stringify(post.sections).replace(/[^\p{L}\p{N}'’.-]+/gu,' ').trim().split(/\s+/).length;
export const metadata=Object.entries(groups).flatMap(([file,items])=>items.map(p=>({slug:p.slug,title:p.title,category:p.category,summary:p.summary,tools:p.tools,file,date:'2026-10-28',updated:'2026-11-04',minutes:Math.max(2,Math.ceil(wordCount(p)/200))})));
