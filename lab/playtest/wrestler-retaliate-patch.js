// LAB-ONLY Backyard Wrestler experiment for the no-retaliation rules test.
// Canonical RULES.md, CARDS.json, DECKS.json, and production playtest are untouched.
import {Game, LEADERS} from './engine.js?v=rulebreakers-1';

// Keep Tag Out exactly as-is and add only the experimental Retaliate passive.
LEADERS['Backyard Wrestler'].passive =
  'Tag Out: Once during your Turn after a friendly Defeat/Sacrifice, reveal the top card. A qualifying Expendable Character enters with Hothead; otherwise it goes to hand. Retaliate: Your Wrestlers have Retaliate.';

// Preserve the LAB-only Retaliate behavior while universal retaliation is disabled.
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
