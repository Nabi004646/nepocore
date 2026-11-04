// Tool inputs use deliberate values, not saved browser form-history suggestions.
export function configureToolInputs(root){
 if(!root?.querySelectorAll)return;
 const elements=[...(root.matches?.('form,input,textarea,select')?[root]:[]),...root.querySelectorAll('form,input,textarea,select')];
 for(const el of elements){el.setAttribute('autocomplete','off');if(el.matches('input:not([type=checkbox]):not([type=radio]):not([type=file]),textarea')){el.setAttribute('autocapitalize','off');el.setAttribute('autocorrect','off');el.setAttribute('spellcheck','false');}}
}
export function markResultStale(out){
 if(!out?.querySelector('.panel-top')||out.hasAttribute('data-result-stale'))return;
 out.setAttribute('data-result-stale','true');
 const status=out.querySelector('.panel-top .status-pill');if(status)status.textContent='Update needed';
 const heading=out.querySelector('.panel-top h2');if(heading)heading.textContent='Let’s update your result.';
 const note=document.createElement('p');note.className='result-refresh-note';note.setAttribute('role','status');note.textContent='Your inputs changed. Run the tool again to see an updated result.';out.append(note);
}
export function installToolFormBehavior(main){
 configureToolInputs(main);
 const observer=new MutationObserver(records=>{for(const record of records)for(const node of record.addedNodes)if(node.nodeType===1)configureToolInputs(node);});
 observer.observe(main,{childList:true,subtree:true});
 const edited=ev=>{const input=ev.target.closest('#tool-input');if(!input||!ev.target.matches('input,textarea,select')||ev.target.matches('[type=file]')||ev.target.closest('.save-choice'))return;input.dataset.inputRevision=String((+input.dataset.inputRevision||0)+1);markResultStale(main.querySelector('#tool-result'));};
 main.addEventListener('input',edited,true);main.addEventListener('change',edited,true);
 return()=>{observer.disconnect();main.removeEventListener('input',edited,true);main.removeEventListener('change',edited,true);};
}
