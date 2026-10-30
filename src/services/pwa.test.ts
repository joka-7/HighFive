import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { registerSW } from "virtual:pwa-register";
import { useServiceWorkerUpdate } from "./pwa";
import { isNativeApp } from "./platform";

vi.mock("virtual:pwa-register", () => ({ registerSW: vi.fn(() => async () => {}) }));
vi.mock("./platform", () => ({ isNativeApp: vi.fn(() => false) }));

describe("useServiceWorkerUpdate", () => {
  afterEach(() => {
    vi.mocked(isNativeApp).mockReturnValue(false);
    vi.clearAllMocks();
  });

  it.each([
    { name: "registers the service worker in a browser", native: false, registered: 1 },
    { name: "skips it in the Android app, whose files ship inside the APK", native: true, registered: 0 },
  ])("$name", ({ native, registered }) => {
    vi.mocked(isNativeApp).mockReturnValue(native);

    renderHook(() => useServiceWorkerUpdate());

    expect(registerSW).toHaveBeenCalledTimes(registered);
  });
});
