import {escapeHTML as e} from './core.mjs';
export function resumeBody(v){
 return `<h1>${e(v.name)}</h1><p class="doc-muted">${[v.role,v.contact].filter(x=>String(x||'').trim()).map(e).join('<br>')}</p>${[['Profile',v.summary],['Experience',v.experience],['Education',v.education],['Skills',v.skills]].filter(([,value])=>String(value||'').trim()).map(([label,value])=>`<h2>${label}</h2><p>${e(value)}</p>`).join('')}`;
}
