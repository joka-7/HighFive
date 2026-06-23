import type { GemQuestion, Level } from "../types";

// Placement test — 6 grammar questions of increasing difficulty, one targeting
// each CEFR band (A1 → C2). The number correct maps to a starting level.
export const PLACEMENT_QUESTIONS: GemQuestion[] = [
  {
    // A1 — present simple, 3rd person
    question: "She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correctIndex: 1,
    explanation: "עם גוף שלישי יחיד (she) מוסיפים s לפועל בהווה פשוט: goes.",
  },
  {
    // A2 — past simple (irregular)
    question: "We ___ to Paris last summer.",
    options: ["go", "went", "gone", "are going"],
    correctIndex: 1,
    explanation: "עבר פשוט של go הוא went. 'last summer' מציין עבר.",
  },
  {
    // B1 — present perfect vs past
    question: "I ___ already finished my homework.",
    options: ["have", "has", "am", "did"],
    correctIndex: 0,
    explanation: "Present Perfect עם I נבנה עם have + V3: I have finished.",
  },
  {
    // B2 — second conditional
    question: "If I ___ more time, I would travel the world.",
    options: ["have", "had", "will have", "having"],
    correctIndex: 1,
    explanation: "תנאי שני מתאר מצב דמיוני: If + past simple (had) + would.",
  },
  {
    // C1 — negative inversion
    question: "Rarely ___ such a beautiful performance.",
    options: ["I have seen", "have I seen", "I saw", "did I have seen"],
    correctIndex: 1,
    explanation: "אחרי ביטוי שלילי בתחילת משפט (Rarely) בא היפוך: have I seen.",
  },
  {
    // C2 — inverted third conditional
    question: "___ harder, he would have passed the exam.",
    options: ["If he studied", "Had he studied", "He had studied", "Did he study"],
    correctIndex: 1,
    explanation:
      "תנאי שלישי בהיפוך, ללא 'if': Had he studied = If he had studied.",
  },
];

// Number correct → starting level. Each step up requires answering the harder
// questions, so a higher score places the learner at a higher band.
export function levelFromScore(score: number): Level {
  if (score <= 1) return "A1";
  if (score === 2) return "A2";
  if (score === 3) return "B1";
  if (score === 4) return "B2";
  if (score === 5) return "C1";
  return "C2";
}
