import {form,text,area} from '../ui.mjs';
import {resumeBody} from '../resume-core.mjs';
import {printTools,optional} from './shared.mjs';
export function setupResume(mount,out){
 let release=()=>{},timer,disposed=false;
 const f=form(mount,[
  text('name','Full name','Your name','text',true),
  text('contact','Contact line','City · email@example.com · portfolio URL','text',true),
  optional(text('role','Headline (optional)','Web developer','text',true)),
  optional(area('summary','Profile (optional)','Write a short, accurate introduction for the role you want.')),
  optional(area('experience','Experience or projects (optional)','Project name — dates\nDescribe what you built, your contribution and a result you can support.')),
  optional(area('education','Education (optional)','Your qualification — Institution, year')),
  optional(area('skills','Skills (optional)','List relevant skills you can demonstrate.')),
 ],v=>{
  if(disposed)return;
  release();release=printTools(out,resumeBody(v),'Resume');
 },{label:'Update resume',note:'Live preview updates after you pause typing. Blank optional sections are omitted. Your draft is not automatically saved. Use Print / Save PDF or Download HTML before leaving.'});
 f.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{if(!disposed&&f.checkValidity())f.requestSubmit();},250);});
 return()=>{disposed=true;clearTimeout(timer);release();};
}
