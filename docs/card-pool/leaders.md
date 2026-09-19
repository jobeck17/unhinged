# Unhinged Leaders

> Working Leader roster. Health, passive abilities, active abilities, Traits, and wording remain subject to playtest tuning.

Leaders use a shared chassis:

- **Name**
- **Color**
- **Health**
- **Traits**
- **Passive ability**
- **Exhaust ability**
- Using a Leader's Exhaust ability exhausts that Leader. An exhausted Leader is **Vulnerable** until it readies, and a Vulnerable Leader may be attacked directly, bypassing normal Unit protection.
- Resource-specific text only when it is central to that Leader's identity

## Florida Man

**ID:** L001  
**Color:** Reckless  
**Health:** 18  
**Traits:** Human • Florida Man  
**Role:** Aggro / Items

**Passive — Hold My Beer:** Once each round after one of your Units attacks, another ready Unit you control gets +1 Power this round.

**Exhaust — Improvised Solution:** Dismiss an Item you control. A Unit you control gets +2 Power this round.

---

## Little League Coach

**ID:** L002  
**Color:** Unruly  
**Health:** 22  
**Traits:** Human • Coach • Team  
**Role:** Midrange / Team

**Passive — Good Hustle:** The first time each round you deploy a Unit costing 3 or more, it gets +1 Guard this round.

**Exhaust — Shake It Off:** Choose a Unit you control. It gets +1 Power and +1 Guard this round.

---

## ROOT

**ID:** L003  
**Color:** Crooked  
**Health:** 21  
**Traits:** Hacker  
**Role:** Tempo / Actions

**Passive — Exploit:** The first time each round you play an Action that targets an enemy Unit, that Unit gets -1 Power this round.

**Exhaust — Backdoor:** Ready one of your exhausted Units.

---

## Trash Baron

**ID:** L004  
**Color:** Makeshift  
**Health:** 21  
**Traits:** Human • Scavenger  
**Role:** Scrap / Recycling

**Passive — Waste Not:** The first time each round you Repurpose a card, gain 1 temporary resource that may only be spent on a Makeshift card or Item this round.

**Exhaust — I Can Use That:** Repurpose a card from your discard. This does not count against your normal once-per-round Repurpose.

> **Resource-engine note:** Trash Baron's exact wording is the most provisional because Repurpose / Scrap is still being finalized.

---

## HOA President

**ID:** L005  
**Color:** Stubborn  
**Health:** 24  
**Traits:** Human • Authority  
**Role:** Control / Defense

**Passive — Not Approved:** The first Unit you control that blocks each round gets +3 Guard this round.

**Exhaust — Violation Notice:** Choose an enemy Unit. It gets -1 Power this round.

---

## Backyard Wrestler

**ID:** L006  
**Color:** Kamikaze *(working color name)*  
**Health:** 20  
**Traits:** Human • Daredevil  
**Role:** Death / Combat

**Passive — Still Standing:** The first time each round one of your Units dies during combat, another Unit you control gets +1 Power this round.

**Exhaust — One More Bump:** Choose a damaged Unit you control. It gets +2 Power this round. If it dies this round, draw a card.

---

## Current Color-to-Leader Mapping

| Color | Leader |
|---|---|
| Reckless | Florida Man |
| Unruly | Little League Coach |
| Crooked | ROOT |
| Makeshift | Trash Baron |
| Stubborn | HOA President |
| Kamikaze | Backyard Wrestler |

## Source of Truth

- Machine-readable Leader data: [leaders.json](./leaders.json)
- Machine-readable card pool: [cards.json](./cards.json)
- Curated simulator decks: [test-decks.json](./test-decks.json)
