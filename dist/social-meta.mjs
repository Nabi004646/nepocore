import {socialImages} from './social-images.mjs';
export function socialMeta(path,title,root){
 const key='/'+path.replace(/^\/+|\/+$/g,'')+(path.replace(/\//g,'')?'/':'');
 const entry=socialImages[key];
 return {image:new URL(entry?.file||'assets/social-card.png',root).href,alt:'Nepocore preview card: '+title};
}
export const markdownPath=path=>/^(?:tools|blog)\/[^/]+\/$/.test(path)&&!path.startsWith('blog/category/')?path+'index.md':null;
