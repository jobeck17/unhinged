// LAB browser bootstrap. Load experimental patches in a deterministic order
// before the local two-player app renders Leader text or starts a game.
await import('./snowball-patch.js?v=lab-14');
await import('./lab-patches.js?v=lab-14');
await import('./trojan-cat-patch.js?v=lab-14');
await import('./tuxedo-cat-patch.js?v=lab-14');
await import('./no-retaliation-patch.js?v=lab-14');
await import('./wrestler-retaliate-patch.js?v=lab-14');
await import('./stray-cat-patch.js?v=lab-14');
await import('./hairy-cat-patch.js?v=lab-14');
await import('./app-two-player.js?v=lab-14');
