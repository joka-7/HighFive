import type { Level } from "../types";
import { LEVELS } from "../types";

// Function words and ultra-common tokens always allowed in progressive content.
// Learners see these from day one without needing to unlock them in vocabulary.
const CORE_STARTER = [
  "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them",
  "my", "your", "his", "its", "our", "their", "mine", "yours", "the", "a", "an",
  "is", "are", "am", "was", "were", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "will", "would", "can", "could", "should", "must", "may",
  "might", "to", "in", "on", "at", "by", "with", "from", "of", "for", "and", "or",
  "but", "so", "not", "no", "yes", "this", "that", "these", "those", "what", "when",
  "where", "who", "whom", "how", "why", "which", "there", "here", "very", "too",
  "also", "then", "than", "as", "if", "up", "down", "out", "off", "all", "some",
  "any", "many", "much", "one", "two", "three", "four", "five", "six", "seven",
  "eight", "nine", "ten", "eleven", "twelve", "every", "each", "both", "other",
  "another", "same", "new", "old", "now", "today", "tomorrow", "yesterday",
  "again", "still", "just", "only", "even", "well", "please", "thank", "thanks",
  "hello", "hi", "bye", "good", "bad", "go", "goes", "went", "come", "comes",
  "came", "get", "gets", "got", "make", "makes", "made", "see", "sees", "saw",
  "look", "looks", "take", "takes", "took", "give", "gives", "gave", "eat", "eats",
  "ate", "drink", "drinks", "play", "plays", "work", "works", "live", "lives",
  "like", "likes", "want", "wants", "need", "needs", "help", "helps", "use", "uses",
  "put", "puts", "stay", "stays", "feel", "feels", "think", "thinks", "know",
  "knows", "find", "finds", "tell", "tells", "ask", "asks", "try", "tries", "call",
  "calls", "turn", "turns", "start", "starts", "stop", "stops", "open", "opens",
  "close", "closes", "read", "reads", "write", "writes", "listen", "listens",
  "walk", "walks", "run", "runs", "sit", "sits", "stand", "stands", "sleep",
  "sleeps", "buy", "buys", "bring", "brings", "wash", "washes", "cook", "cooks",
  "carry", "carries", "wear", "wears", "watch", "watches", "learn", "learns",
  "teach", "teaches", "send", "sends", "meet", "meets", "pay", "pays", "win",
  "wins", "lose", "loses", "cut", "cuts", "build", "builds", "grow", "grows",
  "water", "feed", "feeds", "count", "counts", "draw", "draws", "throw", "throws",
  "hug", "hugs", "laugh", "laughs", "share", "shares", "ride", "rides", "swim",
  "swims", "blow", "blows", "fit", "fits", "say", "says", "said", "let", "lets",
  "keep", "keeps", "left", "right", "into", "about", "after", "before", "because",
  "between", "under", "over", "through", "during", "without", "don't", "doesn't",
  "didn't", "can't", "won't", "isn't", "aren't", "wasn't", "weren't", "i'm",
  "you're", "he's", "she's", "it's", "we're", "they're", "i've", "you've", "we've",
  "they've", "i'll", "you'll", "he'll", "she'll", "we'll", "they'll", "let's",
  "o'clock", "n't", "s", "d", "m", "re", "ve", "ll",
];

const STARTER_BY_LEVEL: Record<Level, string[]> = {
  A1: [],
  A2: ["already", "ago", "enough", "quite", "rather", "something", "anything"],
  B1: ["although", "however", "therefore", "perhaps", "probably", "especially"],
  B2: ["furthermore", "nevertheless", "whereas", "otherwise", "consequently"],
  C1: ["albeit", "notwithstanding", "henceforth", "albeit"],
  C2: ["quintessential", "ubiquitous", "tenuous"],
};

const coreSet = new Set(CORE_STARTER);

/** Tokens always permitted regardless of learned-vocabulary progress. */
export function starterWords(level: Level): Set<string> {
  const out = new Set(coreSet);
  for (const w of STARTER_BY_LEVEL[level]) out.add(w.toLowerCase());
  return out;
}

/** Expand a phrase/word into lowercase tokens for the allowed set. */
export function expandWordTokens(word: string): string[] {
  return word.toLowerCase().split(/\s+/).filter(Boolean);
}

/** All levels share the same core starter; used when seeding learnedWords. */
export function seedStarterEntries(): Record<string, { word: string; translation: string; level: Level; firstSeenAt: number }> {
  const now = Date.now();
  const entries: Record<string, { word: string; translation: string; level: Level; firstSeenAt: number }> = {};
  for (const lvl of LEVELS) {
    for (const t of starterWords(lvl)) {
      if (!entries[t]) {
        entries[t] = { word: t, translation: t, level: "A1", firstSeenAt: now };
      }
    }
  }
  return entries;
}
