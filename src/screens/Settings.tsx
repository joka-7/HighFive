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
import { ModelPicker } from "modeldispatcher-react-ui";
import "modeldispatcher-react-ui/styles.css";
import {
  loadExternalChatFavorite,
  saveExternalChatFavorite,
} from "modeldispatcher-browser-agent";
import { dispatcherFeatures } from "../modeldispatcher.config";
import { useLingo } from "../store/useLingo";
import { formatSignInError } from "../services/driveSync";
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
import {
  disablePushReminders,
  enablePushReminders,
  isPushSupported,
  isRemindersRegistered,
} from "../services/push";
import { isPushConfigured } from "../services/firebase";
import { speak, ttsSupported } from "../services/tts";
import { navigateHash } from "../utils/routing";

const SPEECH_LABELS: { id: SpeechSpeed; label: string }[] = [
  { id: "slow", label: "🐢 איטי" },
  { id: "normal", label: "🚶 רגיל" },
  { id: "fast", label: "🐇 מהיר" },
];

/** The shared <ModelPicker> AI settings card — add one or more providers
 * with pooled keys, pick a favorite free AI app to hand off to. Live-saves
 * on every change (ModelPicker's own convention), re-syncing ai.ts's
 * localStorage-backed config so isAIReady()/loadAIConfig() see it
 * immediately. */
function NewAiSettingsCard() {
  const [config, setConfig] = useState(loadAIConfig);
  const [favorite, setFavorite] = useState(loadExternalChatFavorite);

  function handleConfigChange(next: typeof config) {
    setConfig(next);
    saveAIConfig(next);
  }

  function handleFavoriteChange(
    next: Parameters<typeof saveExternalChatFavorite>[0],
  ) {
    setFavorite(next);
    saveExternalChatFavorite(next);
  }

  return (
    <div className="card">
      <h2>🤖 הגדרות AI</h2>

      <div className="banner">
        🔒 המפתח נשמר אך ורק בדפדפן שלך (localStorage) ונשלח ישירות לספק שבחרת.
        הוא לא נשמר בשום שרת. לפרסום ציבורי מומלץ פרוקסי בצד שרת.
      </div>

      {isAIReady() && (
        <div className="banner success">
          ✅ פעיל: {PROVIDERS[config.providers[0].provider].name}
        </div>
      )}

      <ModelPicker
        config={config}
        onConfigChange={handleConfigChange}
        externalChatFavorite={favorite}
        onExternalChatFavoriteChange={handleFavoriteChange}
        locale="he"
      />
    </div>
  );
}

/** The app's original hand-built AI settings — single provider/key/model.
 * Kept byte-for-byte in behavior as the fallback when
 * `dispatcherFeatures.ui` is off (see modeldispatcher.config.ts). */
function LegacyAiSettingsCard() {
  const initial = loadAIConfig();
  const initialCred = initial.providers[0];
  const initialProvider: ProviderId = initialCred?.provider ?? "gemini";
  const [provider, setProvider] = useState<ProviderId>(initialProvider);
  const [apiKey, setApiKeyState] = useState(initialCred?.apiKeys[0] ?? "");
  const [model, setModel] = useState(
    initialCred && initialCred.model !== PROVIDERS[initialProvider].defaultModel
      ? initialCred.model
      : "",
  );
  const [ollamaUrl, setOllamaUrl] = useState(initial.ollamaUrl);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const info = PROVIDERS[provider];

  function save() {
    saveAIConfig({
      providers: [
        {
          provider,
          model: model.trim() || info.defaultModel,
          apiKeys: info.noKey ? [] : [apiKey],
        },
      ],
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
    <div className="card">
      <h2>🤖 הגדרות AI</h2>

      <div className="banner">
        🔒 המפתח נשמר אך ורק בדפדפן שלך (localStorage) ונשלח ישירות לספק שבחרת.
        הוא לא נשמר בשום שרת. לפרסום ציבורי מומלץ פרוקסי בצד שרת.
      </div>

      {isAIReady() && (
        <div className="banner success">
          ✅ פעיל: {PROVIDERS[loadAIConfig().providers[0].provider].name}
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
            {p.free && <span className="tag ok ms-1">חינם</span>}
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
  );
}

// API key / provider settings — mirrors JobFlowTracker's APIKeySettings:
// pick a provider, paste a key (or Ollama URL), optional model override, save.
export default function Settings() {
  const {
    resetAll,
    cloudConfigured,
    user,
    cloudLinked,
    authReady,
    cloudSyncError,
    retryCloudSync,
    signIn,
    signOut,
    deleteCloudData,
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
  const [pushEnabled, setPushEnabled] = useState(() => isRemindersRegistered());

  async function handleEnablePush() {
    setPushError("");
    setPushBusy(true);
    const result = await enablePushReminders();
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

  async function handleDisablePush() {
    setPushError("");
    setPushBusy(true);
    try {
      await disablePushReminders();
      setPushEnabled(false);
    } catch {
      setPushError("ביטול התזכורות נכשל. נסו שוב מאוחר יותר.");
    } finally {
      setPushBusy(false);
    }
  }

  function setTheme(dark: boolean) {
    const next = {
      ...prefs,
      theme: dark ? ("dark" as const) : ("light" as const),
    };
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
    } catch (err) {
      setAuthError(formatSignInError(err));
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleSignOut() {
    // Signing out clears this device's local learner data too (so the next
    // person, or the next Google account, on a shared device doesn't inherit
    // it) — the account's real progress stays safe in its own Drive.
    if (
      !confirm(
        "להתנתק מ-Google Drive? נתוני הלמידה שנשמרו במכשיר הזה יימחקו. ההתקדמות שלך נשארת ב-Drive ותחזור בחיבור הבא.",
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

  async function handleDeleteCloudData() {
    if (
      !confirm(
        "למחוק את כל נתוני High5 מה-Google Drive שלך ולבטל את הגישה של האפליקציה? ההתקדמות במכשיר הזה נשארת. מכשירים אחרים שעדיין מחוברים יעלו את העותק שלהם שוב — התנתקו בהם קודם.",
      )
    ) {
      return;
    }
    setAuthError("");
    setAuthBusy(true);
    try {
      await deleteCloudData();
      setBackupMsg("הנתונים נמחקו מ-Google Drive.");
    } catch (err) {
      setAuthError(formatSignInError(err));
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

  return (
    <div>
      {dispatcherFeatures.ui ? <NewAiSettingsCard /> : <LegacyAiSettingsCard />}

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
            <button
              className="btn ghost small"
              onClick={() => navigateHash("progress")}
            >
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
            <p className="muted">
              התקן את High5 כאפליקציה במסך הבית לגישה מהירה וגם ללא אינטרנט.
            </p>
            <button className="btn" onClick={install}>
              📥 התקנת האפליקציה
            </button>
          </>
        ) : (
          <p className="muted">
            כדי להתקין: פתח את תפריט הדפדפן ובחר "הוסף למסך הבית". ב-iPhone —
            דרך כפתור השיתוף בספארי.
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
        <h3>☁️ סנכרון ל-Google Drive</h3>
        {!cloudConfigured ? (
          <p className="muted">
            הנתונים נשמרים במכשיר הזה בלבד. סנכרון ל-Google Drive לא מוגדר
            בגרסה הזו (ראו הוראות ב-README).
          </p>
        ) : !authReady ? (
          <p className="muted">טוען…</p>
        ) : user ? (
          <>
            {cloudSyncError && (
              <div className="banner mb-2_5">
                ⚠️ הסנכרון ל-Drive נכשל — ההתקדמות שלך נשארת במכשיר בינתיים
                ולא תידרס. בדקו את החיבור לאינטרנט ונסו שוב.
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
              מחובר כ-
              <strong>{user.email || user.displayName || "משתמש Google"}</strong>
              . ההתקדמות נשמרת בתיקייה מוסתרת ב-Google Drive שלך, שרק האפליקציה
              יכולה לקרוא — אף אחד אחר לא רואה אותה, גם לא מפעיל האפליקציה.
            </p>
            <button
              className="btn ghost"
              disabled={authBusy}
              onClick={handleSignOut}
            >
              התנתקות
            </button>
            <div className="spacer-sm" />
            <button
              className="btn btn-danger"
              disabled={authBusy}
              onClick={handleDeleteCloudData}
            >
              מחיקת הנתונים מ-Google Drive
            </button>
            {authError && <p className="muted text-danger">{authError}</p>}
          </>
        ) : (
          <>
            <p className="muted">
              שמירה מקומית פעילה. חברו את Google Drive כדי לסנכרן את ההתקדמות
              בין מכשירים — הנתונים נשמרים ב-Drive שלכם בלבד.
            </p>
            <button className="btn" disabled={authBusy} onClick={handleSignIn}>
              {authBusy ? "מתחבר…" : "חיבור ל-Google Drive"}
            </button>
            {authError && <p className="muted text-danger">{authError}</p>}
          </>
        )}
      </div>

      {isPushConfigured() && (
        <div className="card">
          <h3>🔔 תזכורות יומיות</h3>
          {!isPushSupported() ? (
            <p className="muted">הדפדפן הזה לא תומך בהתראות דחיפה.</p>
          ) : pushEnabled ? (
            <>
              <p className="muted">
                ✅ תזכורות פעילות. אם לא תיכנס/י ולא תשלים/י את המשימות היומיות,
                תישלח לך תזכורת בשש בערב.
              </p>
              <button className="btn ghost" disabled={pushBusy} onClick={handleDisablePush}>
                {pushBusy ? "מבטל…" : "ביטול תזכורות"}
              </button>
            </>
          ) : (
            <>
              <p className="muted">
                קבל/י תזכורת אם לא נכנסת לאפליקציה ולא השלמת את המשימות היומיות
                שלך. השרת שומר רק אסימון התראה, אזור זמן ותאריך — בלי חשבון ובלי
                נתוני למידה.
              </p>
              <button className="btn" disabled={pushBusy} onClick={handleEnablePush}>
                {pushBusy ? "מפעיל…" : "הפעלת תזכורות"}
              </button>
            </>
          )}
          {pushError && <p className="muted text-danger">{pushError}</p>}
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
            const message = cloudLinked
              ? "לאפס את כל הנתונים? האיפוס יחול גם על ה-Google Drive המחובר ועל המכשירים המסונכרנים. פעולה זו אינה הפיכה."
              : "לאפס את כל הנתונים? פעולה זו אינה הפיכה.";
            if (confirm(message)) resetAll();
          }}
        >
          איפוס הכל
        </button>
      </div>

      <p className="center muted fs-12">נבנה על ידי joka-7</p>
      <div className="footer-links">
        <a
          href="https://github.com/joka-7"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <GithubIcon size={14} />
          <span className="footer-link-label">GitHub</span>
        </a>
        <a
          href="https://jk-dev-7.vercel.app"
          target="_blank"
          rel="noreferrer"
          aria-label="jk.dev portfolio"
          title="jk.dev portfolio"
        >
          <span aria-hidden="true">🌐</span>
          <span className="footer-link-label">אתר</span>
        </a>
        <a
          href="https://github.com/joka-7/HighFive"
          target="_blank"
          rel="noreferrer"
          aria-label="View repository"
          title="View repository"
        >
          <span aria-hidden="true">📦</span>
          <span className="footer-link-label">קוד</span>
        </a>
        <a
          href="mailto:joka.dev.7@gmail.com"
          rel="noreferrer"
          aria-label="Send feedback by email"
          title="Send feedback by email"
        >
          <span aria-hidden="true">✉️</span>
          <span className="footer-link-label">אימייל</span>
        </a>
        <a
          href="https://github.com/joka-7/HighFive/issues/new"
          target="_blank"
          rel="noreferrer"
          aria-label="Report an issue"
          title="Report an issue"
        >
          <span aria-hidden="true">💬</span>
          <span className="footer-link-label">משוב</span>
        </a>
      </div>
    </div>
  );
}
