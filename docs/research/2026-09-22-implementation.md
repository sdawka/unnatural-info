# 2026-09-22 implementation record

This record maps the 50 recommendations in 2026-09-21-book-content-audit.md to the repository after the September 2026 revision. It records source changes, not claims about reader response.

The revision follows the user's intent: make the book interesting through ordinary situations before their philosophical payoff is fully visible; hold Learning, Creating, and Becoming lightly as overlapping modes; and preserve continuity without forcing every life problem into one framework.

**Status terms:** **Implemented** means a concrete counterpart exists in source. **Partial** means substantial work exists but an explicit part remains. **Pending** means no valid evidence of completion exists.

No real human reader testing has been conducted. A simulated editorial review by an agent is not evidence about human comprehension. Integrated technical checks are recorded below.

## General recommendations

| ID | Status | Implementation and evidence |
|---:|---|---|
| 1 | Implemented | The homepage states the human benefit and audience; the prologue demonstrates the observation/story distinction. See src/pages/index.astro, src/lib/book.ts, and the prologue. |
| 2 | Implemented | The unanswered dinner invitation opens the prologue and homepage. The cosmological preface is explicitly optional. |
| 3 | Implemented | Reading and practice are ordinary visible links rather than delayed animation gates. See the homepage and Explore. |
| 4 | Implemented | Acts use “What moves us,” “How we make sense of things,” and “How we learn, create, and change,” with house terms secondary. See src/lib/book.ts and chapter actTitle fields. |
| 5 | Implemented | Explore counts 24 numbered chapters from content. The book, wiki, Reading page, and analysis agent use the three overlapping modes. |
| 6 | Partial | UI helpers distinguish Outline, Working draft, and Revised chapter and calculate prose time separately from practice time. Current chapters remain working drafts; no chapter is presented as a finished sample. |
| 7 | Implemented | The prologue separates observation, interpretation, open questions, research, and revision, replacing “unscientific empirical.” |
| 8 | Partial | Chapters now use scenes, explanation, challenge, practice, and continuity in varied forms. Selected sources appear in prose or furtherReading; placement is not uniform in every chapter. |
| 9 | Implemented | Explore explains act order, offers a sequential start and three alternate entrances, and includes resume behavior. |
| 10 | Pending | No real human comprehension sessions have been conducted or recorded. Agent simulation does not satisfy this item. |

## Content and intellectual context

| ID | Status | Implementation and evidence |
|---:|---|---|
| 11 | Implemented | Wanting, liking, obligation, fear, and endorsement are separated in Chapters 1, 3, and 7 and /practice/wants; Berridge and Frankfurt are bounded sources. |
| 12 | Implemented | Chapters 3, 16, 18, and 23 allow care, maintenance, pleasure, rest, loss, and meaning without expansion; Susan Wolf supplies a challenge. |
| 13 | Implemented | Fricker appears in Chapters 4 and 24 and the objectivity wiki; Chapter 11 asks who can report a category's failure. |
| 14 | Implemented | Chapters 5–6 present maps as selective tools and include action-guiding perception as a live alternative; Gibson and embodied approaches appear in Reading/wiki material. |
| 15 | Implemented | Chapters 8–11 follow labels, forms, targets, and consequences; /practice/labels asks what a category enables, excludes, and requires as evidence. |
| 16 | Implemented | Chapters 9, 19, and 20 and /practice/garden examine access, maintenance, voice, monitoring, revision, and tradeoffs. Ostrom is contextual, not a universal formula. |
| 17 | Implemented | Chapters 13–18 distinguish correcting action from questioning its goal, cite Argyris and related traditions, and present MMM as synthesis rather than proof by resemblance. |
| 18 | Implemented | Chapter 14 includes retrieval practice and limits; Roediger and Karpicke also appear on Reading. |
| 19 | Implemented | Chapters 15 and 23 and /practice/one-week use cue-linked plans with stopping rules and review; Gollwitzer and Sheeran are described without guarantees. |
| 20 | Implemented | Chapters 16 and 22 describe Epictetus and Buddhist mindfulness in differing terms before limited MMM comparison; Hadot frames philosophy as practice. |

## Argument repairs

| ID | Status | Implementation and evidence |
|---:|---|---|
| 21 | Implemented | Chapters 1, 2, and 7 define will as functional orientation, separate feeling and endorsement, narrow Damasio, and treat blades as lenses rather than a proven sequence. |
| 22 | Implemented | Chapters 4, 9, and 10 distinguish the world's existence from shared accounts, robust objects from categories, and coordinated practice from truth. |
| 23 | Implemented | Chapters 5 and 11 replace universal fractality, chaos, and infinite-information claims with detail exceeding an observer's usable attention. |
| 24 | Implemented | Chapter 8 distinguishes complement, contrary, and gradient; Pirsig's unity is attributed rather than derived. |
| 25 | Implemented | Chapters 6, 9, 10, and 12 separate representation, truth, material carrier, and institutional maintenance; wiki and agent language match. |
| 26 | Implemented | Chapter 12 separates Gödel claims and conditions, rejects general self-model extrapolation, and treats Mesopotamian tokens as one history. |
| 27 | Implemented | Chapter 14 distinguishes observation, prediction, intervention, causal assumptions, and control; /practice/experiment demonstrates confounding. |
| 28 | Implemented | Chapters 13–17 present Learning, Creating, and Becoming as overlapping situational modes without developmental rank. |
| 29 | Implemented | Chapters 18 and 21 and the wiki treat biological, evolutionary, institutional, and AI parallels as comparisons with different mechanisms. |
| 30 | Implemented | Chapters 3, 18, and 23 remove therapy comparisons and universal suffering claims, acknowledge external causes, and point clinical or dangerous cases toward care or protection. |
| 31 | Implemented | Chapter 23 distinguishes discretionary choices from inability to meet essentials and recognizes money, work conditions, collective action, and changing jobs. |
| 32 | Implemented | Chapters 20 and 24 and the epilogue name care, consent, preventable harm, fairness, participation, and future choice independently of adaptive success. |
| 33 | Implemented | src/content/wiki/concepts/denial-of-death.md presents Becker as influential and TMT as contested, citing the 2025 systematic review. |
| 34 | Implemented | Chapters 18–21 and the epilogue allow deterioration, forgetting, lost access, maintenance, limits, and unfinished outcomes. |

## Practicality and continuity

| ID | Status | Implementation and evidence |
|---:|---|---|
| 35 | Implemented | The invitation and dinner recur from the homepage through wants, maps, labels, recipe tests, coordination, invisible work, and cleanup. Work, disability, illness, poverty, grief, institutions, and evolution provide contrasts. |
| 36 | Implemented | The prologue now works the invitation through observation, first account, alternative, underlying want, bounded action, imagined result, and a revised claim. It also shows what remains possible if no reply comes. Chapter 23 develops a further case. |
| 37 | Implemented | Chapters 17 and 23, /practice/modes, and the agent distinguish understanding, trying, receiving, repair, changing conditions, help, rest, and loss. |
| 38 | Implemented | Care, maintenance, rest, enough, enjoyment, and companionship appear across Chapters 3, 15–18, 23, the prologue, and the modes practice. |
| 39 | Implemented | Chapters 8, 12, 18, and 21 compress taxonomies and comparisons and state what each detour can and cannot change. |
| 40 | Implemented | Chapters and practices use ordinary prompts with limits: separate observation from story, make one bounded change, stop, and return. |

## Interactive work

| ID | Status | Implementation and evidence |
|---:|---|---|
| 41 | Implemented | /practice/notebook stores observation, story, unknowns, confidence, later revision, and unresolved questions; chapter/framing metadata supplies links. |
| 42 | Implemented | /practice/wants separates urge, enjoyment, obligation, fear, and value; items may remain blank and reorder without claiming an authentic desire. |
| 43 | Implemented | /practice/disagreement begins ambiguously, requests two accounts, reveals context, and ends with a sincere question while allowing disagreement. |
| 44 | Implemented | /practice/maps compares routes by time, money, and steps, reveals accessibility, exposes assumptions, and produces a “useful for / hides” reflection. |
| 45 | Implemented | /practice/labels applies several labels to one event, asks for evidence, requests an observation, and examines a form category. |
| 46 | Partial | /practice/garden makes access, maintenance, voice, weather, labor, exclusion, assumptions, and tradeoffs inspectable. It models one season rather than a richer sequence of delayed costs. |
| 47 | Implemented | /practice/experiment asks for prediction, comparison, noisy results, rival explanation, revised conclusion, and a personal low-stakes test. |
| 48 | Implemented | /practice/modes offers Learning, Creating, Becoming, rest, and help, then asks whether the goal should change and what would justify switching. |
| 49 | Implemented | /practice/attention compares a cup's use with qualities and associations, permits no change or skipping, and asks what it cannot prove. |
| 50 | Implemented | /practice/one-week records a change, cue, expectation, limit, revisit date, result, alternative, and disagreement; local saving and download are user-controlled. |

## Shared implementation surfaces

- Narrative and arguments: src/content/chapters/
- Canon and source alignment: src/content/wiki/
- Homepage and route: src/pages/index.astro, src/pages/explore.astro, src/pages/about.astro, src/lib/book.ts
- Reading and sources: src/pages/reading.astro
- Practices: src/lib/practices.ts, src/components/PracticeWorkbench.tsx, src/pages/practice/
- Navigation and metadata: TableOfContents.astro, ChapterNav.astro, ResumeReading.astro
- Analysis assistant: workers/unnatural-agent/src/prompts.ts and agent.ts

## Work still requiring evidence or expansion

1. Conduct the human comprehension checks in recommendation 10 and record them as exploratory feedback.
2. Decide whether one chapter should become a Revised chapter and finished sample for recommendation 6.
3. Sources and chapter structure remain deliberately varied; a later editorial pass can standardize them if readers find that useful.
4. Extend the garden across rounds if delayed costs materially improve understanding. The present exercise explicitly models one invented season.

## Integrated verification — completed September 23

- `npm run build`: passed; 71 static pages, including 10 exercises and their index.
- `npm test`: 5 tests passed, covering saved reflections, malformed data, route tradeoffs and accessibility, garden costs, and practice/chapter associations.
- Scoped TypeScript check of the new book helpers, practice registry, and React workbench: passed. Worker `npx tsc --noEmit`: passed. This was not a full Astro type check.
- Generated HTML check: 71 pages and 1,232 links inspected; no missing internal page, anchor, or ARIA reference found in that build.
- Chromium browser checks: all 10 exercises hydrate and save; note text and confidence survive reload; Markdown download contains the note; cancel/confirm clearing work; changing recipe comparison hides old results; route priorities and accessibility produce different recommendations; wants reorder; garden outcomes and mode feedback respond.
- Mobile checks at 390 × 844: homepage, contents, selected chapters, reading list, and all exercises fit the viewport. Desktop homepage visually inspected.
- All 10 paper versions work with JavaScript disabled; disclosures open and the homepage links into the book. Disabled workbench controls are hidden in this mode.
- Blocked local storage: writing remains available and a save failure is explained without discarding the note.
- Chapter resume and the keyboard skip link work. No JavaScript page errors occurred during the exercise checks.
- The development server initially failed to hydrate React because dependencies resolved both Vite 7 and 8. A root `vite: ^7` override now resolves Vite 7.3.2 consistently with Astro 6. Development hydration and the subsequent production build pass.
- `git diff --check`: passed. No deployment performed.

The automated browser checks ran in isolated local browser contexts. They did not submit private writing to the analysis service or contact readers. These checks establish basic functionality, not educational effectiveness, broad browser support, or a full accessibility audit.

## Human reader check prepared for recommendation 10

Invite five people who do not already know the framework. Ask them to explore without an explanation from the author. Avoid giving them the desired interpretation beforehand.

1. After 30 seconds on the homepage: “What do you think this is? What would you expect to get from reading it? Where would you go first?” Record their words.
2. Let them read the prologue: “Which moment made you curious? Where did you lose the thread? Explain one idea using a different situation.”
3. Let them choose one practice: watch where they hesitate, what they expect the controls to do, and whether they can return to reading.
4. Afterward: “What would count against the chapter's claim? Did the exercise change a question, judgment, or action—or nothing?” Do not reward agreement.
5. If they choose to return a week later, ask for a concrete remembered example and what they kept, changed, or rejected. Treat the sample as exploratory feedback, not a validated progress measure.

Prioritize repeated misunderstandings and observed navigation problems over a numerical satisfaction score. Record revisions against the passages or controls that caused them.
