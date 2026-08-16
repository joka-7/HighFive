# Level audit — is the content actually leveled right?

Answers one question: for every word, reading passage, listening clip,
speaking sentence, and grammar topic in the app, does its assigned CEFR level
(A1–C2) match its real difficulty? Findings below, ranked by how confident
and actionable each one is. **All five findings have been acted on** — see
the status line on each. The evidence and reasoning are kept as originally
written; only the status lines and the final numbers are new.

**Bottom line:** the overall six-level structure was real to begin with —
readability, sentence length, and vocabulary sophistication all rise in a
genuine, mostly-monotonic curve from A1 to C2, cross-checked three
independent ways (see Methodology). On top of that: 58 duplicated words are
gone, 15 C1-grade words moved out of the B2 bank, C1 and C2 each have one new
grammar topic where they previously had none, the "prepositions" quiz now
scales with level instead of staying static, and the reused passage titles
are unique. One finding (B2's reading register) got a genuine but partial
fix — see finding 1's status for the honest version of that.

## 1. B2 was calibrated like C1 — the main finding

**Status: vocabulary fixed completely; readings partially addressed.** All
15 named words below were moved from B2's bank to C1's (`diminish` and
`facilitate` simply had their B2 copies deleted — C1 already had its own).
Five new concrete, narrative B2 reading passages were added for range. See
the honest caveat at the end of this section on what the reading fix did and
didn't change.

Both B2's *vocabulary* and its *reading passages* sat closer to C1 than B2,
confirmed three independent ways:

**Vocabulary.** Scanning `docs/content/B2.md`'s word list directly: the
first ~20 words were genuinely B2 (`significant`, `approach`, `establish`,
`tendency`, `evident`, `framework`) — but the list quickly drifted into
words that are C1-grade academic/Latinate vocabulary by any standard
frequency reference (Oxford 3000/5000 doesn't include most of these at all):
`postulate`, `refute`, `stipulate`, `supersede`, `underpin`, `substantiate`,
`optimize`, `streamline`, `rigorous`, `rationale`, `premise`, `discourse`,
`catalyst`, `envisage`, `iterate`. **All 15 are now in C1's bank instead.**

**Reading passages.** B2's average Flesch-Kincaid grade (9.5) was *higher*
than C1's (10.0 — barely differentiated) and its passages clustered on
abstract, essayistic non-fiction ("Why We Procrastinate", "The Attention
Economy", "The Myth of Multitasking", "The Illusion of Busyness") that read
as a consistent house style across the *whole* B2 pool, not a few outliers —
comparing flagged and unflagged B2 items side by side found no real
difference in register. The style itself sat at the B2/C1 boundary, closer
to C1: it makes an abstract point *and* explicitly unpacks it in the same
short paragraph. Genuine C1 material (see `C1 R5`, "When Maps Mislead") does
the opposite — it leaves more to inference, which is *harder* despite often
scoring a lower FK grade (FK counts syllables and sentence length, not
implicit meaning, so it systematically undercounts C1/C2 difficulty and
overcounts an argument-dense B2 paragraph — a real limitation of the metric,
noted so the FK numbers below aren't over-trusted on their own).

**Cross-validation.** `diminish` and `facilitate` were issued as "new
vocabulary" at *both* B2 and C1 (see the duplicates list below) — the
clearest possible confirmation that the boundary was blurred, not just a
judgment call.

**What was actually done about the readings, honestly stated:** five new B2
passages were added — concrete, narrative, first-person stories (a café
inherited and revived, a neighbourhood blackout, a grandfather's repaired
watch, a career change at thirty, a marathon nearly abandoned) instead of
the abstract op-ed register that dominated the pool. Reading them side by
side with the existing B2 essays, they are a genuinely different *kind* of
text — concrete events instead of an argued thesis. **But their Flesch-Kincaid
scores didn't actually come out lower** (8.4–10.8, no different from the
essays) — the new passages still use long, clause-stacked sentences, so the
metric can't tell the two styles apart. This is the same limitation flagged
above, now demonstrated rather than just asserted: FK measures syllables and
sentence length, not whether a text is concrete or abstract. The passages
were judged on direct reading, per this audit's own stated methodology, and
kept as a real (if numerically invisible) improvement in range — not
polished further to chase a lower score at the risk of drifting from what
they were written to demonstrate.

## 2. 58 words issued as "new vocabulary" at two levels

**Status: fixed.** All 58 removed — `scripts/content-audit.mjs` now reports
zero cross-level duplicates.

Purely mechanical — no judgment involved. A word appearing in two levels'
banks wastes a "new word" slot at the second level (the learner already met
it) and, at the A1/A2 boundary especially, suggested the two banks were
built independently without checking against each other.

Concentration: **41 of the 58** were A1↔A2 (nearly 10% of A1's 412-word
bank reappeared in A2). The rest:

- **A2 ↔ B1** (12): `achieve`, `recommend`, `suggest`, `improve`, `realize`,
  `explain`, `complain`, `apologize`, `compare`, `notice`, `celebrate`,
  `decorate` — kept at A2 (common functional-communication verbs; A2's
  "can do" descriptors explicitly include apologizing, suggesting,
  complaining), removed from B1.
- **A1 ↔ B1** (1): `feed` — kept at A1, removed from B1.
- **B1 ↔ B2** (1): `consequence` — kept at B1, removed from B2.
- **B2 ↔ C1** (2): `diminish`, `facilitate` — same evidence as finding 1;
  kept at C1, removed from B2.
- **C1 ↔ C2** (1): `pragmatic` — kept at C1, removed from C2.

<details>
<summary>Full A1 ↔ A2 list (41 words, all removed from A2, kept at A1)</summary>

money, always, afraid, cheap, quiet, ticket, airport, holiday, restaurant,
station, beach, river, healthy, surprised, worried, free, full, heavy,
strong, together, angry, bored, excited, hungry, thirsty, sick, favourite,
lose, throw, carry, drop, funny, proud, cook, laugh, rest, share, hug,
delicious, sweet, book

</details>

## 3. C1 and C2 had no grammar topics of their own

**Status: partially filled.** One new grammar topic each: **Inversion**
(C1, `scripts/content/banks.mjs` → `INVERSION_ITEMS`, 8 items — negative
adverbial inversion: *Rarely have I seen…*, *Not only was he…*, *No sooner
had we…*) and **Third & Mixed Conditionals** (C2 → `CONDITIONAL_ITEMS`, 8
items). Both wired into `generate-content.mjs`'s `curriculum()` and
generating real lesson questions — verified directly in the generated
output, not just assumed from the code. This fills the gap, not exhausts
it: cleft sentences, reported speech with backshift, and the subjunctive
are still untouched, deliberately, to keep the two new item banks small
and each entry checked carefully rather than rushed at volume.

This wasn't a judgment call — it was what the curriculum generator's topic
list actually contained (`scripts/generate-content.mjs`, `curriculum()`).
Every level's daily-lesson grammar topic was picked from a `byLevel[level]`
array:

| Level | Grammar topics (before) |
|---|---|
| A1 | Present Simple, Articles a/an, Past Simple, Plurals, Present Continuous |
| A2 | Past Simple, Comparatives, Much/Many, Present Simple review, Prepositions |
| B1 | Present Perfect, Comparatives & Superlatives, **Modals**, Dependent Prepositions |
| B2 | Perfect Tenses, Dependent Prepositions, Modals (deduction), Academic Vocabulary |
| **C1** | **Advanced Lexis** (vocabulary), **Connectors & Register** (vocabulary) |
| **C2** | **Precision & Nuance** (vocabulary), **Idiomatic & Formal Lexis** (vocabulary) |

C1 and C2 got *only* vocabulary-themed lessons — no new grammar structure
was ever introduced at either level. Genuinely C1/C2-appropriate grammar
(advanced conditionals, inversion after negative adverbials, cleft
sentences, participle clauses, reported speech with backshift, the
subjunctive) existed *only* in the one-time, 6-question placement test
(`src/data/placement.ts`) — a learner saw "Rarely have I seen..." once,
during onboarding, and then never again. There was no `GEN[...]` generator
function for any of these structures in `generate-content.mjs` — a real
content gap, not a scheduling oversight. C1 now has **Inversion**; C2 now
has **Third & Mixed Conditionals**.

## 4. The "prepositions" topic never got harder

**Status: fixed.** `PREP_ITEMS` now carries an `lvl` field (0 for the 8
basic locative/time items, 2 for the 6 dependent-preposition collocations),
filtered in `generate-content.mjs` exactly like `VERBS`/`ADJECTIVES` already
were. The redundant duplicate "Prepositions" / "Dependent Prepositions"
entries in A2, B1, and B2's own `byLevel` arrays were removed — the single
`base`-level entry now covers every level correctly on its own, and its
title/explanation switches automatically at B1 (`levelIdx >= 2`) to describe
dependent prepositions instead of basic ones.

`PREP_ITEMS` (`scripts/content/banks.mjs`) was a single 14-item pool mixing
basic locative prepositions ("The keys are ___ the table" → *on*) with
dependent-preposition collocations ("She's interested ___ art" → *in*), used
**unfiltered, identically, at every level from A1 to C2** — the one item
bank in `banks.mjs` with no `.filter(x => x.lvl <= levelIdx)` applied. A C2
learner's "Prepositions" quiz could ask "The keys are ___ the table,"
identical to an A1 learner's, all year. `MODAL_ITEMS` (6 items) has the same
un-leveled shape at the two levels that use it (B1, B2) but was left as-is —
smaller-consequence, since it only starts at B1 and the six modals
(should/could/mustn't/might/can/must) are genuinely comparable difficulty at
both levels, unlike the basic/dependent preposition split.

Compounding this: A2, B1, and B2 each *also* carried their own
explicitly-named "Prepositions" / "Dependent Prepositions" topic in
`byLevel`, on top of the one every level got from `base` — so at those three
levels the *same* 14-item pool was quietly double-booked under two topic
titles, reading as lesson variety without being any.

## 5. Reused passage titles

**Status: fixed.** All 12 renamed to distinct titles — `scripts/content-audit.mjs`'s
duplicate-title check (adapted to also scan titles, not just words) now
reports none.

Not text duplicates — verified before touching anything, the passages under
each shared title were genuinely different pieces of writing — so this was
always low priority. Renamed anyway since "do all" was the instruction and
the fix was cheap: `The Myth of the Lone Genius` (B2/C1), `The Tyranny of
Metrics` (twice within C1, again at C2), and five more repeating within one
level (`My School Bag`, `My New Shoes`, `Learning to Swim`, `Learning to
Cook`, `The Repair Café`, `The Quiet Carriage`, `The Value of Boredom`, `The
Myth of Multitasking`, `The Aesthetics of Imperfection`) each kept their
first occurrence and had the later one(s) renamed, text untouched.

## What checked out fine (unchanged, no action needed)

- **A1, A2, B1, C1, and C2** vocabulary and reading pools each read as
  internally coherent and appropriately differentiated from their immediate
  neighbors — the B2 issue above was the exception, not the pattern.
- Readability, sentence length, and vocabulary sophistication (word length,
  syllable count) rise in a genuine, close-to-monotonic curve across every
  content type — see the table below.
- `VERBS` and `ADJECTIVES` (the two grammar tables that *are* level-filtered)
  progress sensibly: A1 gets `go/eat/see/make` (high-frequency irregulars),
  C1 gets `undertake/forgo` (rare, low-frequency) — no mismatches found.
- Grammar-question answer keys are correct by construction (built from
  verified conjugation tables, not generated freeform), so this audit didn't
  need to check individual question correctness, only level placement — the
  same holds for the two new banks (`INVERSION_ITEMS`, `CONDITIONAL_ITEMS`),
  hand-checked line by line since nothing built them for me.

## Readability by level, before → after

Flesch-Kincaid Grade Level: roughly, A1≈0–2, A2≈2–4, B1≈4–6, B2≈6–8,
C1≈8–11, C2≈11+ — a rough guide only; see finding 1 for why it undercounts
implicit/idiomatic difficulty at the higher levels, and why it didn't move
much for B2 despite a real register change.

| Level | Reading avg FK | Listening avg FK | Vocabulary avg word length | Vocabulary count |
|---|---|---|---|---|
| A1 | 1.5 | 1.0 | 4.99 | 412 (unchanged) |
| A2 | 3.8 | 3.9 | 5.80 | 278 (was 319, −41 duplicates) |
| B1 | 6.0 | 4.5 | 7.36 | 313 (was 326, −13 duplicates) |
| B2 | 9.5 → 9.5* | 8.6 | 7.95 → 7.89 | 245 (was 263, −18: 1 duplicate, 2 to C1, 15 to C1) |
| C1 | 10.0 | 9.1 | 8.27 → 8.28 | 260 (was 245, +15 from B2) |
| C2 | 11.8 | 11.4 | 8.57 | 236 (was 237, −1 duplicate) |

\* B2's reading FK is unchanged by design — see finding 1's honest caveat.
The vocabulary word-length column barely moved either, for the same
underlying reason: the 15 relocated words weren't outliers in *length*
(`premise`, `discourse` are short), only in *rarity/register*, which word
length can't measure. The words are still correctly relocated; the proxy
metric just isn't sensitive to the thing that made them wrong.

## Methodology

Three layers, cheapest first:

1. **Mechanical, zero-judgment checks** — cross-level word duplicates
   (exact string match), duplicate passage titles. These are facts, not
   opinions.
2. **Objective proxies at full corpus scale** — Flesch-Kincaid grade level,
   sentence length, word length and syllable count, computed for every word
   and passage/sentence in the corpus (not a sample). This is what made it
   possible to audit a corpus this size without reading all of it blind;
   outliers and level-wide patterns from this layer directed the manual
   review in step 3.
3. **Manual review** — full word lists per level read directly (not a
   sample), plus close reading of specific passages the metrics flagged as
   outliers, plus side-by-side comparison of flagged vs. unflagged B2 items
   specifically to check whether "outlier" meant "isolated exception" or
   "the whole pool's actual style" (it's the latter). Grammar tables and the
   curriculum generator's topic list were read in full — both are small
   enough that no sampling was needed.

**Limitations, stated plainly:** Flesch-Kincaid measures syllable density
and sentence length, not implicit meaning, idiom, or register — it
systematically *undercounts* C1/C2 difficulty (finding 1) and *can't
distinguish* a concrete narrative from an abstract essay written with
similarly long sentences (finding 1's reading-fix caveat). Where metrics and
direct reading disagreed, direct reading won and is what's reported above;
the metrics' job was pointing at what to read, not delivering a verdict on
their own. Speaking-sentence content wasn't separately deep-reviewed beyond
the length/word-length table — its progression looked sound and nothing in
the metrics flagged it, and no speaking-sentence fixes were made.

Reproduce this analysis with `node scripts/content-audit.mjs` (add `--words`
to dump full per-level word lists). Not wired into `npm run` — it's a
one-off analysis tool, not part of the regular content pipeline. The fixes
themselves were applied via a one-off script, `scripts/fix-word-levels.mjs`
(the 58 duplicates + the 15 B2→C1 relocations) — safe to delete once you've
read this; re-running it would fail loudly since the words it looks for are
no longer where it expects them.
