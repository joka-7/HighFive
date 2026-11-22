# Content audit

What learners get at each CEFR level, checked against open reference word
lists. Everything between the markers below is written by
`npm run content:audit` (`scripts/audit-content.mjs`); edit the prose outside
them, never the numbers.

CI (`.github/workflows/docs.yml`) runs `npm run content:audit -- --check`. It
fails when this report no longer matches the content, so every content change
shows its effect here in the pull request. It also fails when a rule under
"Rules CI enforces" breaks. The other sections are information to act on, not
gates.

**How to fix content:** edit the source in `scripts/content/` (word banks in
`banks.mjs` and `wordbank-extra*.mjs`, passages in `passages*.mjs`), then run
`npm run content`, `npm run content:audit` and `npm test`, and commit the
source, the regenerated `src/data/offline/` files and this report together.
The CEFR lists are a guide, not a verdict: a word one level off is normal, and
a word in neither list may simply be British spelling or a phrase.

**Will the app show a new passage?** The audit does not say. The app only shows a
hand-written reading or listening when few of its words fall outside the level's
word cards (`CURATED_TOLERANCE` in `src/services/content.ts`; names and past-tense
forms count). After `npm run content`, run `node scripts/check-curated.mjs A1
--from <first new index>`; it exits 1 and lists the unknown words of every item the
app would skip. Track topics in `docs/CONTENT-TOPICS.md`.

<!-- BEGIN GENERATED: npm run content:audit -->
## Summary

A year is 365 days: 1,825 word slots (five a day) and 1,825 quiz questions per level.

| Level | Unique words | Each word shown | Grammar topics | Unique quiz questions | Unique daily readings | Readings shown / written | Listenings shown / written | Speaking sentences shown / written |
|---|---|---|---|---|---|---|---|---|
| A1 | 779 | 2.3× | 7 | 736 | 365 / 365 | 136 / 136 | 136 / 136 | 40 / 42 |
| A2 | 991 | 1.8× | 7 | 981 | 365 / 365 | 36 / 36 | 36 / 36 | 40 / 42 |
| B1 | 420 | 4.3× | 6 | 427 | 365 / 365 | 37 / 37 | 36 / 36 | 40 / 42 |
| B2 | 264 | 6.9× | 7 | 268 | 264 / 365 | 31 / 31 | 30 / 30 | 40 / 42 |
| C1 | 258 | 7.1× | 11 | 257 | 258 / 365 | 30 / 30 | 30 / 30 | 40 / 42 |
| C2 | 237 | 7.7× | 4 | 225 | 237 / 365 | 30 / 30 | 30 / 30 | 40 / 42 |

Hand-written items are only shown once they have a Hebrew translation (`textHe` / `transcriptHe`, `questionHe` on every question; speaking sentences in full rounds of four).

## Words against the CEFR lists

Reference: CEFR-J 1.5 (A1–B2) and Octanove C1/C2 1.0 (`scripts/content/cefr/`), with the app's reviewed exceptions in `scripts/content/level-overrides.mjs`. One level off is within the lists' own uncertainty.

| Level | Same level | One level off | 2+ harder | 2+ easier | In neither list |
|---|---|---|---|---|---|
| A1 | 712 | 45 | 0 | 0 | 22 |
| A2 | 744 | 227 | 0 | 0 | 20 |
| B1 | 181 | 190 | 0 | 21 | 28 |
| B2 | 103 | 83 | 0 | 8 | 70 |
| C1 | 34 | 80 | 0 | 8 | 136 |
| C2 | 27 | 9 | 0 | 1 | 200 |

### A1

- **Two or more levels harder:** none
- **Two or more levels easier:** none
- **In neither list:** goodbye, wake up, snowman, lace, blow out, teddy bear, a bit, at all, at least, by the wall, cross the street, find out, go on a trip, in fact, in front of, in the end, interested in, lie down, on my own, pick up, the same, wait for

### A2

- **Two or more levels harder:** none
- **Two or more levels easier:** none
- **In neither list:** allergy, chore, by accident, on purpose, supposed to, willing to, break down, can't stand, carry on, carry out, deal with, depend on, fill in, get rid of, in charge of, look after, look forward to, make a difference, play a trick on, quite a while

### B1

- **Two or more levels harder:** none
- **Two or more levels easier:** successful (A1), social (A1), result (A1), reason (A1), goal (A1), skill (A1), culture (A1), discuss (A1), focus (A1), imagine (A1), celebrate (A1), collect (A1), feed (A1), greet (A1), pollution (A1), technology (A1), contest (A1), living (A1), learned (A1), bank (A1), strict (A1)
- **In neither list:** authentic, boundary, in that case, on the other hand, situated, give away, take into account, tired of, painless, pregnancy, robber, expecting a baby, blow up, burst into tears, check out, don't ask, get away with, hang out, mix up, on board, see off, shake your head, show you around, split up, stay up, strangely enough, take a risk, take out

### B2

- **Two or more levels harder:** none
- **Two or more levels easier:** significant (A2), establish (A2), consequence (A2), appropriate (A2), indicate (A2), release (A2), reveal (A2), context (A2)
- **In neither list:** framework, distinct, allocate, variable, domain, notably, bias, terminate, validate, verify, comprehend, ratio, accommodate, adjacent, amend, ascertain, augment, confer, consolidate, counteract, devise, differentiate, affirm, analogous, autonomy, bolster, brisk, consecutive, contingent, deviate, discrete, accelerate, accountable, designate, deter, disclose, dispose, distort, incorporate, inhibit, negate, postulate, supersede, warrant, underpin, optimize, streamline, pinpoint, optimal, rigorous, rationale, surplus, spectrum, hierarchy, infrastructure, magnitude, criterion, benchmark, breach, commence, conclusive, condense, counterpart, curb, deploy, equate, exhaustive, inception, iterate, rub out

### C1

- **Two or more levels harder:** none
- **Two or more levels easier:** nevertheless (B1), constitute (B1), vague (B1), prominent (B1), inevitable (B1), nonetheless (B1), diligent (B1), compound (B1)
- **In neither list:** undermine, advocate, discrepancy, mitigate, prevalent, viable, underlying, intricate, explicit, predominant, subsequent, albeit, deteriorate, discern, arbitrary, cumbersome, feasible, futile, mundane, obsolete, stark, tangible, threshold, unprecedented, ambivalent, conducive, discreet, exemplify, prerequisite, nuanced, scrupulous, adamant, akin, astute, bleak, cohesive, conspicuous, contentious, copious, culminate, curtail, disparity, exacerbate, imminent, lucid, pragmatic, entail, erode, foster, gauge, implicit, incremental, irrespective, juncture, manifest, offset, onset, overt, poignant, preclude, presume, reciprocal, aloof, amenable, belated, circumvent, contend, covert, culpable, debunk, deplete, deride, despondent, divulge, elicit, equitable, abate, abstain, acquiesce, affable, affinity, ambivalence, amiable, antecedent, apathy, appease, arbiter, assuage, attune, cordial, discord, condescend, confound, contemplate, cumulative, empirical, erratic, exemplary, accentuate, admonish, appraise, ascribe, delineate, extrapolate, instigate, necessitate, supplant, discernible, staunch, tenable, unwarranted, verbose, affront, aftermath, caveat, leverage, influx, shortfall, accolade, amass, anecdote, apex, avert, backlash, belie, blatant, caustic, censure, chronic, coerce, constrain, contingency, converge, corollary, covet, decry

### C2

- **Two or more levels harder:** none
- **Two or more levels easier:** eloquence (B2)
- **In neither list:** ubiquitous, paradigm, juxtapose, esoteric, pragmatic, nuance, quintessential, obfuscate, tenuous, salient, anomaly, dichotomy, espouse, pernicious, eschew, sanguine, ameliorate, perfunctory, burgeon, capitulate, equivocal, intransigent, laconic, vicarious, untenable, circumspect, acerbic, acumen, antipathy, cacophony, camaraderie, capricious, clandestine, denigrate, disparate, ebullient, egregious, enigma, erudite, fastidious, garrulous, hegemony, iconoclast, impetuous, ineffable, nadir, panacea, pejorative, pithy, recalcitrant, sycophant, vociferous, abstruse, ennui, obstreperous, recondite, vitriolic, aplomb, apocryphal, bellicose, bombastic, churlish, contrite, effrontery, fatuous, insidious, intractable, mendacious, obdurate, nebulous, ostentatious, placate, precarious, proclivity, quagmire, parsimonious, iniquity, lugubrious, auspicious, banal, candour, cursory, dearth, debacle, decorum, deference, diatribe, dogmatic, elucidate, enmity, epitome, equanimity, fervent, furtive, galvanize, hackneyed, idyllic, cajole, acrimony, alacrity, anathema, assiduous, bourgeois, bucolic, cantankerous, cognizant, conflagration, denouement, dilettante, disabuse, effusive, enervate, equivocate, extol, facetious, fortuitous, grandiloquent, abscond, acclaim, adroit, affluent, aggrieved, ascetic, aspersion, avarice, bane, beleaguered, blithe, callow, connive, decorous, dogma, duplicity, epiphany, exonerate, expedient, abrogate, adumbrate, arrogate, castigate, coalesce, excoriate, expiate, foment, gainsay, inveigh, obviate, promulgate, repudiate, vacillate, abstemious, diaphanous, grandiose, inimical, insipid, mercurial, munificent, perspicacious, pusillanimous, querulous, sanctimonious, truculent, turgid, vapid, approbation, asperity, calumny, chicanery, obloquy, opprobrium, pariah, penchant, perfidy, platitude, rectitude, sagacity, veracity, zeal, aphorism, apotheosis, assail, beguile, bulwark, catharsis, chagrin, charlatan, conflate, conundrum, convivial, countenance, deleterious, demur, desultory, dissonance, draconian, endemic, evanescent, germane, gravitas, hubris


## Hand-written passages

All hand-written readings and listening transcripts, shown or not. "Above level" counts word tokens the lists put above the passage's level; "in neither list" is mostly names and forms the checker can't trace to a dictionary word.

| Level | Passages | Words per sentence | Above level | In neither list |
|---|---|---|---|---|
| A1 | 272 | 6.5 | 1.7% | 1% |
| A2 | 72 | 8.6 | 2.7% | 2.1% |
| B1 | 73 | 11.2 | 1.9% | 2.1% |
| B2 | 61 | 15.1 | 0.8% | 4.1% |
| C1 | 60 | 16 | 0.4% | 4.7% |
| C2 | 60 | 17.9 | 0% | 6.6% |

## Words above the learner's level

Every sentence a learner sees, checked word by word: a word counts when the lists put it above the level and it is not taught at or below the level (question terms such as "plural", names, and reading glossaries pass). Word levels follow the lists, with the app's own decisions in `scripts/content/level-overrides.mjs`. A1 and A2 must be clean (see the rules below); higher levels are information.

| Level | Part of the app | Items | Items with a word above level | Most common such words |
|---|---|---|---|---|
| A1 | word example | 779 | 0 | none |
| A1 | daily quiz | 1833 | 0 | none |
| A1 | grammar question | 929 | 0 | none |
| A1 | reading | 501 | 0 | none |
| A1 | listening | 501 | 0 | none |
| A1 | speaking | 807 | 0 | none |
| A2 | word example | 991 | 0 | none |
| A2 | daily quiz | 1834 | 0 | none |
| A2 | grammar question | 890 | 0 | none |
| A2 | reading | 401 | 0 | none |
| A2 | listening | 401 | 0 | none |
| A2 | speaking | 1002 | 0 | none |
| B1 | word example | 420 | 0 | none |
| B1 | daily quiz | 1835 | 2 | explodes (1), exploding (1), explosive (1), project (1) |
| B1 | grammar question | 817 | 0 | none |
| B1 | reading | 402 | 9 | calmly (1), concrete (1), decades (1), enforce (1), expectation (1), faith (1), fame (1), fluency (1) |
| B1 | listening | 401 | 16 | reminder (3), client (2), donate (1), estate (1), expired (1), inspect (1), landing (1), laptop (1) |
| B1 | speaking | 462 | 0 | none |
| B2 | word example | 264 | 0 | none |
| B2 | daily quiz | 1833 | 0 | none |
| B2 | grammar question | 856 | 0 | none |
| B2 | reading | 396 | 7 | conditional (1), ego (1), indefinitely (1), limitless (1), remotely (1), resent (1), scrolling (1) |
| B2 | listening | 395 | 5 | enormously (1), norms (1), notable (1), patchy (1), scrutiny (1) |
| B2 | speaking | 314 | 1 | cons (1) |
| C1 | word example | 258 | 0 | none |
| C1 | daily quiz | 1825 | 0 | none |
| C1 | grammar question | 923 | 0 | none |
| C1 | reading | 395 | 3 | automating (1), paradoxically (1), practitioners (1) |
| C1 | listening | 395 | 3 | chronology (1), curator (1), fallacy (1), remit (1) |
| C1 | speaking | 298 | 1 | merit (1) |
| C2 | word example | 237 | 0 | none |
| C2 | daily quiz | 1825 | 0 | none |
| C2 | grammar question | 1004 | 0 | none |
| C2 | reading | 395 | 0 | none |
| C2 | listening | 395 | 0 | none |
| C2 | speaking | 279 | 0 | none |

## Words taught at more than one level

- achieve: A2, B1
- afraid: A1, A2
- airport: A1, A2
- always: A1, A2
- angry: A1, A2
- apologize: A2, B1
- beach: A1, A2
- book: A1, A2
- bored: A1, A2
- carry: A1, A2
- celebrate: A2, B1
- cheap: A1, A2
- compare: A2, B1
- complain: A2, B1
- consequence: B1, B2
- cook: A1, A2
- delicious: A1, A2
- drop: A1, A2
- excited: A1, A2
- explain: A2, B1
- facilitate: B2, C1
- favourite: A1, A2
- feed: A1, B1
- free: A1, A2
- full: A1, A2
- funny: A1, A2
- healthy: A1, A2
- heavy: A1, A2
- holiday: A1, A2
- hug: A1, A2
- hungry: A1, A2
- improve: A2, B1
- laugh: A1, A2
- lose: A1, A2
- money: A1, A2
- notice: A2, B1
- pragmatic: C1, C2
- quiet: A1, A2
- realize: A2, B1
- recommend: A2, B1
- restaurant: A1, A2
- river: A1, A2
- share: A1, A2
- sick: A1, A2
- station: A1, A2
- strong: A1, A2
- suggest: A2, B1
- surprised: A1, A2
- sweet: A1, A2
- thirsty: A1, A2
- throw: A1, A2
- ticket: A1, A2
- together: A1, A2
- worried: A1, A2

## Hand-written passages not shown (missing Hebrew)

None.

## Rules CI enforces

Every word entry has a word, part of speech, definition, example and translation, and its example uses the word. At A1 and A2, every word card example, quiz, grammar question, reading, listening and speaking sentence uses only words at or below the level, words already taught at or below it, or (in a reading) words in its glossary.

All pass.
<!-- END GENERATED -->
