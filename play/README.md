# Donut Duel web playtest

**Current live build: [Character Lab 2](../production/playtests/character-lab/README.md).** Leaders provide deck identity, 25 Health, and one automatic passive. The app and lab engine contain no Leader action button, Charge, rotation, or ultimates. The app loads that folder’s cards and decks plus `engine-lab.js` / `ai-lab.js`. Run `node play/test-character-lab.mjs` and `node play/test-app.mjs`. Details below describe the prior six-deck baseline.

Open `play/` on GitHub Pages or serve the repository root with a static HTTP server and visit `/play/`. Choose any Leader deck and any of the other five as your AI opponent. No account, art, or game server is required. Tap cards for full text and available actions; choose targets, Blockers, and mulligan replacements in the interface. The AI uses public board information and its own hand, not the player’s hidden cards.

Leader panels keep Health, Style, passive text, and passive ready/used state visible without opening a modal. Card frames use separate Character (♟), Action (⚡), and Item (⬢) symbols plus subtle shape and surface differences for faster scanning on mobile.

This is an **experimental implementation of the six named test decks**, not a generic rules engine for every card in the 180-card pool. Players take full turns: play and attack as often as Fuel and Ready cards allow, then End turn. Each player refreshes and draws at the start of their own turn; a Round ends after both turns. One Ready Character can block each Leader attack. The AI blocks selectively. The current decks exercise Sucker Punch, Sneaky, Cloak, the two Stack cards, the Bush, Hot Potato, and the Vacuum’s tucked cards. The [six-deck pairing smoke test](test-six.mjs) checks 30 directed AI matchups and card conservation; [UI smoke test](test-app.mjs) checks selection and mulligan rendering. Neither establishes card balance or perfect edge-case coverage. Games restart on browser reload. The previous two-deck engine remains for its historical test, but the web page loads `engine-six.js`.

Run `node play/test-six.mjs` and `node play/test-app.mjs` before publishing.

Publishing uses `.github/workflows/pages.yml`. GitHub Pages must be enabled with **GitHub Actions** as the publishing source in the repository settings; the default workflow token cannot enable Pages itself. The deployed path is `/unhinged/play/` on the standard project URL.
