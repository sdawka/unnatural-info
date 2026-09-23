# Continuity and practice QA review

Date: 2026-09-22  
Scope: read-only audit of the current practice registry and workbench, practice routes, shared book metadata consumers, and the 27 chapter/framing files. This is an editorial and code review, not reader research.

**Integration note, September 23:** The findings below describe an intermediate version. The parent integration fixed Maps/Experiment prediction placement, added optional pause prompts before reveals, supplied and browser-tested paper fallbacks, made time/cost recommendations differ, and verified automatic chapter practice links. Clear confirmation, confidence wording, return headings, and download attachment were also repaired. Predictions remain optional so readers can think without writing. See the implementation record for final checks.

## Highest-priority findings

### 1. Prediction fields appear after the reveal controls

**Priority: P1 — practice logic**

The Maps and Experiment prompts explicitly ask for a prediction before a reveal, but their React widgets appear before the regular fields. A reader can reveal the omitted steps or taste results without making a prediction.

- In [PracticeWorkbench.tsx](/Users/sdawka/Code/unnatural-info/src/components/PracticeWorkbench.tsx:172), MapWidget is rendered before the normal pre-reveal fields; its reveal button is at line 43 while Maps’ prediction field is in [practices.ts](/Users/sdawka/Code/unnatural-info/src/lib/practices.ts:53).
- The same ordering occurs for Experiment: its reveal button is at [line 86](/Users/sdawka/Code/unnatural-info/src/components/PracticeWorkbench.tsx:86), while the prediction field is declared at [practices.ts line 84](/Users/sdawka/Code/unnatural-info/src/lib/practices.ts:84).
- Disagreement also permits the missing-context reveal before the reader records their first account.

**Suggested repair:** render the relevant pre-reveal field inside each widget before the reveal button, or disable reveal until it contains non-whitespace text. Keep skipping possible by offering “Reveal without writing” explicitly rather than accidentally.

### 2. No-JavaScript fallback cannot perform the central model exercises

**Priority: P1 — access**

The no-JS content lists generic field labels only at [practice/[slug].astro line 21](/Users/sdawka/Code/unnatural-info/src/pages/practice/[slug].astro:21). It omits the route table and step disclosure, garden options/outcomes/assumptions, experiment comparison and ratings, and the disagreement reveal.

The page says readers can use the prompts on paper, but Maps, Garden, Experiment, and Disagreement do not provide enough static material to do so.

**Suggested repair:** add a per-practice static fallback description to the registry, or render scenario data and tables server-side beneath the workbench. It need not simulate interaction; it must include choices, the revealed information, and assumptions.

### 3. The Maps priority control has no initial tradeoff

**Priority: P1 — pedagogy/UX**

Time and cost both select Footbridge with the supplied data:

- Footbridge is 12 minutes and $0.
- Park path is 26 minutes and $0.
- Bus is 18 minutes and $3.

The pure-function check confirms both route priorities return Footbridge. The selector appears responsive but produces the same recommendation until the user reveals steps. See [route data](/Users/sdawka/Code/unnatural-info/src/lib/practices.ts:133) and [recommendation](/Users/sdawka/Code/unnatural-info/src/lib/practices.ts:139).

**Suggested repair:** give the fastest route a small cost, or add a third priority such as quietness. The initial choice should illuminate a real tradeoff before the accessibility omission is revealed.

### 4. Registry-to-prose practice links are incomplete

**Priority: P1 if a direct chapter route is required; P2 if ChapterLayout reliably renders an automatic related-practice card**

The registry assigns the following practice/chapter pairs, but current prose does not link to all of them:

| Practice | Registry chapters | Direct chapter links now | Missing direct chapter links |
|---|---:|---:|---:|
| Notebook | 4, 6, 24 | 4, 6; prologue | 24 |
| Wants | 1, 2, 3, 7 | 1, 3, 7 | 2 |
| Disagreement | 2, 4, 24 | 2, 4 | 24 |
| Maps | 5, 6, 11 | 5, 11 | 6 |
| Labels | 8, 9, 10, 11 | 8, 11 | 9, 10 |
| Garden | 9, 19, 20 | 9 | 19, 20 |
| Experiment | 12, 14, 24 | 12 | 14, 24 |
| Modes | 13–18 | none | 13–18 |
| Attention | 16, 22 | none | 16, 22 |
| One-week | 15, 23 | none | 15, 23 |

The registry correctly associates all ten practices with intended chapters. If the pending ChapterLayout shows every applicable practice visibly and accessibly, this is less urgent; confirm it does so. Otherwise these are broken authorial routes from the revision brief.

## Important implementation findings

### “When you return” is only a heading, not a state

Notebook and One-week fields marked after are rendered immediately in [PracticeWorkbench.tsx line 188](/Users/sdawka/Code/unnatural-info/src/components/PracticeWorkbench.tsx:188). That is not inherently wrong, but the headings suggest delayed access while the site has no revisit state or reminder.

**Suggested repair:** rename the section “For later, if you return” and add a concise save/download cue there. Do not manufacture a timer or reminder.

### Clear confirmation needs dialog semantics or a simpler inline form

The clear confirmation is an ordinary div after the controls at [lines 191–192](/Users/sdawka/Code/unnatural-info/src/components/PracticeWorkbench.tsx:191). Focus remains on the Clear button, and the confirmation has no explicit relationship to it.

**Suggested repair:** use an inline fieldset with a visible question and an aria description, or implement a proper dialog with focus management. The inline option is likely sufficient.

### Download is likely functional, but hardened browser behavior would be better

The detached anchor click at [line 153](/Users/sdawka/Code/unnatural-info/src/components/PracticeWorkbench.tsx:153) works in modern Chromium, but temporarily appending the anchor to document body, clicking, removing, and revoking the object URL is more robust across browsers. The download correctly excludes empty answers and labels widget fields.

### Range input is visually unset but semantically starts at 50

For blank confidence answers, the range value is forced to 50 while its output says “Not set” at [lines 25–27](/Users/sdawka/Code/unnatural-info/src/components/PracticeWorkbench.tsx:25). This is workable, but keyboard interaction begins at 50 and immediately makes the answer 45 or 55.

**Suggested repair:** say that 50 is only the slider’s starting position, or initialize the saved value to 50 so display and control state agree.

### Privacy and persistence behavior is otherwise sound

The page states that notes remain local unless saved or downloaded, catches unavailable storage, validates saved JSON by version/type/length, uses a versioned per-slug key, and warns that browser profiles are shared. No server submission path was found.

## Accessibility and semantic strengths

- Inputs have visible labels; text hints are associated with textareas.
- Dynamic result areas use polite live regions.
- The garden table uses caption, header, and scope semantics.
- Workbench controls use real buttons and selects.
- The workbench has a no-JS statement and does not force a submission.

Potential small improvement: use IDs on Choice controls and explicit htmlFor labels, matching FieldInput. Nested selects inside labels are valid, so this is consistency rather than a defect.

## Cross-act prose continuity

The current manuscript is coherent at chapter endings:

- Prologue → Act I moves from dinner silence into wanting.
- Ch. 4 → Ch. 5 moves from accountable shared knowledge into finite cuts.
- Chs. 5–12 progress clearly: boundary → picture → value → duality → category → carrier/pattern → cost → correctable knowledge.
- Ch. 12 → Ch. 13 introduces three overlapping modes rather than the retired single loop.
- Chs. 13–18 reject a maturity ladder and preserve rest, help, grief, and material conditions as real alternatives.
- Chs. 19–24 scale from artifacts and institutions to ethics, living systems, traditions, practical life, and accountable objectivity without claiming the framework explains everything.
- The epilogue returns the book to functional lenses and disagreement.

No broken internal practice target was found: every referenced slug is in the ten-practice registry.

## Terminology and source checks

- Current prose frames bacterial orientation as an external functional description rather than evidence of feeling or consciousness.
- Ch. 5 no longer relies on literal fractal or chaotic infinity.
- Ch. 6 qualifies the DNA analogy; Ch. 10 distinguishes information’s causal role from the truth of its content.
- Ch. 12 scopes Gödel to appropriately strong formal systems and rejects popular overgeneralizations.
- Current prose uses Learning, Creating, and Becoming as overlapping modes. No chapter prose presents the retired single Measure–Model–Manifest sequence as canonical.

## Validation performed

- Read all current chapter, preface, prologue, and epilogue endings and searched for retired terminology and prior overclaims.
- Parsed and bundled practices.ts with Node 26 and esbuild.
- Exercised route recommendation and saved-answer parsing as pure functions.
- Enumerated every direct chapter practice link and compared it against the registry.
- Did not run a site build, mutate application code, or inspect parent-owned ChapterLayout or BaseLayout during their integration.
