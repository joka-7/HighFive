import { describe, it, expect } from "vitest";
import type { ChatMessage, DailyMissionsState, SavedWord, UserProgress } from "../types";
import type { MergedView, SyncItem } from "../services/driveSync";
import {
  HISTORY_CAPS,
  diffForUpload,
  isEmptyUpload,
  mergePull,
  snapshotOf,
  type PendingByCollection,
  type SyncedState,
} from "./cloudMerge";

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

const word = (id: string, w: string, savedAt: number): SavedWord => ({
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

const chat = (id: string, timestamp: number, scenario = "cafe"): ChatMessage => ({
  id,
  role: "user",
  messageText: `m${id}`,
  corrections: null,
  level: "A1",
  scenario,
  timestamp,
});

const state = (overrides: Partial<SyncedState> = {}): SyncedState => ({
  progress: progress(0),
  dailyMissions: missions(),
  savedWords: [],
  learnedWords: {},
  chatMessages: [],
  quizHistory: [],
  missionLog: [],
  ...overrides,
});

const cloud = (overrides: Partial<MergedView> = {}): MergedView => ({
  profile: {},
  collections: {},
  deleted: {},
  ...overrides,
});

const noPending = (): PendingByCollection => ({
  savedWords: { edited: new Set(), deleted: new Set() },
  quizHistory: { edited: new Set(), deleted: new Set() },
  missionLog: { edited: new Set(), deleted: new Set() },
  chatMessages: { edited: new Set(), deleted: new Set() },
  learnedWords: { edited: new Set(), deleted: new Set() },
  profile: { edited: new Set(), deleted: new Set() },
});

const pending = (collection: keyof PendingByCollection, edited: string[] = [], deleted: string[] = []) => ({
  ...noPending(),
  [collection]: { edited: new Set(edited), deleted: new Set(deleted) },
});

const defaults = { progress: null, dailyMissions: missions("") };

/** Records as Drive hands them back: opaque beyond their id. */
const records = <T extends SyncItem>(...items: T[]): SyncItem[] => items;

const fullChat = Array.from({ length: HISTORY_CAPS.chatMessages }, (_, i) => chat(`c${i}`, i));

describe("diffForUpload", () => {
  it.each([
    {
      name: "a newly saved word is an upsert",
      before: state(),
      after: state({ savedWords: [word("w1", "cat", 1)] }),
      expected: { upserts: { savedWords: ["w1"] }, deletes: {}, profile: [] },
    },
    {
      name: "unsaving a word is a delete",
      before: state({ savedWords: [word("w1", "cat", 1)] }),
      after: state(),
      expected: { upserts: {}, deletes: { savedWords: ["w1"] }, profile: [] },
    },
    {
      name: "appending to a full chat trims the oldest without a delete",
      before: state({ chatMessages: fullChat }),
      after: state({ chatMessages: [...fullChat.slice(1), chat("new", 9999)] }),
      expected: { upserts: { chatMessages: ["new"] }, deletes: {}, profile: [] },
    },
    {
      name: "clearing a chat scenario on a full list is a real delete",
      before: state({ chatMessages: fullChat }),
      after: state({ chatMessages: fullChat.slice(2) }),
      expected: { upserts: {}, deletes: { chatMessages: ["c0", "c1"] }, profile: [] },
    },
    {
      name: "a points change uploads the progress field",
      before: state(),
      after: state({ progress: progress(10) }),
      expected: { upserts: {}, deletes: {}, profile: ["progress"] },
    },
    {
      name: "learned words are keyed by their word",
      before: state(),
      after: state({ learnedWords: { cat: { word: "cat", translation: "חתול", level: "A1", firstSeenAt: 1 } } }),
      expected: { upserts: { learnedWords: ["cat"] }, deletes: {}, profile: [] },
    },
    {
      name: "nothing when nothing changed",
      before: state({ savedWords: [word("w1", "cat", 1)] }),
      after: state({ savedWords: [word("w1", "cat", 1)] }),
      expected: { upserts: {}, deletes: {}, profile: [] },
    },
  ])("$name", ({ before, after, expected }) => {
    const { upload } = diffForUpload(snapshotOf(before), after);

    const upsertIds = Object.fromEntries(
      Object.entries(upload.upserts).map(([c, items]) => [c, (items ?? []).map((i) => String(i.id))]),
    );
    expect({ upserts: upsertIds, deletes: upload.deletes, profile: Object.keys(upload.profile) }).toEqual(expected);
  });
});

describe("mergePull", () => {
  const ids = (items: readonly { id: string }[]) => items.map((i) => i.id);

  it("uploads everything local on the first connect, when Drive is empty", () => {
    const local = state({ savedWords: [word("w1", "cat", 1)], progress: progress(5) });

    const { state: merged, upload } = mergePull({ local, cloud: cloud(), pending: noPending(), discardLocal: false, defaults });

    expect([ids(merged.savedWords), upload.upserts.savedWords?.map((w) => w.id), upload.profile.progress]).toEqual([
      ["w1"],
      ["w1"],
      progress(5),
    ]);
  });

  it.each([
    {
      name: "Drive wins a shared id without a pending local edit",
      pendingIds: noPending(),
      expected: { translation: "cloud", pushed: undefined },
    },
    {
      name: "a pending local edit keeps the local copy and pushes it",
      pendingIds: pending("savedWords", ["w1"]),
      expected: { translation: "local", pushed: ["w1"] },
    },
  ])("$name", ({ pendingIds, expected }) => {
    const local = state({ savedWords: [{ ...word("w1", "cat", 1), translation: "local" }] });
    const fromCloud = cloud({ collections: { savedWords: records({ ...word("w1", "cat", 1), translation: "cloud" }) } });

    const { state: merged, upload } = mergePull({ local, cloud: fromCloud, pending: pendingIds, discardLocal: false, defaults });

    expect({
      translation: merged.savedWords[0]?.translation,
      pushed: upload.upserts.savedWords?.map((w) => w.id),
    }).toEqual(expected);
  });

  it("replays a pending local delete instead of resurrecting the record", () => {
    const fromCloud = cloud({ collections: { savedWords: [word("w1", "cat", 1)] } });

    const { state: merged, upload } = mergePull({
      local: state(),
      cloud: fromCloud,
      pending: pending("savedWords", [], ["w1"]),
      discardLocal: false,
      defaults,
    });

    expect([merged.savedWords, upload.deletes.savedWords]).toEqual([[], ["w1"]]);
  });

  it.each([
    { name: "drops a stale local copy of a record another device deleted", pendingIds: noPending(), kept: [] as string[] },
    { name: "keeps it when this device has an unsynced edit to it", pendingIds: pending("savedWords", ["w1"]), kept: ["w1"] },
  ])("$name", ({ pendingIds, kept }) => {
    const local = state({ savedWords: [word("w1", "cat", 1)] });

    const { state: merged } = mergePull({
      local,
      cloud: cloud({ deleted: { savedWords: ["w1"] } }),
      pending: pendingIds,
      discardLocal: false,
      defaults,
    });

    expect(ids(merged.savedWords)).toEqual(kept);
  });

  it("discards local data owned by a different account instead of merging it into this one", () => {
    const local = state({ savedWords: [word("theirs", "dog", 1)], progress: progress(999) });
    const fromCloud = cloud({ collections: { savedWords: [word("mine", "cat", 1)] }, profile: { progress: progress(5) } });

    const { state: merged, upload } = mergePull({
      local,
      cloud: fromCloud,
      pending: pending("savedWords", ["theirs"]),
      discardLocal: true,
      defaults,
    });

    expect([ids(merged.savedWords), merged.progress?.points, isEmptyUpload(upload)]).toEqual([["mine"], 5, true]);
  });

  it("keeps the newest copy of a word saved on two devices and deletes the other", () => {
    const local = state({ savedWords: [word("phone", "Cat", 10)] });
    const fromCloud = cloud({ collections: { savedWords: [word("laptop", "cat", 20)] } });

    const { state: merged, upload } = mergePull({ local, cloud: fromCloud, pending: noPending(), discardLocal: false, defaults });

    expect([ids(merged.savedWords), upload.deletes.savedWords, upload.upserts.savedWords]).toEqual([
      ["laptop"],
      ["phone"],
      undefined,
    ]);
  });

  it("applies the history caps after merging, keeping the newest, without deleting the rest", () => {
    const fromCloud = cloud({ collections: { chatMessages: fullChat } });
    const local = state({ chatMessages: [chat("local-new", 99_999)] });

    const { state: merged, upload } = mergePull({ local, cloud: fromCloud, pending: noPending(), discardLocal: false, defaults });

    expect([
      merged.chatMessages.length,
      merged.chatMessages.at(-1)?.id,
      merged.chatMessages[0]?.id,
      upload.deletes.chatMessages,
    ]).toEqual([HISTORY_CAPS.chatMessages, "local-new", "c1", undefined]);
  });

  it.each([
    { name: "Drive's copy wins without a pending local change", pendingIds: noPending(), points: 50, pushed: false },
    { name: "a pending local change wins and is pushed", pendingIds: pending("profile", ["progress"]), points: 7, pushed: true },
  ])("profile: $name", ({ pendingIds, points, pushed }) => {
    const { state: merged, upload } = mergePull({
      local: state({ progress: progress(7) }),
      cloud: cloud({ profile: { progress: progress(50) } }),
      pending: pendingIds,
      discardLocal: false,
      defaults,
    });

    expect([merged.progress?.points, "progress" in upload.profile]).toEqual([points, pushed]);
  });

  it("drops a malformed record from Drive instead of letting it reach a screen", () => {
    const fromCloud = cloud({ collections: { savedWords: [{ id: "bad" }, word("good", "cat", 1)] } });

    const { state: merged } = mergePull({ local: state(), cloud: fromCloud, pending: noPending(), discardLocal: false, defaults });

    expect(ids(merged.savedWords)).toEqual(["good"]);
  });

  it("rebuilds learned words keyed by their word", () => {
    const fromCloud = cloud({
      collections: { learnedWords: records({ id: "cat", word: "cat", translation: "חתול", level: "A1", firstSeenAt: 3 }) },
    });

    const { state: merged } = mergePull({ local: state(), cloud: fromCloud, pending: noPending(), discardLocal: false, defaults });

    expect(merged.learnedWords).toEqual({ cat: { word: "cat", translation: "חתול", level: "A1", firstSeenAt: 3 } });
  });
});

describe("diffForUpload — review fixes", () => {
  it.each([
    { name: "a streak/last-active recompute alone is uploaded but not pending", next: { ...progress(0), streak: 5, lastActiveTimestamp: 99 }, notPending: ["progress"] },
    { name: "earning points is pending", next: { ...progress(0), points: 30, lastActiveTimestamp: 99 }, notPending: [] },
  ])("$name", ({ next, notPending }) => {
    const { upload, notPending: quiet } = diffForUpload(snapshotOf(state()), state({ progress: next }));

    expect(["progress" in upload.profile, quiet]).toEqual([true, notPending]);
  });

  it("treats replacing a full history with newer entries as real deletes, not a cap trim", () => {
    const imported = Array.from({ length: HISTORY_CAPS.chatMessages }, (_, i) => chat(`imp${i}`, -1000 + i));

    const { upload } = diffForUpload(snapshotOf(state({ chatMessages: fullChat })), state({ chatMessages: imported }));

    expect(upload.deletes.chatMessages?.length).toBe(HISTORY_CAPS.chatMessages);
  });
});

describe("mergePull — review fixes", () => {
  it("keeps the copy of a duplicated word that has review history, even if the other was saved later", () => {
    const reviewed = { ...word("old", "cat", 1), reviewCount: 9, srsLevel: 4 };
    const fromCloud = cloud({ collections: { savedWords: [reviewed] } });

    const { state: merged, upload } = mergePull({
      local: state({ savedWords: [word("resaved", "cat", 50)] }),
      cloud: fromCloud,
      pending: noPending(),
      discardLocal: false,
      defaults,
    });

    expect([merged.savedWords.map((w) => w.id), upload.deletes.savedWords]).toEqual([["old"], ["resaved"]]);
  });

  it("sends a pending reset (progress: null) instead of leaving it pending forever", () => {
    const { state: merged, upload } = mergePull({
      local: state({ progress: null }),
      cloud: cloud({ profile: { progress: progress(50) } }),
      pending: pending("profile", ["progress"]),
      discardLocal: false,
      defaults,
    });

    expect([merged.progress, "progress" in upload.profile, upload.profile.progress]).toEqual([null, true, null]);
  });
});
