import type { GemQuestion, Level } from "../types";

// Short placement test (3 grammar questions). Scoring matches High5's onboarding
// algorithm: 0-1 correct → A1, 2 correct → B1, 3 correct → C1.
export const PLACEMENT_QUESTIONS: GemQuestion[] = [
  {
    question: "She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    correctIndex: 1,
    explanation: "עם גוף שלישי יחיד (she) מוסיפים s לפועל בהווה פשוט: goes.",
  },
  {
    question: "If I ___ more time, I would travel the world.",
    options: ["have", "had", "will have", "having"],
    correctIndex: 1,
    explanation: "תנאי שני מתאר מצב דמיוני: If + past simple (had) + would.",
  },
  {
    question: "Rarely ___ such a beautiful performance.",
    options: [
      "I have seen",
      "have I seen",
      "I saw",
      "did I have seen",
    ],
    correctIndex: 1,
    explanation:
      "אחרי ביטוי שלילי בתחילת משפט (Rarely) בא היפוך: have I seen.",
  },
];

export function levelFromScore(score: number): Level {
  if (score <= 1) return "A1";
  if (score === 2) return "B1";
  return "C1";
}
