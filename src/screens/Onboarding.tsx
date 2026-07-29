import { useState } from "react";
import { useLingo } from "../store/useLingo";
import { LEVELS, type Level } from "../types";
import { PLACEMENT_QUESTIONS, levelFromScore } from "../data/placement";
import QuizRunner from "../components/QuizRunner";

type Step = "welcome" | "choose" | "test" | "manual";

export default function Onboarding() {
  const { registerUser } = useLingo();
  const [step, setStep] = useState<Step>("welcome");
  const [name, setName] = useState("");

  function finish(level: Level) {
    registerUser(name, "עברית", level);
  }

  return (
    <div className="screen">
      {step === "welcome" && (
        <>
          <div className="celebrate">
            <img
              src="/icon-512.png"
              alt="High5"
              width={112}
              height={112}
              className="onboarding-logo"
            />
            <h1 className="my-1">High5</h1>
            <p className="muted">לומדים אנגלית בכיף — שיעורים, אוצר מילים ושיחות עם AI</p>
          </div>

          <div className="card">
            <label className="field">
              <span>איך קוראים לך?</span>
              <input
                className="input"
                value={name}
                placeholder="השם שלך"
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <button
              className="btn"
              disabled={!name.trim()}
              onClick={() => setStep("choose")}
            >
              בואו נתחיל ←
            </button>
          </div>
        </>
      )}

      {step === "choose" && (
        <div className="card">
          <h2>מה הרמה שלך באנגלית?</h2>
          <p className="muted">אפשר לעשות מבחן מיון קצר, או לבחור רמה בעצמך.</p>
          <button className="btn accent" onClick={() => setStep("test")}>
            🎯 מבחן מיון (6 שאלות)
          </button>
          <div className="spacer-sm" />
          <button className="btn secondary" onClick={() => setStep("manual")}>
            ✍️ אבחר רמה בעצמי
          </button>
        </div>
      )}

      {step === "test" && (
        <>
          <h2 className="center">מבחן מיון 🎯</h2>
          <QuizRunner
            questions={PLACEMENT_QUESTIONS}
            onFinish={(score) => finish(levelFromScore(score))}
          />
        </>
      )}

      {step === "manual" && (
        <div className="card">
          <h2>בחר/י רמה (CEFR)</h2>
          <p className="muted">A1 = מתחיל · C2 = מתקדם מאוד</p>
          <div className="level-row">
            {LEVELS.map((lvl) => (
              <button key={lvl} className="level-pill" onClick={() => finish(lvl)}>
                {lvl}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
