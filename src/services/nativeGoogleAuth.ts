// Google sign-in for the Android app (ported from KanDOne).
//
// Google refuses OAuth inside an embedded WebView, so driveSync's browser token
// popup cannot run in the Capacitor shell. This asks Android itself
// (Credential Manager + AuthorizationClient, via @capgo/capacitor-social-login)
// for the same `drive.appdata` access token, and can renew it without any UI
// once the user has granted it, which the browser flow cannot.
//
// Tokens come back in the shape Google's browser token client uses
// (`{ access_token, expires_in }`) so driveSync treats both alike.

import type { FetchLike, GisTokenResponse, NativeAuth } from "./driveSync";

const SCOPES = ["https://www.googleapis.com/auth/drive.appdata", "email", "profile"];
const TOKENINFO_URL = "https://oauth2.googleapis.com/tokeninfo";

/** The slice of the SocialLogin plugin this module uses. */
export interface SocialLoginPort {
  initialize(options: { google: { webClientId: string; mode: "online" } }): Promise<void>;
  /** Shows Google's account sheet; resolves the access token, if Google returned one. */
  login(scopes: readonly string[]): Promise<string | null>;
  refresh(scopes: readonly string[]): Promise<void>;
  /** The current access token, renewed by `refresh` without UI. */
  currentToken(): Promise<string | null>;
  logout(): Promise<void>;
}

async function loadSocialLogin(): Promise<SocialLoginPort> {
  const { SocialLogin } = await import("@capgo/capacitor-social-login");
  return {
    initialize: (options) => SocialLogin.initialize(options),
    login: async (scopes) => {
      const { result } = await SocialLogin.login({ provider: "google", options: { scopes: [...scopes] } });
      return "accessToken" in result ? (result.accessToken?.token ?? null) : null;
    },
    refresh: (scopes) => SocialLogin.refresh({ provider: "google", options: { scopes: [...scopes] } }),
    currentToken: async () => (await SocialLogin.getAuthorizationCode({ provider: "google" })).accessToken ?? null,
    logout: () => SocialLogin.logout({ provider: "google" }),
  };
}

export interface NativeGoogleAuthDeps {
  /** The OAuth *Web* client ID; Android matches it to the Android client registered for this package and key. */
  readonly webClientId: string;
  readonly fetchImpl: FetchLike;
  readonly loadPlugin?: () => Promise<SocialLoginPort>;
}

export function createNativeGoogleAuth({
  webClientId,
  fetchImpl,
  loadPlugin = loadSocialLogin,
}: NativeGoogleAuthDeps): NativeAuth {
  let ready: Promise<SocialLoginPort> | null = null;

  function plugin(): Promise<SocialLoginPort> {
    ready ??= loadPlugin()
      .then(async (socialLogin) => {
        await socialLogin.initialize({ google: { webClientId, mode: "online" } });
        return socialLogin;
      })
      .catch((err: unknown) => {
        ready = null;
        throw err;
      });
    return ready;
  }

  /** The plugin does not report expiry, and a cached token may be part-way through its hour. */
  async function withExpiry(accessToken: string | null): Promise<GisTokenResponse | null> {
    if (!accessToken) return null;
    const res = await fetchImpl(`${TOKENINFO_URL}?access_token=${encodeURIComponent(accessToken)}`);
    // 400 is Google saying the token is invalid; anything else is a failed
    // check, which must not be reported to the user as "access denied".
    if (res.status === 400) return null;
    if (!res.ok) throw new Error(`Could not check the Google token (${res.status}).`);
    const info = (await res.json()) as { expires_in?: unknown };
    const expiresIn = Number(info.expires_in);
    return Number.isFinite(expiresIn) && expiresIn > 0 ? { access_token: accessToken, expires_in: expiresIn } : null;
  }

  return {
    /**
     * Interactive shows Google's account sheet; silent renews a token the user
     * already granted, and rejects if that needs the user. Resolves `null`
     * when Google returned no usable Drive token.
     */
    async requestToken({ interactive }) {
      const socialLogin = await plugin();
      if (interactive) return withExpiry(await socialLogin.login(SCOPES));
      await socialLogin.refresh(SCOPES);
      return withExpiry(await socialLogin.currentToken());
    },

    async signOut() {
      const socialLogin = await plugin();
      await socialLogin.logout();
    },
  };
}
