import { describe, it, expect, beforeEach, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useCallback, useState } from "react";
import type { DailyMissionsState, SavedWord, UserProgress } from "../types";
import { DriveSyncError, type DriveSync, type DriveUser, type MergedView, type SyncItem } from "../services/driveSync";
import type { SyncedState } from "../utils/cloudMerge";
import { readDataOwner, readPending, writeDataOwner } from "../utils/pendingSync";
import { useCloudSync } from "./useCloudSync";

const USER: DriveUser = { uid: "uid-1", email: "dana@example.com", displayName: "Dana" };

const missions = (date = "2026-10-21"): DailyMissionsState => ({
  date,
  video: false,
  talk: false,
  words: false,
  reading: false,
  listening: false,
  speaking: false,
  grammar: false,
  memorization: false,
  speakingCount: 0,
  externalNotes: {},
});

const progress = (points: number): UserProgress => ({
  userName: "Dana",
  nativeLanguage: "עברית",
  currentLevel: "A1",
  points,
  streak: 1,
  lastActiveTimestamp: 1,
  dailyLessonCompletedText: "",
});

const word = (id: string, w: string, savedAt = 1): SavedWord => ({
  id,
  word: w,
  partOfSpeech: "noun",
  definition: "d",
  example: "e",
  translation: "t",
  level: "A1",
  isMastered: false,
  savedAt,
});

const empty = (): SyncedState => ({
  progress: null,
  dailyMissions: missions(""),
  savedWords: [],
  learnedWords: {},
  chatMessages: [],
  quizHistory: [],
  missionLog: [],
});

const defaults = { progress: null, dailyMissions: missions("") };

interface FakeOptions {
  linked?: boolean;
  user?: DriveUser | null;
  cloud?: MergedView;
  loadError?: unknown;
  uploadError?: unknown;
}

/** In-memory stand-in for the Drive client: records what was sent, answers pulls from `cloud`. */
function fakeSync({ linked = true, user = USER, cloud = { profile: {}, collections: {}, deleted: {} }, loadError, uploadError }: FakeOptions = {}) {
  let listener: (u: DriveUser | null) => void = () => {};
  let isLinkedNow = linked;
  let current = user;
  const upserts: Record<string, string[]> = {};
  const deletes: Record<string, string[]> = {};
  const profiles: Record<string, unknown>[] = [];
  const settle = () => (uploadError ? Promise.reject(uploadError) : Promise.resolve());
  const sync: DriveSync = {
    isCloudConfigured: () => true,
    hasRestorableSession: async () => isLinkedNow,
    isLinked: () => isLinkedNow,
    onAuthChange: (cb) => {
      listener = cb;
      cb(current);
      return () => {};
    },
    signInWithGoogle: vi.fn(async () => {
      isLinkedNow = true;
      current = USER;
      listener(USER);
      return USER;
    }),
    signOut: vi.fn(async () => {
      isLinkedNow = false;
      current = null;
      listener(null);
    }),
    deleteAllSyncedData: vi.fn(async () => {
      isLinkedNow = false;
      current = null;
      listener(null);
    }),
    loadMerged: vi.fn(async () => {
      if (loadError) throw loadError;
      return cloud;
    }),
    saveProfile: vi.fn(async (data: Readonly<Record<string, unknown>>) => {
      profiles.push({ ...data });
      return settle();
    }),
    upsertItems: vi.fn(async <T extends SyncItem>(collection: string, items: readonly T[]) => {
      (upserts[collection] ??= []).push(...items.map((i) => String(i.id)));
      return settle();
    }),
    deleteItems: vi.fn(async (collection: string, ids: readonly (string | number)[]) => {
      (deletes[collection] ??= []).push(...ids.map(String));
      return settle();
    }),
  };
  return { sync, upserts, deletes, profiles };
}

type ResumeSource = (callback: () => void) => () => void;

const noResume: ResumeSource = () => () => {};

function useHarness(sync: DriveSync, initial: SyncedState, onAppResume: ResumeSource) {
  const [state, setState] = useState(initial);
  const resetLocal = useCallback(() => setState(empty()), []);
  const cloud = useCloudSync({ state, apply: setState, resetLocal, defaults, sync, onAppResume });
  return { state, setState, cloud };
}

function render(sync: DriveSync, initial: SyncedState = empty(), onAppResume: ResumeSource = noResume) {
  return renderHook(() => useHarness(sync, initial, onAppResume)).result;
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("useCloudSync", () => {
  it("merges Drive into local state on connect and pushes what only this device has", async () => {
    const fake = fakeSync({ cloud: { profile: { progress: progress(40) }, collections: { savedWords: [word("cloud", "dog")] }, deleted: {} } });
    const result = render(fake.sync, { ...empty(), savedWords: [word("local", "cat")] });

    await waitFor(() => expect(result.current.state.savedWords).toHaveLength(2));

    expect([result.current.state.progress?.points, fake.upserts.savedWords, readDataOwner()]).toEqual([40, ["local"], USER.uid]);
  });

  it("uploads a change made after the pull", async () => {
    const fake = fakeSync();
    const result = render(fake.sync);
    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalled());

    act(() => result.current.setState((s) => ({ ...s, savedWords: [word("w1", "cat")] })));

    await waitFor(() => expect(fake.upserts.savedWords).toEqual(["w1"]));
  });

  it("records changes as pending but uploads nothing while the account is linked but not connected", async () => {
    const fake = fakeSync({ user: null });
    const result = render(fake.sync);

    act(() => result.current.setState((s) => ({ ...s, savedWords: [word("w1", "cat")] })));

    expect([...readPending("savedWords").edited]).toEqual(["w1"]);
    expect(fake.sync.upsertItems).not.toHaveBeenCalled();
  });

  it("tracks nothing as pending while no account was ever linked", () => {
    const fake = fakeSync({ linked: false, user: null });
    const result = render(fake.sync);

    act(() => result.current.setState((s) => ({ ...s, savedWords: [word("w1", "cat")] })));

    expect(readPending("savedWords").edited.size).toBe(0);
  });

  it("clears this device on sign-out without sending a single delete to Drive", async () => {
    const fake = fakeSync();
    const result = render(fake.sync, { ...empty(), savedWords: [word("w1", "cat")], progress: progress(5) });
    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalled());

    await act(() => result.current.cloud.signOut());

    expect([result.current.state.savedWords, result.current.state.progress, fake.deletes, readDataOwner()]).toEqual([[], null, {}, null]);
  });

  it("discards local data that belongs to a different Google account", async () => {
    writeDataOwner("someone-else");
    const fake = fakeSync({ cloud: { profile: {}, collections: { savedWords: [word("mine", "dog")] }, deleted: {} } });
    const result = render(fake.sync, { ...empty(), savedWords: [word("theirs", "cat")] });

    await waitFor(() => expect(readDataOwner()).toBe(USER.uid));

    expect([result.current.state.savedWords.map((w) => w.id), fake.upserts.savedWords]).toEqual([["mine"], undefined]);
  });

  it.each([
    { name: "a Drive failure shows the retry banner", error: new DriveSyncError("boom", { status: 500 }), banner: true },
    { name: "being offline does not", error: new DriveSyncError("offline", { code: "offline" }), banner: false },
  ])("pull: $name", async ({ error, banner }) => {
    const fake = fakeSync({ loadError: error });
    const result = render(fake.sync);

    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalled());

    await waitFor(() => expect(result.current.cloud.cloudSyncError).toBe(banner));
  });

  it("retries a failed pull on request", async () => {
    const fake = fakeSync({ loadError: new DriveSyncError("boom", { status: 500 }) });
    const result = render(fake.sync);
    await waitFor(() => expect(result.current.cloud.cloudSyncError).toBe(true));

    act(() => result.current.cloud.retryCloudSync());

    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalledTimes(2));
  });

  it("keeps a signed-out upload failure pending instead of showing an error", async () => {
    const fake = fakeSync({ uploadError: new DriveSyncError("expired", { code: "signed-out" }) });
    const result = render(fake.sync);
    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalled());

    act(() => result.current.setState((s) => ({ ...s, savedWords: [word("w1", "cat")] })));
    await waitFor(() => expect(fake.sync.upsertItems).toHaveBeenCalled());

    expect([result.current.cloud.cloudSyncError, [...readPending("savedWords").edited]]).toEqual([false, ["w1"]]);
  });

  it("deletes the Drive copy but keeps this device's progress, no longer tied to an account", async () => {
    const fake = fakeSync();
    const result = render(fake.sync, { ...empty(), progress: progress(5) });
    await waitFor(() => expect(readDataOwner()).toBe(USER.uid));

    await act(() => result.current.cloud.deleteCloudData());

    expect(fake.sync.deleteAllSyncedData).toHaveBeenCalledOnce();
    expect([result.current.state.progress?.points, readDataOwner()]).toEqual([5, null]);
  });
});

/** A promise and the function that settles it, for steering a fake call's timing. */
function deferred<T>() {
  let resolve: (value: T) => void = () => {};
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

describe("useCloudSync — review fixes", () => {
  it("does not mark an open-of-day streak recompute as pending, so stale progress can't beat Drive", async () => {
    const fake = fakeSync({ user: null });
    const result = render(fake.sync, { ...empty(), progress: progress(100) });

    act(() => result.current.setState((s) => ({ ...s, progress: { ...progress(100), streak: 2, lastActiveTimestamp: 999 } })));

    expect(readPending("profile").edited.has("progress")).toBe(false);
  });

  it("clears every profile field once the save carrying its newest value lands", async () => {
    const fake = fakeSync();
    const landings: (() => void)[] = [];
    fake.sync.saveProfile = vi.fn(() => {
      const d = deferred<void>();
      landings.push(() => d.resolve());
      return d.promise;
    });
    const result = render(fake.sync, { ...empty(), progress: progress(0) });
    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalled());
    await waitFor(() => expect(readDataOwner()).toBe(USER.uid));

    act(() => result.current.setState((s) => ({ ...s, progress: progress(30), dailyMissions: { ...missions(), video: true } })));
    act(() => result.current.setState((s) => ({ ...s, progress: progress(40) })));
    await waitFor(() => expect(landings.length).toBeGreaterThanOrEqual(2));
    await act(async () => {
      for (const land of landings) land();
    });

    await waitFor(() => expect([...readPending("profile").edited]).toEqual([]));
  });

  it("retries a first pull that failed offline once the network is back", async () => {
    const fake = fakeSync();
    let online = false;
    fake.sync.loadMerged = vi.fn(async () => {
      if (!online) throw new DriveSyncError("offline", { code: "offline" });
      return { profile: {}, collections: {}, deleted: {} };
    });
    render(fake.sync);
    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalledTimes(1));

    online = true;
    act(() => window.dispatchEvent(new Event("online")));

    await waitFor(() => expect(readDataOwner()).toBe(USER.uid));
  });

  it("pulls another device's changes when the app resumes, even within a minute of the last pull", async () => {
    const fake = fakeSync();
    let resume = () => {};
    const onAppResume: ResumeSource = (callback) => {
      resume = callback;
      return () => {};
    };
    const result = render(fake.sync, empty(), onAppResume);
    await waitFor(() => expect(readDataOwner()).toBe(USER.uid));

    fake.sync.loadMerged = vi.fn(async () => ({
      profile: {},
      collections: { savedWords: [word("web", "cat")] },
      deleted: {},
    }));
    act(() => resume());

    await waitFor(() => expect(result.current.state.savedWords.map((w) => w.id)).toEqual(["web"]));
  });

  it("drops a pull still in flight when the learner signs out, so the old account's data doesn't come back", async () => {
    const fake = fakeSync();
    const load = deferred<MergedView>();
    fake.sync.loadMerged = vi.fn(() => load.promise);
    const result = render(fake.sync);
    await waitFor(() => expect(fake.sync.loadMerged).toHaveBeenCalled());

    await act(() => result.current.cloud.signOut());
    await act(async () => {
      load.resolve({ profile: { progress: progress(500) }, collections: { savedWords: [word("w1", "cat")] }, deleted: {} });
    });

    expect([result.current.state.savedWords, result.current.state.progress, readDataOwner()]).toEqual([[], null, null]);
  });

  it("reports the account as linked while its token has lapsed", () => {
    const result = render(fakeSync({ user: null }).sync);

    expect([result.current.cloud.user, result.current.cloud.cloudLinked]).toEqual([null, true]);
  });
});
