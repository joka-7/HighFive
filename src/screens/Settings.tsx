import { useState } from "react";
import GithubIcon from "../components/GithubIcon";
import {
  PROVIDERS,
  loadAIConfig,
  saveAIConfig,
  clearAIConfig,
  isAIReady,
  type ProviderId,
} from "../services/ai";
import { useLingo } from "../store/useLingo";
import {
  loadPrefs,
  savePrefs,
  applyTheme,
  type SpeechSpeed,
} from "../services/prefs";
import {
  notificationsSupported,
  requestReminderPermission,
} from "../services/reminders";
import { usePwaInstall, canShare, shareApp } from "../services/pwa";
import { enablePushReminders, isPushSupported, pushPermission } from "../services/push";
import { speak, ttsSupported } from "../services/tts";
import { navigateHash } from "../utils/routing";

const SPEECH_LABELS: { id: SpeechSpeed; label: string }[] = [
  { id: "slow", label: "🐢 איטי" },
  { id: "normal", label: "🚶 רגיל" },
  { id: "fast", label: "🐇 מהיר" },
];

// API key / provider settings — mirrors JobFlowTracker's APIKeySettings:
// pick a provider, paste a key (or Ollama URL), optional model override, save.
export default function Settings() {
  const {
    resetAll,
    cloudConfigured,
    user,
    authReady,
    cloudSyncError,
    retryCloudSync,
    signIn,
    signOut,
    progress,
    exportProgress,
    importProgress,
  } = useLingo();
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [backupMsg, setBackupMsg] = useState("");

  const [prefs, setPrefs] = useState(() => loadPrefs());
  const { canInstall, installed, install } = usePwaInstall();

  const [pushBusy, setPushBusy] = useState(false);
  const [pushError, setPushError] = useState("");
  const [pushEnabled, setPushEnabled] = useState(pushPermission() === "granted");

  async function handleEnablePush() {
    if (!user) return;
    setPushError("");
    setPushBusy(true);
    const result = await enablePushReminders(user.uid);
    if (result.ok) {
      setPushEnabled(true);
    } else {
      setPushError(
        result.error === "denied"
          ? "לא ניתנה הרשאה להתראות. אפשר לשנות זאת בהגדרות הדפדפן."
          : "הפעלת התזכורות נכשלה. נסה שוב מאוחר יותר.",
      );
    }
    setPushBusy(false);
  }

  function setTheme(dark: boolean) {
    const next = { ...prefs, theme: dark ? ("dark" as const) : ("light" as const) };
    setPrefs(next);
    savePrefs(next);
    applyTheme(next.theme);
  }

  function setSpeechSpeed(speed: SpeechSpeed) {
    const next = { ...prefs, speechSpeed: speed };
    setPrefs(next);
    savePrefs(next);
    if (ttsSupported()) speak("This is the playback speed.");
  }

  async function setRemindersEnabled(enabled: boolean) {
    if (enabled) {
      if (!notificationsSupported()) {
        setBackupMsg("הדפדפן לא תומך בהתראות.");
        return;
      }
      const perm = await requestReminderPermission();
      if (perm !== "granted") {
        setBackupMsg("יש לאשר התראות בהגדרות הדפדפן.");
        return;
      }
    }
    const next = { ...prefs, remindersEnabled: enabled };
    setPrefs(next);
    savePrefs(next);
  }

  function setReminderHour(hour: number) {
    const next = { ...prefs, reminderHour: hour };
    setPrefs(next);
    savePrefs(next);
  }

  async function handleSignIn() {
    setAuthError("");
    setAuthBusy(true);
    try {
      await signIn();
    } catch {
      setAuthError("ההתחברות נכשלה. נסה שוב.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignOut() {
    // Signing out clears this device's local learner data too (so the next
    // person, or the next Google account, on a shared device doesn't inherit
    // it) — the account's real progress stays safe in the cloud.
    if (
      !confirm(
        "להתנתק? נתוני הלמידה שנשמרו במכשיר הזה יימחקו. ההתקדמות שלך נשארת בענן ותחזור בהתחברות הבאה.",
      )
    ) {
      return;
    }
    setAuthBusy(true);
    try {
      await signOut();
    } finally {
      setAuthBusy(false);
    }
  }

  function handleExport() {
    const data = exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `high5-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBackupMsg("הקובץ הורד.");
  }

  function handleImportFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (
          !confirm(
            "לייבא את הקובץ? הנתונים הנוכחיים במכשיר יוחלפו בתוכן הקובץ.",
          )
        ) {
          return;
        }
        importProgress(parsed);
        setBackupMsg("הייבוא הצליח.");
      } catch {
        setBackupMsg("הייבוא נכשל — הקובץ אינו תקין.");
      }
    };
    reader.readAsText(file);
  }

  const initial = loadAIConfig();
  const [provider, setProvider] = useState<ProviderId>(initial.provider);
  const [apiKey, setApiKeyState] = useState(initial.apiKey);
  const [model, setModel] = useState(
    initial.model === PROVIDERS[initial.provider].defaultModel ? "" : initial.model,
  );
  const [ollamaUrl, setOllamaUrl] = useState(initial.ollamaUrl);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const info = PROVIDERS[provider];

  function save() {
    saveAIConfig({
      provider,
      apiKey: info.noKey ? "" : apiKey,
      model: model.trim() || info.defaultModel,
      ollamaUrl,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function clearAll() {
    clearAIConfig();
    setProvider("gemini");
    setApiKeyState("");
    setModel("");
    setOllamaUrl("http://localhost:11434");
  }

  return (
    <div>
      <div className="card">
        <h2>🤖 הגדרות AI</h2>

        <div className="banner">
          🔒 המפתח נשמר אך ורק בדפדפן שלך (localStorage) ונשלח ישירות לספק שבחרת.
          הוא לא נשמר בשום שרת. לפרסום ציבורי מומלץ פרוקסי בצד שרת.
        </div>

        {isAIReady() && (
          <div className="banner success">
            ✅ פעיל: {PROVIDERS[loadAIConfig().provider].name}
          </div>
        )}

        <label className="field">
          <span>ספק AI</span>
        </label>
        <div className="menu-grid mb-4">
          {Object.values(PROVIDERS).map((p) => (
            <button
              key={p.id}
              className={`level-pill provider-pill ${provider === p.id ? "active" : ""}`}
              onClick={() => setProvider(p.id)}
            >
              {p.name}
              {p.free && (
                <span className="tag ok ms-1">
                  חינם
                </span>
              )}
            </button>
          ))}
        </div>

        {info.noKey ? (
          <label className="field">
            <span>כתובת Ollama</span>
            <input
              className="input input-ltr"
              value={ollamaUrl}
              placeholder={info.placeholder}
              onChange={(e) => setOllamaUrl(e.target.value)}
            />
          </label>
        ) : (
          <label className="field">
            <span>מפתח API</span>
            <div className="icon-row">
              <input
                className="input input-ltr"
                type={showKey ? "text" : "password"}
                value={apiKey}
                placeholder={info.placeholder}
                onChange={(e) => setApiKeyState(e.target.value)}
              />
              <button
                className="icon-btn"
                aria-label={showKey ? "הסתר מפתח API" : "הצג מפתח API"}
                aria-pressed={showKey}
                onClick={() => setShowKey((s) => !s)}
              >
                <span aria-hidden="true">{showKey ? "🙈" : "👁️"}</span>
              </button>
            </div>
          </label>
        )}

        <label className="field">
          <span>מודל (אופציונלי)</span>
          <input
            className="input input-ltr"
            value={model}
            placeholder={info.defaultModel}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>

        <p className="muted fs-13">
          <a href={info.infoUrl} target="_blank" rel="noreferrer">
            {info.infoText}
          </a>
        </p>

        <button className="btn" onClick={save}>
          {saved ? "נשמר ✓" : "שמירה"}
        </button>
        <div className="spacer-sm" />
        <button className="btn ghost" onClick={clearAll}>
          מחיקת הגדרות AI
        </button>
      </div>

      <div className="card">
        <h2>⚙️ העדפות</h2>

        <div className="row-between mb-5">
          <div>
            <div className="fw-700">🌙 מצב כהה</div>
            <div className="muted fs-13">נוח יותר לעיניים בלילה</div>
          </div>
          <button
            className={`level-pill min-w-64 ${prefs.theme === "dark" ? "active" : ""}`}
            onClick={() => setTheme(prefs.theme !== "dark")}
          >
            {prefs.theme === "dark" ? "פעיל" : "כבוי"}
          </button>
        </div>

        <label className="field">
          <span>🔊 מהירות הקראה</span>
        </label>
        <div className="level-row mb-5">
          {SPEECH_LABELS.map((s) => (
            <button
              key={s.id}
              className={`level-pill ${prefs.speechSpeed === s.id ? "active" : ""}`}
              onClick={() => setSpeechSpeed(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* The level switcher lives on ההתקדמות שלי, next to the thresholds that
            explain what moving a level means — one home instead of two. */}
        {progress && (
          <div className="row-between my-prefs">
            <div>
              <div className="fw-700">🎯 רמת לימוד</div>
              <div className="muted fs-13">
                משנים את הרמה במסך ההתקדמות, שם רואים גם מה נשאר כדי לעלות.
              </div>
            </div>
            <button className="btn ghost small" onClick={() => navigateHash("progress")}>
              רמה {progress.currentLevel} ←
            </button>
          </div>
        )}

        <div className="row-between my-prefs">
          <div>
            <div className="fw-700">🔔 תזכורת משימות</div>
            <div className="muted fs-13">
              התראה מקומית כשהאפליקציה פתוחה אחרי השעה שנבחרה ומשימות לא הושלמו.
            </div>
          </div>
          <button
            className={`level-pill min-w-64 ${prefs.remindersEnabled ? "active" : ""}`}
            onClick={() => setRemindersEnabled(!prefs.remindersEnabled)}
          >
            {prefs.remindersEnabled ? "פעיל" : "כבוי"}
          </button>
        </div>
        {prefs.remindersEnabled && (
          <label className="field">
            <span>שעת תזכורת</span>
            <select
              className="input"
              value={prefs.reminderHour}
              onChange={(e) => setReminderHour(Number(e.target.value))}
            >
              {Array.from({ length: 24 }, (_, h) => (
                <option key={h} value={h}>
                  {String(h).padStart(2, "0")}:00
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="card">
        <h3>📲 התקנה ושיתוף</h3>
        {installed ? (
          <p className="muted">✅ האפליקציה מותקנת במכשיר שלך.</p>
        ) : canInstall ? (
          <>
            <p className="muted">התקן את High5 כאפליקציה במסך הבית לגישה מהירה וגם ללא אינטרנט.</p>
            <button className="btn" onClick={install}>
              📥 התקנת האפליקציה
            </button>
          </>
        ) : (
          <p className="muted">
            כדי להתקין: פתח את תפריט הדפדפן ובחר "הוסף למסך הבית". ב-iPhone — דרך כפתור השיתוף בספארי.
          </p>
        )}
        {canShare() && (
          <>
            <div className="spacer-sm" />
            <button className="btn secondary" onClick={() => shareApp()}>
              🔗 שיתוף האפליקציה
            </button>
          </>
        )}
      </div>

      <div className="card">
        <h3>☁️ חשבון וסנכרון</h3>
        {!cloudConfigured ? (
          <p className="muted">
            הנתונים נשמרים במכשיר הזה בלבד. כדי לסנכרן בין מכשירים עם חשבון Google,
            יש להגדיר Firebase (ראה הוראות ב-README).
          </p>
        ) : !authReady ? (
          <p className="muted">טוען…</p>
        ) : user ? (
          <>
            {cloudSyncError && (
              <div className="banner mb-2_5">
                ⚠️ הסנכרון לענן נכשל — ההתקדמות שלך נשארת מקומית בינתיים ולא
                תידרס. בדוק חיבור לאינטרנט ונסה שוב.
                <div>
                  <button
                    className="btn ghost small mt-1_5"
                    onClick={retryCloudSync}
                  >
                    נסה סנכרון שוב
                  </button>
                </div>
              </div>
            )}
            <p className="muted">
              מחובר כ-<strong>{user.email ?? user.displayName ?? "משתמש Google"}</strong>.
              ההתקדמות מסונכרנת בין המכשירים שלך.
            </p>
            <button className="btn ghost" disabled={authBusy} onClick={handleSignOut}>
              התנתקות
            </button>
          </>
        ) : (
          <>
            <p className="muted">
              שמירה מקומית פעילה. התחבר עם Google כדי לסנכרן את ההתקדמות בין מכשירים.
            </p>
            <button className="btn" disabled={authBusy} onClick={handleSignIn}>
              {authBusy ? "מתחבר…" : "התחברות עם Google"}
            </button>
            {authError && (
              <p className="muted text-danger">
                {authError}
              </p>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="card">
          <h3>🔔 תזכורות יומיות</h3>
          {!isPushSupported() ? (
            <p className="muted">הדפדפן הזה לא תומך בהתראות דחיפה.</p>
          ) : pushEnabled ? (
            <p className="muted">
              ✅ תזכורות פעילות. אם לא תיכנס/י ולא תשלים/י את המשימות היומיות, תישלח לך תזכורת.
            </p>
          ) : (
            <>
              <p className="muted">
                קבל/י תזכורת אם לא נכנסת לאפליקציה ולא השלמת את המשימות היומיות שלך.
              </p>
              <button className="btn" disabled={pushBusy} onClick={handleEnablePush}>
                {pushBusy ? "מפעיל…" : "הפעלת תזכורות"}
              </button>
              {pushError && (
                <p className="muted" style={{ color: "var(--danger)" }}>
                  {pushError}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className="card">
        <h3>💾 גיבוי ושחזור</h3>
        <p className="muted">
          הורידו קובץ JSON של ההתקדמות, או ייבאו קובץ ממכשיר אחר — בלי חשבון
          Google. מפתח ה-AI והעדפות הממשק לא נכללים בגיבוי.
        </p>
        <button className="btn" onClick={handleExport}>
          ייצוא התקדמות
        </button>
        <div className="spacer-sm" />
        <label className="btn secondary block-center">
          ייבוא מקובץ…
          <input
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImportFile(file);
              e.target.value = "";
            }}
          />
        </label>
        {backupMsg && (
          <p className="muted mt-2" role="status">
            {backupMsg}
          </p>
        )}
      </div>

      <div className="card">
        <h3>איפוס נתונים</h3>
        <p className="muted">
          מחיקת כל ההתקדמות, המילים השמורות והשיחות. מפתח ה-AI וההעדפות (ערכת
          נושא, מהירות הקראה) יישארו כפי שהם.
        </p>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (confirm("לאפס את כל הנתונים? פעולה זו אינה הפיכה.")) resetAll();
          }}
        >
          איפוס הכל
        </button>
      </div>

      <p className="center muted fs-12">
        High5 · גרסת ווב · נבנה באהבה ✋
      </p>
      <div className="footer-links">
        <a href="https://github.com/joka-7" target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon size={14} />
        </a>
        <a href="https://jk-dev-7.vercel.app" target="_blank" rel="noreferrer" aria-label="jk.dev portfolio">
          🌐
        </a>
      </div>
    </div>
  );
}
