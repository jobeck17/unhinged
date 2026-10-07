import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { isResultsOwner } from './results-access.mjs';
export async function resultsAccess() {
  const user = await getChatGPTUser();
  const ownerEmail = (env as unknown as Record<string, string>).RESULTS_OWNER_EMAIL;
  return { user, allowed: isResultsOwner(user, ownerEmail) };
}
