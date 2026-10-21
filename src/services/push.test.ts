import { describe, it, expect, vi, afterEach } from "vitest";
import { MESSAGING_SW_SCOPE, registerServiceWorker } from "./push";

describe("registerServiceWorker", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("registers the messaging worker outside the app-shell worker's '/' scope", async () => {
    const register = vi.fn().mockResolvedValue({});
    vi.stubGlobal("navigator", { serviceWorker: { register } });

    await registerServiceWorker();

    expect(register).toHaveBeenCalledOnce();
    const [url, options] = register.mock.calls[0] as [string, RegistrationOptions];
    expect(url.startsWith("/firebase-messaging-sw.js")).toBe(true);
    expect(options.scope).toBe(MESSAGING_SW_SCOPE);
    expect(MESSAGING_SW_SCOPE).not.toBe("/");
  });
});
