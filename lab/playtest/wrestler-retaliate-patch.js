// LAB-ONLY Backyard Wrestler experiment for the no-retaliation rules test.
// Canonical RULES.md, CARDS.json, DECKS.json, and production playtest are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

// Keep Tag Out exactly as-is and add only the experimental Retaliate passive.
LEADERS['Backyard Wrestler'].passive =
  'Tag Out: Once during your Turn after a friendly Defeat/Sacrifice, reveal the top card. A qualifying Expendable Character enters with Hothead; otherwise it goes to hand. Retaliate: Your Wrestlers have Retaliate.';

// Capture which Character actually blocked a Leader attack so Retaliate can survive
// the LAB-wide no-retaliation filter. This also preserves Defiant cases where the
// blocker is Defeated before retaliation damage is applied.
const baseAttack = Game.prototype.attack;
Game.prototype.attack = async function(uid){
  const originalAsk = this.ask;
  this._labRetaliateBlockerIsWrestler = false;
  this.ask = async request => {
    const answer = await originalAsk(request);
    if(request?.title?.startsWith('Blockers:') && Array.isArray(answer) && answer.length){
      const blocker = this.obj(answer[0]);
      this._labRetaliateBlockerIsWrestler = !!(
        blocker && this.name(blocker.owner) === 'Backyard Wrestler' && this.trait(blocker,'Wrestler')
      );
    }
    return answer;
  };
  try{
    return await baseAttack.call(this, uid);
  } finally {
    this.ask = originalAsk;
    this._labRetaliateBlockerIsWrestler = false;
  }
};

// no-retaliation-patch.js removes packets labeled "retaliation". Re-label only
// retaliation created by Backyard Wrestler's Wrestlers so those packets resolve.
const baseCombatDamage = Game.prototype.combatDamage;
Game.prototype.combatDamage = async function(entries){
  const patched = (entries || []).map(entry => {
    if(entry?.[2] !== 'retaliation') return entry;

    let wrestlerSource = false;
    if(this.pendingAttack?.target === -1){
      wrestlerSource = !!this._labRetaliateBlockerIsWrestler;
    } else if(this.pendingAttack?.target != null){
      const source = this.obj(this.pendingAttack.target);
      wrestlerSource = !!(
        source && this.name(source.owner) === 'Backyard Wrestler' && this.trait(source,'Wrestler')
      );
    }

    return wrestlerSource ? [entry[0], entry[1], 'wrestler-retaliate'] : entry;
  });
  return baseCombatDamage.call(this, patched);
};
