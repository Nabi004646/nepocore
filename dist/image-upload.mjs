import {icon} from './catalog.mjs';
import {e,bytes,registerResource} from './ui.mjs';

const states=new WeakMap();
const sameFiles=(a,b)=>a.length===b.length&&a.every((f,i)=>f===b[i]);
const imageAccept=accept=>accept.split(',').every(type=>type.trim().startsWith('image/'));

export function uploadHTML(accept,multiple=false,caption='Drop an image here, or browse files',note='JPEG, PNG, WebP, GIF, BMP or AVIF · up to 25 MB'){
 if(!imageAccept(accept))return `<label class="upload-zone">${icon('upload')}<strong>${e(caption)}</strong><small>${e(note)}</small><input type="file" accept="${e(accept)}" ${multiple?'multiple':''} aria-label="${e(caption)}"></label>`;
 return `<div class="upload-zone image-upload" data-image-upload>
  <input type="file" accept="${e(accept)}" ${multiple?'multiple':''} aria-label="${e(caption)}" hidden>
  <button type="button" class="upload-prompt" data-upload-browse><span class="upload-glyph">${icon('upload')}</span><strong>${e(caption)}</strong><small>${e(note)}</small><span class="upload-browse-label">Browse ${multiple?'images':'image'} ${icon('arrow')}</span></button>
  <div class="upload-selection" hidden><div class="upload-thumbnails"></div><div class="upload-file-details"><strong data-upload-name></strong><small data-upload-meta></small></div><div class="upload-actions"><button type="button" class="btn secondary small" data-upload-change>${icon('refresh')} Change ${multiple?'images':'image'}</button><button type="button" class="btn secondary small" data-upload-add hidden>${icon('plus')} Add images</button></div></div>
  <div class="upload-status" role="status" aria-live="polite" aria-atomic="true"><span>${icon('shield')} Your images stay on this device.</span></div>
 </div>`;
}

export function resetUpload(mount){for(const zone of mount.querySelectorAll('[data-image-upload]'))states.get(zone)?.setFiles([]);}
export function setUploadFiles(mount,files){const zone=mount.querySelector('[data-image-upload]');if(zone)states.get(zone)?.setFiles(files);}
export function setUploadBusy(mount,value){const zone=mount.querySelector('[data-image-upload]');if(zone)states.get(zone)?.setBusy(value);}

export function bindUpload(mount,callback,{append=false}={}){
 const zone=mount.querySelector('.upload-zone'),input=zone.querySelector('input');
 if(!zone.hasAttribute('data-image-upload')){
  input.onchange=()=>callback([...input.files]);zone.ondragover=ev=>{ev.preventDefault();zone.classList.add('dragover');};zone.ondragleave=()=>zone.classList.remove('dragover');zone.ondrop=ev=>{ev.preventDefault();zone.classList.remove('dragover');callback([...ev.dataTransfer.files]);};return;
 }
 let files=[],urls=[],busy=false,toolBusy=false,disposed=false,nextMode='replace',version=0;
 const prompt=zone.querySelector('.upload-prompt'),selection=zone.querySelector('.upload-selection'),thumbs=zone.querySelector('.upload-thumbnails'),status=zone.querySelector('.upload-status'),change=zone.querySelector('[data-upload-change]'),add=zone.querySelector('[data-upload-add]');
 const release=()=>{urls.forEach(URL.revokeObjectURL);urls=[];};
 function message(text,kind='ready'){zone.dataset.uploadState=kind;status.innerHTML=`<span>${icon(kind==='error'?'info':kind==='reading'?'refresh':files.length?'check':'shield')} ${e(text)}</span>`;}
 function setFiles(next){
  if(disposed)return;
  if(!sameFiles(files,next)){
   release();files=[...next];thumbs.innerHTML='';
   for(const [i,file] of files.slice(0,4).entries()){
    const img=document.createElement('img'),url=URL.createObjectURL(file);urls.push(url);img.alt=files.length===1?'Selected image preview':`Selected image ${i+1}: ${file.name}`;img.src=url;img.decoding='async';
    if(files.length===1)img.onload=()=>{if(!disposed&&files[0]===file)zone.querySelector('[data-upload-meta]').textContent=`${img.naturalWidth} × ${img.naturalHeight} px · ${bytes(file.size)}`;};
    img.onerror=()=>{img.hidden=true;if(!disposed&&files.includes(file))message('This image preview could not be opened. Please choose another PNG or JPEG.','error');};thumbs.append(img);
   }
   if(files.length>4){const more=document.createElement('span');more.className='upload-more';more.textContent='+'+(files.length-4);thumbs.append(more);}
  }
  const selected=files.length>0;prompt.hidden=selected;selection.hidden=!selected;zone.classList.toggle('has-image',selected);thumbs.classList.toggle('multiple',files.length>1);input.value='';
  if(selected){zone.querySelector('[data-upload-name]').textContent=files.length===1?files[0].name:files.length+' images selected';zone.querySelector('[data-upload-name]').title=files.map(f=>f.name).join(', ');const img=thumbs.querySelector('img');zone.querySelector('[data-upload-meta]').textContent=files.length===1?(img?.naturalWidth?`${img.naturalWidth} × ${img.naturalHeight} px · `:'')+bytes(files[0].size):bytes(files.reduce((sum,f)=>sum+f.size,0))+' total · '+files.slice(0,3).map(f=>f.name).join(', ');}
  add.hidden=!append;message(selected?(files.length===1?'Image added. Ready for the next step.':files.length+' images added. Ready for the next step.'):'Your images stay on this device.',selected?'ready':'empty');
 }
 function setBusy(value){toolBusy=value;for(const b of [change,add,prompt,...mount.querySelectorAll('[data-clear]')])b.disabled=busy||toolBusy;if(value){zone.setAttribute('aria-busy','true');message('Working on your image. Please keep this tool open.','reading');}else{zone.removeAttribute('aria-busy');setFiles(files);}}
 function choose(mode){if(busy||toolBusy)return;nextMode=mode;input.value='';input.click();}
 async function receive(incoming,mode='replace'){
  if(disposed||busy||toolBusy||!incoming.length)return;
  const previous=[...files],token=++version;busy=true;change.disabled=add.disabled=prompt.disabled=true;zone.setAttribute('aria-busy','true');message('Reading your '+(incoming.length===1?'image…':'images…'),'reading');
  try{
   if(!input.multiple&&incoming.length>1)throw Error('Choose one image at a time.');
   if(incoming.some(file=>!/^image\/(jpeg|png|webp|gif|bmp|avif)$/.test(file.type)))throw Error('Choose a JPEG, PNG, WebP, GIF, BMP or AVIF image.');
   if(incoming.some(file=>file.size>25*1024*1024))throw Error('Choose images smaller than 25 MB each.');
   const accepted=await callback(incoming,{replace:mode!=='append'});
   if(disposed||token!==version)return;
   if(accepted===false){setFiles(previous);message(previous.length?'That image could not be used. Your previous selection is kept.':'Could not use that image. Please choose another.','error');}
   else setFiles(accepted?.files||incoming);
  }catch(ex){if(!disposed&&token===version){setFiles(previous);message(ex.message||'Could not read that image. Please try another.','error');}}
  finally{if(!disposed&&token===version){busy=false;change.disabled=add.disabled=prompt.disabled=false;zone.removeAttribute('aria-busy');input.value='';}}
 }
 input.onchange=()=>receive([...input.files],nextMode);
 prompt.onclick=()=>choose('replace');change.onclick=()=>choose('replace');add.onclick=()=>choose('append');
 zone.ondragover=ev=>{ev.preventDefault();if(!busy)zone.classList.add('dragover');};zone.ondragleave=ev=>{if(!zone.contains(ev.relatedTarget))zone.classList.remove('dragover');};
 zone.ondrop=ev=>{ev.preventDefault();zone.classList.remove('dragover');receive([...ev.dataTransfer.files],'replace');};
 states.set(zone,{setFiles,setBusy});registerResource(mount,()=>{disposed=true;version++;release();states.delete(zone);});setFiles([]);
 return {setFiles,open:()=>choose('replace')};
}
