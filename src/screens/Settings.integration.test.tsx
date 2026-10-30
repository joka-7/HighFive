import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { LingoProvider } from "../store/useLingo";
import { loadAIConfig } from "../services/ai";
import { isNativeApp } from "../services/platform";
import { syncNativeReminders } from "../services/reminders";
import Settings from "./Settings";

// Scopes this file to the legacy hand-built AI settings — see
// Settings.modelPicker.test.tsx for the shared <ModelPicker> path.
vi.mock("../modeldispatcher.config", () => ({ dispatcherFeatures: { ui: false } }));
vi.mock("../services/platform", () => ({ isNativeApp: vi.fn(() => false) }));
vi.mock("../services/firebase", () => ({ firebaseConfig: {}, isPushConfigured: () => true }));
vi.mock("../services/reminders", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../services/reminders")>()),
  requestReminderPermission: vi.fn(async () => "granted"),
  syncNativeReminders: vi.fn(async () => {}),
}));

function renderSettings() {
  return render(
    <LingoProvider>
      <Settings />
    </LingoProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe("Settings screen", () => {
  it("saves the selected provider and key to AI config", () => {
    renderSettings();

    fireEvent.click(screen.getByRole("button", { name: /^Groq/ }));
    fireEvent.change(screen.getByPlaceholderText(/gsk_/i), {
      target: { value: "gsk_integration_test" },
    });
    fireEvent.click(screen.getByRole("button", { name: "שמירה" }));

    const cfg = loadAIConfig();
    expect(cfg.providers[0]?.provider).toBe("groq");
    expect(cfg.providers[0]?.apiKeys).toEqual(["gsk_integration_test"]);
  });

  it("shows the active provider banner once a config is saved", () => {
    renderSettings();

    fireEvent.click(screen.getByRole("button", { name: /^Ollama/ }));
    fireEvent.click(screen.getByRole("button", { name: "שמירה" }));

    expect(screen.getByText(/פעיל: Ollama/)).toBeInTheDocument();
  });

  it("clears AI config back to defaults", () => {
    renderSettings();

    fireEvent.click(screen.getByRole("button", { name: /^Groq/ }));
    fireEvent.change(screen.getByPlaceholderText(/gsk_/i), {
      target: { value: "gsk_integration_test" },
    });
    fireEvent.click(screen.getByRole("button", { name: "שמירה" }));

    fireEvent.click(screen.getByRole("button", { name: "מחיקת הגדרות AI" }));

    const cfg = loadAIConfig();
    expect(cfg.providers).toEqual([]);
  });
});

describe("Settings on each platform", () => {
  const APK_LINK = "🤖 הורדת אפליקציית אנדרואיד";
  const PUSH_CARD = "🔔 תזכורות יומיות";

  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.restoreAllMocks();
  });

  it.each([
    { name: "a browser on Android", ua: "Mozilla/5.0 (Linux; Android 15) Chrome/141.0 Mobile", apk: true },
    { name: "a desktop browser", ua: "Mozilla/5.0 (X11; Linux x86_64) Chrome/141.0", apk: false },
  ])("offers the APK only in $name", ({ ua, apk }) => {
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue(ua);

    renderSettings();

    expect([Boolean(screen.queryByText(APK_LINK)), Boolean(screen.queryByText(PUSH_CARD))]).toEqual([apk, true]);
  });

  it("hides web install, the APK offer and web push inside the Android app", () => {
    vi.mocked(isNativeApp).mockReturnValue(true);
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Linux; Android 15) wv");

    renderSettings();

    expect([
      screen.queryByText("📲 התקנה ושיתוף"),
      screen.queryByText(APK_LINK),
      screen.queryByText(PUSH_CARD),
    ]).toEqual([null, null, null]);
  });

  it("reschedules the Android reminders when the reminder setting changes", async () => {
    vi.mocked(isNativeApp).mockReturnValue(true);
    renderSettings();

    const row = screen.getByText("🔔 תזכורת משימות").closest(".row-between");
    if (!(row instanceof HTMLElement)) throw new Error("reminder row not found");
    fireEvent.click(within(row).getByRole("button", { name: "כבוי" }));

    await waitFor(() => expect(syncNativeReminders).toHaveBeenCalledOnce());
  });
});
