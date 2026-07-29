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

// High-frequency English that no CEFR word bank teaches, because it isn't
// "vocabulary" a lesson would ever be built around — yet it appears in every
// natural sentence. Without these the guard called words like "people",
// "most" or "while" unknown, which made every hand-written passage look
// permanently out of reach and left learners reading only generated
// word-of-the-day text.
const COMMON_HIGH_FREQUENCY = [
  "people", "person", "thing", "things", "way", "ways", "part", "parts", "place",
  "places", "side", "end", "kind", "sort", "fact", "idea", "ideas", "life",
  "lives", "reason", "reasons", "problem", "problems", "point", "points",
  "question", "questions", "answer", "answers", "example", "group", "case",
  "cases", "order", "plan", "plans", "result", "results", "line", "lines",
  "example", "story", "stories", "moment", "moments", "hand", "hands", "head",
  "eyes", "voice", "sound", "sounds", "text", "texts",
  // quantity, degree and comparison
  "most", "more", "less", "least", "better", "worse", "worst", "far", "further",
  "few", "fewer", "several", "little", "lot", "lots", "plenty", "half", "whole",
  "own", "same", "different", "similar", "simple", "real", "true", "sure",
  "clear", "hard", "easy", "long", "short", "fast", "quick", "slow", "early",
  "late", "high", "low", "big", "small", "large", "medium", "top", "main",
  // time and sequence
  "once", "twice", "often", "usually", "always", "never", "sometimes", "rarely",
  "already", "yet", "still", "soon", "sooner", "later", "finally", "eventually",
  "meanwhile", "afterwards", "beforehand", "recently", "lately", "nowadays",
  "week", "weekend", "month", "year", "years", "hour", "hours", "minute",
  "minutes", "morning", "evening", "night", "today", "tonight",
  // pronouns and determiners
  "myself", "yourself", "himself", "herself", "itself", "ourselves",
  "themselves", "oneself", "everyone", "everybody", "everything", "someone",
  "somebody", "something", "anyone", "anybody", "anything", "nobody", "nothing",
  "none", "whose", "whoever", "whatever", "wherever", "whenever", "everywhere",
  "somewhere", "anywhere", "nowhere",
  // connectives and stance
  "although", "though", "however", "therefore", "thus", "hence", "instead",
  "rather", "besides", "moreover", "otherwise", "whereas", "while", "since",
  "until", "unless", "whether", "either", "neither", "despite", "regardless",
  "actually", "really", "simply", "clearly", "exactly", "especially",
  "probably", "possibly", "perhaps", "almost", "nearly", "quite", "enough",
  "mainly", "mostly", "partly", "indeed", "anyway", "instead", "generally",
  "particularly", "obviously", "apparently", "surprisingly", "interestingly",
  "according", "example", "including", "such", "each", "per", "via",
  // common prepositions/positions not already in the core list
  "toward", "towards", "upon", "within", "across", "along", "around", "behind",
  "below", "above", "beside", "beyond", "inside", "among", "against", "onto",
  "throughout", "alongside",
  // ultra-common verbs beyond the core list
  "become", "becomes", "became", "seem", "seems", "seemed", "mean", "means",
  "meant", "happen", "happens", "happened", "change", "changes", "changed",
  "choose", "chooses", "chose", "choice", "decide", "decides", "decided",
  "believe", "believes", "believed", "understand", "understands", "understood",
  "remember", "remembers", "remembered", "forget", "forgets", "forgot",
  "explain", "explains", "explained", "describe", "notice", "notices",
  "noticed", "follow", "follows", "followed", "continue", "continues",
  "continued", "remain", "remains", "remained", "include", "includes",
  "included", "allow", "allows", "allowed", "appear", "appears", "appeared",
  "leave", "leaves", "left", "bring", "brought", "hold", "holds", "held",
  "spend", "spends", "spent", "show", "shows", "showed", "shown", "tend",
  "tends", "tended", "matter", "matters", "mattered",
];

const STARTER_BY_LEVEL: Record<Level, string[]> = {
  A1: [],
  A2: ["already", "ago", "enough", "quite", "rather", "something", "anything"],
  B1: ["although", "however", "therefore", "perhaps", "probably", "especially"],
  B2: ["furthermore", "nevertheless", "whereas", "otherwise", "consequently"],
  C1: ["albeit", "notwithstanding", "henceforth", "albeit"],
  C2: ["quintessential", "ubiquitous", "tenuous"],
};

const coreSet = new Set([...CORE_STARTER, ...COMMON_HIGH_FREQUENCY]);

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
