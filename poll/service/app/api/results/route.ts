import { responseDb } from '@/db/responses';
import { resultsAccess } from '@/lib/results-access';
export const dynamic = 'force-dynamic';
const privateHeaders = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie, oai-authenticated-user-id, oai-authenticated-user-email', 'X-Robots-Tag': 'noindex, nofollow' };
export async function GET() {
  const access = await resultsAccess();
  if (!access.allowed) return Response.json({error: access.user ? 'Results are available only to the poll owner.' : 'Sign in to view results.'}, {status: access.user ? 403 : 401, headers: privateHeaders});
  try {
    const { results } = await responseDb().prepare('SELECT id, poll_version, answers_json, created_at FROM responses ORDER BY created_at DESC, id DESC').all();
    const responses = results.map(row => ({ id: row.id, version: row.poll_version, createdAt: row.created_at, answers: JSON.parse(String(row.answers_json)) }));
    return Response.json({responses, updatedAt: new Date().toISOString()}, {headers: privateHeaders});
  } catch (err) {
    console.error('Results load failed', err);
    return Response.json({error: 'Responses could not be loaded. Please try again.'}, {status: 503, headers: privateHeaders});
  }
}
