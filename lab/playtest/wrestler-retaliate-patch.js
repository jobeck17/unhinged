// LAB-ONLY Backyard Wrestler experiment for the no-retaliation rules test.
// Tag Out remains intact. In addition, Backyard Wrestler's Wrestler Characters
// keep the old retaliation behavior through the experimental Retaliate keyword.
// Canonical RULES.md, CARDS.json, DECKS.json, and production playtest are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

LEADERS['Backyard Wrestler'].passive =
  'Tag Out: Once during your Turn after a friendly Defeat/Sacrifice, reveal the top card. A qualifying Expendable Character enters with Hothead; otherwise it goes to hand. Your Wrestlers have Retaliate.';

// no-retaliation-patch.js removes every packet whose source is "retaliation".
// Re-label retaliation from Backyard Wrestler Wrestlers so only they retain it.
const baseCombatDamage = Game.prototype.combatDamage;
Game.prototype.combatDamage = async function(entries){
  const patched = (entries || []).map(entry => {
    if(entry?.[2] !== 'retaliation') return entry;
    const source = entry?.[3];
    if(source && source.owner != null && this.name(source.owner) === 'Backyard Wrestler' && this.trait(source,'Wrestler')){
      return [entry[0], entry[1], 'wrestler-retaliate', ...entry.slice(3)];
    }
    return entry;
  });
  return baseCombatDamage.call(this, patched);
};
