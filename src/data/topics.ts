// Rotating topics for AI-generated daily lessons and practice quizzes.
export const LESSON_TOPICS = [
  "Present Simple",
  "Past Simple",
  "Present Continuous",
  "Present Perfect",
  "Past Continuous",
  "Future (will / going to)",
  "Articles (a/an/the)",
  "Prepositions of place",
  "Prepositions of time",
  "Comparatives & superlatives",
  "Modal verbs",
  "First Conditional",
  "Second Conditional",
  "Passive voice",
  "Reported speech",
  "Relative clauses",
  "Quantifiers (much/many/some/any)",
  "Phrasal verbs",
  "Common collocations",
  "Plural nouns",
  "Question formation",
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

// Topics for the "watch a video in English" daily mission — used to build a
// YouTube search link (no specific video IDs are hardcoded, since those can
// go stale or be region-locked).
export const VIDEO_TOPICS = [
  "English listening practice for beginners",
  "Learn English conversation",
  "English vocabulary lesson",
  "English grammar explained",
  "English short story for learners",
  "English pronunciation practice",
  "Everyday English phrases",
  "English news for learners",
];

// Roleplay scenarios for the Dialogue Coach.
export const DIALOGUE_SCENARIOS = [
  { id: "cafe", label: "☕ בבית קפה", en: "Ordering at a cafe" },
  { id: "airport", label: "✈️ בשדה התעופה", en: "At the airport" },
  { id: "shopping", label: "🛍️ בקניות", en: "Shopping for clothes" },
  { id: "friends", label: "👋 שיחה עם חבר", en: "Chatting with a friend" },
  { id: "interview", label: "💼 ראיון עבודה", en: "A job interview" },
  { id: "doctor", label: "🩺 אצל הרופא", en: "At the doctor" },
  { id: "hotel", label: "🏨 צ'ק-אין במלון", en: "Checking in at a hotel" },
  { id: "directions", label: "🗺️ בקשת הכוונה", en: "Asking for directions" },
  { id: "restaurant", label: "🍝 הזמנה במסעדה", en: "Ordering at a restaurant" },
  { id: "phone", label: "📞 שיחת טלפון", en: "Making a phone call" },
  { id: "pharmacy", label: "💊 בבית מרקחת", en: "At the pharmacy" },
  { id: "bank", label: "🏦 בבנק", en: "At the bank" },
  { id: "complaint", label: "😟 הגשת תלונה", en: "Making a complaint" },
  { id: "smalltalk", label: "🗣️ שיחת חולין", en: "Making small talk" },
  { id: "rent", label: "🏠 שכירת דירה", en: "Renting an apartment" },
  { id: "meeting", label: "📊 פגישת עבודה", en: "A business meeting" },
];

export function topicForToday(topics: string[]): string {
  const dayIndex = Math.floor(Date.now() / 86_400_000);
  return topics[dayIndex % topics.length];
}
