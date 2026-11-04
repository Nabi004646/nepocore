import {clientAssets} from './client-assets.mjs';
import {socialMeta,markdownPath} from '../dist/social-meta.mjs';
import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,unlink} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {tools,categories} from '../dist/catalog.mjs';
import {posts,metadata} from '../dist/blog-content/all.mjs';
import {escapeHTML as e} from '../dist/core.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),dist=path.join(root,'dist');
await writeFile(path.join(dist,'catalog-client.mjs'),'// Public catalogue data without build-time editorial imports.\nexport const tools='+JSON.stringify(tools)+';\nexport const categories='+JSON.stringify(categories)+';\nexport const guideCount='+posts.length+';\nexport {icon} from \'./icons.mjs\';\n');
await writeFile(path.join(dist,'blog-index.mjs'),'// Generated from original guide content during the static build.\nexport const blogIndex='+JSON.stringify(metadata)+';\n');
const {pageHTML,navHTML}=await import('../dist/views.mjs');
const {seoMeta,schemaData}=await import('../dist/content.mjs');
const {blogCategories}=await import('../dist/blog.mjs');
const {pages:infoPages}=await import('../dist/info.mjs');
const publishing=JSON.parse(await readFile(path.join(root,'src/publishing.json'),'utf8'));
if(publishing.publisherId&&!/^ca-pub-\d{16}$/.test(publishing.publisherId))throw Error('Use the actual ca-pub- publisher ID followed by 16 digits, or leave publisherId empty.');
if(publishing.advertisingEnabled!==false)throw Error('Advertising remains disabled until a separately reviewed consent and placement integration is implemented.');
const searchConsoleVerification=(process.env.GOOGLE_SITE_VERIFICATION||publishing.searchConsoleVerification||'').trim();
if(searchConsoleVerification&&!/^[A-Za-z0-9_-]{10,200}$/.test(searchConsoleVerification))throw Error('Use the exact Google Search Console HTML-tag verification token.');
const origin=new URL(process.env.SITE_URL||'https://nepocore-daily-tools.vocalclock4096.chatgpt.site/');
if(!['http:','https:'].includes(origin.protocol)||origin.search||origin.hash)throw Error('SITE_URL must be an HTTP(S) website root without a query or fragment.');
if(!origin.pathname.endsWith('/'))origin.pathname+='/';
const shell=await readFile(path.join(root,'src/shell.html'),'utf8'),urls=[];
const revisions=Object.fromEntries(await Promise.all(['styles.css','design.css','app.mjs'].map(async name=>[name,createHash('sha256').update(await readFile(path.join(dist,name))).digest('hex').slice(0,12)])));

const combinedCSS=(await readFile(path.join(dist,'styles.css'),'utf8'))+'\n'+(await readFile(path.join(dist,'design.css'),'utf8'));
const styleAsset='site-'+createHash('sha256').update(combinedCSS).digest('hex').slice(0,12)+'.css';
await writeFile(path.join(dist,styleAsset),combinedCSS);
const startupAssets=await clientAssets(dist);
await writeFile(path.join(dist,'precache.json'),JSON.stringify(['./',...startupAssets.keys()].map(name=>name==='./'?name:'./'+name).concat(['./'+styleAsset,'./manifest.webmanifest','./favicon.ico','./assets/fonts/manrope-latin.woff2','./assets/fonts/dm-sans-latin.woff2']))+'\n');
const shellRevision=createHash('sha256').update(combinedCSS+[...startupAssets.values()].join('')).digest('hex').slice(0,12);
const worker=(await readFile(path.join(dist,'sw.js'),'utf8')).replace(/const CACHE='[^']+';/,"const CACHE='nepocore-performance-v17-"+shellRevision+"';");
await writeFile(path.join(dist,'sw.js'),worker);


const pages=[{type:'home'},{type:'catalog'},...tools.map(t=>({type:'tool',id:t.id})),...categories.filter(c=>c.id!=='all').map(c=>({type:'category',id:c.id})),...Object.keys(infoPages).map(type=>({type})),{type:'favorites'},{type:'notfound'},{type:'blog'},...blogCategories.map(([id])=>({type:'blogCategory',id})),...posts.map(p=>({type:'article',id:p.slug}))];
for(const page of pages){
 const meta=seoMeta(page.type,page.id),url=new URL(meta.path,origin).href,article=posts.find(p=>page.type==='article'&&p.slug===page.id);
 const social=socialMeta(meta.path,meta.title,origin),markdown=markdownPath(meta.path),articleMeta=article?metadata.find(p=>p.slug===article.slug):null;
 const verification=publishing.publisherId&&!['privacy','cookies'].includes(page.type)?'<meta name="google-adsense-account" content="'+publishing.publisherId+'">':'';
 const head=`<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<base href="${e(origin.pathname)}"><meta name="theme-color" content="#20221d"><meta name="referrer" content="strict-origin-when-cross-origin">
<title>${e(meta.title)}</title><meta name="description" content="${e(meta.description)}"><meta name="robots" content="${meta.noindex?'noindex,follow':'index,follow,max-image-preview:large'}"><link rel="canonical" href="${e(url)}">${verification}${searchConsoleVerification?'<meta name="google-site-verification" content="'+e(searchConsoleVerification)+'">':''}
<meta property="og:type" content="${article?'article':'website'}"><meta property="og:site_name" content="Nepocore"><meta property="og:locale" content="en_US"><meta property="og:title" content="${e(meta.title)}"><meta property="og:description" content="${e(meta.description)}"><meta property="og:url" content="${e(url)}"><meta property="og:image" content="${e(social.image)}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${e(social.alt)}">
${article?'<meta property="article:published_time" content="'+articleMeta.date+'"><meta property="article:modified_time" content="'+(articleMeta.updated||articleMeta.date)+'">':''}
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${e(meta.title)}"><meta name="twitter:description" content="${e(meta.description)}"><meta name="twitter:image" content="${e(social.image)}"><meta name="twitter:image:alt" content="${e(social.alt)}">
${markdown?'<link rel="alternate" type="text/markdown" title="Plain text version" href="'+e(new URL(markdown,origin).href)+'">':''}<link rel="describedby" href="${new URL('llms.txt',origin).href}"><link rel="icon" href="./favicon.ico" sizes="any"><link rel="icon" href="./assets/favicon-32.png" type="image/png" sizes="32x32"><link rel="icon" href="./assets/favicon-96.png" type="image/png" sizes="96x96"><link rel="apple-touch-icon" href="./assets/apple-touch-icon.png" sizes="180x180"><link rel="manifest" href="./manifest.webmanifest"><link rel="alternate" type="application/rss+xml" title="Nepocore guides" href="./blog/feed.xml"><link rel="stylesheet" href="./${styleAsset}"><link rel="preload" href="./assets/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="./assets/fonts/dm-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<script type="application/ld+json" id="site-structured-data">${JSON.stringify(schemaData(page,origin.href)).replace(/</g,'\u003c')}</script><script type="module" src="./app.mjs?v=${revisions['app.mjs']}"></script>
</head>`;
 let html=shell.replace(/<head>[\s\S]*?<\/head>/,head)
 .replace('<nav id="side-nav"></nav>',`<nav id="side-nav">${navHTML(page.type==='category'?page.id:page.type==='tool'?tools.find(t=>t.id===page.id).category:page.type==='favorites'?'favorites':['blog','blogCategory','article'].includes(page.type)?'guides':'all')}</nav>`)
 .replace('<main id="main" tabindex="-1"></main>',`<main id="main" tabindex="-1">${pageHTML(page,{article})}</main>`)
 .replace('<aside class="sidebar"','<aside id="primary-sidebar" class="sidebar"')
 .replace('id="menu-toggle" aria-label="Toggle menu"','id="menu-toggle" aria-label="Toggle menu" aria-controls="primary-sidebar" aria-expanded="false"')
 .replace('<body class="neo-design dark">',`<body class="neo-design dark" data-page-type="${e(page.type)}" data-page-id="${e(page.id||'')}"><div class="reading-progress" aria-hidden="true"></div>`)
 .replace('</aside>','</aside><button class="menu-scrim" id="menu-scrim" aria-label="Close menu" hidden></button>')
 .replace('<button class="icon-btn" id="theme-toggle" aria-label="Switch color theme"></button>','<button class="icon-btn" id="motion-toggle" aria-label="Pause animations" aria-pressed="false"></button><button class="icon-btn" id="theme-toggle" aria-label="Switch color theme"></button>')
 .replace('<div id="toast"','<button class="back-top icon-btn" id="back-top" aria-label="Back to top" hidden>↑</button><div id="toast"')
 .replace('<span id="year"></span>','<span id="year">2026</span>');
 html=html.replace(/href="#\/privacy"/g,'href="./privacy/"').replace(/href="#\/about"/g,'href="./about/"').replace(/href="#\/terms"/g,'href="./terms/"').replace(/href="#\/faq"/g,'href="./faq/"').replace(/href="#\/"/g,'href="./"');
 const output=page.type==='notfound'?path.join(dist,'404.html'):path.join(dist,meta.path,'index.html');
 await mkdir(path.dirname(output),{recursive:true});await writeFile(output,html);if(!meta.noindex)urls.push({url,date:article?(articleMeta.updated||articleMeta.date):null});
}
await writeFile(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(({url,date})=>`  <url><loc>${e(url)}</loc>${date?'<lastmod>'+date+'</lastmod>':''}</url>`).join('\n')+'\n</urlset>\n');
await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: ${origin.pathname}\n\nSitemap: ${new URL('sitemap.xml',origin).href}\n`);
await writeFile(path.join(dist,'site-config.json'),JSON.stringify({site_url:origin.href,tools:tools.length,categories:categories.length-1,guides:posts.length,static_pages:pages.length,sitemap_urls:urls.length,advertising_enabled:false},null,2)+'\n');
await writeFile(path.join(dist,'blog/feed.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Nepocore practical guides</title><link>'+new URL('blog/',origin).href+'</link><description>Original practical walkthroughs for everyday browser tools.</description><language>en</language>'+metadata.map(p=>'<item><title>'+e(p.title)+'</title><link>'+new URL('blog/'+p.slug+'/',origin).href+'</link><guid isPermaLink="true">'+new URL('blog/'+p.slug+'/',origin).href+'</guid><description>'+e(p.summary)+'</description><pubDate>'+new Date(p.date+'T00:00:00+05:45').toUTCString()+'</pubDate></item>').join('')+'</channel></rss>\n');
if(publishing.publisherId)await writeFile(path.join(dist,'ads.txt'),'google.com, '+publishing.publisherId.replace('ca-','')+', DIRECT, f08c47fec0942fa0\n');else await unlink(path.join(dist,'ads.txt')).catch(ex=>{if(ex.code!=='ENOENT')throw ex;});
await writeFile(path.join(dist,'_headers'),`/site-*.css\n  Cache-Control: public, max-age=31536000, immutable\n/styles.css\n  Cache-Control: public, max-age=0, must-revalidate\n/design.css\n  Cache-Control: public, max-age=0, must-revalidate\n/app.mjs\n  Cache-Control: public, max-age=0, must-revalidate\n/sw.js\n  Cache-Control: no-cache\n/*.md\n  Content-Type: text/markdown; charset=utf-8\n  X-Robots-Tag: noindex, follow\n/*.mjs\n  Cache-Control: public, max-age=0, must-revalidate\n/assets/social/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/fonts/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  Link: <${new URL('llms.txt',origin).href}>; rel="describedby"\n  Strict-Transport-Security: max-age=31536000\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(self), microphone=(self), geolocation=(), payment=(), usb=(), serial=()\n`);
console.log(JSON.stringify({pages:pages.length,sitemap_urls:urls.length,tools:tools.length,guides:posts.length,site_url:origin.href,advertising_enabled:false}));
