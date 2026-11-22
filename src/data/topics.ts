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

// Every A1 and A2 scenario has a script and target phrases (topics.test.ts).
export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    id: "cafe",
    label: "☕ בבית קפה",
    en: "Ordering at a cafe",
    minLevel: "A1",
    brief:
      "You are a friendly waiter at a café in Tel Aviv, talking to a Hebrew-speaking learner. Ask what they would like to drink and eat, and if they want it hot or cold, then tell them the price. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["I would like", "a cup of", "can I have", "how much is it", "thank you"],
  },
  {
    id: "friends",
    label: "👋 שיחה עם חבר",
    en: "Chatting with a friend",
    minLevel: "A1",
    brief:
      "You are a new classmate chatting with a Hebrew-speaking learner after school. Ask their name, where they live, what they like to do and their favourite food. Say a little about yourself too. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["my name is", "I live in", "I like", "my favourite", "what about you"],
  },
  {
    id: "shopping",
    label: "🛍️ בקניות",
    en: "Shopping for clothes",
    minLevel: "A1",
    brief:
      "You are a shop assistant in a clothes shop, helping a Hebrew-speaking learner. Ask what they want and which colour and size; when they ask, tell them the price and if you have it in another colour. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["I want", "do you have it in", "how much is it", "it is too big", "I will take it"],
  },
  {
    id: "restaurant",
    label: "🍝 הזמנה במסעדה",
    en: "Ordering at a restaurant",
    minLevel: "A1",
    brief:
      "You are a waiter in a family restaurant, serving a Hebrew-speaking learner. Ask how many people are coming, take their order, ask if the food is good, and bring the bill when they ask to pay. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["a table for two", "can I have", "I would like", "it is very good", "can we pay"],
  },
  {
    id: "directions",
    label: "🗺️ בקשת הכוונה",
    en: "Asking for directions",
    minLevel: "A1",
    brief:
      "You are a friendly local in a city. A Hebrew-speaking tourist asks you the way. Ask where they want to go and explain the way in short steps with left, right, near and next to. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["excuse me", "where is", "how do I get to", "is it near here", "thank you"],
  },
  {
    id: "airport",
    label: "✈️ בשדה התעופה",
    en: "At the airport",
    minLevel: "A2",
    brief:
      "You are a check-in agent at Ben Gurion Airport, talking to a Hebrew-speaking learner. Ask for their passport and where they are flying, how many bags they have, and if they want a window or an aisle seat; tell them the gate when they ask. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["here is my passport", "I am flying to", "a window seat, please", "which gate", "thank you for your help"],
  },
  {
    id: "doctor",
    label: "🩺 אצל הרופא",
    en: "At the doctor",
    minLevel: "A2",
    brief:
      "You are a kind family doctor seeing a Hebrew-speaking learner. Ask what the problem is, how long they have felt ill and if they have a temperature, then give simple advice: rest, drink water, take medicine. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["I feel", "it hurts", "since yesterday", "I have a headache", "a temperature"],
  },
  {
    id: "phone",
    label: "📞 שיחת טלפון",
    en: "Making a phone call",
    minLevel: "A2",
    brief:
      "You are a receptionist at a sports centre answering a phone call from a Hebrew-speaking learner who wants to book a class. Ask their name, which class and day they want, and their phone number, and repeat the details to check. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["I am calling about", "I would like to book", "could you repeat", "my number is", "see you then"],
  },
  {
    id: "pharmacy",
    label: "💊 בבית מרקחת",
    en: "At the pharmacy",
    minLevel: "A2",
    brief:
      "You are a pharmacist talking to a Hebrew-speaking learner who has a cold. Ask how they feel, suggest a medicine, and explain clearly how many times a day to take it and when. Keep your sentences short and simple for the learner's level and ask one question at a time. If they make a mistake, praise the effort; the correction goes in the corrections field.",
    targetPhrases: ["I have a cold", "do you have", "something for a cold", "is it safe", "how many times"],
  },
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
