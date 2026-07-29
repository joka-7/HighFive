import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { LingoProvider } from "./store/useLingo";
import App from "./App";

function renderApp() {
  return render(
    <LingoProvider>
      <App />
    </LingoProvider>,
  );
}

beforeEach(() => {
  localStorage.clear();
});

describe("App onboarding-to-dashboard flow", () => {
  it("registers a new user via manual level pick and lands on the dashboard", () => {
    renderApp();

    fireEvent.change(screen.getByPlaceholderText("השם שלך"), {
      target: { value: "Dana" },
    });
    fireEvent.click(screen.getByRole("button", { name: /בואו נתחיל/ }));

    fireEvent.click(screen.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }));
    fireEvent.click(screen.getByRole("button", { name: "B1" }));

    expect(screen.getByText(/שלום, Dana/)).toBeInTheDocument();
    // The level lives in the top bar's status chips — the dashboard hero no
    // longer repeats it.
    expect(screen.getByLabelText("רמה B1")).toBeInTheDocument();
  });

  it("navigates from the dashboard to settings and back via the bottom nav", () => {
    renderApp();
    fireEvent.change(screen.getByPlaceholderText("השם שלך"), {
      target: { value: "Dana" },
    });
    fireEvent.click(screen.getByRole("button", { name: /בואו נתחיל/ }));
    fireEvent.click(screen.getByRole("button", { name: "✍️ אבחר רמה בעצמי" }));
    fireEvent.click(screen.getByRole("button", { name: "A1" }));

    const nav = screen.getByRole("navigation");
    fireEvent.click(within(nav).getByRole("button", { name: /הגדרות/ }));
    expect(screen.getByText("🤖 הגדרות AI")).toBeInTheDocument();

    fireEvent.click(within(nav).getByRole("button", { name: /בית/ }));
    expect(screen.getByText(/שלום, Dana/)).toBeInTheDocument();
  });
});
