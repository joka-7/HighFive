import type { GemListening, GemReading, GemSpeaking, Level } from "../types";
import { LEVELS } from "../types";
import { pickRandom } from "./offline";

// Bundled offline content for the "real use" pillars (Reading Lab, Listening,
// Speaking). Kept separate from the per-level offline/*.json files so those stay
// untouched. Not every level needs an entry — `pickExtra` falls back to the
// nearest available level so the offline experience never breaks.

export const READINGS: Partial<Record<Level, GemReading[]>> = {
  A1: [
    {
      title: "My Morning (הבוקר שלי)",
      text: "I wake up at seven. I drink water and eat bread with cheese. Then I go to work by bus. The bus is often full, but I like to look out the window. At work, I say hello to my friends.",
      glossary: [
        { word: "wake up", partOfSpeech: "verb", definition: "להתעורר משינה", example: "I wake up early.", translation: "להתעורר" },
        { word: "bus", partOfSpeech: "noun", definition: "כלי תחבורה ציבורי גדול", example: "The bus is full.", translation: "אוטובוס" },
        { word: "full", partOfSpeech: "adjective", definition: "מלא, אין מקום פנוי", example: "The cup is full.", translation: "מלא" },
      ],
      questions: [
        { question: "When does the writer wake up?", options: ["At six", "At seven", "At eight", "At nine"], correctIndex: 1, explanation: "במשפט הראשון כתוב 'I wake up at seven' — בשבע." },
        { question: "How does the writer go to work?", options: ["By car", "By bike", "By bus", "On foot"], correctIndex: 2, explanation: "כתוב 'I go to work by bus' — באוטובוס." },
      ],
    },
  ],
  B1: [
    {
      title: "A Small Change (שינוי קטן)",
      text: "Last year I decided to read one short article in English every day. At first it was difficult, and I had to look up many words. After a few months, something surprising happened: I started to understand the news without translating it in my head. The secret was not talent — it was doing a little, every single day.",
      glossary: [
        { word: "decided", partOfSpeech: "verb", definition: "החליט, קיבל החלטה", example: "She decided to study.", translation: "החליט" },
        { word: "look up", partOfSpeech: "phrasal verb", definition: "לחפש מידע (למשל מילה במילון)", example: "Look up the word.", translation: "לחפש (במילון)" },
        { word: "surprising", partOfSpeech: "adjective", definition: "מפתיע, לא צפוי", example: "It was a surprising result.", translation: "מפתיע" },
      ],
      questions: [
        { question: "What did the writer do every day?", options: ["Watch a film", "Read a short article", "Write a letter", "Take a class"], correctIndex: 1, explanation: "'read one short article in English every day' — קרא מאמר קצר כל יום." },
        { question: "What was the 'secret' of the progress?", options: ["Natural talent", "Living abroad", "A little practice every day", "An expensive course"], correctIndex: 2, explanation: "המשפט האחרון: 'doing a little, every single day' — מעט, בכל יום." },
      ],
    },
  ],
  C1: [
    {
      title: "The Illusion of Progress (אשליית ההתקדמות)",
      text: "Language apps are remarkably good at making us feel productive. We collect streaks, badges and points, and the little rush of completing a lesson convinces us we are mastering the language. Yet fluency is built elsewhere — in messy conversations, in texts we only half understand, in the discomfort of speaking before we feel ready. The game is a doorway, not the room itself.",
      glossary: [
        { word: "remarkably", partOfSpeech: "adverb", definition: "באופן יוצא דופן, בצורה בולטת", example: "She is remarkably calm.", translation: "באופן יוצא דופן" },
        { word: "fluency", partOfSpeech: "noun", definition: "שטף, היכולת לדבר בקלות וברציפות", example: "He speaks with fluency.", translation: "שטף (בשפה)" },
        { word: "discomfort", partOfSpeech: "noun", definition: "אי-נוחות, תחושה לא נעימה", example: "A little discomfort helps you grow.", translation: "אי-נוחות" },
      ],
      questions: [
        { question: "What does the writer say apps are good at?", options: ["Teaching grammar perfectly", "Making us feel productive", "Replacing teachers", "Translating texts"], correctIndex: 1, explanation: "'good at making us feel productive' — גורמים לנו להרגיש פרודוקטיביים." },
        { question: "According to the text, fluency is built mainly through…", options: ["Streaks and badges", "Real, messy use of the language", "Completing more lessons", "Collecting points"], correctIndex: 1, explanation: "השטף נבנה בשיחות, בטקסטים, ובדיבור לא נוח — בשימוש אמיתי." },
      ],
    },
  ],
};

export const LISTENINGS: Partial<Record<Level, GemListening[]>> = {
  A1: [
    {
      transcript: "Hi, I'm Dan. I have a sister and a dog. We live in a small house near the park.",
      questions: [
        { question: "What is the speaker's name?", options: ["Sam", "Dan", "Tom", "Ben"], correctIndex: 1, explanation: "המשפט הראשון: 'I'm Dan'." },
        { question: "Where do they live?", options: ["Near the sea", "Near the park", "In the city center", "On a farm"], correctIndex: 1, explanation: "'a small house near the park' — ליד הפארק." },
      ],
    },
  ],
  B1: [
    {
      transcript: "Thanks for calling the clinic. We're open from nine to five, Monday to Friday. If you'd like to book an appointment, please press one and leave your name.",
      questions: [
        { question: "What kind of place is this?", options: ["A shop", "A clinic", "A school", "A bank"], correctIndex: 1, explanation: "'Thanks for calling the clinic' — מרפאה." },
        { question: "What should you press to book an appointment?", options: ["One", "Two", "Three", "The star key"], correctIndex: 0, explanation: "'please press one' — לחצו אחת." },
      ],
    },
  ],
  C1: [
    {
      transcript: "While the committee broadly welcomed the proposal, several members raised concerns about the timeline, arguing that a phased rollout would be far less disruptive than the sweeping changes originally suggested.",
      questions: [
        { question: "What was the committee's overall reaction to the proposal?", options: ["They rejected it", "They broadly welcomed it", "They ignored it", "They postponed it"], correctIndex: 1, explanation: "'the committee broadly welcomed the proposal'." },
        { question: "What did some members prefer?", options: ["Sweeping changes", "Cancelling the project", "A phased rollout", "A larger budget"], correctIndex: 2, explanation: "'a phased rollout would be far less disruptive' — השקה מדורגת." },
      ],
    },
  ],
};

export const SPEAKINGS: Partial<Record<Level, GemSpeaking[]>> = {
  A1: [
    {
      prompts: [
        { text: "Good morning! How are you?", translation: "בוקר טוב! מה שלומך?" },
        { text: "My name is Maya and I live in Tel Aviv.", translation: "שמי מאיה ואני גרה בתל אביב." },
        { text: "I would like a cup of coffee, please.", translation: "אני רוצה כוס קפה, בבקשה." },
      ],
    },
  ],
  B1: [
    {
      prompts: [
        { text: "I've been learning English for about two years.", translation: "אני לומד אנגלית כבר בערך שנתיים." },
        { text: "Could you tell me how to get to the station?", translation: "תוכל לומר לי איך להגיע לתחנה?" },
        { text: "I think this restaurant is better than the other one.", translation: "אני חושב שהמסעדה הזו טובה יותר מהשנייה." },
      ],
    },
  ],
  C1: [
    {
      prompts: [
        { text: "Despite the challenges, I'm confident we can meet the deadline.", translation: "למרות האתגרים, אני בטוח שנוכל לעמוד בלוח הזמנים." },
        { text: "I'd argue that the benefits clearly outweigh the risks.", translation: "אני טוען שהיתרונות עולים בבירור על הסיכונים." },
        { text: "Let's not jump to conclusions before we've seen the data.", translation: "בוא לא נקפוץ למסקנות לפני שראינו את הנתונים." },
      ],
    },
  ],
};

// Pick a random item for the given level, falling back to the nearest level that
// has content so the offline path always returns something.
export function pickExtra<T>(map: Partial<Record<Level, T[]>>, level: Level): T {
  const here = map[level];
  if (here && here.length) return pickRandom(here);
  for (const lvl of LEVELS) {
    const items = map[lvl];
    if (items && items.length) return pickRandom(items);
  }
  throw new Error("No offline content available for this feature.");
}
