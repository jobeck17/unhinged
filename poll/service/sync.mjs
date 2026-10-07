// Canonical service logic lives here; the Sites checkout supplies the runtime.
// Usage: node poll/service/sync.mjs /absolute/path/to/opened-collector
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const target=process.argv[2];
if(!target||!existsSync(resolve(target,'package.json')))throw new Error('Pass an opened collector checkout.');
const manifest=JSON.parse(readFileSync(resolve(target,'.openai/hosting.json'),'utf8'));
const canonical=JSON.parse(readFileSync(resolve(root,'.openai/hosting.json'),'utf8'));
if(manifest.project_id!==canonical.project_id)throw new Error('Collector project does not match.');
for(const file of ['app/api/responses/route.ts','db/responses.ts','db/schema.ts','lib/validate.mjs','app/api/results/route.ts','app/results/page.tsx','app/results/results.tsx','app/results/results.css','lib/results-access.ts','lib/results-access.mjs','app/chatgpt-auth.ts','app/page.tsx','app/globals.css']) {
  const path=resolve(target,file);mkdirSync(dirname(path),{recursive:true});
  let source=readFileSync(resolve(root,file),'utf8');
  if(file==='lib/validate.mjs')source=source.replace("'../../questions.js'","'./questions.mjs'");
  writeFileSync(path,source);
}
writeFileSync(resolve(target,'lib/questions.mjs'),readFileSync(resolve(root,'../questions.js')));
console.log('Canonical poll questions and response logic synchronized. Generate migrations if schema changed, then build and publish this existing collector.');
