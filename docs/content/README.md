# High5 content inventory

Every word, sentence, passage and link the app can show, by CEFR level, and — for words, reading, listening and speaking — the place to edit them. See **How editing works** below before changing anything.

## Totals

| Level | Words | Reading passages | Listening clips | Speaking sentences | Page |
|---|---|---|---|---|---|
| A1 | 412 | 36 | 36 | 42 | [A1.md](./A1.md) |
| A2 | 319 | 36 | 36 | 42 | [A2.md](./A2.md) |
| B1 | 326 | 36 | 36 | 42 | [B1.md](./B1.md) |
| B2 | 263 | 30 | 30 | 42 | [B2.md](./B2.md) |
| C1 | 245 | 30 | 30 | 42 | [C1.md](./C1.md) |
| C2 | 237 | 30 | 30 | 42 | [C2.md](./C2.md) |
| **All** | 1802 | 198 | 198 | 252 |  |

| Also | Items | Page |
|---|---|---|
| External links (daily board) | 13 | [links-and-media.md](./links-and-media.md) |
| Daily videos | 18 | [links-and-media.md](./links-and-media.md) |
| Dialogue scenarios | 16 | [links-and-media.md](./links-and-media.md) |
| Placement questions | 6 | [links-and-media.md](./links-and-media.md) |
| Grammar bank rows | 121 | [grammar-banks.md](./grammar-banks.md) |

## How editing works

**Words, reading passages, listening clips and speaking sentences are edited right here, in these Markdown pages.** Change a translation, fix a sentence, add a row to a table — then run:

```bash
npm run content:import  # docs/content/*.md → scripts/content/from-markdown.generated.mjs
npm run content          # → src/data/offline/*.json, what the app actually ships
npm test                 # offline.test.ts checks the generated corpus
```

Keep the table/heading structure intact — `content:import` parses these pages back into data, so a word needs its full table row (`| # | word | part of speech | Hebrew | definition | example (En) | example (He) | bank |`) and a question needs its ✓ column on the correct option. `content:import` prints how many items ended up differing from the original hand-written banks — that number growing is expected once you've made real edits, not a sign anything broke.

⚠️ **Don't run `npm run content:report` after you've started editing.** It rebuilds every page from `scripts/content/*.mjs` — the *original* hand-written banks these pages were bootstrapped from — and would overwrite your edits with that original content. It's a reset button, not a refresh button.

| To change… | Edit |
|---|---|
| Vocabulary words | the **Words** table on the level's page |
| Reading passages | the passage under **Reading passages** |
| Listening clips | the transcript under **Listening clips** |
| Speaking sentences | the **Speaking sentences** table |
| Grammar question tables | `scripts/content/banks.mjs` — no Markdown page yet |
| External links / operation copy | `src/data/operations.ts` |
| Daily videos | `src/data/videos.ts` |
| Topics and dialogue scenarios | `src/data/topics.ts` |
| Placement test | `src/data/placement.ts` |

## What the learner actually sees

These banks are the pool, not the schedule. `scripts/generate-content.mjs` expands them with a seeded RNG into a **full year of daily material per level** (`src/data/offline/*.json`, ~17 MB, quarter-split so a learner downloads only the current quarter). Per day that is 5 words, one lesson, one quiz, one reading, one listening and one speaking set — so the same bank item recurs across the year rather than being seen once.

AI-backed features (lesson, vocabulary, quiz, speaking) use a live provider when an API key is set and fall back to this bundled content otherwise. Reading and listening are always bundled. The dialogue coach is the only feature with no offline content at all.
