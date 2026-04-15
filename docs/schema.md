# Wiki Schema

This document defines the structure, categories, and conventions for this knowledge base.
The wiki-compiler agent reads this first on every operation.

## Project context

This is a personal "theory of everything" wiki. The purpose, scope, and core thesis
will be filled in as content is ingested. The schema should evolve to reflect
the actual concepts that emerge from the source material.

## Categories

*To be defined as content arrives. Each category becomes a subdirectory in `/docs/`.*

| Category | Directory | Description |
|----------|-----------|-------------|
| Sources | `/docs/sources/` | One summary page per ingested dump file |
| Index | `/docs/index.md` | Master catalog of all wiki pages |
| Log | `/docs/log.md` | Append-only operation history |

## Naming conventions

- File names: `kebab-case.md`
- Page titles: Title Case
- Cross-links: `[[Exact Page Title]]` syntax
- Dates: ISO 8601 (`2026-04-15`)

## Schema update log

- `2026-04-15` — Initial schema created. Categories TBD pending first ingest.
