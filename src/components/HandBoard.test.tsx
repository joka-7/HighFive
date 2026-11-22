import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { LingoProvider, useLingo } from "../store/useLingo";
import HandBoard from "./HandBoard";
import { OPERATIONS } from "../data/operations";
import type { Screen } from "../types";

// 2026-07-26 is a Sunday (a learning day), 2026-07-31 a Friday (a review day).
const SUNDAY = new Date(2026, 6, 26, 9);
const FRIDAY = new Date(2026, 6, 31, 9);

let completeMission: ReturnType<typeof useLingo>["completeMission"];

function Register({ children }: { children: ReactNode }) {
  const lingo = useLingo();
  completeMission = lingo.completeMission;
  if (!lingo.progress) {
    lingo.registerUser("Dana", "עברית", "A1");
    return null;
  }
  return <>{children}</>;
}

function renderHand(go: (s: Screen) => void = () => {}) {
  return render(
    <LingoProvider>
      <Register>
        <HandBoard go={go} />
      </Register>
    </LingoProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.useFakeTimers({ shouldAdvanceTime: true });
  vi.setSystemTime(SUNDAY);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("HandBoard", () => {
  it("renders one finger per operation, each opening that operation's screen", () => {
    const go = vi.fn();
    renderHand(go);

    for (const op of OPERATIONS) {
      fireEvent.click(screen.getByRole("button", { name: op.title }));
      expect(go).toHaveBeenLastCalledWith(op.screen);
    }
    expect(screen.getByRole("status").textContent).toBe("0 מתוך 5 פעולות");
  });

  it("marks a finger done and points the next-step button at the first unfinished operation", () => {
    const go = vi.fn();
    renderHand(go);

    act(() => completeMission("video", ""));

    expect(screen.getByRole("button", { name: "לראות — הושלם" })).toBeTruthy();
    expect(screen.getByRole("status").textContent).toBe("1 מתוך 5 פעולות");
    const [, second] = OPERATIONS;
    fireEvent.click(screen.getByRole("button", { name: `הבא: ${second?.title} ←` }));
    expect(go).toHaveBeenCalledWith(second?.screen);
  });

  it("opens the vocabulary on a learning day and memorization on a review day", () => {
    const go = vi.fn();
    const { unmount } = renderHand(go);
    fireEvent.click(screen.getByRole("button", { name: "0 מתוך 5 מילים חדשות" }));
    expect(go).toHaveBeenLastCalledWith("vocabulary");
    unmount();

    vi.setSystemTime(FRIDAY);
    renderHand(go);
    fireEvent.click(screen.getByRole("button", { name: /^שינון/ }));
    expect(go).toHaveBeenLastCalledWith("memorize");
  });
});
