// LAB ONLY: Crazy Cat Lady passive experiment.
// Replaces the old Cat Distribution System behavior only inside the personal LAB.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

const PASSIVE_NAME = 'Strength in Numbers............ Mostly Numbers........ Probably.';
LEADERS['Crazy Cat Lady'].passive =
  `${PASSIVE_NAME} At the start of your Turn, if you control fewer than 3 Cats, you may Stash one additional card this Turn. If you control 3 or more Cats, Draw an additional card.`;

// The base LAB engine still contains the old Crazy Cat Lady start-of-turn auto-Stash.
// Suppress only that old check while its normal turn setup resolves, then apply the
// new two-mode passive. This patch is loaded before Snowball so Snowball's own
// start-of-turn wrapper still sees the real Cat board.
const baseStartTurn = Game.prototype.startTurn;
Game.prototype.startTurn = function(){
  const p = this.turn;
  const isCatLady = this.name(p) === 'Crazy Cat Lady';
  if(!isCatLady) return baseStartTurn.call(this);

  const s = this.players[p];
  const catCount = this.chars(p).filter(x => this.trait(x,'Cat')).length;
  s._catLadyStashLimit = catCount < 3 ? 2 : 1;
  s._catLadyStashCount = 0;

  // Hide the Cat board only from the old engine check so it cannot create the
  // obsolete automatic top-deck Stash. Restore immediately afterward.
  const realChars = this.chars;
  this.chars = function(player){
    if(player === p) return [];
    return realChars.call(this, player);
  };

  let result;
  try {
    result = baseStartTurn.call(this);
  } finally {
    this.chars = realChars;
  }

  if(catCount >= 3){
    if(this.winner === null){
      this.draw(p, 1, false);
      if(this.winner === null) this.say(`${PASSIVE_NAME} Draws an additional card`);
    }
  } else {
    this.say(`${PASSIVE_NAME} You may Stash twice this Turn`);
  }

  return result;
};

// Crazy Cat Lady may normally Stash once. In the low-Cat mode the limit becomes two
// for that Turn. Everyone else's Stash rules remain untouched.
const baseCanStash = Game.prototype.canStash;
Game.prototype.canStash = function(index, p = this.turn){
  if(this.name(p) !== 'Crazy Cat Lady') return baseCanStash.call(this, index, p);
  const s = this.players[p];
  const limit = s._catLadyStashLimit ?? 1;
  const count = s._catLadyStashCount ?? (s.stashedThisTurn ? 1 : 0);
  return count < limit && index >= 0 && index < s.hand.length;
};

const baseStash = Game.prototype.stash;
Game.prototype.stash = function(index, p = this.turn){
  if(this.name(p) !== 'Crazy Cat Lady') return baseStash.call(this, index, p);
  const s = this.players[p];
  if(!this.canStash(index, p)) return false;

  const id = s.hand.splice(index, 1)[0];
  s.stash.push(id);
  s._catLadyStashCount = (s._catLadyStashCount || 0) + 1;
  s.stashedThisTurn = true;
  s.fuel++;
  this.say(`${this.name(p)} Stashes a card · ${s.stash.length} total`);
  this.update?.();
  return true;
};
