import assert from 'node:assert/strict';
import {validateResponse} from './service/lib/validate.mjs';
import {questions,VERSION} from './questions.js';
const base={version:VERSION,submissionId:'11111111-1111-4111-8111-111111111111',website:'',answers:{resource:{choice:'Stash'}}};
assert.equal(validateResponse(base).answers.resource.choice,'Stash');
assert.equal(questions.length,24);
assert.equal(new Set(questions.map(q=>q.id)).size,24);
assert.throws(()=>validateResponse({...base,answers:{}}));
assert.throws(()=>validateResponse({...base,version:'old'}));
assert.throws(()=>validateResponse({...base,website:'spam'}));
assert.throws(()=>validateResponse({...base,answers:{unknown:{choice:'Stash'}}}));
assert.throws(()=>validateResponse({...base,answers:{resource:{choice:'not offered'}}}));
assert.throws(()=>validateResponse({...base,answers:{resource:{choice:'Something else'}}}));
assert.throws(()=>validateResponse({...base,answers:{resource:{writeIn:'a'.repeat(121)}}}));
const write=validateResponse({...base,answers:{resource:{choice:'Fuel',writeIn:'  Pocket  ',reason:' Feels right '}}});
assert.deepEqual(write.answers.resource,{choice:'Something else',writeIn:'Pocket',reason:'Feels right'});
assert.equal(validateResponse({...base,answers:{resource:{choice:'No preference'}}}).answers.resource.choice,'No preference');
console.log('18 questions; response validation, write-ins, skips, limits, and honeypot passed.');

const feedback={...base,answers:{'gameplay-suggestions':{writeIn:'Add clearer targeting reminders.'}}};
assert.equal(validateResponse(feedback).answers['gameplay-suggestions'].writeIn,'Add clearer targeting reminders.');
assert.equal(Object.keys(validateResponse({...base,answers:{...base.answers,...feedback.answers}}).answers).length,2);
assert.throws(()=>validateResponse({...base,answers:{'gameplay-fun':{writeIn:'a'.repeat(1801)}}}));
assert.throws(()=>validateResponse({...base,answers:{'gameplay-fun':{writeIn:'  '}}}));
assert.throws(()=>validateResponse({...base,answers:{'gameplay-fun':{writeIn:123}}}));
console.log('Six optional gameplay prompts; feedback-only and mixed submissions, empty input and limits passed.');

