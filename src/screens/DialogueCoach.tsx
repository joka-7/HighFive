import { useEffect, useMemo, useRef, useState } from "react";
import { useLingo } from "../store/useLingo";
import { generateDialogueReply } from "../services/content";
import { isAIReady } from "../services/ai";
import { DIALOGUE_SCENARIOS, dialogueScenariosForLevel } from "../data/topics";
import { speak } from "../services/tts";
import type { Screen } from "../types";

export default function DialogueCoach({ go }: { go: (s: Screen) => void }) {
  const { progress, chatMessages, addChatMessage, clearChat, learnedWords } = useLingo();
  const [scenarioId, setScenarioId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Cancel an in-flight reply if the user navigates away mid-request instead
  // of letting it finish in the background for a screen nobody's looking at.
  useEffect(() => () => abortRef.current?.abort(), []);

  const level = progress?.currentLevel ?? "A1";
  const scenarios = dialogueScenariosForLevel(level);
  const scenario = scenarios.find((s) => s.id === scenarioId) ?? DIALOGUE_SCENARIOS.find((s) => s.id === scenarioId);

  const messages = useMemo(
    () =>
      chatMessages.filter((m) => m.scenario === scenarioId && m.level === level),
    [chatMessages, scenarioId, level],
  );

  if (!isAIReady()) {
    return (
      <div className="card">
        <h2>💬 מאמן שיחה</h2>
        <p className="muted">
          מאמן השיחה משתמש ב-AI חי ולכן דורש ספק AI מוגדר. הוסף מפתח בהגדרות כדי
          לתרגל דיבור עם תיקונים בזמן אמת.
        </p>
        <button className="btn" onClick={() => go("settings")}>
          להגדרת AI →
        </button>
      </div>
    );
  }

  if (!scenario) {
    return (
      <div>
        <h2 className="center">בחר תרחיש לשיחה 💬</h2>
        {scenarios.map((s) => (
          <button
            key={s.id}
            className="btn secondary mb-2_5"
            onClick={() => setScenarioId(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>
    );
  }

  async function send() {
    const message = text.trim();
    if (!message || busy || !scenario) return;
    setError(null);
    setText("");
    addChatMessage({
      role: "user",
      messageText: message,
      corrections: null,
      level,
      scenario: scenario.id,
    });
    setBusy(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const reply = await generateDialogueReply(
        level,
        scenario.en,
        messages,
        message,
        Object.keys(learnedWords),
        controller.signal,
      );
      addChatMessage({
        role: "assistant",
        messageText: reply.reply,
        corrections: reply.corrections ?? null,
        level,
        scenario: scenario.id,
      });
      setTimeout(() => logRef.current?.scrollTo(0, logRef.current.scrollHeight), 50);
    } catch (e) {
      setError(e instanceof Error ? e.message : "שגיאה בשליחת ההודעה");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="row-between mb-2_5">
        <button className="back-link" onClick={() => setScenarioId(null)}>
          → תרחישים
        </button>
        <span className="tag">{scenario.label}</span>
        <button className="btn ghost small" onClick={() => clearChat(scenario.id, level)}>
          נקה
        </button>
      </div>

      <div className="chat-log" ref={logRef}>
        {messages.length === 0 && (
          <p className="center muted">התחל את השיחה באנגלית — אני אענה ואתקן אותך 🙂</p>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`bubble ${m.role}`}>
            <div onClick={() => m.role === "assistant" && speak(m.messageText)}>
              {m.messageText}
            </div>
            {m.corrections && <div className="correction">✏️ {m.corrections}</div>}
          </div>
        ))}
        {busy && <div className="bubble assistant">…</div>}
      </div>

      {error && <div className="banner">{error}</div>}

      <div className="chat-input">
        <input
          className="input input-ltr"
          placeholder="Type in English..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button className="btn small" disabled={busy || !text.trim()} onClick={send}>
          שלח
        </button>
      </div>
    </div>
  );
}
