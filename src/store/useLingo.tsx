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
  DailyMissionFlag,
  DailyMissionsState,
  GemWord,
  LearnedWordEntry,
  Level,
  MissionKind,
  MissionLog,
  QuizHistory,
  SavedWord,
  UserProgress,
} from "../types";
import { seedStarterEntries } from "../data/starter-words";
import { isDue, isSrsMastered, scheduleNext } from "../utils/srs";
import {
  isWordAtOrBelowLevel,
  promotionTarget,
} from "../utils/levelProgress";
import {
  DAILY_CHECKLIST_LABELS,
  dateKeyFromTs,
  externalMissionLabel,
  MEMORIZATION_TOPIC,
} from "../utils/missions";
import { clearAllDailyCaches } from "../utils/dailyCache";
import { parseProgressBackup, type ProgressBackup } from "../utils/backup";
import { reportError } from "../services/errors";
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

// Persistence layer — localStorage in "Local mode", and (optionally) Firestore
// in "Account mode" when the user signs in with Google. Local mode is always
// the default and the offline cache.

const KEYS = {
  progress: "high5.progress",
  savedWords: "high5.saved_words",
  chat: "high5.chat_messages",
  quizHistory: "high5.quiz_history",
  missionLog: "high5.mission_log",
  dailyMissions: "high5.daily_missions",
  learnedWords: "high5.learned_words",
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

const MISSION_POINTS = 30;
export const DAILY_WORD_TARGET = 5;
// Longest "what did you watch/listen to/read?" note we keep, so a pasted wall
// of text can't bloat localStorage or the synced Firestore document.
const MAX_EXTERNAL_NOTE = 120;

const EMPTY_MISSIONS: DailyMissionsState = {
  date: "",
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
};

// Missions from a previous day don't carry over — a new day starts blank.
// Also backfills flags added after older localStorage snapshots were written.
function todaysMissions(m: DailyMissionsState, today: string): DailyMissionsState {
  if (m.date !== today) {
    return { ...EMPTY_MISSIONS, date: today };
  }
  return {
    ...m,
    listening: m.listening ?? false,
    speaking: m.speaking ?? false,
    memorization: m.memorization ?? false,
    speakingCount: m.speakingCount ?? 0,
    externalNotes: m.externalNotes ?? {},
  };
}

function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Points economy — a fixed amount is awarded in full once per activity per
// day; repeating the same activity again the same day still earns something,
// but at a reduced rate, so the same day-aligned quiz/sentence can't be
// replayed for unlimited points. Mirrors the gate `completeLesson` already
// had for the Daily Lesson.
const REPEAT_POINTS_FACTOR = 0.25;
const QUIZ_POINTS_PER_ANSWER = 25;
const SPEAKING_POINTS_MAX = 20;
// One full round of Speaking practice is 4 sentences (see generateSpeaking) —
// so the first round each day earns full credit per attempt.
const SPEAKING_FULL_CREDIT_ATTEMPTS = 4;

// Keep persisted history bounded so it can't grow forever — both so the
// synced Firestore document stays under Firestore's 1 MiB document limit, and
// so localStorage doesn't grow unbounded on long-term local-mode users.
const MAX_CHAT_MESSAGES = 200;
const MAX_MISSION_LOG = 400;

function capMissionLog(list: MissionLog[]): MissionLog[] {
  return list.length > MAX_MISSION_LOG ? list.slice(0, MAX_MISSION_LOG) : list;
}

interface LingoContextValue {
  progress: UserProgress | null;
  savedWords: SavedWord[];
  learnedWords: Record<string, LearnedWordEntry>;
  chatMessages: ChatMessage[];
  quizHistory: QuizHistory[];
  missionLog: MissionLog[];
  // Cloud / account state
  cloudConfigured: boolean;
  user: CloudUser | null;
  authReady: boolean;
  // True once the initial cloud load for the current session has either
  // applied real cloud data or confirmed there was none and seeded it — the
  // gate that stops the debounced upload effect from firing on a failed load.
  cloudSyncError: boolean;
  retryCloudSync: () => void;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  registerUser: (userName: string, nativeLanguage: string, level: Level) => void;
  updateLevel: (level: Level) => void;
  levelUpNotice: Level | null;
  clearLevelUpNotice: () => void;
  addPoints: (points: number) => void;
  // Speaking-practice points, gated to diminishing returns after the first
  // full round of the day (see SPEAKING_FULL_CREDIT_ATTEMPTS).
  awardSpeakingPoints: (score0to100: number) => void;
  isWordSaved: (word: string) => boolean;
  toggleSaveWord: (word: Omit<SavedWord, "id" | "savedAt" | "isMastered">) => void;
  markWordsLearned: (words: GemWord[], level: Level) => void;
  toggleMastered: (id: string) => void;
  dueWords: () => SavedWord[];
  reviewWord: (id: string, remembered: boolean) => void;
  completeLesson: (correctCount: number, totalQuestions: number) => void;
  // Returns the points actually awarded (full rate the first time this topic
  // is completed today, reduced on repeats — see completeQuiz's impl) so
  // callers can display an accurate figure instead of assuming the full rate.
  completeQuiz: (level: Level, topic: string, score: number, total: number) => number;
  logMission: (kind: MissionKind, label: string, score?: number, total?: number) => void;
  dailyMissions: DailyMissionsState;
  todayWordCount: number;
  // Mark a daily mission done by hand. `note` records what the learner did in
  // another app (a song, a video, an article) — it is kept with the day and
  // written into the calendar entry.
  completeMission: (id: DailyMissionFlag, note?: string) => void;
  addChatMessage: (msg: Omit<ChatMessage, "id" | "timestamp">) => void;
  clearChat: (scenario: string, level: Level) => void;
  resetAll: () => void;
  exportProgress: () => ProgressBackup;
  importProgress: (raw: unknown) => void;
}

const LingoContext = createContext<LingoContextValue | null>(null);

export function LingoProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress | null>(() =>
    load<UserProgress | null>(KEYS.progress, null),
  );
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() =>
    load<SavedWord[]>(KEYS.savedWords, []),
  );
  const [learnedWords, setLearnedWords] = useState<Record<string, LearnedWordEntry>>(() => {
    const stored = load<Record<string, LearnedWordEntry>>(KEYS.learnedWords, {});
    return Object.keys(stored).length > 0 ? stored : seedStarterEntries();
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    load<ChatMessage[]>(KEYS.chat, []),
  );
  const [quizHistory, setQuizHistory] = useState<QuizHistory[]>(() =>
    load<QuizHistory[]>(KEYS.quizHistory, []),
  );
  const [missionLog, setMissionLog] = useState<MissionLog[]>(() =>
    load<MissionLog[]>(KEYS.missionLog, []),
  );
  const [dailyMissions, setDailyMissions] = useState<DailyMissionsState>(() =>
    load<DailyMissionsState>(KEYS.dailyMissions, EMPTY_MISSIONS),
  );
  const [levelUpNotice, setLevelUpNotice] = useState<Level | null>(null);

  const [user, setUser] = useState<CloudUser | null>(null);
  // See LingoContextValue.cloudSyncError for what these two gate.
  const [cloudLoaded, setCloudLoaded] = useState(false);
  const [cloudSyncError, setCloudSyncError] = useState(false);
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
    localStorage.setItem(KEYS.learnedWords, JSON.stringify(learnedWords));
  }, [learnedWords]);
  useEffect(() => {
    localStorage.setItem(KEYS.chat, JSON.stringify(chatMessages));
  }, [chatMessages]);
  useEffect(() => {
    localStorage.setItem(KEYS.quizHistory, JSON.stringify(quizHistory));
  }, [quizHistory]);
  useEffect(() => {
    localStorage.setItem(KEYS.missionLog, JSON.stringify(missionLog));
  }, [missionLog]);
  useEffect(() => {
    localStorage.setItem(KEYS.dailyMissions, JSON.stringify(dailyMissions));
  }, [dailyMissions]);

  // Keep the latest snapshot in a ref so the auth callback can seed the cloud
  // with current data without depending on stale closures.
  const latest = useRef<CloudData>({
    progress,
    savedWords,
    learnedWords,
    chatMessages,
    quizHistory,
    missionLog,
    dailyMissions,
  });
  useEffect(() => {
    latest.current = {
      progress,
      savedWords,
      learnedWords,
      chatMessages,
      quizHistory,
      missionLog,
      dailyMissions,
    };
  }, [progress, savedWords, learnedWords, chatMessages, quizHistory, missionLog, dailyMissions]);

  // Streak bookkeeping — same day → unchanged; consecutive day → +1; gap →
  // reset. Runs on mount and again whenever the tab regains visibility, so a
  // session left open across midnight still rolls the streak instead of only
  // catching it on the next full reload.
  useEffect(() => {
    function recomputeStreak() {
      setProgress((prev) => {
        if (!prev) return prev;
        const now = Date.now();
        const today = dateKeyFromTs(now);
        const last = prev.lastActiveTimestamp ? dateKeyFromTs(prev.lastActiveTimestamp) : "";
        if (last === today) return prev;
        const yesterday = dateKeyFromTs(now - 86_400_000);
        const streak = last === yesterday ? prev.streak + 1 : 1;
        return { ...prev, streak, lastActiveTimestamp: now };
      });
    }
    recomputeStreak();
    function onVisibility() {
      if (document.visibilityState === "visible") recomputeStreak();
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Apply a loaded (or freshly seeded) cloud document to local state and mark
  // the load as successful — shared by the initial auth watcher and the
  // manual retry below.
  const applyCloudLoad = useCallback(async (uid: string) => {
    const cloud = await loadCloud(uid);
    if (cloud) {
      setProgress(cloud.progress ?? null);
      setSavedWords(cloud.savedWords ?? []);
      setLearnedWords(cloud.learnedWords ?? seedStarterEntries());
      setChatMessages(cloud.chatMessages ?? []);
      setQuizHistory(cloud.quizHistory ?? []);
      setMissionLog(cloud.missionLog ?? []);
      setDailyMissions(cloud.dailyMissions ?? EMPTY_MISSIONS);
    } else {
      await saveCloud(uid, latest.current);
    }
    setCloudLoaded(true);
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
        setCloudLoaded(false);
        setCloudSyncError(false);
        return;
      }
      localStorage.setItem(KEYS.cloudSession, JSON.stringify(true));
      setCloudSyncError(false);
      try {
        await applyCloudLoad(u.uid);
      } catch (err) {
        // Network/permission issue → stay on local data, and deliberately do
        // NOT mark cloudLoaded — the debounced upload effect below stays off
        // until a retry succeeds, so a transient failure here can never
        // silently overwrite the user's real cloud progress with stale local
        // data. Surfaced via cloudSyncError so the UI can offer a retry.
        reportError(err, "cloud.load");
        setCloudSyncError(true);
      }
    });
  }, [applyCloudLoad]);

  // Manual retry for the UI to call after a failed initial load.
  const retryCloudSync = useCallback(() => {
    if (!user) return;
    setCloudSyncError(false);
    applyCloudLoad(user.uid).catch((err) => {
      reportError(err, "cloud.retry");
      setCloudSyncError(true);
    });
  }, [user, applyCloudLoad]);

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

  // While signed in, debounce-sync changes up to Firestore — gated on
  // cloudLoaded so this never fires before the initial load has either
  // applied the user's real cloud data or confirmed there was none.
  useEffect(() => {
    if (!user || !cloudLoaded) return;
    const t = setTimeout(() => {
      saveCloud(user.uid, {
        progress,
        savedWords,
        learnedWords,
        chatMessages,
        quizHistory,
        missionLog,
        dailyMissions,
      }).catch((err) => {
        reportError(err, "cloud.save");
        setCloudSyncError(true);
      });
    }, 800);
    return () => clearTimeout(t);
  }, [
    user,
    cloudLoaded,
    progress,
    savedWords,
    learnedWords,
    chatMessages,
    quizHistory,
    missionLog,
    dailyMissions,
  ]);

  const signIn = useCallback(async () => {
    // Start listening first so onAuthStateChanged catches this sign-in; this is
    // also the point where the Firebase SDK is finally fetched.
    startAuthWatch();
    await signInWithGoogle();
  }, [startAuthWatch]);

  const signOut = useCallback(async () => {
    await cloudSignOut();
    setUser(null);
    setCloudLoaded(false);
    setCloudSyncError(false);
    localStorage.removeItem(KEYS.cloudSession);
    // Signing out only happens from an account session (the Settings sign-out
    // button only renders while `user` is set), so this device's local data
    // is a copy of that account's progress — clear it so the next person (or
    // the next Google account) on a shared device doesn't inherit it, or have
    // it re-uploaded over their own cloud data.
    resetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const clearLevelUpNotice = useCallback(() => setLevelUpNotice(null), []);

  // Auto-promote when vocabulary mastery thresholds are met at the current level.
  useEffect(() => {
    if (!progress) return;
    const target = promotionTarget(progress.currentLevel, learnedWords, savedWords);
    if (!target || target === progress.currentLevel) return;
    setLevelUpNotice(target);
    setMissionLog((ml) =>
      capMissionLog([
        {
          id: uid(),
          kind: "lesson",
          label: `עלית לרמה ${target}! 🎉`,
          timestamp: Date.now(),
        },
        ...ml,
      ]),
    );
    setProgress((prev) =>
      prev ? { ...prev, currentLevel: target, points: prev.points + 100 } : prev,
    );
  }, [learnedWords, savedWords, progress?.currentLevel]);

  const addPoints = useCallback((points: number) => {
    setProgress((prev) => (prev ? { ...prev, points: prev.points + points } : prev));
  }, []);

  const isWordSaved = useCallback(
    (word: string) => savedWords.some((w) => w.word.toLowerCase() === word.toLowerCase()),
    [savedWords],
  );

  const markWordsLearned = useCallback((words: GemWord[], level: Level) => {
    setLearnedWords((prev) => {
      const next = { ...prev };
      const now = Date.now();
      let added = false;
      for (const w of words) {
        const key = w.word.toLowerCase();
        if (!next[key]) {
          next[key] = { word: w.word, translation: w.translation, level, firstSeenAt: now };
          added = true;
        }
      }
      // Keep the same object when nothing is new — re-marking words already
      // learned (the Memorization screen does this on every visit) shouldn't
      // churn every consumer of `learnedWords`.
      return added ? next : prev;
    });
  }, []);

  const toggleSaveWord = useCallback<LingoContextValue["toggleSaveWord"]>(
    (word) => {
      setSavedWords((prev) => {
        const exists = prev.find((w) => w.word.toLowerCase() === word.word.toLowerCase());
        if (exists) {
          return prev.filter((w) => w.id !== exists.id);
        }
        // Saving a new word awards +10 points.
        setProgress((p) => (p ? { ...p, points: p.points + 10 } : p));
        // New words enter the spaced-repetition queue immediately due (box 0).
        // Saving also marks the word as learned for progressive content.
        setLearnedWords((lw) => {
          const key = word.word.toLowerCase();
          if (lw[key]) return lw;
          return {
            ...lw,
            [key]: {
              word: word.word,
              translation: word.translation,
              level: word.level,
              firstSeenAt: Date.now(),
            },
          };
        });
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

  // Words due for review at or below the learner's current CEFR level.
  const dueWords = useCallback<LingoContextValue["dueWords"]>(
    () => {
      const lvl = progress?.currentLevel ?? "A1";
      return savedWords.filter(
        (w) =>
          !w.isMastered &&
          isDue(w.nextReviewAt) &&
          isWordAtOrBelowLevel(w.level, lvl),
      );
    },
    [savedWords, progress?.currentLevel],
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

  const logMission = useCallback<LingoContextValue["logMission"]>(
    (kind, label, score, total) => {
      setMissionLog((prev) =>
        capMissionLog([
          { id: uid(), kind, label, timestamp: Date.now(), score, total },
          ...prev,
        ]),
      );
    },
    [],
  );

  const completeLesson = useCallback((correctCount: number, totalQuestions: number) => {
    const now = Date.now();
    const today = dateKeyFromTs(now);
    setProgress((prev) => {
      if (!prev) return prev;
      const alreadyClaimedBase = prev.dailyLessonCompletedText === today;
      // 50 base (once per day) + 20 per correct answer.
      const earned = (alreadyClaimedBase ? 0 : 50) + correctCount * 20;
      return {
        ...prev,
        points: prev.points + earned,
        dailyLessonCompletedText: today,
      };
    });
    setMissionLog((prev) => {
      const existing = prev.find(
        (m) => m.kind === "lesson" && dateKeyFromTs(m.timestamp) === today,
      );
      if (existing) {
        return prev.map((m) =>
          m.id === existing.id
            ? { ...m, score: correctCount, total: totalQuestions }
            : m,
        );
      }
      return capMissionLog([
        {
          id: uid(),
          kind: "lesson",
          label: DAILY_CHECKLIST_LABELS.grammar.label,
          timestamp: now,
          score: correctCount,
          total: totalQuestions,
        },
        ...prev,
      ]);
    });
  }, []);

  const completeQuiz = useCallback(
    (level: Level, topic: string, score: number, total: number) => {
      // 25 points per correct answer the first time this topic is completed
      // today; reduced on repeats so
      // replaying the same day-aligned quiz can't be farmed for unlimited
      // points — same gate shape as completeLesson's per-day base bonus.
      const today = dateKeyFromTs(Date.now());
      const alreadyToday = quizHistory.some(
        (h) => h.topic === topic && dateKeyFromTs(h.timestamp) === today,
      );
      const perAnswer = alreadyToday
        ? Math.round(QUIZ_POINTS_PER_ANSWER * REPEAT_POINTS_FACTOR)
        : QUIZ_POINTS_PER_ANSWER;
      const earned = score * perAnswer;
      setProgress((prev) => (prev ? { ...prev, points: prev.points + earned } : prev));
      setQuizHistory((prev) => [
        { id: uid(), level, topic, score, totalQuestions: total, timestamp: Date.now() },
        ...prev,
      ]);
      return earned;
    },
    [quizHistory],
  );

  // Mark today's mission done and award points once per mission per day.
  // Missions from a prior day are dropped first, so yesterday's checkmarks
  // never carry over or block today's points. Shared by the manual "mark as
  // done" missions and the auto-detected ones below.
  // `note` is set only when the learner did the activity in another app.
  const awardMission = useCallback((id: DailyMissionFlag, note?: string) => {
    const today = dateKeyFromTs(Date.now());
    const trimmed = note?.trim().slice(0, MAX_EXTERNAL_NOTE) ?? "";
    setDailyMissions((prev) => {
      const current = todaysMissions(prev, today);
      if (current[id]) return current;
      setProgress((p) => (p ? { ...p, points: p.points + MISSION_POINTS } : p));

      // Log missions that aren't already tracked elsewhere: the checklist-only
      // ones (video, talk, words) and anything done outside the app — an
      // in-app Reading/Listening/Speaking round writes its own entry.
      const meta = DAILY_CHECKLIST_LABELS[id];
      if (id === "video" || id === "talk" || id === "words" || trimmed) {
        const label = trimmed ? externalMissionLabel(id, trimmed) : meta.label;
        setMissionLog((ml) => {
          if (ml.some((m) => m.kind === meta.kind && dateKeyFromTs(m.timestamp) === today)) {
            return ml;
          }
          return capMissionLog([
            { id: uid(), kind: meta.kind, label, timestamp: Date.now() },
            ...ml,
          ]);
        });
      }

      return {
        ...current,
        [id]: true,
        externalNotes: trimmed
          ? { ...current.externalNotes, [id]: trimmed }
          : current.externalNotes,
      };
    });
  }, []);

  const completeMission = useCallback(
    (id: DailyMissionFlag, note?: string) => awardMission(id, note),
    [awardMission],
  );

  // Speaking-practice points: full credit for the first round of the day
  // (SPEAKING_FULL_CREDIT_ATTEMPTS attempts), reduced after — otherwise the
  // same sentence could be re-recorded indefinitely for unlimited points.
  const awardSpeakingPoints = useCallback((score0to100: number) => {
    const today = dateKeyFromTs(Date.now());
    setDailyMissions((prev) => {
      const current = todaysMissions(prev, today);
      const count = current.speakingCount ?? 0;
      const fullCredit = count < SPEAKING_FULL_CREDIT_ATTEMPTS;
      const raw = Math.round((score0to100 / 100) * SPEAKING_POINTS_MAX);
      const earned = fullCredit ? raw : Math.round(raw * REPEAT_POINTS_FACTOR);
      setProgress((p) => (p ? { ...p, points: p.points + earned } : p));
      return { ...current, speakingCount: count + 1 };
    });
  }, []);

  // Words saved today (via toggleSaveWord) — drives the "save 5 words" mission.
  const todayWordCount = useMemo(() => {
    const today = dateKeyFromTs(Date.now());
    return savedWords.filter((w) => dateKeyFromTs(w.savedAt) === today).length;
  }, [savedWords]);

  // Auto-complete the "words" mission (no manual mark) once the daily target
  // is reached, awarding points the same way the manual missions do.
  useEffect(() => {
    if (todayWordCount >= DAILY_WORD_TARGET) awardMission("words");
  }, [todayWordCount, awardMission]);

  // Auto-complete "read an article" once a Reading Lab article's comprehension
  // quiz has been finished today (Reading.tsx logs it via completeQuiz).
  useEffect(() => {
    const today = dateKeyFromTs(Date.now());
    const done = quizHistory.some(
      (h) => h.topic === "Reading" && dateKeyFromTs(h.timestamp) === today,
    );
    if (done) awardMission("reading");
  }, [quizHistory, awardMission]);

  // Auto-complete Listening once today's Listening quiz is finished.
  useEffect(() => {
    const today = dateKeyFromTs(Date.now());
    const done = quizHistory.some(
      (h) => h.topic === "Listening" && dateKeyFromTs(h.timestamp) === today,
    );
    if (done) awardMission("listening");
  }, [quizHistory, awardMission]);

  // Auto-complete the Memorization mission once today's memorization round is
  // finished (Memorize.tsx logs it via completeQuiz).
  useEffect(() => {
    const today = dateKeyFromTs(Date.now());
    const done = quizHistory.some(
      (h) => h.topic === MEMORIZATION_TOPIC && dateKeyFromTs(h.timestamp) === today,
    );
    if (done) awardMission("memorization");
  }, [quizHistory, awardMission]);

  // Auto-complete Speaking once a speaking practice set is finished today
  // (Speaking.tsx logs it via logMission("speaking")).
  useEffect(() => {
    const today = dateKeyFromTs(Date.now());
    const done = missionLog.some(
      (m) => m.kind === "speaking" && dateKeyFromTs(m.timestamp) === today,
    );
    if (done) awardMission("speaking");
  }, [missionLog, awardMission]);

  // Auto-complete "learn one grammar topic" once today's Daily Lesson is done
  // — dailyLessonCompletedText is already the per-day gate completeLesson sets.
  useEffect(() => {
    if (progress?.dailyLessonCompletedText === dateKeyFromTs(Date.now())) {
      awardMission("grammar");
    }
  }, [progress?.dailyLessonCompletedText, awardMission]);

  const addChatMessage = useCallback<LingoContextValue["addChatMessage"]>((msg) => {
    setChatMessages((prev) => {
      const next = [...prev, { ...msg, id: uid(), timestamp: Date.now() }];
      return next.length > MAX_CHAT_MESSAGES ? next.slice(-MAX_CHAT_MESSAGES) : next;
    });
    // Each user dialogue turn awards +15 points.
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
    setLearnedWords(seedStarterEntries());
    setChatMessages([]);
    setQuizHistory([]);
    setMissionLog([]);
    setDailyMissions(EMPTY_MISSIONS);
    setLevelUpNotice(null);
    // Also clear cached lesson/reading/listening/speaking-of-the-day content
    // so a reset doesn't leave stale content showing on the next visit.
    // Deliberately does NOT touch the AI provider key or UI prefs (theme,
    // speech speed) — those are user settings, not learning progress.
    clearAllDailyCaches();
  }, []);

  const exportProgress = useCallback((): ProgressBackup => {
    return {
      version: 1,
      exportedAt: Date.now(),
      progress,
      savedWords,
      learnedWords,
      chatMessages,
      quizHistory,
      missionLog,
      dailyMissions,
    };
  }, [
    progress,
    savedWords,
    learnedWords,
    chatMessages,
    quizHistory,
    missionLog,
    dailyMissions,
  ]);

  const importProgress = useCallback((raw: unknown) => {
    const data = parseProgressBackup(raw);
    setProgress(data.progress);
    setSavedWords(data.savedWords);
    setLearnedWords(
      Object.keys(data.learnedWords).length > 0
        ? data.learnedWords
        : seedStarterEntries(),
    );
    setChatMessages(data.chatMessages);
    setQuizHistory(data.quizHistory);
    setMissionLog(data.missionLog);
    setDailyMissions(todaysMissions(data.dailyMissions, dateKeyFromTs(Date.now())));
    setLevelUpNotice(null);
    clearAllDailyCaches();
  }, []);

  const todayMissions = useMemo(
    () => todaysMissions(dailyMissions, dateKeyFromTs(Date.now())),
    [dailyMissions],
  );

  const value = useMemo<LingoContextValue>(
    () => ({
      progress,
      savedWords,
      learnedWords,
      chatMessages,
      quizHistory,
      missionLog,
      dailyMissions: todayMissions,
      todayWordCount,
      completeMission,
      cloudConfigured: isCloudConfigured(),
      user,
      authReady,
      cloudSyncError,
      retryCloudSync,
      signIn,
      signOut,
      registerUser,
      updateLevel,
      levelUpNotice,
      clearLevelUpNotice,
      addPoints,
      awardSpeakingPoints,
      isWordSaved,
      markWordsLearned,
      toggleSaveWord,
      toggleMastered,
      dueWords,
      reviewWord,
      completeLesson,
      completeQuiz,
      logMission,
      addChatMessage,
      clearChat,
      resetAll,
      exportProgress,
      importProgress,
    }),
    [
      progress,
      savedWords,
      learnedWords,
      chatMessages,
      quizHistory,
      missionLog,
      todayMissions,
      todayWordCount,
      completeMission,
      user,
      authReady,
      cloudSyncError,
      retryCloudSync,
      signIn,
      signOut,
      registerUser,
      updateLevel,
      levelUpNotice,
      clearLevelUpNotice,
      addPoints,
      awardSpeakingPoints,
      isWordSaved,
      markWordsLearned,
      toggleSaveWord,
      toggleMastered,
      dueWords,
      reviewWord,
      completeLesson,
      completeQuiz,
      logMission,
      addChatMessage,
      clearChat,
      resetAll,
      exportProgress,
      importProgress,
    ],
  );

  return <LingoContext.Provider value={value}>{children}</LingoContext.Provider>;
}

export function useLingo(): LingoContextValue {
  const ctx = useContext(LingoContext);
  if (!ctx) throw new Error("useLingo must be used within a LingoProvider");
  return ctx;
}
