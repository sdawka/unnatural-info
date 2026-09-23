# Liquid mirror refinement

## Changes

- Tightened the homepage opening and gave the desktop cover an explicit two-column composition. The six recognition disclosures retain their content, order, and independent columns.
- Added a direct route from Explore's introduction to the full contents.
- Replaced inconsistent straight sweeps with one curved reflection treatment for controls. On fine pointers the reflection responds within the hovered control; touch and keyboard use CSS states. No idle animation loop or added dependency.
- Reduced transition glare: a short curved page reveal with a visually anchored site header. Reflections remain behind labels, and the conservative worst-case dark secondary-label contrast is 5.13:1.
- Fixed responsive token specificity: the default dark selector no longer overrides later viewport rules for header height, gutters, and type sizes. This also corrects chapter anchor clearance on phones.
- Condensed reading settings into a native disclosure with current size, Escape/focus handling, and outside dismissal. Added an optional section index using the actual rendered headings. Reading progress remeasures after layout, font, and text-size changes.
- Added native practice filtering by act, using chapter frontmatter to derive membership and displayed ranges. Filter URLs support refresh, back, and reset. All twelve exercises remain visible without JavaScript.
- Compacted the reference introduction and mobile filter layout. The catalog still contains all 366 annotated entries and supports its existing search, category, chapter, and reading-list filters.

## Verification

- `npm test`: 17 passing, including catalog preservation and practice storage/model checks.
- `npm run build`: 73 static pages.
- After the responsive-token fix, 18 routes × 4 viewports (320, 390, 768, 1440px) passed without document overflow, undersized text inputs, or client errors. Map comparison tables intentionally scroll inside their labeled containers.
- Chapter settings/panels, Escape focus, outside dismissal, size persistence, no-JavaScript section links, and progress after reflow passed. Mobile heading targets clear the sticky header; genuine dark/light appearances checked at 480 and 768px as well.
- Home and Explore reviewed at 320, 390, and 1440px, including first-visit resume visibility, stable disclosure columns, and contents jump.
- Practice counts: Act I 4, Act II 7, Act III 7; overlapping membership is intentional. Verified against chapter metadata, with URL reload/back/reset and no-JavaScript coverage.
- Catalog mobile filters checked at 320px; search/category/chapter/source state and all 366 entries retained.
- Reflection pointer placement/reset, keyboard focus, reduced-motion suppression, forced-color suppression, and light preference persistence checked in an isolated browser context.

Luna handled discovery pages; Terra handled practice/catalog browsing; Sol handled chapter reading. Root integrated the shared effects, corrected the token cascade, reviewed screenshots, and coordinated verification and deployment. The manuscript, chapter order, reference records, exercise models, and stored-note format are unchanged.

Browser verification uses Chromium emulation rather than physical mobile devices. Page transitions are progressive enhancement; ordinary links remain functional in other browsers. The existing Superdesign draft is refreshed from the rendered homepage and remains a visual snapshot of the functional site.
