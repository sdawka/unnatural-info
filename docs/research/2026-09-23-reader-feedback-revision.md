# Reader feedback revision — 23 September 2026

## Direction

The reader feedback identified two failures in the first implementation: an opening too dependent on interpersonal drama, and exercises that could belong to almost any reflective self-help site. The requested voice combines ordinary honesty, dry humor, and philosophical curiosity. The latest instruction makes recognition itself the entry: ask visitors which statements they relate to, under an abstract opening about life failing to make sense.

## What changed

- The homepage opens with “Life doesn’t always make sense. Even when it should.” Three independently expandable statements lead to wanting (chapter 1), meaning in maintenance (chapter 3), and thinking within embodied life (chapter 13).
- The book's original question returns to the foreground: natural creatures make representations, which return to change their material world. The title, prologue, About page, and early chapters now explain this connection.
- The first example is an ordinary reach for a phone, cup, or snack. It asks readers to separate pull, feeling, explanation, enjoyment, and endorsement without claiming introspection proves a causal sequence.
- Exercises now state a particular distinction, its chapter connection, and an activity. Writing is optional. The ten existing URLs remain available; two exercises were added.
- Chapter references, reading paths, related exercises, and corresponding wiki summaries were updated together. Luna, Terra, and Sol contributed bounded editorial and implementation passes; the root agent reconciled the results.

## Exercise continuity

| Exercise | Chapters | What the reader does |
| --- | --- | --- |
| Before the explanation arrives | 1, 7; prologue | Inspect an ordinary reach; distinguish wanting, feeling, explanation, enjoyment, and choice. |
| One window, two worlds | 2, 4 | Give compatible reasons for opposed wants; separate shared observations from an arrangement people can accept. |
| Where do you end? | 5, 8 | Inspect a boundary through breath, water, and a held cup; distinguish an edge from independence. |
| What the cup has actually told you | 4, 6, 24; epilogue | Separate a noticed detail from its possible history; propose a discriminating check. |
| The shortest way is not always a way | 6, 11 | Predict an omitted fact, revise a route choice, and add an overlooked detail to a personal map. |
| The cup changes jobs | 8, 9, 11 | Hold an object fixed while changing its category; inspect the actions each description invites. |
| A few marks move your hand | 10, 19 | Follow drawing instructions; change their presentation and then their meaning; trace the physical chain. |
| Who gets a key to the garden? | 9, 19, 20 | Change one rule, compare costs and access, and inspect the invented model's assumptions. |
| The bread rose. What did you learn? | 12, 14 | Choose a comparison, predict results, and distinguish a measured difference from a causal explanation. |
| One sheet, three kinds of doing | 13, 17, 18 | Use paper to test an explanation, make an intended object, and follow an unplanned development. |
| A cup with nothing to prove | 16, 22 | Shift from use to open attention without requiring an insight or improvement. |
| Make room for one ordinary thing | 3, 15, 23; epilogue | Map constraints, change a small physical space, inspect the result, and return to it. |

## Existing reader notes

Revised prompts use a separate v2 storage key. A v1 note is shown read-only under its original title and question labels, with its own download. Its answers never populate changed questions automatically. Saving or clearing the new note leaves the earlier note untouched. New notes store their title and labels with their answers so exports preserve that context.

## Verification

- Production build: 73 pages.
- Unit tests: 12 passed. Generated HTML audit: 1,167 internal links, 72 fragment links, and 62 ARIA references; no missing targets or duplicate IDs. The audit also found and repaired 27 old archive links that still pointed to Markdown filenames.
- Targeted TypeScript check of the practice registry, shared models, persistence helpers, and React workbench: passed.
- Browser check: all 12 exercises hydrate, save, and fit a 390px viewport; desktop and mobile opening inspected visually.
- All revised interactive controls exercised, including prediction/reveal reset, drawing instructions, and three paper passes.
- Seeded earlier note retained its original questions and download; revised notes saved, restored, downloaded, and cleared independently.
- All 12 paper fallbacks and the homepage's expandable choices worked with JavaScript disabled.
- No browser runtime errors in the exercised paths.

These checks establish implementation behavior. They do not establish that an exercise produces lasting personal change; reader testing is still needed for that question.
