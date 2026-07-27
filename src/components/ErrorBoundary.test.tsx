import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

function Boom(): never {
  throw new Error("boom");
}

describe("ErrorBoundary", () => {
  it("shows a recovery UI when a child throws, and retries on click", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    let shouldThrow = true;

    function Child() {
      if (shouldThrow) return <Boom />;
      return <div>הכל תקין</div>;
    }

    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("משהו השתבש")).toBeInTheDocument();

    shouldThrow = false;
    fireEvent.click(screen.getByRole("button", { name: /נסו שוב/ }));
    expect(screen.getByText("הכל תקין")).toBeInTheDocument();

    spy.mockRestore();
  });
});
