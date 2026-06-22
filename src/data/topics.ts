// Rotating topics for AI-generated daily lessons and practice quizzes.
export const LESSON_TOPICS = [
  "Present Simple",
  "Past Simple",
  "Present Continuous",
  "Present Perfect",
  "Articles (a/an/the)",
  "Prepositions of place",
  "Comparatives & superlatives",
  "Modal verbs",
  "Conditionals",
  "Phrasal verbs",
  "Common collocations",
  "Everyday vocabulary",
];

export const QUIZ_TOPICS = [
  "Mixed grammar",
  "Vocabulary review",
  "Verb tenses",
  "Prepositions",
  "Reading comprehension basics",
  "Everyday expressions",
];

// Topics for AI-generated reading passages, listening clips and speaking drills.
export const READING_TOPICS = [
  "A short personal story",
  "Everyday life and routines",
  "Travel and places",
  "Food and cooking",
  "Technology and the internet",
  "Health and well-being",
  "Work and careers",
  "The environment",
];

export const LISTENING_TOPICS = [
  "A short self-introduction",
  "A phone message",
  "Directions to a place",
  "An announcement",
  "A casual conversation",
  "Ordering food",
];

export const SPEAKING_TOPICS = [
  "Greetings and small talk",
  "Asking for help",
  "Daily routines",
  "Opinions and preferences",
  "Travel situations",
  "At a restaurant",
];

// Roleplay scenarios for the Dialogue Coach.
export const DIALOGUE_SCENARIOS = [
  { id: "cafe", label: "☕ בבית קפה", en: "Ordering at a cafe" },
  { id: "airport", label: "✈️ בשדה התעופה", en: "At the airport" },
  { id: "shopping", label: "🛍️ בקניות", en: "Shopping for clothes" },
  { id: "friends", label: "👋 שיחה עם חבר", en: "Chatting with a friend" },
  { id: "interview", label: "💼 ראיון עבודה", en: "A job interview" },
  { id: "doctor", label: "🩺 אצל הרופא", en: "At the doctor" },
];

export function topicForToday(topics: string[]): string {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return topics[dayIndex % topics.length];
}
