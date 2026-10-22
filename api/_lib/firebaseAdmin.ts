// Firebase Admin wiring shared by the reminder functions: one app per
// function instance, the Firestore reminder store, and FCM. The service
// account comes only from the environment, never from source.

import { randomBytes, randomUUID, createHash, timingSafeEqual } from "node:crypto";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldPath, getFirestore, type DocumentData } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import type { InstallUpdate, ReminderApiDeps, ReminderStore, StoredInstall } from "./reminderApi";

const COLLECTION = "reminders";

export function initAdmin(): void {
  if (getApps().length > 0) return;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) throw new Error("FIREBASE_SERVICE_ACCOUNT is not set");
  initializeApp({ credential: cert(JSON.parse(raw)) });
}

function toInstall(data: DocumentData): StoredInstall {
  return {
    pushToken: String(data.pushToken ?? ""),
    timezone: String(data.timezone ?? ""),
    doneDate: typeof data.doneDate === "string" ? data.doneDate : null,
    seenDate: typeof data.seenDate === "string" ? data.seenDate : null,
    writeKeyHash: String(data.writeKeyHash ?? ""),
  };
}

export function firestoreReminderStore(): ReminderStore {
  const collection = getFirestore().collection(COLLECTION);
  return {
    async create(id, install) {
      await collection.doc(id).create(install);
    },
    async get(id) {
      const snap = await collection.doc(id).get();
      const data = snap.data();
      return snap.exists && data ? toInstall(data) : null;
    },
    async update(id, fields: InstallUpdate) {
      await collection.doc(id).update(fields);
    },
    async remove(id) {
      await collection.doc(id).delete();
    },
    async page(afterId, limit) {
      const base = collection.orderBy(FieldPath.documentId()).limit(limit);
      const snap = await (afterId ? base.startAfter(afterId) : base).get();
      return snap.docs.map((doc) => ({ id: doc.id, install: toInstall(doc.data()) }));
    },
  };
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Production dependencies for createReminderApi. */
export function reminderApiDeps(): ReminderApiDeps {
  initAdmin();
  return {
    store: firestoreReminderStore(),
    // A dry-run send validates the token against this Firebase project without notifying anyone.
    isDeliverable: (pushToken) =>
      getMessaging()
        .send({ token: pushToken }, true)
        .then(() => true)
        .catch(() => false),
    newId: () => randomUUID(),
    newWriteKey: () => randomBytes(32).toString("base64url"),
    hashKey: sha256,
    sameHash: (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b)),
  };
}
