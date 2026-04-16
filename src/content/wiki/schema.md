# Wiki Schema

> Conventions, categories, and structural rules for the UNNATURAL wiki.

## Source material

All source material lives in `/src/content/chapters/`. Every `.md` file there is an immutable input. The wiki (`/src/content/wiki/`) is entirely LLM-compiled output. Never modify the chapter files.

## Directory layout

```
wiki/
  schema.md          — this file
  index.md           — master catalog
  log.md             — append-only ingest/query/lint record
  acts/              — one overview page per act (plus prologue/epilogue)
  concepts/          — one page per named concept or term
  themes/            — cross-chapter thematic synthesis pages
  sources/           — one page per source chapter, citing the original
```

## Page categories

### `acts/`
One page per structural unit of the book. Current units:
- `prologue.md`
- `act-1-volo-ergo-sum.md`
- `act-2-initd.md`
- `act-3-mmm.md`
- `epilogue.md`

Act pages summarise the arc, list chapters, and explain how the act's argument develops.

### `concepts/`
One canonical page per named concept. A concept qualifies for its own page when:
- It has a coined or specialised name (e.g. "volo ergo sum", "thingification", "the MMM loop")
- It is used across multiple chapters
- It has enough distinct content to warrant more than a paragraph

Current concept pages:
- `volo-ergo-sum.md`
- `the-three-blades.md`
- `thingification.md`
- `the-mmm-loop.md`
- `foundational-dualities.md`
- `information-physical-duality.md`

### `themes/`
Cross-chapter synthesis on recurring ideas that are not single coined concepts. A theme page:
- Draws on at least three chapters
- Adds value by tracing how the idea evolves or is complicated across the book
- Is titled as a topic, not a chapter name

Current theme pages:
- `want-and-will.md`
- `objectivity.md`
- `cost-of-distinction.md`
- `growth-and-learning.md`
- `wisdom-traditions.md`

### `sources/`
One page per chapter file, recording what was ingested. Minimal — just enough to cross-reference.

## Page format

Every page follows this template:

```markdown
# [Name]

> [One-sentence summary — used verbatim in index.md]

## Overview
[2-4 paragraphs of synthesis]

## Key claims
- [Claim] — Source: [chapter file or /wiki/sources/x.md]

## Connections
- [[Page Name]] — [how they relate]

## Open questions
- [Unresolved or uncertain items]

---
*Last updated: [ISO date] | Sources: [count]*
```

## Cross-linking convention

Use `[[Page Name]]` syntax when referencing any concept, theme, or act that has its own wiki page. Use the exact page title as it appears in `index.md`.

## Naming conventions

- File names: lowercase, hyphen-separated, no special characters
- Concept names: use the book's own coined terms where they exist
- Do not create separate pages for concepts that are minor sub-points of a larger concept page

## Schema update policy

If a new source introduces a concept that fits no existing category, add a new entry to the relevant section of this schema before creating the page.
