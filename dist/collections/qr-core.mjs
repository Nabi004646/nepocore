import {escapeHTML as e} from '../core.mjs';
const lum=hex=>{if(!/^#[0-9a-f]{6}$/i.test(hex))throw Error('Choose a six-digit HEX color.');const a=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*a[0]+.7152*a[1]+.0722*a[2];};
export function qrContrast(ink,paper){const a=lum(ink),b=lum(paper);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);}
export function qrSVG(qr,{style='rounded',ink='#183d36',paper='#ffffff',caption=''}={}){
 if(qrContrast(ink,paper)<4.5||lum(ink)>=lum(paper))throw Error('Use a dark code on a light background with contrast of at least 4.5:1.');
 if(!['square','rounded','dots'].includes(style))throw Error('Choose a QR module style.');
 const n=qr.getModuleCount(),side=n+8,foot=caption.trim()?7:0,eyes=[[0,0],[n-7,0],[0,n-7]],eye=(r,c)=>eyes.some(([x,y])=>c>=x&&c<x+7&&r>=y&&r<y+7);let shapes='';
 // Keep timing/format information and every detected alignment target square.
 // A coincidental data target is harmless: the encoded module values never change.
 const alignment=new Set();if(style==='dots')for(let r=2;r<n-2;r++)for(let c=2;c<n-2;c++){if(!qr.isDark(r,c))continue;let matches=true;for(let y=-2;y<=2&&matches;y++)for(let x=-2;x<=2;x++)if(qr.isDark(r+y,c+x)!==(Math.max(Math.abs(x),Math.abs(y))===2||x===0&&y===0)){matches=false;break;}if(matches)for(let y=-2;y<=2;y++)for(let x=-2;x<=2;x++)alignment.add((r+y)*n+c+x);}
 const structural=(r,c)=>r===6||c===6||r===8||c===8||alignment.has(r*n+c)||n>=45&&(r<6&&c>=n-11&&c<n-8||c<6&&r>=n-11&&r<n-8);
 for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(qr.isDark(r,c)&&!eye(r,c))shapes+=style==='dots'&&!structural(r,c)?`<circle cx="${c+4.5}" cy="${r+4.5}" r=".51"/>`:`<rect x="${c+4}" y="${r+4}" width="1" height="1"${style==='rounded'?' rx=".22"':''}/>`;
 const radius=style==='square'?0:1.1;for(const [x,y] of eyes)shapes+=`<rect x="${x+4}" y="${y+4}" width="7" height="7" rx="${radius}"/><rect x="${x+5}" y="${y+5}" width="5" height="5" rx="${radius*.65}" fill="${paper}"/><rect x="${x+6}" y="${y+6}" width="3" height="3" rx="${radius*.45}"/>`;
 const height=Math.round(1024*(side+foot)/side),svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="${height}" viewBox="0 0 ${side} ${side+foot}" role="img" aria-label="Generated QR code"><rect width="100%" height="100%" fill="${paper}"/><g fill="${ink}" stroke="none">${shapes}</g>${foot?`<text x="${side/2}" y="${side+2}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.min(2.3,side/(Array.from(caption).length*.6||1))}" fill="${ink}">${e(caption.slice(0,50))}</text>`:''}</svg>`;
 return {svg,width:1024,height,modules:n,contrast:qrContrast(ink,paper)};
}
