import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LingoProvider } from "../store/useLingo";
import { loadAIConfig } from "../services/ai";
import Settings from "./Settings";

// The shared <ModelPicker> path — what actually renders by default. See
// Settings.integration.test.tsx for the legacy hand-built UI it replaces.
vi.mock("../modeldispatcher.config", () => ({ dispatcherFeatures: { ui: true } }));

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

describe("Settings screen — ModelPicker path (dispatcherFeatures.ui: true)", () => {
  it("renders the shared ModelPicker empty state with no providers configured", () => {
    renderSettings();
    expect(screen.getByText(/No providers added yet/i)).toBeInTheDocument();
  });

  it("adding a provider through ModelPicker persists via saveConfig", async () => {
    const user = userEvent.setup();
    renderSettings();

    const select = screen.getByLabelText("Choose a provider to add");
    await user.selectOptions(select, "groq");
    await user.click(screen.getByRole("button", { name: "+ Add provider" }));

    const cfg = loadAIConfig();
    expect(cfg.providers).toEqual([
      { provider: "groq", model: expect.any(String), apiKeys: [] },
    ]);
  });
});
