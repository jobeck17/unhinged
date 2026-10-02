// LAB-ONLY TEMPORARY RULE EXPERIMENT: no retaliation in combat.
// Canonical RULES.md and production playtest are intentionally untouched.
import {Game} from './engine.js?v=rulebreakers-1';

// The engine funnels retaliation damage through combatDamage with the explicit
// source label "retaliation". Ignore only those packets so attacks, blocking,
// overflow, Defeat checks, and non-combat damage continue to behave normally.
const baseCombatDamage = Game.prototype.combatDamage;
Game.prototype.combatDamage = async function(entries){
  const filtered = (entries || []).filter(entry => entry?.[2] !== 'retaliation');
  if (!filtered.length) {
    this.say('LAB TEST: No retaliation damage');
    return;
  }
  return baseCombatDamage.call(this, filtered);
};
