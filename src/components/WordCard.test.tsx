import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import WordCard from "./WordCard";
import type { GemWord } from "../types";

vi.mock("../services/tts", () => ({ speak: vi.fn() }));

const base: GemWord = {
  word: "explode",
  partOfSpeech: "verb",
  definition: "להתפוצץ",
  example: "The balloon will explode.",
  translation: "להתפוצץ",
};

describe("WordCard", () => {
  it.each([
    {
      name: "shows the curriculum band, skill type, word family and context note when the word has them",
      word: { ...base, band: "III", skillType: "productive", wordFamily: "explode (v) → explosion (n)", contextNote: "שימו לב לאיות." },
      shown: ["Band III · לשימוש פעיל (דיבור וכתיבה)", "explode (v) → explosion (n)", "💡 שימו לב לאיות."],
      hidden: [],
    },
    {
      name: "shows only the band when that is all the word has",
      word: { ...base, band: "I" },
      shown: ["Band I"],
      hidden: ["משפחת מילים:", "💡"],
    },
    {
      name: "shows no curriculum details for an untagged word",
      word: base,
      shown: [],
      hidden: ["Band", "משפחת מילים:", "💡"],
    },
  ] satisfies { name: string; word: GemWord; shown: string[]; hidden: string[] }[])("$name", ({ word, shown, hidden }) => {
    const { container } = render(<WordCard word={word} saved={false} onToggleSave={() => {}} />);

    const text = container.textContent ?? "";
    expect([shown.every((s) => text.includes(s)), hidden.some((h) => text.includes(h))]).toEqual([true, false]);
    expect(screen.getByText(word.word)).toBeInTheDocument();
  });
});
