// Bot-vs-bot batch runner: `node simulate.mjs [games] [seed]`. Prints the §15 test-goal tallies.
import fs from 'node:fs';
import {Game} from './engine.mjs';
import {chooseMove} from './ai.mjs';

const load = f => JSON.parse(fs.readFileSync(new URL(f, import.meta.url)));
export const cards = load('./CARDS.json'), decks = load('./DECKS.json');

export function playOut(g, maxSteps = 6000) {
  let steps = 0;
  while (g.winner === null && steps++ < maxSteps && g.round <= 60) g.apply(chooseMove(g));
  return g;
}

export function batch(n, seed = 1) {
  const games = [];
  for (let i = 0; i < n; i++) {
    const g = new Game(cards, decks, {decks: i % 2 ? [1, 0] : [0, 1], seed: seed + i});
    games.push(playOut(g).record());
  }
  return games;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const n = +(process.argv[2] || 200), seed = +(process.argv[3] || 1), games = batch(n, seed);
  const wins = {}, totals = {};
  let rounds = 0, unfinished = 0;
  for (const r of games) {
    if (r.winner) wins[r.winner] = (wins[r.winner] || 0) + 1; else unfinished++;
    rounds += r.rounds;
    for (const p of r.players) {
      const t = totals[p.leader] ||= {};
      for (const [k, v] of Object.entries(p)) if (typeof v === 'number') t[k] = (t[k] || 0) + v;
    }
  }
  console.log(`${n} games · avg ${(rounds / n).toFixed(1)} rounds · unfinished ${unfinished}`);
  console.log('wins', wins);
  for (const [leader, t] of Object.entries(totals)) {
    console.log(leader, Object.fromEntries(Object.entries(t).map(([k, v]) => [k, +(v / n).toFixed(2)])));
  }
}
