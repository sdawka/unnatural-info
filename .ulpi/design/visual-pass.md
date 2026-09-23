# Site visual pass
Every screen must read as the same product if placed side by side.

## Primary journeys
Home → choose recognition or start → chapter → practice → save reflection → return to reading. Explore → chapter/act. Reading → search/filter → reference → chapter. Existing destinations, copy, source data, and exercise mechanics are preserved.

## Shared shell (Sol)
Build tokens/global.css, BaseLayout, header/footer, chapter/wiki layouts, prose, reading progress/nav, reader controls. Dark default metallic identity; optional Light/Dark/System select in a compact header Appearance disclosure (native details, 48px summary); theme localStorage guarded, apply before paint, no-JS dark reading intact. Mobile header intentionally two rows if needed, never clipped/shrunk. Add chapter font-size choices Regular/Larger/Largest, persist locally and guard storage exceptions. Controls only visible once functional. Reader progress measures prose region. Use progressive CSS cross-document transitions; no navigation interception/router conversion.

## Discovery pages (Luna)
Home, explore, acts, TableOfContents, ResumeReading, book.css. Homepage editorial asymmetric cover with clear primary action; keep approved headline and six existing recognition entries. Use six compact ruled native disclosures with subtle reflective header and open-state treatment. No fake content or statistics. Display actual 3-act structure using connected ruled rows; distinct from recognitions. Phone primary actions deliberately stacked, no dead space. Explore paths and contents clear, summaries 48px focusable; optional Expand/Collapse all only after JS. Act numeral scaled for mobile, readable underlying chapter list. Progressive motion (ordinary content visible without JS).

## Practice and analysis (Terra)
PracticeWorkbench, practice.css, practice pages, AnalysisAgent, analyze page. Preserve storage keys and algorithms; improve grouped native inputs, textarea sizes, range thumb/value labels, results feedback. Practice result animation can be keyed to change but calm. Saved vs unsaved meaningful feedback, no data loss. Destructive actions separate from Save/Download. Keyboard-scrollable tables with accessible labels and visible hint when needed. Analysis multiline textarea, proper label and submit state; keep network/auth contract and do not touch worker files. Refactor presentation only as needed.

## Catalog and secondary pages (root after design handoff)
Reading filters share system; responsive compact grid with native category chips, clear results line/reset, title-first cards; all366 entries and filters preserved. Wiki index/about/404 use same system without content changes. Check complete main-route experience.

## State contract
- Links/content render server-side. Navigation and native disclosures work without JS.
- Appearance/reader settings: default accessible, selected state visible, persistence only after successful storage; remain usable if storage blocked.
- Inputs: hover/focus/disabled/invalid legible; loading buttons retain width. No inputs <16px.
- Catalog: search/filter updates live count and URL, empty state reset, back/refresh intact; all data SSR.
- Practice: valid edit/save/restore/download/clear flows, storage failure feedback unchanged; avoid misleading 'saved' state.
- Analysis: loading/disconnected/error/auth visible and operable; no live messages sent by QA.
- No motion with reduced-motion; no essential information encoded only in color.

## Engineering handoff
Sol, Luna, Terra: implement exactly this spec, theme native primitives with locked tokens, preserve data/behavior. No new dependency unless unavoidable. Root integrates and reviews. Ownership is file-disjoint. Acceptance: 320/390/768/1440 widths; dark/light; keyboard; reduced-motion; no-JS reading; no horizontal page overflow; tests/build; inspect rendered screenshots and interactions. Pre-flight decisions: existing fonts/content deliberate brand exceptions; reflection budget limited to interaction surfaces; layout families cover hero/ruled lists/reading column. Verify numerical contrast and actual rendered states before final signoff.

## Refinement follow-up
Luna owns home/explore composition, Terra practice discovery and catalog spacing, Sol chapter settings/contents/progress, root shared motion and integration. Use a compact reading-settings disclosure with current selection, Escape/outside dismissal, and actual rendered heading anchors. Derive practice act associations from chapter frontmatter. Narrow phones retain native full-width search and paired selects. Replace broad straight sweeps with curved action-control reflections; fine-pointer movement stays inside the control and stops for reduced motion. Keep the same palette, fonts, manuscript, reference data, and note storage. The page transition has a 440ms curved reveal and an anchored header, without brightness flashes.
