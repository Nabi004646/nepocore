import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('../',import.meta.url));
const env={...process.env,SITE_URL:process.env.SITE_URL||'https://nepocore.com/'};
for(const [cmd,args]of [[process.execPath,['scripts/build-static.mjs']],[process.execPath,['scripts/build-worksheets.mjs']],['python3',['scripts/refresh-social.py']],[process.execPath,['scripts/build-cloudflare.mjs']]]){
 const result=spawnSync(cmd,args,{cwd,env,stdio:'inherit'});
 if(result.error)throw result.error;
 if(result.status!==0)process.exit(result.status||1);
}
