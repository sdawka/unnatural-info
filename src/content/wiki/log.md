# Wiki Log

Append-only chronological record of all ingest, query, and lint operations.

---

## 2026-04-17T00:00:00Z INGEST: chapter insertions + renumbering (editorial)

Chapters inserted:
- 12-knowledge-or-the-shape-of-the-information-realm.md — new Act 3 opener; names what MMM operates on; math-as-counting (first blade outward), plurality of disciplines with good/bad historical cases (germ theory, Royal Society, suffrage; Lysenko, phrenology/Nazi race science, Galileo, tobacco science), Gödel's theorem stated plainly with full anti-abuse hygiene, self-referential-book motif
- 17-applied-knowledge.md — new; info realm folds back into physical territory; institutions as frozen MMM; irreversibility on human timescales; no outside position
- 18-how-we-change-the-world.md — new; civilisational-scale MMM ethics; five cases (germ theory, printing press, nuclear weapons, Green Revolution, internet); better/worse world-changing criteria (legibility, corrigibility, participation, humility about timescale)

Chapters modified (source, not renumbered):
- 06-the-second-blade.md — extended by ~450 words absorbing the strange loop; DNA-as-self-describing-map as cleanest biological case; Hofstadter (GEB, I Am a Strange Loop) added to furtherReading; subtitle extended; themes gained "strange loop" and "self-reference"; climax: the map becomes rich enough to sketch the mapmaker, the system looks at itself looking out

Chapter files renumbered (order, chapterNumber, filename):
- 12-measure.md → 13-measure.md (Ch. 12 → Ch. 13)
- 13-model.md → 14-model.md (Ch. 13 → Ch. 14)
- 14-manifest.md → 15-manifest.md (Ch. 14 → Ch. 15)
- 15-mmm-as-lived-experience.md → 16-mmm-as-lived-experience.md (Ch. 15 → Ch. 16)
- 16-mmm-across-life-itself.md → 19-mmm-across-life-itself.md (Ch. 16 → Ch. 19)
- 17-what-the-mystics-were-tracking.md → 20-what-the-mystics-were-tracking.md (Ch. 17 → Ch. 20)
- 18-how-to-live-better.md → 21-how-to-live-better.md (Ch. 18 → Ch. 21)
- 19-the-most-objective-we-can-be.md → 22-the-most-objective-we-can-be.md (Ch. 19 → Ch. 22)

Earlier in the same session (editorial sweep across all chapters):
- Em dashes in prose bodies, summaries, and furtherReading notes removed across all 22 chapters and both prologue/epilogue; one em dash kept in epilogue as deliberate Shakespeare echo in the closing line
- prologue.md — paragraph 2 gained "subset of the universe turning around to know itself" framing
- 02-will-creates-difference.md — positive re-framing added: difference is what tells us what to change
- 04-from-subjectivity-to-objectivity.md — objectivity-taken-for-granted; heavily-aligned / shared subjectivity; capital-T Truth as asymptote; minds-pumping-to-each-other sentence; italics for emphasis
- 05-the-first-blade.md — "selectively deaf and dumb" expanded to all senses (blind, deaf, numb, nose-blind, taste-blind, mute; interoception, proprioception, subtler senses)
- 08-the-foundational-dualities.md — Pirsig/Quality added as the prior unity from which dualities are cut; "anything noticed must be noticed in at least two opposites" principle; "calling something a thing is the first blade pointed outward" linking forward to Ch. 9
- epilogue.md — "at least three blades"; closing line reworked to "The choice is to be or not to be..."

Wiki pages updated:
- sources/chapters.md — 8 renumbered rows + 3 new chapter rows; every source-path citation updated
- index.md — "all 21 chapter files" → "all 22 chapter files"; Objectivity summary Ch. 19 → Ch. 22
- acts/prologue.md, acts/act-1-volo-ergo-sum.md, acts/act-3-mmm.md — act overviews and connections updated
- concepts/the-mmm-loop.md — section headings and source paths remapped
- concepts/information-physical-duality.md, concepts/layered-realism.md, concepts/volo-ergo-sum.md — Ch. references updated
- themes/objectivity.md, themes/wisdom-traditions.md, themes/growth-and-learning.md, themes/intellectual-lineage.md, themes/cost-of-distinction.md, themes/want-and-will.md — all stale Act 3 chapter references updated

Other:
- src/pages/index.astro — "Twenty-one chapters across three acts" → "Twenty-two chapters across three acts"

Structural framings added:
- The strange loop is folded into the Second Blade (Ch. 6), not a separate chapter; DNA is the biological instance
- Knowledge chapter (Ch. 12) opens Act 3 as a prologue to MMM, because MMM is three operations on knowledge (Measure = discovery, Model = organisation, Manifest = application)
- Applied knowledge (Ch. 17) and world-changing ethics (Ch. 18) split the civilisational Manifest into mechanics and evaluation

Build verification: astro sync passes (content schema valid); astro build completes with 56 pages rendered.

---

## 2026-04-16T16:00:00Z INGEST: three-act framing sharpened (editorial)

Chapters edited (source):
- 01-before-thought-there-is-want.md — subtitle "Thought, feelings, want — climbing down the stack"; Act 1 now explicitly three floors (thought → feelings → want), with Damasio's somatic-marker work as the case for feelings as substrate and bacterial chemotaxis as the minimum definition of want below feelings
- 05-the-first-blade.md — opens with fractal + chaotic framing; finite beings *cannot* meet reality whole; information content of any finite region effectively infinite; distinction as how a living thing boots up in that excess
- 11-the-cost-of-the-blade.md — reinforces that the cost of the blade is structural, not avoidable; infinite detail on the other side of any cut by construction
- 15-mmm-as-lived-experience.md — MMM named as "the most meta process we can observe"; Dupoux, LeCun, and Malik (2026) A/B/M architecture added as structural convergence / independent corroboration
- 16-mmm-across-life-itself.md — also names "the most meta process"; AI research rediscovering the same shape

Pages updated:
- acts/act-1-volo-ergo-sum.md — overview rewritten with the three-floor stack; three new key claims on thought/feelings/want layering
- acts/act-2-initd.md — overview rewritten around "cannot" + fractal + chaotic; two new key claims on fractal/chaotic infinity and finitude; one new key claim on structural cost in Ch. 11
- acts/act-3-mmm.md — overview rewritten around "most meta process we can observe"; Dupoux/LeCun/Malik A/B/M added to intellectual inheritance; two new key claims on meta status and independent convergence
- concepts/volo-ergo-sum.md — overview expanded with explicit three-floor stack and Damasio as substrate case; three new key claims on layering
- concepts/the-three-blades.md — overview prepended with fractal/chaotic motivation; new key claim on inexhaustibility as the reason for cutting
- concepts/the-mmm-loop.md — new overview paragraph on structural convergence with Dupoux/LeCun/Malik's A/B/M as independent corroboration; two new key claims
- themes/want-and-will.md — new section "The three-floor stack: thought, feelings, want"; three new key claims
- themes/cost-of-distinction.md — new overview paragraph on fractal/chaotic infinity as the reason the cost is structural; one new key claim
- themes/intellectual-lineage.md — Dupoux/LeCun/Malik (2026) added to Act 3 foundations cluster; one new key claim on structural convergence
- index.md — all three act one-line summaries aligned with new framings

Key framings added:
- Act 1 is a three-floor stack (thought → feelings → want), not just "want is the floor"
- Act 2 is "cannot" not "do not" — the reason is fractal + chaotic infinity
- Act 3 is "the most meta process we can observe"; Dupoux/LeCun/Malik 2026 A/B/M as structural echo of MMM
- Connective tissue reinforced: Act 1's want = why a finite agent cares; Act 2's fractal world = why it must cut; Act 3's MMM = how it grows inside those cuts

---

## 2026-04-16T14:00:00Z UPDATE: MMM chapter framing sharpened (editorial)

Pages updated:
- concepts/the-mmm-loop.md — chapter titles updated to Measure and Map / Model and Manipulate / Manifest and Make; each step rewritten to emphasise the ontological→relational→generative arc; Map/Manipulate/Make vocabulary introduced alongside Measure/Model/Manifest; scale table header updated; three new key claims added distinguishing measuring from modelling, manipulation as causal discovery, and making as genuine creation
- acts/act-3-mmm.md — overview rewritten with new arc framing; chapter table rows 12–14 updated with new titles and sharper core-move descriptions; two new key claims added
- sources/chapters.md — chapter title entries for 12–14 updated to reflect new titles

Key framings added:
- Measuring ≠ modelling: the map is a census before any causal account
- Manipulate phase as the mechanism of causal discovery (not just hypothesis-holding)
- Make as genuine creation from discovered components and relationships, distinct from action or wager

---

## 2026-04-16T12:00:00Z INGEST: Becker — The Denial of Death (editorial addition)

Pages created:
- concepts/denial-of-death.md — Becker's death-awareness thesis; immortality project; Terror Management Theory (Greenberg, Solomon, Pyszczynski); the UNNATURAL title as the name for this condition

Pages updated:
- concepts/volo-ergo-sum.md — new section "Death-awareness and the human volo"; death-awareness as the threshold distinguishing human wanting from animal wanting; UNNATURAL title explained; [[The Denial of Death (Becker)]] added to Connections
- themes/want-and-will.md — new section "Why human will is not reducible to animal drive (Becker)"; immortality project as the MMM loop under existential pressure; [[The Denial of Death (Becker)]] added to Connections
- themes/meaning-coherence-purpose-significance.md — new section "The immortality project as meaning-making strategy"; significance dimension as existentially load-bearing under mortality; [[The Denial of Death (Becker)]] added to Connections
- themes/wisdom-traditions.md — new section "Wisdom traditions as metabolised death anxiety"; Buddhist impermanence, Stoic memento mori, Christian ars moriendi, Sufi death-imagery as examples; [[The Denial of Death (Becker)]] added to Connections
- index.md — denial-of-death.md added to Concepts table; total page count updated to 21

Key concepts added:
- Death-awareness as the rupture in instinct-to-action continuity
- The immortality project (causa sui project) as universal mortality-management mechanism
- Terror Management Theory (TMT) — experimental successor to Becker
- UNNATURAL as the name for the condition Becker describes

---

## 2026-04-16T00:01:00Z INGEST: /dump/overall.md

Pages updated:
- concepts/volo-ergo-sum.md — Damasio four-book lineage, homeostasis/interoception/allostasis as substrate, SDT; added connections to Intellectual Lineage and Meaning pages
- concepts/thingification.md — layered realism taxonomy, psychological essentialism, fungibility/rival-nonrival; added connection to Layered Realism
- concepts/the-mmm-loop.md — Marr's levels, active inference, Ashby's law of requisite variety, Lorenz/chaos, Becker, Williamson, cybernetics; new open question on active inference vs. MMM
- themes/want-and-will.md — homeostasis as biological substrate section, love as shared homeostasis, social baseline theory, SDT on regulatory capture; new connections
- themes/wisdom-traditions.md — Stoic control principle, Buddhist upādāna/tanha, Gita's autonomous action, Daoist ten thousand things / wu wei
- themes/cost-of-distinction.md — Goodhart's Law section: measurement-as-target as universal failure mode

Pages created:
- concepts/layered-realism.md — five-layer ontological taxonomy (concrete, artifact, social, abstract, subjective); Marr's levels as parallel framework
- themes/intellectual-lineage.md — full map of thinkers and research programs per act: Damasio, enactivism, SDT, social baseline theory, meaning research, Hofstadter, core knowledge, Marr, active inference, Ashby, Lorenz, Becker, Williamson
- themes/meaning-coherence-purpose-significance.md — three-dimensional meaning research; convergence with Act 1 account of wanting
- sources/overall.md — source record for /dump/overall.md

Key concepts added:
- Homeostasis / interoception / allostasis as substrate of wanting
- Layered realism (five-layer ontological taxonomy)
- Psychological essentialism (cognitive stickiness of thingification)
- Fungibility and rival/nonrival as ontological blades
- Goodhart's Law (measure-as-target failure mode)
- Marr's three levels of analysis
- Active inference (Friston) — unified perception/action loop
- Ashby's law of requisite variety
- Chaos theory / Lorenz (intrinsic limits on prediction)
- Self-determination theory (autonomy, competence, relatedness)
- Social baseline theory (love as shared homeostasis)
- Meaning dimensions: coherence, purpose, significance
- Named wisdom tradition specifics: Stoic, Buddhist, Gita, Daoist

---

## 2026-04-16T00:00:00Z INGEST: all chapter files (initial compile)

Source files ingested:
- prologue.md
- 01-before-thought-there-is-want.md
- 02-will-creates-difference.md
- 03-love-growth-and-meaning.md
- 04-from-subjectivity-to-objectivity.md
- 05-the-first-blade.md
- 06-the-second-blade.md
- 07-the-third-blade.md
- 08-the-foundational-dualities.md
- 09-thingification.md
- 10-the-information-physical-duality.md
- 11-the-cost-of-the-blade.md
- 12-measure.md
- 13-model.md
- 14-manifest.md
- 15-mmm-as-lived-experience.md
- 16-mmm-across-life-itself.md
- 17-what-the-mystics-were-tracking.md
- 18-how-to-live-better.md
- 19-the-most-objective-we-can-be.md
- epilogue.md

Pages created:
- schema.md
- index.md
- log.md
- acts/prologue.md
- acts/act-1-volo-ergo-sum.md
- acts/act-2-initd.md
- acts/act-3-mmm.md
- acts/epilogue.md
- concepts/volo-ergo-sum.md
- concepts/the-three-blades.md
- concepts/thingification.md
- concepts/the-mmm-loop.md
- concepts/foundational-dualities.md
- concepts/information-physical-duality.md
- themes/want-and-will.md
- themes/objectivity.md
- themes/cost-of-distinction.md
- themes/growth-and-learning.md
- themes/wisdom-traditions.md
- sources/prologue.md (and all chapter sources)

Key concepts added:
- Volo Ergo Sum (want as the floor of life)
- The Three Blades (self/world, map/territory, good/bad)
- init.d (distinction as bootstrap process)
- Thingification (continuous world made discrete)
- Information/Physical Duality
- Foundational Dualities (layered taxonomy)
- MMM Loop (Measure, Model, Manifest)
- Cost of the Blade (the shadow of every cut)
- Unscientific empirical method
- Intersubjectivity
- Love/Growth/Meaning as unified triad
