# Visual system and mobile pass

## Direction

User direction: “black metallic liquid mirror look for transitions and stuff.”

Dark graphite reading surfaces, silver action controls, and a brief reflective sweep on interaction. Serif book typography remains; Manrope distinguishes controls from prose. The reading text stays still. Light and device-following appearances are available.

The maintained design contract is `.ulpi/design/DESIGN.md`; `.ulpi/design/visual-pass.md` records flows, states, ownership, and acceptance criteria. CSS values live in `src/styles/tokens.css`; reusable surface/motion primitives live in `src/styles/global.css`. Existing manuscript, chapter order, source catalog, and practice model data were not changed.

## Delivered

- Responsive header with explicit two-row phone layout, active navigation, and keyboard-friendly Appearance disclosure.
- Dark, Light, and System preference; Regular, Larger, and Largest chapter text. Browser persistence is optional and guarded against blocked storage.
- Silver primary actions, dark metallic panels, reflective hover/focus feedback, and progressive cross-document page transitions. Ordinary navigation is used when the browser does not support view transitions.
- Homepage cover treatment, six native recognition disclosures in stable columns, clearer book paths, mobile act pages and table of contents.
- Modern search/select/category controls and compact mobile category disclosure for the full 366-reference catalog.
- Larger exercise textareas, range endpoints, readable outcomes, labeled keyboard-scrollable comparison tables, separated Clear action, and existing save/download behavior.
- Analysis page uses the same shell and theme, with a multiline composer. Existing auth and agent behavior preserved.
- Reading progress follows the chapter prose. Wiki, About, 404, footer, and previous/next navigation follow the same system.

## Verification

- `npm test`: 17/17 passing.
- `npm run build`: 73 static pages generated.
- 18 representative routes at 320, 390, 768, 1440px: 72 responsive checks; no document overflow or client JavaScript errors. Comparison tables intentionally scroll within labeled focusable containers.
- Theme selection/persistence, device theme changes, Appearance Escape focus and outside dismissal, keyboard disclosures, text size/persistence, prose progress, catalog query/categories/reset/URL restoration tested in browser.
- Blocked localStorage: theme and text-size controls still update the current page.
- JavaScript disabled: chapters/catalog remain readable; nonfunctional enhanced controls hidden.
- Reduced-motion: smooth scrolling and decorative animation suppressed.
- Practice browser checks: reveal, save, refresh restoration, Clear→Keep; dark and light controls at phone widths. No emails or analysis messages sent.
- Homepage automated accessibility audit: zero confirmed violations; gradient/pseudo-element contrast manually assessed. Redundant header labeling flagged for manual review was removed.
- Text/control contrast calculations recorded in DESIGN.md. Dark muted text 6.76:1; light muted 4.87:1; silver action labels ≥5.06:1; interactive borders ≥3.35:1 on panels.
- Desktop/mobile screenshots inspected; first-visit Resume hidden state and stable disclosure columns checked after final refinement.

Browser checks used isolated Chromium sessions. Physical iOS/Android hardware was not used. CSS view transitions are progressive enhancement. `@astrojs/check` is not installed; Astro build and browser checks were run without changing dependencies.

## Collaboration

Luna: discovery and secondary pages. Terra: practice and analysis. Sol: tokens, shell, reader controls, long-form layouts. Root: shared design contract, catalog, integration fixes, browser verification, and deployment.

The Superdesign canvas contains an imported visual snapshot of the homepage; the live site is the functional implementation. Generated context and exports are ignored by Git; the design contract and canvas resume state are retained.
