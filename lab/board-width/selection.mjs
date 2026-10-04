// Pure selection logic shared by the UI and regression tests.
export function boardTargets(moves, step = 'target') {
  return [...new Set(moves.map(m => m[step]).filter(v => Number.isInteger(v)))];
}
export function selectBoardTarget(moves, target, step = 'target') {
  return moves.filter(m => m[step] === target);
}
export function sourceMoves(g, source) {
  return g.legalMoves().filter(m => source.uid !== undefined ? m.uid === source.uid : m.index === source.index);
}
