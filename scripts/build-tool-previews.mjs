import {mkdir,writeFile} from 'node:fs/promises';
import {tools,categories} from '../dist/catalog.mjs';
import {escapeHTML as e} from '../dist/core.mjs';
const out=new URL('../dist/assets/tool-previews/',import.meta.url);await mkdir(out,{recursive:true});
const text=(x,y,value,size=14,color='#202522',weight=500)=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}">${e(String(value))}</text>`;
const rect=(x,y,w,h,fill='#fff',stroke='#d9deda',r=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const photo=(x,y,w=180,h=124)=>`<g transform="translate(${x} ${y})">${rect(0,0,w,h,'#dce8e6','none')}<circle cx="${w*.74}" cy="${h*.28}" r="${h*.13}" fill="#f5c842"/><path d="M0 ${h} ${w*.32} ${h*.28} ${w*.65} ${h}Z" fill="#55796e"/><path d="M${w*.33} ${h} ${w*.7} ${h*.42} ${w} ${h}Z" fill="#98b5a3"/></g>`;
const arrow=`<path d="M306 128h34m-9-8 9 8-9 8" fill="none" stroke="#202522" stroke-width="2.5" stroke-linecap="round"/>`;
function art(t,seed){
 const title=t.title.replace(/free /ig,'').slice(0,42),head=text(21,26,title,13,'#24352d',700);
 let body='';
 if(t.category==='images'||['screenshot','meme','quote-card'].some(id=>t.id.includes(id))){
  body=photo(28,57,238,153)+arrow+rect(368,65,238,137,'#fff')+text(387,96,t.id.includes('compress')?'Smaller file. Same idea.':t.id.includes('background')?'Make room for your subject.':'A fresh format. Ready to go.',13)+rect(387,111,197,36,'#f6f7f5')+text(402,134,t.id.includes('compress')?'Quality  •  85%':t.id.includes('crop')?'Aspect ratio  •  4:3':'PNG  →  JPEG',17,'#202522',700)+rect(387,161,122,30,'#f5c842','none',5)+text(410,181,'Download',12,'#111318',700);
 }else if(t.id==='qr-code'){
  body=rect(28,52,290,161)+text(46,80,'A link worth sharing.',19,'#202522',700)+rect(46,96,250,33,'#f6f7f5')+text(59,117,'https://nepocore.com',13)+rect(46,145,144,36,'#f5c842','none',5)+text(65,168,'Create QR code',13,'#202522',700)+rect(382,46,177,177);
  for(let y=0;y<21;y++)for(let x=0;x<21;x++){let finder=((x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13));let a=x>13?x-14:x,b=y>13?y-14:y;let on=finder?(a===0||b===0||a===6||b===6||(a>=2&&a<=4&&b>=2&&b<=4)):((x*17+y*23+x*y+seed)%7<3);if(on)body+=rect(399+x*6.8,63+y*6.8,6.8,6.8,'#202522','none',0)}
 }else if(t.category==='pdf'){
  body=rect(45,60,122,144,'#fff')+text(63,88,'PDF',16,'#202522',700)+rect(63,104,85,6,'#dfe5df','none',2)+rect(63,120,64,6,'#dfe5df','none',2)+rect(63,136,77,6,'#dfe5df','none',2)+rect(197,60,122,144,'#fff')+text(215,88,'PDF',16,'#202522',700)+rect(215,104,85,6,'#dfe5df','none',2)+rect(215,120,70,6,'#dfe5df','none',2)+`<path d="M340 132h44m-10-8 10 8-10 8" fill="none" stroke="#202522" stroke-width="2.5"/>`+rect(417,53,158,161,'#fff2b9')+text(439,84,t.id.includes('merge')?'Together.':t.id.includes('extract')?'Just the pages.':'Ready to share.',17,'#202522',700)+rect(438,102,115,7,'#cfc4a0','none',2)+rect(438,120,99,7,'#cfc4a0','none',2)+rect(438,157,95,30,'#f5c842','none',5)+text(453,177,'Download',12,'#111318',700);
 }else if(t.id==='ielts-overall'||t.category==='study'){
  body=rect(27,52,365,159)+text(47,82,'Small steps. Real progress.',19,'#202522',700);
  ['Listening','Reading','Writing','Speaking'].forEach((s,i)=>{body+=text(48,111+i*25,s,12)+rect(135,100+i*25,230,10,'#e9ede8','none',3)+rect(135,100+i*25,160+(i*23+seed)%61,10,'#b1c6b7','none',3)});
  body+=rect(420,52,192,159,'#fff2b9')+text(442,82,t.id==='ielts-overall'?'OVERALL BAND':'YOUR NEXT STEP',11)+text(442,143,t.id==='ielts-overall'?'7.5':'Keep going.',t.id==='ielts-overall'?55:23,'#202522',800)+text(442,184,'Make your practice count.',12);
 }else if(t.category==='calculators'||['money','health','pregnancy','science','home','food'].includes(t.category)){
  body=rect(29,52,292,159)+text(48,82,t.category==='calculators'?'A little clarity. Instantly.':'Put your numbers to work.',17,'#202522',700)+rect(47,99,253,33,'#f6f7f5')+text(60,122,t.id==='calculator'?'24 × 7':'Enter your values',18)+rect(47,153,117,34,'#f5c842','none',5)+text(66,176,'Calculate',13,'#202522',700)+rect(353,52,257,159,'#fff');
  if(t.id==='calculator'){body+=rect(370,67,221,38,'#f6f7f5')+text(520,93,'168',25,'#202522',700);['7','8','9','÷','4','5','6','×','1','2','3','='].forEach((s,i)=>{let x=370+(i%4)*56,y=115+Math.floor(i/4)*27;body+=rect(x,y,50,22,s==='='?'#f5c842':'#f6f7f5','none',4)+text(x+20,y+16,s,12)})}else{body+=text(375,80,'A clearer picture',13,'#566069');[62,94,78,118,87,105].forEach((h,i)=>body+=rect(377+i*34,191-h,21,h,i===3?'#f5c842':'#b7c9bb','none',3));body+=`<path d="M371 192h218" stroke="#d9deda"/>`}
 }else if(['developer','web','security','text'].includes(t.category)){
  body=rect(28,53,346,158,'#202522','#202522')+text(48,84,t.category==='security'?'YOUR DATA, YOUR DEVICE':'NEPOCORE WORKSPACE',11,'#c4d0c2',700)+text(48,117,t.category==='text'?'Good words start here.':t.category==='security'?'Check. Understand. Protect.':'const idea = "make it work";',17,'#fff0ad',600)+rect(48,140,267,7,'#4d5c50','none',3)+rect(48,158,218,7,'#4d5c50','none',3)+rect(48,176,245,7,'#4d5c50','none',3)+rect(404,65,206,133)+text(426,96,'Ready when you are.',17,'#202522',700)+rect(426,113,160,7,'#e4e9e3','none',3)+rect(426,130,132,7,'#e4e9e3','none',3)+rect(426,153,111,29,'#f5c842','none',4)+text(442,173,'Get started',12,'#202522',700);
 }else{
  body=rect(28,52,360,159)+text(49,86,title.length>26?title.slice(0,26)+'…':title,20,'#202522',700)+text(49,113,'A useful little shortcut.',13,'#566069')+rect(49,133,250,7,'#e0e7df','none',3)+rect(49,150,211,7,'#e0e7df','none',3)+rect(49,172,116,24,'#f5c842','none',4)+text(69,189,'Try it now',12,'#202522',700)+rect(418,52,192,159,'#e1e9e0');
  if(t.category==='creators'||t.category==='fun')body+=photo(434,66,160,128);else if(t.category==='audio')body+=Array.from({length:18},(_,i)=>{let h=25+(i*17+seed)%80;return rect(435+i*9,133-h/2,5,h,i%4===0?'#f5c842':'#667e6c','none',2)}).join('');else body+=text(444,108,'Make today',21,'#334838',700)+text(444,137,'a little easier.',21,'#334838',700)+`<path d="M446 165h105m-10-9 10 9-10 9" fill="none" stroke="#334838" stroke-width="2"/>`;
 }
 return head+body;
}
for(const t of tools){let seed=[...t.id].reduce((s,c)=>s+c.charCodeAt(0),0);let bg=['#f2f4ef','#eef2ee','#f1f0e9','#eef1ed'][seed%4];await writeFile(new URL(t.id+'.svg',out),`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="240" viewBox="0 0 640 240"><title>${e(t.title)} — illustrative tool preview</title><rect width="640" height="240" fill="${bg}"/><path d="M0 38h640" stroke="#d9deda"/><g font-family="Arial,sans-serif">${art(t,seed)}</g></svg>\n`)}
console.log('Built '+tools.length+' individual tool illustrations.');
