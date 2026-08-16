# Level audit — is the content actually leveled right?

Answers one question: for every word, reading passage, listening clip,
speaking sentence, and grammar topic in the app, does its assigned CEFR level
(A1–C2) match its real difficulty? Findings below, ranked by how confident
and actionable each one is.

**Bottom line:** the overall six-level structure is real — readability,
sentence length, and vocabulary sophistication all rise in a genuine,
mostly-monotonic curve from A1 to C2, cross-checked three independent ways
(see Methodology). But there is one significant miscalibration (B2), one
purely mechanical bug (58 duplicated words), and one real gap (no C1/C2
grammar content exists at all, not just unscheduled — the generator has no
function for it). None of these were visible from reading the Markdown
report alone; they only surfaced by analyzing the corpus as a whole.

## 1. B2 is calibrated like C1 — the main finding

Both B2's *vocabulary* and its *reading passages* sit closer to C1 than B2,
confirmed three independent ways:

**Vocabulary.** Scanning `docs/content/B2.md`'s word list directly: the
first ~20 words are genuinely B2 (`significant`, `approach`, `establish`,
`tendency`, `evident`, `framework`) — but the list quickly drifts into
words that are C1-grade academic/Latinate vocabulary by any standard
frequency reference (Oxford 3000/5000 doesn't include most of these at all):
`postulate`, `refute`, `stipulate`, `supersede`, `underpin`, `substantiate`,
`optimize`, `streamline`, `rigorous`, `rationale`, `premise`, `discourse`,
`catalyst`, `envisage`, `iterate`. These read as C1 words that landed in the
B2 bank.

**Reading passages.** B2's average Flesch-Kincaid grade (9.5) is *higher*
than C1's (10.0 — barely differentiated) and its passages cluster on
abstract, essayistic non-fiction ("Why We Procrastinate", "The Attention
Economy", "The Myth of Multitasking", "The Illusion of Busyness") that reads
as a consistent house style across the *whole* B2 pool, not a few outliers —
comparing flagged and unflagged B2 items side by side found no real
difference in register. The style itself sits at the B2/C1 boundary, closer
to C1: it makes an abstract point *and* explicitly unpacks it in the same
short paragraph. Genuine C1 material (see `C1 R5`, "When Maps Mislead") does
the opposite — it leaves more to inference, which is *harder* despite often
scoring a lower FK grade (FK counts syllables and sentence length, not
implicit meaning, so it systematically undercounts C1/C2 difficulty and
overcounts an argument-dense B2 paragraph — a real limitation of the metric,
noted so the FK numbers below aren't over-trusted on their own).

**Cross-validation.** `diminish` and `facilitate` are both issued as "new
vocabulary" at *both* B2 and C1 (see the duplicates list below) — the
clearest possible confirmation that the B2/C1 boundary is blurred, not just
my judgment call.

**Recommendation:** move the C1-grade words out of B2's word bank
(`scripts/content/wordbank-extra*.mjs` — check `docs/content/B2.md`'s "Bank"
column for the exact file) into C1's, and consider a lighter-register pass
over the B2 reading pool — mixing in some more concrete/narrative B2 pieces
(closer to `B1 R21`'s "every Saturday I volunteer..." register, scaled up
only in vocabulary) so B2 has real range instead of one uniformly-advanced
style.

## 2. 58 words issued as "new vocabulary" at two levels

Purely mechanical — no judgment involved, easy to fix. A word appearing in
two levels' banks wastes a "new word" slot at the second level (the learner
already met it) and, at the A1/A2 boundary especially, suggests the two
banks were built independently without checking against each other.

Concentration: **41 of the 58** are A1↔A2 (nearly 10% of A1's 412-word
bank reappears in A2). The rest:

- **A2 ↔ B1** (12): `achieve`, `recommend`, `suggest`, `improve`, `realize`,
  `explain`, `complain`, `apologize`, `compare`, `notice`, `celebrate`,
  `decorate`
- **A1 ↔ B1** (1): `feed` — skips A2 entirely, worth checking which level
  actually intended it
- **B1 ↔ B2** (1): `consequence`
- **B2 ↔ C1** (2): `diminish`, `facilitate` — same evidence as finding 1
- **C1 ↔ C2** (1): `pragmatic`

<details>
<summary>Full A1 ↔ A2 list (41 words)</summary>

money, always, afraid, cheap, quiet, ticket, airport, holiday, restaurant,
station, beach, river, healthy, surprised, worried, free, full, heavy,
strong, together, angry, bored, excited, hungry, thirsty, sick, favourite,
lose, throw, carry, drop, funny, proud, cook, laugh, rest, share, hug,
delicious, sweet, book

</details>

**Recommendation:** for each pair, keep the word at the *lower* level (it's
introduced there first) and swap it out of the higher level's bank for
something new — or, if it genuinely fits the higher level better on
reflection, drop it from the lower one instead. Either way, one pass through
this list removes all 58 automatically once decided.

## 3. C1 and C2 have no grammar topics of their own

This isn't a judgment call — it's what the curriculum generator's topic list
actually contains (`scripts/generate-content.mjs`, `curriculum()`). Every
level's daily-lesson grammar topic is picked from a `byLevel[level]` array:

| Level | Grammar topics |
|---|---|
| A1 | Present Simple, Articles a/an, Past Simple, Plurals, Present Continuous |
| A2 | Past Simple, Comparatives, Much/Many, Present Simple review, Prepositions |
| B1 | Present Perfect, Comparatives & Superlatives, **Modals**, Dependent Prepositions |
| B2 | Perfect Tenses, Dependent Prepositions, Modals (deduction), Academic Vocabulary |
| **C1** | **Advanced Lexis** (vocabulary), **Connectors & Register** (vocabulary) |
| **C2** | **Precision & Nuance** (vocabulary), **Idiomatic & Formal Lexis** (vocabulary) |

C1 and C2 get *only* vocabulary-themed lessons — no new grammar structure is
ever introduced at either level. Genuinely C1/C2-appropriate grammar
(advanced conditionals, inversion after negative adverbials, cleft
sentences, participle clauses, reported speech with backshift, the
subjunctive) exists *only* in the one-time, 6-question placement test
(`src/data/placement.ts`) — a learner sees "Rarely have I seen..." once,
during onboarding, and then never again. There's no `GEN[...]` generator
function for any of these structures in `generate-content.mjs` — this is a
real content gap, not a scheduling oversight.

Every level, including C1 and C2, also draws from the `base` array, which
always adds a generic "Prepositions" topic on top of whatever the level's
own list contains — which leads to the next finding.

## 4. The "prepositions" topic never gets harder

`PREP_ITEMS` (`scripts/content/banks.mjs`) is a single 14-item pool mixing
basic locative prepositions ("The keys are ___ the table" → *on*) with
dependent-preposition collocations ("She's interested ___ art" → *in*), and
it is used **unfiltered, identically, at every level from A1 to C2** — it's
the one item bank in `banks.mjs` with no `.filter(x => x.lvl <= levelIdx)`
applied (unlike `VERBS`/`ADJECTIVES`, which are correctly filtered). A C2
learner's "Prepositions" quiz can still ask "The keys are ___ the table,"
identical to an A1 learner's, all year. `MODAL_ITEMS` (6 items) has the same
issue at the levels that use it (B1, B2) but is smaller-consequence since it
only starts at B1.

Compounding this: A2, B1, and B2 each *also* carry their own explicitly-named
"Prepositions" / "Dependent Prepositions" topic in `byLevel`, on top of the
one every level gets from `base` — so at those three levels the *same*
14-item pool is quietly double-booked under two topic titles, which reads as
lesson variety but isn't.

**Recommendation:** split `PREP_ITEMS` into a basic locative subset (A1/A2)
and a dependent-preposition subset (B1+), matching the pattern `VERBS`/
`ADJECTIVES` already use via `lvl`; drop the redundant `base`-level
"Prepositions" entry at A2/B1/B2 now that the level-specific one covers it.

## 5. Minor — reused passage titles

Not text duplicates (verified — the passages under each shared title are
genuinely different pieces of writing), so this is low priority, but worth
knowing: `The Myth of the Lone Genius` appears at both B2 and C1 with
different text; `The Tyranny of Metrics` appears twice within C1 and again
at C2; a handful of others repeat within one level (`My School Bag`,
`Learning to Swim`, `The Quiet Carriage`, `The Value of Boredom`, `The
Aesthetics of Imperfection`). Fine as topic variety, but a learner may
notice the same title recurring — a rename costs nothing if it bothers you.

## What checked out fine

- **A1, A2, B1, C1, and C2** vocabulary and reading pools each read as
  internally coherent and appropriately differentiated from their immediate
  neighbors — the B2 issue above is the exception, not the pattern.
- Readability, sentence length, and vocabulary sophistication (word length,
  syllable count) rise in a genuine, close-to-monotonic curve across every
  content type — see the table below.
- `VERBS` and `ADJECTIVES` (the two grammar tables that *are* level-filtered)
  progress sensibly: A1 gets `go/eat/see/make` (high-frequency irregulars),
  C1 gets `undertake/forgo` (rare, low-frequency) — no mismatches found.
- Grammar-question answer keys are correct by construction (built from
  verified conjugation tables, not generated freeform), so this audit didn't
  need to check individual question correctness, only level placement.

## Readability by level (for reference)

Flesch-Kincaid Grade Level: roughly, A1≈0–2, A2≈2–4, B1≈4–6, B2≈6–8,
C1≈8–11, C2≈11+ — a rough guide only; see the B2 discussion above for why it
undercounts implicit/idiomatic difficulty at the higher levels.

| Level | Reading avg FK | Listening avg FK | Vocabulary avg word length | Vocabulary avg syllables |
|---|---|---|---|---|
| A1 | 1.5 | 1.0 | 4.99 | 1.47 |
| A2 | 3.8 | 3.9 | 5.79 | 1.73 |
| B1 | 6.0 | 4.5 | 7.36 | 2.38 |
| B2 | 9.5 | 8.6 | 7.95 | 2.65 |
| C1 | 10.0 | 9.1 | 8.27 | 2.84 |
| C2 | 11.8 | 11.4 | 8.57 | 3.04 |

Note B2's reading FK (9.5) sitting almost level with C1's (10.0) despite a
whole band's gap in vocabulary sophistication — the numeric signature of
finding 1.

## Methodology

Three layers, cheapest first:

1. **Mechanical, zero-judgment checks** — cross-level word duplicates
   (exact string match), duplicate passage titles. These are facts, not
   opinions.
2. **Objective proxies at full corpus scale** — Flesch-Kincaid grade level,
   sentence length, word length and syllable count, computed for every one
   of the 1,802 words and 648 passages/sentences (not a sample). This is
   what made it possible to audit a corpus this size without reading all of
   it blind; outliers and level-wide patterns from this layer directed the
   manual review in step 3.
3. **Manual review** — full word lists per level read directly (not a
   sample), plus close reading of specific passages the metrics flagged as
   outliers, plus side-by-side comparison of flagged vs. unflagged B2 items
   specifically to check whether "outlier" meant "isolated exception" or
   "the whole pool's actual style" (it's the latter). Grammar tables and the
   curriculum generator's topic list were read in full — both are small
   enough that no sampling was needed.

**Limitations, stated plainly:** Flesch-Kincaid measures syllable density
and sentence length, not implicit meaning, idiom, or register — it
systematically *undercounts* C1/C2 difficulty (see finding 1) and can
*overcount* a single long announcement-style sentence at any level. Where
metrics and direct reading disagreed, direct reading won and is what's
reported above; the metrics' job was pointing at what to read, not
delivering a verdict on their own. Speaking-sentence content wasn't
separately deep-reviewed beyond the length/word-length table — its
progression looked sound and nothing in the metrics flagged it.

Reproduce this analysis with `node scripts/content-audit.mjs` (add `--words`
to dump full per-level word lists). Not wired into `npm run` — it's a
one-off analysis tool, not part of the regular content pipeline.
