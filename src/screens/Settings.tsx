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

// API key / provider settings — mirrors JobFlowTracker's APIKeySettings:
// pick a provider, paste a key (or Ollama URL), optional model override, save.
export default function Settings() {
  const { resetAll } = useLingo();
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
