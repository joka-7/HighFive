import { useState } from "react";
import { getApiKey, setApiKey, clearApiKey } from "../services/apiKey";
import { useLingo } from "../store/useLingo";

export default function Settings() {
  const { resetAll } = useLingo();
  const [key, setKey] = useState(getApiKey());
  const [saved, setSaved] = useState(false);

  function save() {
    setApiKey(key);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div>
      <div className="card">
        <h2>🔑 מפתח Gemini API</h2>
        <p className="muted">
          נדרש לשיעורים, אוצר מילים, חידונים ומאמן שיחה חיים (AI). בלעדיו האפליקציה
          עובדת עם תוכן מובנה. ניתן להשיג מפתח חינמי ב-{" "}
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
            Google AI Studio
          </a>
          .
        </p>
        <label className="field">
          <span>המפתח שלך</span>
          <input
            className="input"
            style={{ direction: "ltr", textAlign: "left" }}
            type="password"
            value={key}
            placeholder="AIza..."
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
        <button className="btn" onClick={save}>
          {saved ? "נשמר ✓" : "שמירה"}
        </button>
        <div style={{ height: 10 }} />
        <button
          className="btn ghost"
          onClick={() => {
            clearApiKey();
            setKey("");
          }}
        >
          מחיקת מפתח
        </button>
      </div>

      <div className="card">
        <h3>איפוס</h3>
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
