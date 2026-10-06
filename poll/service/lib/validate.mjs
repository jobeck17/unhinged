import {questions, VERSION} from '../../questions.js';
export function validateResponse(body) {
  if(!body || typeof body !== 'object' || body.version !== VERSION)throw new Error('This poll version is no longer available.');
  if(typeof body.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.submissionId))throw new Error('Invalid response reference. Reload and try again.');
  if(body.website)throw new Error('Submission rejected.');
  if(!body.answers || typeof body.answers !== 'object' || Array.isArray(body.answers))throw new Error('Please answer at least one question.');
  const answers={};
  for(const [id,a] of Object.entries(body.answers)) {
    const q=questions.find(q=>q.id===id);
    if(!q || !a || typeof a !== 'object' || Array.isArray(a))throw new Error('Invalid question response.');
    const clean={};
    for(const [field,max] of [['choice',100],['writeIn',120],['reason',600]]) {
      const value=a[field]??'';
      if(typeof value!=='string'||value.length>max)throw new Error('An answer is too long or has an invalid format.');
      clean[field]=value.trim();
    }
    if(clean.choice&&!q.choices.includes(clean.choice)&&!['Something else','No preference'].includes(clean.choice))throw new Error('Choose one of the offered answers or write your own.');
    if(clean.choice==='Something else'&&!clean.writeIn)throw new Error('Please include your own suggestion.');
    if(clean.writeIn)clean.choice='Something else';
    if(clean.choice)answers[id]=clean;
  }
  if(!Object.keys(answers).length)throw new Error('Please answer at least one question.');
  return {id:body.submissionId,version:VERSION,answers};
}
