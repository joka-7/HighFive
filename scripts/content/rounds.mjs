// The canonical list of content banks, in the order the generator consumes
// them.
//
// This exists because the bank export names are not uniform — round 2's
// speaking sentences are exported as `MORE_SPEAKING` (no suffix) from
// passages-extra2.mjs, and round 1 has no speaking bank at all. Any consumer
// that derives the names from a loop silently drops that round and produces a
// smaller corpus while looking correct. Import from here instead of guessing.

import { WORD_BANKS } from "./banks.mjs";
import { READINGS, LISTENINGS, SPEAKING_SENTENCES } from "./passages.mjs";

import { MORE_WORDS } from "./wordbank-extra.mjs";
import { MORE_WORDS2 } from "./wordbank-extra2.mjs";
import { MORE_WORDS3 } from "./wordbank-extra3.mjs";
import { MORE_WORDS4 } from "./wordbank-extra4.mjs";
import { MORE_WORDS5 } from "./wordbank-extra5.mjs";
import { MORE_WORDS6 } from "./wordbank-extra6.mjs";
import { MORE_WORDS7 } from "./wordbank-extra7.mjs";
import { MORE_WORDS8 } from "./wordbank-extra8.mjs";
import { MORE_WORDS9 } from "./wordbank-extra9.mjs";
import { MORE_WORDS10 } from "./wordbank-extra10.mjs";

import { MORE_READINGS, MORE_LISTENINGS } from "./passages-extra.mjs";
import { MORE_READINGS2, MORE_LISTENINGS2, MORE_SPEAKING } from "./passages-extra2.mjs";
import { MORE_READINGS3, MORE_LISTENINGS3, MORE_SPEAKING3 } from "./passages-extra3.mjs";
import { MORE_READINGS4, MORE_LISTENINGS4, MORE_SPEAKING4 } from "./passages-extra4.mjs";
import { MORE_READINGS5, MORE_LISTENINGS5, MORE_SPEAKING5 } from "./passages-extra5.mjs";
import { MORE_READINGS6, MORE_LISTENINGS6, MORE_SPEAKING6 } from "./passages-extra6.mjs";
import { MORE_READINGS7, MORE_LISTENINGS7, MORE_SPEAKING7 } from "./passages-extra7.mjs";
import { MORE_READINGS8, MORE_LISTENINGS8, MORE_SPEAKING8 } from "./passages-extra8.mjs";
import { MORE_READINGS9, MORE_LISTENINGS9, MORE_SPEAKING9 } from "./passages-extra9.mjs";

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

/** Each round paired with the file it lives in, so reports can cite a source. */
const WORD_ROUNDS = [
  [WORD_BANKS, "banks.mjs"],
  [MORE_WORDS, "wordbank-extra.mjs"],
  [MORE_WORDS2, "wordbank-extra2.mjs"],
  [MORE_WORDS3, "wordbank-extra3.mjs"],
  [MORE_WORDS4, "wordbank-extra4.mjs"],
  [MORE_WORDS5, "wordbank-extra5.mjs"],
  [MORE_WORDS6, "wordbank-extra6.mjs"],
  [MORE_WORDS7, "wordbank-extra7.mjs"],
  [MORE_WORDS8, "wordbank-extra8.mjs"],
  [MORE_WORDS9, "wordbank-extra9.mjs"],
  [MORE_WORDS10, "wordbank-extra10.mjs"],
];

const READING_ROUNDS = [
  [READINGS, "passages.mjs"],
  [MORE_READINGS, "passages-extra.mjs"],
  [MORE_READINGS2, "passages-extra2.mjs"],
  [MORE_READINGS3, "passages-extra3.mjs"],
  [MORE_READINGS4, "passages-extra4.mjs"],
  [MORE_READINGS5, "passages-extra5.mjs"],
  [MORE_READINGS6, "passages-extra6.mjs"],
  [MORE_READINGS7, "passages-extra7.mjs"],
  [MORE_READINGS8, "passages-extra8.mjs"],
  [MORE_READINGS9, "passages-extra9.mjs"],
];

const LISTENING_ROUNDS = [
  [LISTENINGS, "passages.mjs"],
  [MORE_LISTENINGS, "passages-extra.mjs"],
  [MORE_LISTENINGS2, "passages-extra2.mjs"],
  [MORE_LISTENINGS3, "passages-extra3.mjs"],
  [MORE_LISTENINGS4, "passages-extra4.mjs"],
  [MORE_LISTENINGS5, "passages-extra5.mjs"],
  [MORE_LISTENINGS6, "passages-extra6.mjs"],
  [MORE_LISTENINGS7, "passages-extra7.mjs"],
  [MORE_LISTENINGS8, "passages-extra8.mjs"],
  [MORE_LISTENINGS9, "passages-extra9.mjs"],
];

// Note the gap: no round-1 speaking bank, and round 2 is the unsuffixed export.
const SPEAKING_ROUNDS = [
  [SPEAKING_SENTENCES, "passages.mjs"],
  [MORE_SPEAKING, "passages-extra2.mjs"],
  [MORE_SPEAKING3, "passages-extra3.mjs"],
  [MORE_SPEAKING4, "passages-extra4.mjs"],
  [MORE_SPEAKING5, "passages-extra5.mjs"],
  [MORE_SPEAKING6, "passages-extra6.mjs"],
  [MORE_SPEAKING7, "passages-extra7.mjs"],
  [MORE_SPEAKING8, "passages-extra8.mjs"],
  [MORE_SPEAKING9, "passages-extra9.mjs"],
];

function flatten(rounds, { withSource = false } = {}) {
  const out = {};
  for (const level of LEVELS) {
    out[level] = [];
    for (const [bank, source] of rounds) {
      for (const item of bank[level] ?? []) {
        out[level].push(withSource ? { ...item, source } : item);
      }
    }
  }
  return out;
}

/**
 * Every hand-written bank item, merged per level in generator order.
 * `withSource` tags each item with its bank filename (for reports); leave it
 * off when comparing against parsed content.
 */
export function bankContent(options) {
  return {
    words: flatten(WORD_ROUNDS, options),
    readings: flatten(READING_ROUNDS, options),
    listenings: flatten(LISTENING_ROUNDS, options),
    speaking: flatten(SPEAKING_ROUNDS, options),
  };
}
