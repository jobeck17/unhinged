'use client';
import { useCallback, useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { questions, sections, VERSION } from '@/lib/questions.mjs';

type Answer = {choice?:string; writeIn?:string; reason?:string};
type Submission = {id:string; version:string; createdAt:string; answers:Record<string,Answer>};
type Question = {id:string; title:string; section:number; kind?:string; current?:string; choices?:string[]};
const survey = questions as Question[];
const date = (value:string) => new Intl.DateTimeFormat('en-US', {dateStyle:'medium',timeStyle:'short',timeZone:'America/New_York'}).format(new Date(value));
const label = (a:Answer) => a.writeIn ? a.writeIn : a.choice || 'No vote';

export default function Results({signOutPath}:{signOutPath:string}) {
  const [rows, setRows] = useState<Submission[]>([]);
  const [updated, setUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/results', {cache:'no-store'});
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Responses could not be loaded.');
      setRows(data.responses); setUpdated(data.updatedAt);
    } catch (err) {setError(err instanceof Error ? err.message : 'Responses could not be loaded.');}
    finally {setLoading(false);}
  }, []);
  useEffect(() => {void load();}, [load]);
  const current = rows.filter(row => row.version === VERSION);
  const gameplay = current.filter(row => survey.some(q => q.kind === 'text' && row.answers[q.id]?.writeIn));
  const naming = current.filter(row => survey.some(q => q.kind !== 'text' && row.answers[q.id]));
  return <main className="results-shell">
    <header className="results-header"><div><p className="eyebrow">UNHINGED / PRIVATE RESULTS</p><h1>What players think.</h1></div><div className="header-actions"><button className="action" disabled={loading} onClick={() => void load()}>{loading ? 'Loading…' : 'Refresh results'}</button><a className="quiet-link" href={signOutPath} target="_top">Sign out</a></div></header>
    <div className="stats"><div><strong>{current.length}</strong><span>Submissions</span></div><div><strong>{naming.length}</strong><span>Naming responses</span></div><div><strong>{gameplay.length}</strong><span>Gameplay responses</span></div></div>
    <p className="results-note">Anonymous submissions, including partial answers and feedback-only entries. Counts are submissions, not unique people. {updated && <span>Updated {date(updated)} Eastern.</span>}</p>
    {error && <p className="error" role="alert">{error} <a href="/results">Reload and sign in</a></p>}
    {!loading && !error && !rows.length && <div className="panel"><h2>No responses yet.</h2><p>New submissions will appear here when you refresh.</p></div>}
    {rows.length > 0 && <Tabs defaultValue="votes"><TabsList className="results-tabs"><TabsTrigger value="votes">Naming votes</TabsTrigger><TabsTrigger value="gameplay">Gameplay</TabsTrigger><TabsTrigger value="submissions">Submissions</TabsTrigger></TabsList>
      <TabsContent value="votes"><div className="vote-grid">{survey.filter(q => q.kind !== 'text').map(q => {
        const answered = current.filter(row => row.answers[q.id]);
        const votes = new Map<string,number>();
        for (const row of answered) {const a=row.answers[q.id]; const value = a.writeIn ? `${a.writeIn} (write-in)` : a.choice || 'No preference'; votes.set(value,(votes.get(value)||0)+1);}
        const sorted = [...votes.entries()].sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0]));
        return <article className="panel vote-card" key={q.id}><p className="eyebrow">{sections[q.section].short}</p><h2>{q.title}</h2><p className="muted">{answered.length} answered · {current.length-answered.length} skipped</p>{sorted.length ? sorted.map(([name,count])=><div className="vote" key={name}><div className="vote-label"><span>{name}</span><strong>{count} <small>({Math.round(count/answered.length*100)}%)</small></strong></div><div className="vote-track" aria-hidden="true"><div style={{width:`${count/answered.length*100}%`}} /></div></div>) : <p className="muted">No votes yet.</p>}{answered.some(row=>row.answers[q.id].reason) && <details className="comments"><summary>Read reasons</summary>{answered.filter(row=>row.answers[q.id].reason).map(row=><blockquote key={row.id}><strong>{label(row.answers[q.id])}</strong><p>{row.answers[q.id].reason}</p><small>{date(row.createdAt)} Eastern</small></blockquote>)}</details>}</article>;
      })}</div></TabsContent>
      <TabsContent value="gameplay"><div className="feedback-list">{gameplay.length ? gameplay.map(row=><article className="panel" key={row.id}><p className="eyebrow">{date(row.createdAt)} EASTERN</p><h2>Gameplay feedback</h2>{survey.filter(q=>q.kind==='text' && row.answers[q.id]?.writeIn).map(q=><div className="answer-block" key={q.id}><h3>{q.title}</h3><p>{row.answers[q.id].writeIn}</p></div>)}</article>) : <div className="panel"><h2>No gameplay feedback yet.</h2><p>Feedback-only and mixed submissions will appear here.</p></div>}</div></TabsContent>
      <TabsContent value="submissions"><div className="feedback-list">{rows.map((row,i)=><details className="panel submission" key={row.id}><summary><span>Submission {rows.length-i}<small>{date(row.createdAt)} Eastern</small></span><span className="answer-count">{Object.keys(row.answers).length} answers</span></summary><p className="muted">Reference: {row.id}<br/>Poll: {row.version}</p>{Object.entries(row.answers).map(([id,a])=><div className="answer-block" key={id}><h3>{survey.find(q=>q.id===id)?.title || id}</h3><p>{label(a)}</p>{a.reason && <p className="muted">{a.reason}</p>}</div>)}</details>)}</div></TabsContent>
    </Tabs>}
  </main>;
}
