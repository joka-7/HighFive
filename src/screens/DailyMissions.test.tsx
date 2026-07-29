import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { LingoProvider, useLingo } from "../store/useLingo";
import DailyMissions from "./DailyMissions";
import { OPERATIONS } from "../data/operations";

vi.mock("../services/firebase", () => ({
  isCloudConfigured: () => false,
  watchAuth: (cb: (user: null) => void) => {
    cb(null);
    return () => {};
  },
  loadCloud: vi.fn(),
  saveCloud: vi.fn(),
  signInWithGoogle: vi.fn(),
  signOut: vi.fn(),
}));

// 2026-07-26 is a Sunday (a learning day), 2026-07-31 a Friday (a review day).
// Built with the local Date constructor so the weekday holds in any timezone.
const SUNDAY = new Date(2026, 6, 26, 9);
const FRIDAY = new Date(2026, 6, 31, 9);

function Register({ children }: { children: ReactNode }) {
  const { progress, registerUser } = useLingo();
  if (!progress) {
    registerUser("Dana", "עברית", "A1");
    return null;
  }
  return <>{children}</>;
}

function renderMissions() {
  return render(
    <LingoProvider>
      <Register>
        <DailyMissions go={() => {}} />
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

describe("the five daily operations", () => {
  it("counts five missions, with the day's words in their own box", () => {
    renderMissions();
    for (const op of OPERATIONS) {
      expect(screen.getByRole("heading", { name: op.title })).toBeInTheDocument();
    }
    // The words box is present but outside the checklist count.
    expect(screen.getByRole("heading", { name: /למדו 5 מילים חדשות/ })).toBeInTheDocument();
    expect(screen.getByText(/0\/5 הושלמו/)).toBeInTheDocument();
  });

  it("completes an operation done in another app, with what was listened to", () => {
    renderMissions();

    const listenCard = screen.getByRole("heading", { name: "להקשיב" }).closest(".card")!;
    fireEvent.click(within(listenCard as HTMLElement).getByRole("button", { name: /אפליקציה אחרת/ }));

    fireEvent.change(within(listenCard as HTMLElement).getByLabelText("למה הקשבתם?"), {
      target: { value: "6 Minute English" },
    });
    fireEvent.click(within(listenCard as HTMLElement).getByRole("button", { name: /סמנו כהושלם/ }));

    expect(screen.getByText("6 Minute English")).toBeInTheDocument();
    expect(screen.getByText(/1\/5 הושלמו/)).toBeInTheDocument();
  });

  it("offers links out to other apps for each operation", () => {
    renderMissions();
    const seeCard = screen.getByRole("heading", { name: "לראות" }).closest(".card")!;
    fireEvent.click(within(seeCard as HTMLElement).getByRole("button", { name: /אפליקציה אחרת/ }));

    const link = within(seeCard as HTMLElement).getByRole("link", { name: /YouTube/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});

describe("the words box", () => {
  it("offers the day's new words on a learning day", () => {
    renderMissions();
    expect(screen.getByRole("heading", { name: /למדו 5 מילים חדשות/ })).toBeInTheDocument();
    expect(screen.getByText("0/5 מילים")).toBeInTheDocument();
    expect(screen.getByText(/יום 1 מתוך 5/)).toBeInTheDocument();
  });

  it("turns into the week's 25-word review on Friday", () => {
    vi.setSystemTime(FRIDAY);
    renderMissions();

    expect(screen.getByRole("heading", { name: /חזרו על 25 מילות השבוע/ })).toBeInTheDocument();
    expect(screen.queryByText("0/5 מילים")).not.toBeInTheDocument();
    expect(screen.getByText(/סוף שבוע — חוזרים על 25 מילות השבוע/)).toBeInTheDocument();
    // Still exactly five missions in the checklist.
    expect(screen.getByText(/0\/5 הושלמו/)).toBeInTheDocument();
  });
});
