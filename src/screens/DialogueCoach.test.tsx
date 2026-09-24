import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { LingoProvider, useLingo } from "../store/useLingo";
import DialogueCoach from "./DialogueCoach";

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

const mockIsAIReady = vi.fn(() => true);
vi.mock("../services/ai", () => ({
  isAIReady: () => mockIsAIReady(),
}));

vi.mock("../services/tts", () => ({
  speak: vi.fn(),
}));

const mockGenerateDialogueReply = vi.fn();
vi.mock("../services/content", () => ({
  generateDialogueReply: (...args: unknown[]) => mockGenerateDialogueReply(...args),
}));

function Register({ children }: { children: ReactNode }) {
  const { progress, registerUser } = useLingo();
  if (!progress) {
    registerUser("Dana", "עברית", "A1");
    return null;
  }
  return <>{children}</>;
}

function renderCoach() {
  return render(
    <LingoProvider>
      <Register>
        <DialogueCoach go={() => {}} />
      </Register>
    </LingoProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
  mockIsAIReady.mockReturnValue(true);
});

describe("DialogueCoach external AI escape hatch", () => {
  it("offers external AI chat links for the failed message once generateDialogueReply rejects", async () => {
    mockGenerateDialogueReply.mockRejectedValueOnce(new Error("network down"));
    renderCoach();

    fireEvent.click(screen.getByText("☕ בבית קפה"));
    const input = screen.getByPlaceholderText("Type in English...");
    fireEvent.change(input, { target: { value: "Can I get a coffee?" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("network down")).toBeInTheDocument();
    });
    const claudeLink = screen.getByRole("link", { name: "Claude" });
    expect(claudeLink).toHaveAttribute("target", "_blank");
    const url = new URL(claudeLink.getAttribute("href")!);
    expect(url.hostname).toBe("claude.ai");
    expect(url.searchParams.get("q")).toBe("Can I get a coffee?");
    expect(screen.getByRole("link", { name: "ChatGPT" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Gemini (Google AI Mode)" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Groq" })).toBeInTheDocument();
  });

  it("does not show external AI chat links when there is no error", async () => {
    mockGenerateDialogueReply.mockResolvedValueOnce({ reply: "Sure!", corrections: null });
    renderCoach();

    fireEvent.click(screen.getByText("☕ בבית קפה"));
    const input = screen.getByPlaceholderText("Type in English...");
    fireEvent.change(input, { target: { value: "Can I get a coffee?" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("Sure!")).toBeInTheDocument();
    });
    expect(screen.queryByRole("link", { name: "Claude" })).toBeNull();
  });
});

describe("DialogueCoach — no provider configured", () => {
  it("shows a way to open Settings, with no favorite saved", () => {
    mockIsAIReady.mockReturnValue(false);
    const go = vi.fn();
    render(
      <LingoProvider>
        <Register>
          <DialogueCoach go={go} />
        </Register>
      </LingoProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "פתיחת הגדרות AI" }));
    expect(go).toHaveBeenCalledWith("settings");
    expect(screen.queryByRole("button", { name: /^שאלו את /i })).toBeNull();
  });

  it("also offers to ask the saved favorite for free, no key required", () => {
    mockIsAIReady.mockReturnValue(false);
    localStorage.setItem("aiExternalChatFavorite", "claude");
    render(
      <LingoProvider>
        <Register>
          <DialogueCoach go={() => {}} />
        </Register>
      </LingoProvider>,
    );

    expect(screen.getByRole("button", { name: "שאלו את Claude" })).toBeInTheDocument();
  });
});

describe("DialogueCoach — conversation intro", () => {
  it("shows the on-screen AI-conversation notice once a scenario is picked, before any message", () => {
    renderCoach();
    fireEvent.click(screen.getByText("☕ בבית קפה"));
    expect(screen.getByRole("note")).toHaveTextContent("אתם משוחחים עם AI");
  });
});
