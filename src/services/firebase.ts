// Optional cloud sync — Google Sign-In + Firestore, modeled on JobFlowTracker.
//
// The whole feature is opt-in: if no Firebase config is provided (env vars
// unset), `isCloudConfigured()` is false and the app runs purely on
// localStorage ("Local mode"). When configured and the user signs in with
// Google ("Account mode"), their progress syncs to Firestore under their uid.
//
// The Firebase SDK is heavy, so it is loaded with dynamic import() — it never
// enters the main bundle for users who stay in Local mode.
//
// Firebase web config is NOT a secret (it's meant to ship in the client);
// access is controlled by Firestore security rules (see firestore.rules).

import type { Auth, User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type {
  ChatMessage,
  QuizHistory,
  SavedWord,
  UserProgress,
} from "../types";

// Firebase web config is a public client identifier (safe to ship in the
// client); access is controlled by Firestore security rules + Authentication
// authorized domains. Env vars override these defaults when provided.
const config = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ??
    "AIzaSyC2QFzkRvddsWSpizDXJpHdwcegs7Ze63c",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ??
    "high-five-86991.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "high-five-86991",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ??
    "high-five-86991.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "885173121360",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ??
    "1:885173121360:web:dca31d6f26f3433b66fc55",
};

/** True only when the minimum Firebase config is present. */
export function isCloudConfigured(): boolean {
  return Boolean(config.apiKey && config.projectId && config.appId);
}

let initPromise: Promise<{ auth: Auth; db: Firestore }> | undefined;

// Lazily import and initialize Firebase only once, only when actually needed.
function ensureInit(): Promise<{ auth: Auth; db: Firestore }> {
  if (!isCloudConfigured()) {
    return Promise.reject(new Error("Firebase is not configured."));
  }
  if (!initPromise) {
    initPromise = (async () => {
      const { initializeApp } = await import("firebase/app");
      const { getAuth } = await import("firebase/auth");
      const { getFirestore } = await import("firebase/firestore");
      const app = initializeApp(config);
      return { auth: getAuth(app), db: getFirestore(app) };
    })();
  }
  return initPromise;
}

export interface CloudUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

function toCloudUser(u: User): CloudUser {
  return {
    uid: u.uid,
    displayName: u.displayName,
    email: u.email,
    photoURL: u.photoURL,
  };
}

/** Subscribe to sign-in state. No-op (and immediately null) when unconfigured. */
export function watchAuth(cb: (user: CloudUser | null) => void): () => void {
  if (!isCloudConfigured()) {
    cb(null);
    return () => {};
  }
  let unsub = () => {};
  let cancelled = false;
  (async () => {
    const { auth } = await ensureInit();
    const { onAuthStateChanged } = await import("firebase/auth");
    if (cancelled) return;
    unsub = onAuthStateChanged(auth, (u) => cb(u ? toCloudUser(u) : null));
  })();
  return () => {
    cancelled = true;
    unsub();
  };
}

export async function signInWithGoogle(): Promise<void> {
  const { auth } = await ensureInit();
  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  await signInWithPopup(auth, new GoogleAuthProvider());
}

export async function signOut(): Promise<void> {
  const { auth } = await ensureInit();
  const { signOut: fbSignOut } = await import("firebase/auth");
  await fbSignOut(auth);
}

/** The full app state synced as a single per-user document. */
export interface CloudData {
  progress: UserProgress | null;
  savedWords: SavedWord[];
  chatMessages: ChatMessage[];
  quizHistory: QuizHistory[];
}

export async function loadCloud(uid: string): Promise<CloudData | null> {
  const { db } = await ensureInit();
  const { doc, getDoc } = await import("firebase/firestore");
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as CloudData) : null;
}

export async function saveCloud(uid: string, data: CloudData): Promise<void> {
  const { db } = await ensureInit();
  const { doc, setDoc } = await import("firebase/firestore");
  await setDoc(doc(db, "users", uid), data);
}
