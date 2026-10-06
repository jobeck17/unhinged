import { responseDb } from '@/db/responses';
import { validateResponse } from '@/lib/validate.mjs';
const allowedOrigin='https://jobeck17.github.io';
function headers(request:Request) {
  const h:Record<string,string>={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};
  if(request.headers.get('Origin')===allowedOrigin)h['Access-Control-Allow-Origin']=allowedOrigin;
  return h;
}
function json(request:Request,data:unknown,status=200){return new Response(JSON.stringify(data),{status,headers:headers(request)});}
export function OPTIONS(request:Request){const h=headers(request);h['Access-Control-Allow-Methods']='POST, OPTIONS';h['Access-Control-Allow-Headers']='Content-Type';h['Access-Control-Max-Age']='86400';return new Response(null,{status:204,headers:h});}
export async function POST(request:Request) {
  const origin=request.headers.get('Origin');
  if(origin && origin!==allowedOrigin && origin!==new URL(request.url).origin)return json(request,{error:'This origin cannot submit responses.'},403);
  if(!request.headers.get('Content-Type')?.includes('application/json'))return json(request,{error:'JSON required.'},415);
  let body;
  try {
    const raw=await request.text();
    if(raw.length>64000)return json(request,{error:'Response is too large.'},413);
    body=validateResponse(JSON.parse(raw));
  }catch(err){return json(request,{error:err instanceof SyntaxError?'Invalid response format.':err instanceof Error?err.message:'Invalid response.'},400);}
  try {
    await responseDb().prepare('INSERT INTO responses (id, poll_version, answers_json, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').bind(body.id,body.version,JSON.stringify(body.answers),new Date().toISOString()).run();
    return json(request,{saved:true,reference:body.id},201);
  }catch(err){console.error('Poll save failed',err);return json(request,{error:'Response collection is temporarily unavailable. Please try again.'},503);}
}
export function GET(request:Request){return json(request,{error:'Responses are private. Submission endpoint only.'},405);}

