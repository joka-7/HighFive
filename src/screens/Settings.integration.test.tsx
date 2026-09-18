import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LingoProvider } from "../store/useLingo";
import { loadAIConfig } from "../services/ai";
import Settings from "./Settings";

// Scopes this file to the legacy hand-built AI settings — see
// Settings.modelPicker.test.tsx for the shared <ModelPicker> path.
vi.mock("../modeldispatcher.config", () => ({ dispatcherFeatures: { ui: false } }));

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
