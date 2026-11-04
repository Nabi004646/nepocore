export async function computeHMAC(v,subtle=globalThis.crypto?.subtle){
 if(!subtle)throw Error('Use a supported HTTPS browser for cryptographic operations.');
 if(!['SHA-256','SHA-512'].includes(v.algorithm))throw Error('Choose SHA-256 or SHA-512.');
 let keyBytes;
 if(v.keyFormat==='hex'){
  if(!/^(?:[0-9a-f]{2})+$/i.test(v.key))throw Error('Use complete hexadecimal byte pairs for the key.');
  keyBytes=Uint8Array.from(v.key.match(/../g),x=>parseInt(x,16));
 }else if(v.keyFormat==='text')keyBytes=new TextEncoder().encode(v.key);
 else throw Error('Choose UTF-8 text or hexadecimal key bytes.');
 if(!keyBytes.length||keyBytes.length>65536||v.message.length>1000000)throw Error('Use a nonempty key under 64 KB and a message under one million characters.');
 const expected=(v.expected||'').trim().toLowerCase(),length=v.algorithm==='SHA-512'?128:64;
 if(expected&&!new RegExp('^[0-9a-f]{'+length+'}$').test(expected))throw Error('The expected HMAC must be '+length+' hexadecimal characters.');
 try{
  const key=await subtle.importKey('raw',keyBytes,{name:'HMAC',hash:v.algorithm},false,['sign','verify']),message=new TextEncoder().encode(v.message);
  const signature=new Uint8Array(await subtle.sign('HMAC',key,message)),hex=Array.from(signature,x=>x.toString(16).padStart(2,'0')).join('');
  const verified=expected?await subtle.verify('HMAC',key,Uint8Array.from(expected.match(/../g),x=>parseInt(x,16)),message):null;
  return {hex,verified,messageBytes:message.length};
 }finally{keyBytes.fill(0);}
}
