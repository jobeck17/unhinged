import { env } from 'cloudflare:workers';
export function responseDb() {
  if(!env.DB)throw new Error('Response database unavailable');
  return env.DB;
}
