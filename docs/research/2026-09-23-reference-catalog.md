# Restored references and annotated reading catalog

## Scope

The Reading page now combines the original chapter bibliography, current chapter references, and every existing wider reading suggestion. Each entry has topic tags and a short explanation of its connection to the book.

Chapter bodies, titles, ordering, acts, and routes are unchanged by this update. The shorter reading lists at chapter endings remain available. Every chapter also links directly to its complete restored bibliography in the catalog.

## Inventory and preservation

The inventory comes from two repository snapshots:

- `c195c03`: 187 original chapter citation occurrences across 27 chapter files.
- `26a1fd0`: 70 current chapter citation occurrences and the existing Reading page.
- The Reading page contained 25 first-shelf entries, 238 wider suggestion lines, and six starting-point recommendations: 269 source lines in total.

`src/data/reference-provenance.json` retains all 526 source records, including verbatim chapter notes and the original text and grouping of wider suggestions. `sourceIds` in `src/data/references.json` connect each catalog entry to those records. A compound suggestion may connect to several entries; several repeated suggestions may connect to one entry.

The final catalog contains:

| Inventory | Count |
| --- | ---: |
| Distinct entries | 366 |
| Entries connected to original or current chapter references | 187 |
| Entries connected to wider suggestions | 256 |
| Entries shared by both groups | 77 |
| Named works | 293 |
| Author, topic, collection, and other reading leads | 73 |

The equality between 187 original citation occurrences and 187 distinct works in the combined chapter catalog is coincidental. The preservation check operates on each source record and its chapter association, not just the total.

## Editorial choices

- Annotations for chapter sources explain their place in the outline’s development. Wider suggestions describe possible connections or directions for further reading, rather than inventing a history of the author having read or adopted them.
- Named works remain distinct from topic and author suggestions. Author names and individual titles in compound suggestions are retained.
- Repeated works are combined across shelves, acts, and chapter lists. The original emphasis on Part III of Spinoza’s *Ethics* and Books VIII–IX of Aristotle’s *Nicomachean Ethics* remains explicit in their notes and provenance.
- The three agents worked in parallel on inventory annotation and source mapping. Parent review replaced generic annotations, corrected accidental title splitting, and reconciled duplicate titles. Further agent reviews checked source matches, category coverage, and semantic accuracy.
- Final review combined the redundant Taylor and Wheeler leads and attached the Rosen “anticipatory systems” suggestion to *Anticipatory Systems*.

## Browsing

Nine categories cover mind, meaning, knowledge, language, society, information, nature, learning, and contemplative traditions. Selecting several categories matches any of them. Search, chapter, and reading-list filters narrow those results together.

Search covers author, title, annotation, and category labels, with case and diacritic normalization. Filters are reflected in shareable URL parameters. Individual references have stable fragment links, and chapter associations link back to the manuscript.

The entire catalog is rendered as HTML. Filtering adds a small client script; without JavaScript, every annotation and chapter link remains readable, with a browser-Find hint. No personal reading state is stored.

## Bibliographic checks

Targeted checks resolved inconsistent titles or authors during the merge:

- [MIT Press: Active Inference](https://mitpress.mit.edu/9780262045353/active-inference/) — Parr, Pezzulo, and Friston.
- [MIT Press: Parts and Places](https://mitpress.mit.edu/9780262517072/parts-and-places/) — Casati and Varzi.
- [Springer: Modelling Nature](https://link.springer.com/book/10.1007/978-3-030-45153-0) — Frigg and Nguyen; title spelling.
- [Oxford University Press: The Four-Category Ontology](https://academic.oup.com/book/3774) — Lowe.
- [Springer: The Essence of Manifestation](https://link.springer.com/book/10.1007/978-94-010-2391-7) — Henry.

## Verification

- `npm test`: 17 passing tests, including preservation of every original/current citation and wider suggestion, valid chapter associations, combined filters, accent handling, and URL round trips.
- `npm run build`: 73 static pages generated.
- Strict TypeScript check of `src/lib/references.ts` passes.
- Browser checks cover restored-source search, combined category/source filters, reloadable URLs, empty results and reset, chapter links, individual reference links, back navigation, invalid filter values, desktop and 320/390px layouts, and the JavaScript-disabled fallback.
