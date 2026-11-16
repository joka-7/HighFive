import type { Level } from "../types";
import { LEVELS } from "../types";
import { dayIndex } from "../utils/daily";

export const LESSON_TOPICS_BY_LEVEL: Record<Level, string[]> = {
  A1: [
    "Present Simple",
    "Articles (a/an/the)",
    "Prepositions of place",
    "Prepositions of time",
    "Plural nouns",
    "Question formation",
    "Everyday vocabulary",
  ],
  A2: [
    "Present Simple",
    "Past Simple",
    "Present Continuous",
    "Comparatives & superlatives",
    "Quantifiers (much/many/some/any)",
    "Everyday vocabulary",
    "Common collocations",
  ],
  B1: [
    "Present Perfect",
    "Past Continuous",
    "Future (will / going to)",
    "Modal verbs",
    "First Conditional",
    "Phrasal verbs",
    "Everyday vocabulary",
  ],
  B2: [
    "Present Perfect",
    "Past Continuous",
    "Second Conditional",
    "Passive voice",
    "Reported speech",
    "Relative clauses",
    "Common collocations",
  ],
  C1: [
    "Passive voice",
    "Reported speech",
    "Relative clauses",
    "Modal verbs",
    "Phrasal verbs",
    "Common collocations",
  ],
  C2: [
    "Passive voice",
    "Reported speech",
    "Relative clauses",
    "Phrasal verbs",
    "Common collocations",
  ],
};

export const QUIZ_TOPICS_BY_LEVEL: Record<Level, string[]> = {
  A1: ["Mixed grammar", "Vocabulary review", "Everyday expressions", "Reading comprehension basics"],
  A2: ["Mixed grammar", "Vocabulary review", "Verb tenses", "Prepositions", "Everyday expressions"],
  B1: ["Mixed grammar", "Vocabulary review", "Verb tenses", "Prepositions", "Reading comprehension basics"],
  B2: ["Mixed grammar", "Vocabulary review", "Verb tenses", "Prepositions", "Everyday expressions"],
  C1: ["Mixed grammar", "Vocabulary review", "Verb tenses", "Everyday expressions"],
  C2: ["Mixed grammar", "Vocabulary review", "Everyday expressions"],
};

export const READING_TOPICS_BY_LEVEL: Record<Level, string[]> = {
  A1: ["Everyday life and routines", "Food and cooking", "A short personal story"],
  A2: ["Everyday life and routines", "Travel and places", "Food and cooking", "A short personal story"],
  B1: ["Everyday life and routines", "Travel and places", "Food and cooking", "Health and well-being", "Work and careers"],
  B2: ["Travel and places", "Technology and the internet", "Health and well-being", "Work and careers", "The environment"],
  C1: ["Technology and the internet", "Health and well-being", "Work and careers", "The environment"],
  C2: ["Technology and the internet", "Work and careers", "The environment"],
};

export const LISTENING_TOPICS_BY_LEVEL: Record<Level, string[]> = {
  A1: ["A short self-introduction", "A phone message", "Ordering food"],
  A2: ["A short self-introduction", "A phone message", "Directions to a place", "Ordering food"],
  B1: ["A phone message", "Directions to a place", "An announcement", "A casual conversation", "Ordering food"],
  B2: ["Directions to a place", "An announcement", "A casual conversation", "Ordering food"],
  C1: ["An announcement", "A casual conversation", "A phone message"],
  C2: ["An announcement", "A casual conversation"],
};

// Legacy exports kept for any external references.
export const LESSON_TOPICS = LESSON_TOPICS_BY_LEVEL.B2;
export const QUIZ_TOPICS = QUIZ_TOPICS_BY_LEVEL.B1;
export const READING_TOPICS = READING_TOPICS_BY_LEVEL.B1;
export const LISTENING_TOPICS = LISTENING_TOPICS_BY_LEVEL.B1;

export const SPEAKING_TOPICS_BY_LEVEL: Record<Level, string[]> = {
  A1: ["Greetings and small talk", "Daily routines", "Asking for help"],
  A2: ["Greetings and small talk", "Daily routines", "Asking for help", "At a restaurant"],
  B1: ["Daily routines", "Opinions and preferences", "Travel situations", "At a restaurant"],
  B2: ["Opinions and preferences", "Travel situations", "At a restaurant"],
  C1: ["Opinions and preferences", "Travel situations"],
  C2: ["Opinions and preferences", "Travel situations"],
};

export const SPEAKING_TOPICS = SPEAKING_TOPICS_BY_LEVEL.B1;

export interface DialogueScenario {
  id: string;
  label: string;
  en: string;
  minLevel: Level;
  /** Role-play instructions for the AI partner (2026 curriculum scripts). */
  brief?: string;
  /** Phrases the learner should try to use; the partner encourages and highlights them. */
  targetPhrases?: readonly string[];
}

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  { id: "cafe", label: "☕ בבית קפה", en: "Ordering at a cafe", minLevel: "A1" },
  { id: "friends", label: "👋 שיחה עם חבר", en: "Chatting with a friend", minLevel: "A1" },
  { id: "shopping", label: "🛍️ בקניות", en: "Shopping for clothes", minLevel: "A1" },
  { id: "restaurant", label: "🍝 הזמנה במסעדה", en: "Ordering at a restaurant", minLevel: "A1" },
  { id: "directions", label: "🗺️ בקשת הכוונה", en: "Asking for directions", minLevel: "A1" },
  { id: "airport", label: "✈️ בשדה התעופה", en: "At the airport", minLevel: "A2" },
  { id: "doctor", label: "🩺 אצל הרופא", en: "At the doctor", minLevel: "A2" },
  { id: "phone", label: "📞 שיחת טלפון", en: "Making a phone call", minLevel: "A2" },
  { id: "pharmacy", label: "💊 בבית מרקחת", en: "At the pharmacy", minLevel: "A2" },
  { id: "hotel", label: "🏨 צ'ק-אין במלון", en: "Checking in at a hotel", minLevel: "B1" },
  { id: "bank", label: "🏦 בבנק", en: "At the bank", minLevel: "B1" },
  { id: "complaint", label: "😟 הגשת תלונה", en: "Making a complaint", minLevel: "B1" },
  { id: "smalltalk", label: "🗣️ שיחת חולין", en: "Making small talk", minLevel: "B1" },
  { id: "rent", label: "🏠 שכירת דירה", en: "Renting an apartment", minLevel: "B2" },
  { id: "interview", label: "💼 ראיון עבודה", en: "A job interview", minLevel: "B2" },
  { id: "meeting", label: "📊 פגישת עבודה", en: "A business meeting", minLevel: "C1" },
  // 2026 curriculum scripts: each practises its level's Ministry target phrases.
  {
    id: "london-cafe",
    label: "☕ הזמנה בבית קפה בלונדון",
    en: "Ordering coffee and getting to know a barista in London",
    minLevel: "A1",
    brief:
      "You are a friendly barista in London talking to a Hebrew-speaking A1 beginner. Keep your sentences short (5-8 words). Ask what they want to drink, if they want it here or to go, and if the table by the window is free for them. If they make a Hebrew-transfer error (like 'I wait to my friend'), praise their effort and model the correct form ('I am waiting for my friend').",
    targetPhrases: ["a bit", "free", "wait for", "here or to go", "would like"],
  },
  {
    id: "hotel-problem",
    label: "🛎️ טיפול בתקלה במלון בחו״ל",
    en: "Reporting a problem at a hotel abroad",
    minLevel: "A2",
    brief:
      "You are a hotel receptionist helping an A2 learner whose room air conditioner broke down. Ask them to explain what happened and what they need. Reply naturally in character.",
    targetPhrases: ["by accident", "supposed to", "in charge of", "deal with", "break down"],
  },
  {
    id: "exchange-interview",
    label: "🌍 ראיון לתוכנית חילופי נוער",
    en: "An interview for an international youth exchange programme",
    minLevel: "B1",
    brief:
      "You are an interviewer for an international youth exchange programme, speaking with a B1/B2 Israeli student. Ask four progressive questions: about a challenge they faced, how they work in a team, what they can contribute, and why they want this opportunity.",
    targetPhrases: ["take into account", "take a risk", "contribute", "experience", "opportunity", "up-to-date"],
  },
  {
    id: "ai-debate",
    label: "🎤 דיבייט: בינה מלאכותית בחינוך",
    en: "A debate about artificial intelligence in schools",
    minLevel: "C1",
    brief:
      "You are an academic debate coach training a C1 speaker. Debate the use of AI tools in schools, taking the opposite side to the learner. Push them to raise their register: inversion ('Not only...'), advanced reporting verbs ('attribute', 'emphasise') and the subjunctive ('It is essential that...'). When they use a simple expression like 'big problem' or 'say', suggest a C1 alternative ('pose a serious threat', 'argue', 'emphasise').",
    targetPhrases: ["Not only", "pose a threat", "attribute", "essential that", "consequence"],
  },
];

export function dialogueScenariosForLevel(level: Level): DialogueScenario[] {
  const max = LEVELS.indexOf(level);
  return DIALOGUE_SCENARIOS.filter((s) => LEVELS.indexOf(s.minLevel) <= max);
}

export function topicForToday(topics: string[]): string {
  return topics[dayIndex() % topics.length];
}

export function topicForTodayByLevel(topicsByLevel: Record<Level, string[]>, level: Level): string {
  return topicForToday(topicsByLevel[level]);
}
