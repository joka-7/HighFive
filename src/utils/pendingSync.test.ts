import { describe, it, expect } from "vitest";
import type { KeyValueStorage } from "../services/driveSync";
import {
  clearLocalSyncState,
  clearPendingIds,
  diffFingerprints,
  fingerprintItems,
  pendingStorageKey,
  readDataOwner,
  readPending,
  recordLocalChanges,
  writeDataOwner,
} from "./pendingSync";

// Ported from KanDOne's src/__tests__/pendingSync.test.js.

/** In-memory stand-in for localStorage — keeps these tests off real storage. */
function fakeStorage(seed: Record<string, string> = {}) {
  const map = new Map(Object.entries(seed));
  const storage: KeyValueStorage & { has(k: string): boolean } = {
    getItem: (k) => map.get(k) ?? null,
    setItem: (k, v) => {
      map.set(k, String(v));
    },
    removeItem: (k) => {
      map.delete(k);
    },
    has: (k) => map.has(k),
  };
  return storage;
}

/** Storage that rejects every write, as a full or blocked quota does. */
const blockedStorage: KeyValueStorage = {
  getItem: () => null,
  setItem: () => {
    throw new Error("QuotaExceededError");
  },
  removeItem: () => {
    throw new Error("QuotaExceededError");
  },
};

const COLLECTION = "savedWords";
const sorted = (set: Iterable<string>) => [...set].sort();

describe("fingerprintItems", () => {
  it("keys records by id and detects content, not just membership", () => {
    const before = fingerprintItems([{ id: 1, name: "A" }, { id: 2, name: "B" }]);

    expect(sorted(before.keys())).toEqual(["1", "2"]);
    expect(before.get("1")).not.toBe(before.get("2"));
    expect(fingerprintItems([]).size).toBe(0);
  });
});

describe("diffFingerprints", () => {
  it.each([
    {
      name: "added, changed and removed ids",
      before: [{ id: 1, name: "A" }, { id: 2, name: "B" }],
      after: [{ id: 1, name: "A edited" }, { id: 3, name: "C" }],
      expected: { edited: ["1", "3"], added: ["3"], deleted: ["2"] },
    },
    {
      name: "nothing when the collection is untouched",
      before: [{ id: 1, name: "A" }],
      after: [{ id: 1, name: "A" }],
      expected: { edited: [], added: [], deleted: [] },
    },
  ])("reports $name", ({ before, after, expected }) => {
    const diff = diffFingerprints(fingerprintItems(before), fingerprintItems(after));

    expect({ edited: diff.edited.sort(), added: diff.added, deleted: diff.deleted }).toEqual(expected);
  });
});

describe("pending record bookkeeping", () => {
  it("accumulates local changes and clears them only once the cloud write lands", () => {
    const storage = fakeStorage();
    recordLocalChanges(COLLECTION, { edited: ["1", "2"] }, storage);
    expect(sorted(readPending(COLLECTION, storage).edited)).toEqual(["1", "2"]);

    clearPendingIds(COLLECTION, ["1"], storage);

    expect(sorted(readPending(COLLECTION, storage).edited)).toEqual(["2"]);
  });

  it("holds an id in exactly one of edited/deleted as it changes state", () => {
    const storage = fakeStorage();
    recordLocalChanges(COLLECTION, { edited: ["1"] }, storage);
    recordLocalChanges(COLLECTION, { deleted: ["1"] }, storage);
    const afterDelete = readPending(COLLECTION, storage);

    recordLocalChanges(COLLECTION, { edited: ["1"] }, storage);
    const afterRecreate = readPending(COLLECTION, storage);

    expect([sorted(afterDelete.edited), sorted(afterDelete.deleted)]).toEqual([[], ["1"]]);
    expect([sorted(afterRecreate.edited), sorted(afterRecreate.deleted)]).toEqual([["1"], []]);
  });

  it("removes the storage entry once nothing is pending", () => {
    const storage = fakeStorage();
    recordLocalChanges(COLLECTION, { edited: ["1"] }, storage);

    clearPendingIds(COLLECTION, ["1"], storage);

    expect(storage.has(pendingStorageKey(COLLECTION))).toBe(false);
  });

  it("keeps collections separate so one cannot pin another", () => {
    const storage = fakeStorage();
    recordLocalChanges("savedWords", { edited: ["1"] }, storage);
    recordLocalChanges("quizHistory", { edited: ["2"] }, storage);

    expect(sorted(readPending("savedWords", storage).edited)).toEqual(["1"]);
    expect(sorted(readPending("quizHistory", storage).edited)).toEqual(["2"]);
  });

  it("reads empty rather than throwing on malformed, missing or blocked storage", () => {
    expect(sorted(readPending(COLLECTION, fakeStorage({ [pendingStorageKey(COLLECTION)]: "{oops" })).edited)).toEqual([]);
    expect(sorted(readPending(COLLECTION, fakeStorage()).edited)).toEqual([]);
    expect(sorted(readPending(COLLECTION, null).edited)).toEqual([]);
    expect(() => recordLocalChanges(COLLECTION, { edited: ["1"] }, blockedStorage)).not.toThrow();
  });
});

describe("local data ownership", () => {
  it("remembers which account the local data belongs to", () => {
    const storage = fakeStorage();
    const before = readDataOwner(storage);

    writeDataOwner("uid-a", storage);

    expect([before, readDataOwner(storage)]).toEqual([null, "uid-a"]);
  });

  it("clears owner and pending state on sign-out", () => {
    const storage = fakeStorage();
    writeDataOwner("uid-a", storage);
    recordLocalChanges(COLLECTION, { edited: ["2"] }, storage);

    clearLocalSyncState([COLLECTION], storage);

    expect([readDataOwner(storage), readPending(COLLECTION, storage).edited.size]).toEqual([null, 0]);
  });

  it("survives blocked storage", () => {
    expect(() => writeDataOwner("uid-a", blockedStorage)).not.toThrow();
    expect(() => clearLocalSyncState([COLLECTION], blockedStorage)).not.toThrow();
  });
});
