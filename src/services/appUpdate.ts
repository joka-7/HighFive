// "Is there a newer High5 APK?" for the Android app. The release workflow
// (.github/workflows/android.yml) tags every build `android-1.0.<run number>`
// and uses the same run number as the APK's versionCode, so the newest release
// tag and the installed build number compare directly.
//
// Nothing runs in the background: the check happens only when the learner taps
// the button in Settings, and installing is left to Android (the learner opens
// the downloaded APK), so no install permission is needed.

import { App } from "@capacitor/app";

const LATEST_RELEASE_URL = "https://api.github.com/repos/joka-7/HighFive/releases/latest";
const TAG_PATTERN = /^android-(\d+\.\d+\.(\d+))$/;

export class UpdateCheckError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UpdateCheckError";
  }
}

export interface InstalledApp {
  /** The APK's versionCode — the release workflow's run number. */
  readonly build: number;
  /** The APK's versionName, e.g. `1.0.123`. */
  readonly version: string;
}

export type UpdateCheck =
  | { readonly status: "current"; readonly installed: InstalledApp }
  | { readonly status: "available"; readonly installed: InstalledApp; readonly latestVersion: string };

/** The slice of @capacitor/app this module uses. */
export interface AppInfoPort {
  getInfo(): Promise<{ build: string; version: string }>;
}

export interface UpdateCheckDeps {
  readonly app?: AppInfoPort;
  readonly fetchJson?: (url: string) => Promise<unknown>;
}

async function defaultFetchJson(url: string): Promise<unknown> {
  const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!response.ok) throw new UpdateCheckError(`GitHub answered ${response.status}`);
  return response.json();
}

function tagNameOf(release: unknown): string {
  if (typeof release === "object" && release !== null && "tag_name" in release) {
    const { tag_name } = release;
    if (typeof tag_name === "string") return tag_name;
  }
  throw new UpdateCheckError("The latest release has no tag name");
}

export async function readInstalledApp(app: AppInfoPort = App): Promise<InstalledApp> {
  const info = await app.getInfo();
  const build = Number(info.build);
  if (!Number.isInteger(build)) throw new UpdateCheckError(`Unreadable build number "${info.build}"`);
  return { build, version: info.version };
}

export async function checkForUpdate({
  app = App,
  fetchJson = defaultFetchJson,
}: UpdateCheckDeps = {}): Promise<UpdateCheck> {
  const [installed, release] = await Promise.all([readInstalledApp(app), fetchJson(LATEST_RELEASE_URL)]);
  const tag = tagNameOf(release);
  const match = TAG_PATTERN.exec(tag);
  const latestVersion = match?.[1];
  const latestBuild = Number(match?.[2]);
  if (latestVersion === undefined) throw new UpdateCheckError(`Unrecognised release tag "${tag}"`);
  return latestBuild > installed.build
    ? { status: "available", installed, latestVersion }
    : { status: "current", installed };
}
