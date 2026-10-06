import {questions, sections, VERSION} from './questions.js';
import {API_URL} from './config.js';
const key = `unhinged-poll:${VERSION}`;
let draft = {step:0, answers:{}, submissionId:crypto.randomUUID()};
try { const saved = JSON.parse(localStorage.getItem(key)); if(saved && saved.answers && saved.submissionId) draft = {...draft,...saved}; } catch {}
draft.step = Math.max(0,Math.min(sections.length-1,Number(draft.step)||0));
let busy = false;
const el = id => document.getElementById(id);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function save() { try {localStorage.setItem(key,JSON.stringify(draft));} catch {} }
function answered(q) { const a=draft.answers[q.id];return Boolean(a && (a.writeIn?.trim() || a.choice)); }
function updateProgress() {const count=questions.filter(answered).length;el('progress-fill').style.width=`${count/questions.length*100}%`;el('progress-label').textContent=`${count} of ${questions.length} answered · Section ${draft.step+1} of ${sections.length}`;}
function render(scroll=false) {
  el('steps').innerHTML=sections.map((s,i)=>`<button type="button" data-step="${i}" ${i===draft.step?'aria-current="step"':''}>${escape(s.short)}</button>`).join('');
  const section = sections[draft.step];
  el('questions').innerHTML=`<div class="section-heading"><h2>${escape(section.title)}</h2><p>${escape(section.intro)}</p></div>`+questions.filter(q=>q.section===draft.step).map(q=>{
    const a=draft.answers[q.id]||{};
    if(q.kind==='text')return `<fieldset class="question"><legend><span class="question-number">GAMEPLAY FEEDBACK · OPTIONAL</span>${escape(q.title)}</legend><p class="context">${escape(q.context)}</p><label class="write-label" for="write-${q.id}">Your feedback</label><textarea class="gameplay-answer" id="write-${q.id}" data-question="${q.id}" data-field="writeIn" maxlength="${q.maxLength}" placeholder="${escape(q.placeholder)}">${escape(a.writeIn||'')}</textarea></fieldset>`;
    return `<fieldset class="question ${q.accent?'style-card':''}" ${q.accent?`style="--accent:${q.accent}"`:''}><legend><span class="question-number">QUESTION ${String(questions.indexOf(q)+1).padStart(2,'0')} · CURRENT: ${escape(q.current.toUpperCase())}</span>${escape(q.title)}</legend>${q.leader?`<p class="context">${escape(q.leader)}</p><p class="identity"><strong>Core identity</strong><br>${escape(q.identity)}</p>`:`<p class="context">${escape(q.context)}</p>`}<div class="examples"><small>HEAR IT IN GAME</small>${q.examples.map(e=>`<p>${escape(e)}</p>`).join('')}</div><div class="options">${[...q.choices,'Something else','No preference'].map((choice,i)=>`<label class="option"><input type="radio" name="${q.id}" value="${escape(choice)}" ${a.choice===choice?'checked':''}>${escape(choice)}</label>`).join('')}</div><label class="write-label" for="write-${q.id}">Your own suggestion (optional)</label><input type="text" id="write-${q.id}" data-question="${q.id}" data-field="writeIn" maxlength="120" placeholder="What would you call it?" value="${escape(a.writeIn||'')}"><details class="reason" ${a.reason?'open':''}><summary>Add a reason or comment</summary><label class="write-label" for="reason-${q.id}">Why does this name fit—or miss?</label><textarea id="reason-${q.id}" data-question="${q.id}" data-field="reason" maxlength="600" placeholder="Tell us what feels clear, awkward, or very Unhinged…">${escape(a.reason||'')}</textarea></details></fieldset>`;
  }).join('');
  el('back').disabled=draft.step===0;
  el('next').hidden=draft.step===sections.length-1;
  el('submit').hidden=false;
  updateProgress();
  if(scroll){el('steps').scrollIntoView({behavior:'smooth',block:'start'});el('questions').querySelector('h2').setAttribute('tabindex','-1');el('questions').querySelector('h2').focus({preventScroll:true});}
}
el('steps').addEventListener('click',e=>{const b=e.target.closest('[data-step]');if(b&&!busy){draft.step=Number(b.dataset.step);save();render(true);}});
el('back').addEventListener('click',()=>{draft.step--;save();render(true);});
el('next').addEventListener('click',()=>{draft.step++;save();render(true);});
el('questions').addEventListener('input',e=>{
  const t=e.target;
  const id=t.type==='radio'?t.name:t.dataset.question;
  if(!id)return;
  const a=draft.answers[id] ||= {choice:'',writeIn:'',reason:''};
  if(t.type==='radio') {a.choice=t.value;if(t.value!=='Something else') {a.writeIn='';el(`write-${id}`).value='';}}
  else {a[t.dataset.field]=t.value;if(t.dataset.field==='writeIn'&&t.value.trim()&&questions.find(q=>q.id===id)?.kind!=='text'){a.choice='Something else';const radio=el('questions').querySelector(`input[name="${id}"][value="Something else"]`);if(radio)radio.checked=true;}}
  save();updateProgress();
});
el('poll').addEventListener('submit',async e=>{
  e.preventDefault();if(busy)return;
  el('status').className='';
  const selected=questions.filter(answered);
  if(!selected.length){el('status').textContent='Answer a question or add gameplay feedback before submitting.';return;}
  const incomplete=selected.find(q=>draft.answers[q.id].choice==='Something else'&&!draft.answers[q.id].writeIn?.trim());
  if(incomplete){draft.step=incomplete.section;render(true);el(`write-${incomplete.id}`).focus();el('status').className='error';el('status').textContent='Type your suggestion for “Something else,” or choose another option.';return;}
  if(!API_URL){el('status').className='error';el('status').textContent='Response collection is unavailable. Your draft is still saved on this device.';return;}
  busy=true;document.querySelectorAll('#poll input, #poll textarea, #poll button, #steps button').forEach(control=>control.disabled=true);el('status').textContent='Sending your answers…';
  try {
    const response=await fetch(`${API_URL}/api/responses`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({version:VERSION,submissionId:draft.submissionId,answers:draft.answers,website:el('website').value}),signal:AbortSignal.timeout(20000)});
    const result=await response.json();
    if(!response.ok||!result.saved)throw new Error(result.error||'Could not save your answers.');
    draft.submitted=true;save();showSuccess();
  }catch(err){el('status').className='error';el('status').textContent=`${err.name==='TimeoutError'?'The request took too long.':err.message} Your answers are preserved. Please try again.`;}
  finally{busy=false;document.querySelectorAll('#poll input, #poll textarea, #poll button, #steps button').forEach(control=>control.disabled=false);el('back').disabled=draft.step===0;}
});
function showSuccess(){el('poll').hidden=true;el('steps').hidden=true;el('success').hidden=false;el('receipt').textContent=`${questions.filter(answered).length} answers saved. Reference: ${draft.submissionId.slice(0,8)}.`;el('success').focus();}
el('add-feedback').addEventListener('click',()=>{draft={step:4,answers:{},submissionId:crypto.randomUUID()};save();el('poll').hidden=false;el('steps').hidden=false;el('success').hidden=true;el('status').textContent='';render(true);});
render();if(draft.submitted)showSuccess();

