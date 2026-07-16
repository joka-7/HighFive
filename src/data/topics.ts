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
