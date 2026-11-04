export function rotatePages(PDF,doc,indices,angle){
 if(![90,180,270].includes(angle))throw Error('Choose a 90°, 180° or 270° rotation.');
 for(const i of new Set(indices)){
  if(!Number.isInteger(i)||i<0||i>=doc.getPageCount())throw Error('Page index is outside this PDF.');
  const p=doc.getPage(i);p.setRotation(PDF.degrees((p.getRotation().angle+angle)%360));
 }
}
export async function numberPages(PDF,doc,{start=1,size=11,position='center',style='page'}={}){
 if(!Number.isInteger(start)||start<0||!Number.isFinite(size)||size<6||size>40)throw Error('Use a nonnegative starting number and a font size from 6 to 40.');
 const font=await doc.embedFont(PDF.StandardFonts.Helvetica),count=doc.getPageCount(),total=start+count-1;
 for(const [i,p] of doc.getPages().entries()){
  const number=start+i,label=style==='number'?String(number):style==='fraction'?number+' / '+total:'Page '+number+' of '+total;
  const width=font.widthOfTextAtSize(label,size),x=position==='left'?20:position==='right'?p.getWidth()-width-20:(p.getWidth()-width)/2;
  p.drawText(label,{x:Math.max(4,x),y:18,size,font,color:PDF.rgb(0,0,0)});
 }
}
