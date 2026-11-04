import {field,select as sel,number as num,e,result} from '../ui.mjs';
import {speechChunks} from './fresh-core.mjs';
export function setupSpeech(tool,mount,out){
 const supported='speechSynthesis'in window&&'SpeechSynthesisUtterance'in window;
 mount.innerHTML=`<h2>Give your words a voice.</h2><label class="field"><span>Text to read aloud</span><textarea data-speech-text maxlength="10000" spellcheck="false">Hello! Welcome to Nepocore. A little help for your everyday.</textarea></label><div class="form-grid speech-settings">${[sel('voice','Voice',[['','System default']],'') ,num('rate','Speed',1,.5,2,.1),num('pitch','Pitch',1,0,2,.1),num('volume','Volume',1,0,1,.1)].map(field).join('')}</div><p class="form-note" data-voice-info role="status">Loading your browser’s voices…</p><div class="form-actions"><button class="btn primary" type="button" data-speak ${supported?'':'disabled'}>Speak text</button><button class="btn secondary" type="button" data-pause disabled>Pause</button><button class="btn secondary" type="button" data-stop disabled>Stop</button></div><p class="form-note speech-state" data-speech-state role="status" aria-live="polite">Ready to read.</p><p class="form-note">Uses your browser or operating system. Some voices use an online speech service. No text is sent to a Nepocore server. Playback only; browser speech does not provide an audio-file download.</p>`;
 const synth=supported?window.speechSynthesis:null,text=mount.querySelector('[data-speech-text]'),voice=mount.querySelector('[name=voice]'),begin=mount.querySelector('[data-speak]'),pause=mount.querySelector('[data-pause]'),stop=mount.querySelector('[data-stop]'),info=mount.querySelector('[data-voice-info]');let voices=[],token=0,current,watchdog,disposed=false,speaking=false,paused=false,parts=[],position=0;
 function status(message,details=[]){if(!disposed){mount.querySelector('[data-speech-state]').textContent=message;result(out,{label:'Reading status',value:message,details});}}
 function buttons(){begin.disabled=!supported||speaking;pause.disabled=stop.disabled=!speaking;pause.textContent=paused?'Resume':'Pause';text.disabled=speaking;for(const input of mount.querySelectorAll('.speech-settings input,.speech-settings select'))input.disabled=speaking;}
 function stopReading(message='Stopped'){token++;clearTimeout(watchdog);synth?.cancel();current=null;speaking=paused=false;buttons();status(message);}
 function voiceInfo(){const v=voices.find(v=>v.voiceURI===voice.value);info.textContent=v?v.name+' · '+v.lang+' · '+(v.localService?'Device voice':'Online system voice — may send text to its speech provider'):voices.length?'Choose a voice, or use your system default.':'No named voices are available yet. Your system default may work; install or enable a speech voice in your device settings if playback fails.';}
 function refreshVoices(){if(!supported||disposed||speaking)return;const old=voice.value;voices=synth.getVoices();voice.innerHTML='<option value="">System default</option>'+voices.map(v=>`<option value="${e(v.voiceURI)}">${e(v.name)} · ${e(v.lang)}${v.localService?' · device':' · online'}</option>`).join('');voice.value=voices.some(v=>v.voiceURI===old)?old:(voices.find(v=>v.localService&&/^en/i.test(v.lang))||voices.find(v=>v.localService))?.voiceURI||'';voiceInfo();}
 voice.onchange=voiceInfo;
 begin.onclick=()=>{
  if(!text.value.trim()){status('Add some text first.');text.focus();return;}
  const values=['rate','pitch','volume'].map(name=>mount.querySelector('[name='+name+']'));if(values.some(input=>!input.reportValidity()))return;
  synth.cancel();clearTimeout(watchdog);const run=++token;parts=speechChunks(text.value);position=0;speaking=true;paused=false;buttons();const selected=voices.find(v=>v.voiceURI===voice.value),[rate,pitch,volume]=values.map(input=>+input.value);
  function next(){
   if(disposed||run!==token)return;
   if(position>=parts.length){speaking=false;current=null;buttons();status('Reading complete',[['Segments read',parts.length],['Voice',selected?.name||'System default']]);return;}
   current=new SpeechSynthesisUtterance(parts[position]);current.rate=rate;current.pitch=pitch;current.volume=volume;if(selected){current.voice=selected;current.lang=selected.lang;}
   current.onstart=()=>{if(run!==token||disposed)return;clearTimeout(watchdog);status('Reading aloud',[['Segment',(position+1)+' of '+parts.length],['Voice',selected?.name||'System default'],['Speed',rate+'×']]);};
   current.onend=()=>{if(run!==token||disposed)return;clearTimeout(watchdog);position++;next();};
   current.onerror=ev=>{if(run!==token||disposed)return;stopReading('Voice unavailable');status('Could not play this voice',[['Browser response',ev.error||'Speech failed'],['Try next','Choose another voice, check system speech settings, then try again.']]);};
   status('Starting voice…',[['Segment',(position+1)+' of '+parts.length]]);watchdog=setTimeout(()=>{if(run===token&&!disposed){stopReading('Speech did not start');status('No speech engine responded',[['Try next','Enable a system voice, choose another voice or try another supported browser.']]);}},12000);synth.speak(current);
  }next();
 };
 pause.onclick=()=>{if(!speaking)return;if(paused){synth.resume();paused=false;status('Reading resumed',[['Segment',(position+1)+' of '+parts.length]]);}else{synth.pause();paused=true;status('Paused',[['Segment',(position+1)+' of '+parts.length]]);}buttons();};stop.onclick=()=>stopReading();
 if(supported){refreshVoices();synth.addEventListener('voiceschanged',refreshVoices);status('Ready to read',[['Tip','Choose a voice, then press Speak text.']]);}else{info.textContent='Speech synthesis is not supported in this browser.';status('Speech is unavailable in this browser');}buttons();
 return()=>{disposed=true;token++;clearTimeout(watchdog);synth?.removeEventListener('voiceschanged',refreshVoices);synth?.cancel();current=null;};
}
