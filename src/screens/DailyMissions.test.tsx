import { describe, it, expect, beforeEach, vi } from "vitest";
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
});

describe("the five daily operations", () => {
  it("shows all five operations plus the day's words", () => {
    renderMissions();
    for (const op of OPERATIONS) {
      expect(screen.getByRole("heading", { name: op.title })).toBeInTheDocument();
    }
    expect(screen.getByText(/0\/6 הושלמו/)).toBeInTheDocument();
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
    expect(screen.getByText(/1\/6 הושלמו/)).toBeInTheDocument();
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
