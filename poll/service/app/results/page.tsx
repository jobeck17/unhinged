import type { Metadata } from 'next';
import { resultsAccess } from '@/lib/results-access';
import { chatGPTSignInPath, chatGPTSignOutPath } from '@/app/chatgpt-auth';
import Results from './results';
import './results.css';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {title:'Unhinged · Poll results', robots:{index:false,follow:false}};
export default async function ResultsPage() {
  const access = await resultsAccess();
  if (!access.allowed) return <main className="results-shell auth-card"><p className="eyebrow">UNHINGED / PRIVATE RESULTS</p><h1>{access.user ? 'This account cannot view results.' : 'Your poll results, in one place.'}</h1><p>{access.user ? `You are signed in as ${access.user.email}. Use the ChatGPT account that owns this poll.` : 'Sign in with your ChatGPT account to see the votes and full feedback.'}</p><a className="action" href={access.user ? chatGPTSignOutPath('/results') : chatGPTSignInPath('/results')} target="_top">{access.user ? 'Sign out and switch accounts' : 'Sign in with ChatGPT'}</a></main>;
  return <Results signOutPath={chatGPTSignOutPath('/results')} />;
}
