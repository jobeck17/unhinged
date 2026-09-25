# Donut Duel web playtest

Open `play/` on GitHub Pages or serve the repository root with a static HTTP server and visit `/play/`. The app reads the [current card pool](../production/cards/cards.json) and [all six 40-card test decks](../production/playtests/six-deck-lab/decks.json). Choose any Leader and any of the other five as your AI opponent. No account, art, or game server is required. Tap cards for full text and available actions; choose targets, Blockers, Guard Discards, mulligan replacements, and Leader ultimates in the interface. The AI uses public board information and its own hand, not the player’s hidden cards.

This is an **experimental implementation of the six named test decks**, not a generic rules engine for every card in the 180-card pool. The current decks exercise Sucker Punch, Sneaky, Cloak, the two Stack cards, the Bush, Hot Potato, and the Vacuum’s tucked cards. The [six-deck pairing smoke test](test-six.mjs) checks 30 directed AI matchups and card conservation; [UI smoke test](test-app.mjs) checks selection and mulligan rendering. Neither establishes card balance or perfect edge-case coverage. Games restart on browser reload. The previous two-deck engine remains for its historical test, but the web page loads `engine-six.js`.

Run `node play/test-six.mjs` and `node play/test-app.mjs` before publishing.

Publishing uses `.github/workflows/pages.yml`. GitHub Pages must be enabled with **GitHub Actions** as the publishing source in the repository settings; the default workflow token cannot enable Pages itself. The deployed path is `/unhinged/play/` on the standard project URL.
