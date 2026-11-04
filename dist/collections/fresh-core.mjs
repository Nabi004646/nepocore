export function textStats(value){
 const segments=typeof Intl.Segmenter==='function'?new Intl.Segmenter(undefined,{granularity:'word'}).segment(value):null;
 const words=segments?[...segments].filter(s=>s.isWordLike).length:(value.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)||[]).length;
 const chars=typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(value)].length:Array.from(value).length;
 return {words,characters:chars,withoutSpaces:typeof Intl.Segmenter==='function'?[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(value.replace(/\s/gu,''))].length:Array.from(value.replace(/\s/gu,'')).length,lines:value?value.split(/\r\n|\r|\n/).length:0};
}
export function formatText(value,mode){
 if(mode==='upper')return value.toLocaleUpperCase();
 if(mode==='lower')return value.toLocaleLowerCase();
 if(mode==='title')return value.toLocaleLowerCase().replace(/(^|[^\p{L}\p{N}’'])[\p{L}]/gu,m=>m.toLocaleUpperCase());
 if(mode==='sentence')return value.toLocaleLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)\p{L}/gu,m=>m.toLocaleUpperCase());
 if(mode==='clean')return value.replace(/\r\n?/g,'\n').split('\n').map(line=>line.replace(/[^\S\n]+/gu,' ').trim()).join('\n').replace(/\n{3,}/g,'\n\n').trim();
 if(mode==='remove')return value.replace(/\s+/gu,'');
 if(mode==='trim')return value.trim();
 throw Error('Choose a text formatting action.');
}
export function speechChunks(value,max=220){
 if(!Number.isInteger(max)||max<20)throw Error('Use a chunk size of at least 20 characters.');
 const words=value.trim().split(/\s+/u).filter(Boolean),out=[];let part='';
 for(let word of words){while(Array.from(word).length>max){if(part){out.push(part);part='';}const chars=Array.from(word);out.push(chars.slice(0,max).join(''));word=chars.slice(max).join('');}if(!word)continue;if(Array.from(part+(part?' ':'')+word).length>max){out.push(part);part=word;}else part+=(part?' ':'')+word;}
 if(part)out.push(part);return out;
}
