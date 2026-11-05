// Bounded encoder search. The status always reflects measured bytes, not an estimate.
export async function encodeToTarget(encode,targetBytes,{cancelled=()=>false}={}){
 if(!Number.isSafeInteger(targetBytes)||targetBytes<1)throw Error('Choose a positive whole-byte target.');
 async function attempt(quality){
  if(cancelled())throw Error('Compression cancelled.');
  const blob=await encode(quality);
  if(cancelled())throw Error('Compression cancelled.');
  if(!blob||!Number.isFinite(blob.size)||blob.size<0)throw Error('Could not measure the exported image.');
  return {blob,quality,met:blob.size<=targetBytes,targetBytes};
 }
 const highest=await attempt(1);if(highest.met)return highest;
 let best=await attempt(.01);if(!best.met)return best;
 let low=.01,high=1;
 for(let i=0;i<7;i++){
  const quality=(low+high)/2,candidate=await attempt(quality);
  if(candidate.met){best=candidate;low=quality;}else high=quality;
 }
 return best;
}
