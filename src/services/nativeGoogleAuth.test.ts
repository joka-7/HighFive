import { describe, expect, it, vi } from "vitest";
import { createNativeGoogleAuth, type SocialLoginPort } from "./nativeGoogleAuth";
import type { FetchLike } from "./driveSync";

const DRIVE_SCOPE = "https://www.googleapis.com/auth/drive.appdata";

function fakePlugin({
  loginToken = "login-token" as string | null,
  silentToken = "silent-token" as string | null,
  initFailures = 0,
} = {}) {
  let failuresLeft = initFailures;
  return {
    initialize: vi.fn(async () => {
      if (failuresLeft > 0) {
        failuresLeft -= 1;
        throw new Error("init failed");
      }
    }),
    login: vi.fn<SocialLoginPort["login"]>(async () => loginToken),
    refresh: vi.fn<SocialLoginPort["refresh"]>(async () => {}),
    currentToken: vi.fn(async () => silentToken),
    logout: vi.fn(async () => {}),
  } satisfies SocialLoginPort;
}

/** Fake Google tokeninfo: reports `expiresIn` seconds left, or fails with `status`. */
function fakeTokenInfo({ expiresIn = 1800, status = 200 } = {}): FetchLike {
  return vi.fn(async () => ({
    ok: status < 400,
    status,
    json: async () => ({ expires_in: String(expiresIn) }),
    text: async () => "",
  }));
}

function build({ plugin = fakePlugin(), fetchImpl = fakeTokenInfo() } = {}) {
  const auth = createNativeGoogleAuth({ webClientId: "web-client", fetchImpl, loadPlugin: async () => plugin });
  return { auth, plugin };
}

describe("createNativeGoogleAuth", () => {
  describe("requestToken", () => {
    it("asks for Drive access interactively and reports the time the token has left", async () => {
      const { auth, plugin } = build();

      const token = await auth.requestToken({ interactive: true });

      expect([token, plugin.login.mock.calls[0]?.[0].includes(DRIVE_SCOPE)]).toEqual([
        { access_token: "login-token", expires_in: 1800 },
        true,
      ]);
    });

    it("renews silently without showing the account sheet", async () => {
      const { auth, plugin } = build();

      const token = await auth.requestToken({ interactive: false });

      expect([token, plugin.refresh.mock.calls.length, plugin.login.mock.calls.length]).toEqual([
        { access_token: "silent-token", expires_in: 1800 },
        1,
        0,
      ]);
    });

    it.each([
      { name: "Google returned no access token", options: { plugin: fakePlugin({ loginToken: null }) } },
      { name: "Google says the token is not valid", options: { fetchImpl: fakeTokenInfo({ status: 400 }) } },
      { name: "the token has no time left", options: { fetchImpl: fakeTokenInfo({ expiresIn: 0 }) } },
    ])("resolves null when $name", async ({ options }) => {
      const { auth } = build(options);

      expect(await auth.requestToken({ interactive: true })).toBeNull();
    });

    it("rejects rather than reporting a denied grant when the token check itself fails", async () => {
      const { auth } = build({ fetchImpl: fakeTokenInfo({ status: 503 }) });

      await expect(auth.requestToken({ interactive: true })).rejects.toThrow("503");
    });

    it("initialises the plugin once with the web client id, and retries after a failed start", async () => {
      const plugin = fakePlugin({ initFailures: 1 });
      const { auth } = build({ plugin });

      await expect(auth.requestToken({ interactive: true })).rejects.toThrow("init failed");
      await auth.requestToken({ interactive: true });
      await auth.requestToken({ interactive: false });

      expect(plugin.initialize.mock.calls).toEqual([
        [{ google: { webClientId: "web-client", mode: "online" } }],
        [{ google: { webClientId: "web-client", mode: "online" } }],
      ]);
    });
  });

  describe("signOut", () => {
    it("signs the Google account out on the device", async () => {
      const { auth, plugin } = build();

      await auth.signOut();

      expect(plugin.logout).toHaveBeenCalledOnce();
    });
  });
});
