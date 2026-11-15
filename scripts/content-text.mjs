// Finding a taught word inside its example sentence, for the content
// generator (scripts/generate-content.mjs): quizzes blank it out, and a word
// whose example doesn't contain it falls back to a template sentence.

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** A word and its regular inflections: -s, -es, -ed, -ing, and the -e (-d, -ing) and -y spelling rules. */
function inflections(word) {
  const forms = [word, `${word}s`, `${word}es`, `${word}ed`, `${word}ing`];
  if (word.endsWith("e")) forms.push(`${word}d`, `${word.slice(0, -1)}ing`);
  if (word.endsWith("y")) forms.push(`${word.slice(0, -1)}ies`, `${word.slice(0, -1)}ied`);
  return forms;
}

/**
 * The form of `word` that appears in `text`, exactly as written there, or
 * null. A phrase ("wait for", "up-to-date") must appear as one run, with only
 * its first word inflected ("waiting for", "depends on").
 */
export function wordFormInText(text, word) {
  if (!text || !word) return null;
  const lw = word.toLowerCase();
  if (/[\s-]/.test(lw)) {
    const [first = "", ...rest] = lw.split(/\s+/);
    const firstForms = inflections(first).map(escapeRegExp).join("|");
    const tail = rest.map((part) => `\\s+${escapeRegExp(part)}`).join("");
    const match = text.match(new RegExp(`(?<![\\w'-])(?:${firstForms})${tail}(?![\\w'-])`, "i"));
    return match ? match[0] : null;
  }
  const candidates = inflections(lw);
  for (const token of text.match(/\b[\w']+\b/g) ?? []) {
    if (candidates.includes(token.toLowerCase())) return token;
  }
  return null;
}

/** `text` with the first occurrence of `word` (in any form) replaced by "___". */
export function blankWordInText(text, word) {
  const form = wordFormInText(text, word);
  if (!form) return text;
  return text.replace(new RegExp(`(?<![\\w'-])${escapeRegExp(form)}(?![\\w'-])`, "i"), "___");
}
