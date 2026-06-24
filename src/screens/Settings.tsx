import { useState } from "react";
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
import { usePwaInstall, canShare, shareApp } from "../services/pwa";
import { speak, ttsSupported } from "../services/tts";
import { LEVELS, type Level } from "../types";

const SPEECH_LABELS: { id: SpeechSpeed; label: string }[] = [
  { id: "slow", label: "🐢 איטי" },
  { id: "normal", label: "🚶 רגיל" },
  { id: "fast", label: "🐇 מהיר" },
];

// API key / provider settings — mirrors JobFlowTracker's APIKeySettings:
// pick a provider, paste a key (or Ollama URL), optional model override, save.
export default function Settings() {
  const { resetAll, cloudConfigured, user, authReady, signIn, signOut, progress, updateLevel } =
    useLingo();
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");

  const [prefs, setPrefs] = useState(() => loadPrefs());
  const { canInstall, installed, install } = usePwaInstall();

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
    setAuthBusy(true);
    try {
      await signOut();
    } finally {
      setAuthBusy(false);
    }
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
          <div
            className="banner"
            style={{ background: "#e7faf3", borderColor: "#9ae6c8", color: "#0a7a5c" }}
          >
            ✅ פעיל: {PROVIDERS[loadAIConfig().provider].name}
          </div>
        )}

        <label className="field">
          <span>ספק AI</span>
        </label>
        <div className="menu-grid" style={{ marginBottom: 14 }}>
          {Object.values(PROVIDERS).map((p) => (
            <button
              key={p.id}
              className={`level-pill ${provider === p.id ? "active" : ""}`}
              style={{ width: "100%", justifyContent: "center", position: "relative" }}
              onClick={() => setProvider(p.id)}
            >
              {p.name}
              {p.free && (
                <span
                  className="tag"
                  style={{ marginInlineStart: 6, background: "#e7faf3", color: "#0a7a5c" }}
                >
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
              className="input"
              style={{ direction: "ltr", textAlign: "left" }}
              value={ollamaUrl}
              placeholder={info.placeholder}
              onChange={(e) => setOllamaUrl(e.target.value)}
            />
          </label>
        ) : (
          <label className="field">
            <span>מפתח API</span>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                className="input"
                style={{ direction: "ltr", textAlign: "left" }}
                type={showKey ? "text" : "password"}
                value={apiKey}
                placeholder={info.placeholder}
                onChange={(e) => setApiKeyState(e.target.value)}
              />
              <button className="icon-btn" onClick={() => setShowKey((s) => !s)}>
                {showKey ? "🙈" : "👁️"}
              </button>
            </div>
          </label>
        )}

        <label className="field">
          <span>מודל (אופציונלי)</span>
          <input
            className="input"
            style={{ direction: "ltr", textAlign: "left" }}
            value={model}
            placeholder={info.defaultModel}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>

        <p className="muted" style={{ fontSize: 13 }}>
          <a href={info.infoUrl} target="_blank" rel="noreferrer">
            {info.infoText}
          </a>
        </p>

        <button className="btn" onClick={save}>
          {saved ? "נשמר ✓" : "שמירה"}
        </button>
        <div style={{ height: 10 }} />
        <button className="btn ghost" onClick={clearAll}>
          מחיקת הגדרות AI
        </button>
      </div>

      <div className="card">
        <h2>⚙️ העדפות</h2>

        <div className="row-between" style={{ marginBottom: 16 }}>
          <div>
            <div style={{ fontWeight: 700 }}>🌙 מצב כהה</div>
            <div className="muted" style={{ fontSize: 13 }}>נוח יותר לעיניים בלילה</div>
          </div>
          <button
            className={`level-pill ${prefs.theme === "dark" ? "active" : ""}`}
            style={{ minWidth: 64 }}
            onClick={() => setTheme(prefs.theme !== "dark")}
          >
            {prefs.theme === "dark" ? "פעיל" : "כבוי"}
          </button>
        </div>

        <label className="field">
          <span>🔊 מהירות הקראה</span>
        </label>
        <div className="level-row" style={{ marginBottom: 16 }}>
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

        {progress && (
          <>
            <label className="field">
              <span>🎯 רמת לימוד</span>
            </label>
            <div className="level-row">
              {LEVELS.map((lvl: Level) => (
                <button
                  key={lvl}
                  className={`level-pill ${progress.currentLevel === lvl ? "active" : ""}`}
                  onClick={() => updateLevel(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </>
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
            <div style={{ height: 10 }} />
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
              <p className="muted" style={{ color: "var(--danger)" }}>
                {authError}
              </p>
            )}
          </>
        )}
      </div>

      <div className="card">
        <h3>איפוס נתונים</h3>
        <p className="muted">מחיקת כל ההתקדמות, המילים השמורות והשיחות.</p>
        <button
          className="btn"
          style={{ background: "var(--danger)" }}
          onClick={() => {
            if (confirm("לאפס את כל הנתונים? פעולה זו אינה הפיכה.")) resetAll();
          }}
        >
          איפוס הכל
        </button>
      </div>

      <p className="center muted" style={{ fontSize: 12 }}>
        High5 · גרסת ווב · נבנה באהבה ✋
      </p>
    </div>
  );
}
