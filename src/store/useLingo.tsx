import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  ChatMessage,
  DailyMissionsState,
  Level,
  QuizHistory,
  SavedWord,
  UserProgress,
} from "../types";
import { isDue, isSrsMastered, scheduleNext } from "../utils/srs";
import {
  isCloudConfigured,
  loadCloud,
  saveCloud,
  signInWithGoogle,
  signOut as cloudSignOut,
  watchAuth,
  type CloudData,
  type CloudUser,
} from "../services/firebase";

// Persistence layer — replaces High5's Room database with localStorage in
// "Local mode", and (optionally) Firestore in "Account mode" when the user
// signs in with Google. Local mode is always the default and the offline cache.

const KEYS = {
  progress: "high5.progress",
  savedWords: "high5.saved_words",
  chat: "high5.chat_messages",
  quizHistory: "high5.quiz_history",
  dailyMissions: "high5.daily_missions",
  // Remembers that the user opted into cloud sync, so we only eagerly load the
  // (heavy) Firebase SDK on startup for returning signed-in users.
  cloudSession: "high5.cloud_session",
} as const;

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function dateKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

// Daily Missions — points awarded once per mission per day.
const MISSION_POINTS = 30;
const EMPTY_MISSIONS: DailyMissionsState = { date: "", video: false, talk: false };

// Missions from a previous day don't carry over — a new day starts blank.
function todaysMissions(m: DailyMissionsState, today: string): DailyMissionsState {
  return m.date === today ? m : { date: today, video: false, talk: false };
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface LingoContextValue {
  progress: UserProgress | null;
  savedWords: SavedWord[];
  chatMessages: ChatMessage[];
  quizHistory: QuizHistory[];
  // Cloud / account state
  cloudConfigured: boolean;
  user: CloudUser | null;
  authReady: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  registerUser: (userName: string, nativeLanguage: string, level: Level) => void;
  updateLevel: (level: Level) => void;
  addPoints: (points: number) => void;
  isWordSaved: (word: string) => boolean;
  toggleSaveWord: (word: Omit<SavedWord, "id" | "savedAt" | "isMastered">) => void;
  toggleMastered: (id: string) => void;
  dueWords: () => SavedWord[];
  reviewWord: (id: string, remembered: boolean) => void;
  completeLesson: (correctCount: number) => void;
  completeQuiz: (level: Level, topic: string, score: number, total: number) => void;
  dailyMissions: DailyMissionsState;
  completeMission: (id: "video" | "talk") => void;
  addChatMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChat: (scenario: string, level: Level) => void;
  resetAll: () => void;
}

const LingoContext = createContext<LingoContextValue | null>(null);

export function LingoProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(() =>
    load<UserProgress | null>(KEYS.progress, null),
  );
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() =>
    load<SavedWord[]>(KEYS.savedWords, []),
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    load<ChatMessage[]>(KEYS.chat, []),
  );
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>(() =>
    load<QuizHistory[]>(KEYS.quizHistory, []),
  );
  const [dailyMissions, setDailyMissions] = useState<DailyMissionsState>(() =>
    load<DailyMissionsState>(KEYS.dailyMissions, EMPTY_MISSIONS),
  );

  const [user, setUser] = useState<CloudUser | null>(null);
  // We only wait on auth (and load Firebase) at startup if the user previously
  // signed in. Local-mode users resolve immediately and never fetch the SDK.
  const willRestoreSession =
    isCloudConfigured() && load<boolean>(KEYS.cloudSession, false);
  const [authReady, setAuthReady] = useState(!willRestoreSession);
  const authUnsubRef = useRef<(() => void) | null>(null);

  // Always mirror state to localStorage (local mode + offline cache).
  useEffect(() => {
    localStorage.setItem(KEYS.progress, JSON.stringify(progress));
  }, [progress]);
  useEffect(() => {
    localStorage.setItem(KEYS.savedWords, JSON.stringify(savedWords));
  }, [savedWords]);
  useEffect(() => {
    localStorage.setItem(KEYS.chat, JSON.stringify(chatMessages));
  }, [chatMessages]);
  useEffect(() => {
    localStorage.setItem(KEYS.quizHistory, JSON.stringify(quizHistory));
  }, [quizHistory]);
  useEffect(() => {
    localStorage.setItem(KEYS.dailyMissions, JSON.stringify(dailyMissions));
  }, [dailyMissions]);

  // Keep the latest snapshot in a ref so the auth callback can seed the cloud
  // with current data without depending on stale closures.
  const latest = useRef<CloudData>({
    progress,
    savedWords,
    chatMessages,
    quizHistory,
    dailyMissions,
  });
  useEffect(() => {
    latest.current = { progress, savedWords, chatMessages, quizHistory, dailyMissions };
  }, [progress, savedWords, chatMessages, quizHistory, dailyMissions]);

  // Streak bookkeeping on mount — same day → unchanged; consecutive day → +1;
  // gap → reset.
  useEffect(() => {
    setProgress((prev) => {
      if (!prev) return prev;
      const now = Date.now();
      const today = dateKey(now);
      const last = prev.lastActiveTimestamp ? dateKey(prev.lastActiveTimestamp) : "";
      if (last === today) return prev;
      const yesterday = dateKey(now - 86_400_000);
      const streak = last === yesterday ? prev.streak + 1 : 1;
      return { ...prev, streak, lastActiveTimestamp: now };
    });
  }, []);

  // Begin watching Google sign-in state. This is what pulls in the Firebase
  // SDK, so it stays deferred until a sign-in is actually needed. Idempotent —
  // safe to call from both startup (session restore) and the signIn flow.
  // On sign-in, pull the user's cloud data if it exists; otherwise seed the
  // cloud from whatever is currently local.
  const startAuthWatch = useCallback(() => {
    if (authUnsubRef.current) return;
    authUnsubRef.current = watchAuth(async (u) => {
      setUser(u);
      setAuthReady(true);
      if (!u) {
        localStorage.removeItem(KEYS.cloudSession);
        return;
      }
      localStorage.setItem(KEYS.cloudSession, JSON.stringify(true));
      try {
        const cloud = await loadCloud(u.uid);
        if (cloud) {
          setProgress(cloud.progress ?? null);
          setSavedWords(cloud.savedWords ?? []);
          setChatMessages(cloud.chatMessages ?? []);
          setQuizHistory(cloud.quizHistory ?? []);
          setDailyMissions(cloud.dailyMissions ?? EMPTY_MISSIONS);
        } else {
          await saveCloud(u.uid, latest.current);
        }
      } catch {
        // Network/permission issue → stay on local data.
      }
    });
  }, []);

  // Only restore a session (and load Firebase) on startup for users who were
  // signed in last time. Everyone else stays in Local mode with no SDK fetch.
  useEffect(() => {
    if (willRestoreSession) startAuthWatch();
    return () => {
      authUnsubRef.current?.();
      authUnsubRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // While signed in, debounce-sync changes up to Firestore.
  useEffect(() => {
    if (!user) return;
    const t = setTimeout(() => {
      saveCloud(user.uid, {
        progress,
        savedWords,
        chatMessages,
        quizHistory,
        dailyMissions,
      }).catch(() => {});
    }, 800);
    return () => clearTimeout(t);
  }, [user, progress, savedWords, chatMessages, quizHistory, dailyMissions]);

  const signIn = useCallback(async () => {
    // Start listening first so onAuthStateChanged catches this sign-in; this is
    // also the point where the Firebase SDK is finally fetched.
    startAuthWatch();
    await signInWithGoogle();
  }, [startAuthWatch]);

  const signOut = useCallback(async () => {
    await cloudSignOut();
    setUser(null);
  }, []);

  const registerUser = useCallback(
    (userName: string, nativeLanguage: string, level: Level) => {
      const now = Date.now();
      setProgress({
        userName: userName.trim() || "Learner",
        nativeLanguage,
        currentLevel: level,
        points: 0,
        streak: 1,
        lastActiveTimestamp: now,
        dailyLessonCompletedText: "",
      });
    },
    [],
  );

  const updateLevel = useCallback((level: Level) => {
    setProgress((prev) => (prev ? { ...prev, currentLevel: level } : prev));
  }, []);

  const addPoints = useCallback((points: number) => {
    setProgress((prev) => (prev ? { ...prev, points: prev.points + points } : prev));
  }, []);

  const isWordSaved = useCallback(
    (word: string) => savedWords.some((w) => w.word.toLowerCase() === word.toLowerCase()),
    [savedWords],
  );

  const toggleSaveWord = useCallback<LingoContextValue["toggleSaveWord"]>(
    (word) => {
      setSavedWords((prev) => {
        const exists = prev.find((w) => w.word.toLowerCase() === word.word.toLowerCase());
        if (exists) {
          return prev.filter((w) => w.id !== exists.id);
        }
        // Saving a new word awards +10 points (LingoViewModel.toggleSaveWord).
        setProgress((p) => (p ? { ...p, points: p.points + 10 } : p));
        // New words enter the spaced-repetition queue immediately due (box 0).
        return [
          {
            ...word,
            id: uid(),
            isMastered: false,
            savedAt: Date.now(),
            srsLevel: 0,
            nextReviewAt: Date.now(),
            reviewCount: 0,
          },
          ...prev,
        ];
      });
    },
    [],
  );

  const toggleMastered = useCallback((id: string) => {
    setSavedWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMastered: !w.isMastered } : w)),
    );
  }, []);

  // Words whose next review time has arrived (or that have never been reviewed).
  const dueWords = useCallback<LingoContextValue["dueWords"]>(
    () => savedWords.filter((w) => !w.isMastered && isDue(w.nextReviewAt)),
    [savedWords],
  );

  // Grade a review: advance/reset the Leitner box, schedule the next review,
  // auto-master at the top box, and award points for a correct recall (+5).
  const reviewWord = useCallback<LingoContextValue["reviewWord"]>((id, remembered) => {
    setSavedWords((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const next = scheduleNext(w.srsLevel ?? 0, remembered);
        return {
          ...w,
          srsLevel: next.srsLevel,
          nextReviewAt: next.nextReviewAt,
          reviewCount: (w.reviewCount ?? 0) + 1,
          isMastered: isSrsMastered(next.srsLevel),
        };
      }),
    );
    if (remembered) {
      setProgress((p) => (p ? { ...p, points: p.points + 5 } : p));
    }
  }, []);

  const completeLesson = useCallback((correctCount: number) => {
    setProgress((prev) => {
      if (!prev) return prev;
      const today = dateKey(Date.now());
      const alreadyClaimedBase = prev.dailyLessonCompletedText === today;
      // 50 base (once per day) + 20 per correct answer (LingoViewModel).
      const earned = (alreadyClaimedBase ? 0 : 50) + correctCount * 20;
      return {
        ...prev,
        points: prev.points + earned,
        dailyLessonCompletedText: today,
      };
    });
  }, []);

  const completeQuiz = useCallback(
    (level: Level, topic: string, score: number, total: number) => {
      // 25 points per correct answer (LingoViewModel.loadPracticeQuiz flow).
      setProgress((prev) => (prev ? { ...prev, points: prev.points + score * 25 } : prev));
      setQuizHistory((prev) => [
        { id: uid(), level, topic, score, totalQuestions: total, timestamp: Date.now() },
        ...prev,
      ]);
    },
    [],
  );

  // Mark today's mission done and award points once per mission per day.
  // Missions from a prior day are dropped first, so yesterday's checkmarks
  // never carry over or block today's points.
  const completeMission = useCallback((id: "video" | "talk") => {
    const today = dateKey(Date.now());
    setDailyMissions((prev) => {
      const current = todaysMissions(prev, today);
      if (current[id]) return current;
      setProgress((p) => (p ? { ...p, points: p.points + MISSION_POINTS } : p));
      return { ...current, [id]: true };
    });
  }, []);

  const addChatMessage = useCallback<LingoContextValue["addChatMessage"]>((msg) => {
    setChatMessages((prev) => [...prev, { ...msg, id: uid(), timestamp: Date.now() }]);
    // Each user dialogue turn awards +15 points (LingoViewModel.sendChatMessage).
    if (msg.role === "user") {
      setProgress((p) => (p ? { ...p, points: p.points + 15 } : p));
    }
  }, []);

  const clearChat = useCallback((scenario: string, level: Level) => {
    setChatMessages((prev) =>
      prev.filter((m) => !(m.scenario === scenario && m.level === level)),
    );
  }, []);

  const resetAll = useCallback(() => {
    setProgress(null);
    setSavedWords([]);
    setChatMessages([]);
    setQuizHistory([]);
    setDailyMissions(EMPTY_MISSIONS);
  }, []);

  const todayMissions = useMemo(
    () => todaysMissions(dailyMissions, dateKey(Date.now())),
    [dailyMissions],
  );

  const value = useMemo<LingoContextValue>(
    () => ({
      progress,
      savedWords,
      chatMessages,
      quizHistory,
      dailyMissions: todayMissions,
      completeMission,
      cloudConfigured: isCloudConfigured(),
      user,
      authReady,
      signIn,
      signOut,
      registerUser,
      updateLevel,
      addPoints,
      isWordSaved,
      toggleSaveWord,
      toggleMastered,
      dueWords,
      reviewWord,
      completeLesson,
      completeQuiz,
      addChatMessage,
      clearChat,
      resetAll,
    }),
    [
      progress,
      savedWords,
      chatMessages,
      quizHistory,
      todayMissions,
      completeMission,
      user,
      authReady,
      signIn,
      signOut,
      registerUser,
      updateLevel,
      addPoints,
      isWordSaved,
      toggleSaveWord,
      toggleMastered,
      dueWords,
      reviewWord,
      completeLesson,
      completeQuiz,
      addChatMessage,
      clearChat,
      resetAll,
    ],
  );

  return <LingoContext.Provider value={value}>{children}</LingoContext.Provider>;
}

export function useLingo(): LingoContextValue {
  const ctx = useContext(LingoContext);
  if (!ctx) throw new Error("useLingo must be used within a LingoProvider");
  return ctx;
}
