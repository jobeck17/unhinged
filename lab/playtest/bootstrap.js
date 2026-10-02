// LAB browser bootstrap. Load experimental patches in a deterministic order
// before app.js renders Leader text or starts a game.
await import('./snowball-patch.js?v=lab-13');
await import('./lab-patches.js?v=lab-13');
await import('./trojan-cat-patch.js?v=lab-13');
await import('./tuxedo-cat-patch.js?v=lab-13');
await import('./no-retaliation-patch.js?v=lab-13');
await import('./wrestler-retaliate-patch.js?v=lab-13');
await import('./stray-cat-patch.js?v=lab-13');
await import('./hairy-cat-patch.js?v=lab-13');
await import('./app.js?v=lab-13');
