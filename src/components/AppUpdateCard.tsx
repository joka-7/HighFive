import { useEffect, useState } from "react";
import { checkForUpdate, readInstalledApp, type InstalledApp, type UpdateCheck } from "../services/appUpdate";
import { reportError } from "../services/errors";
import { isNativeApp } from "../services/platform";
import { ANDROID_APK_URL } from "../utils/androidApk";

// Settings card for the Android app: check GitHub for a newer APK and, if
// there is one, link to the download. Android does the install.

type View =
  | { readonly step: "idle" }
  | { readonly step: "checking" }
  | { readonly step: "done"; readonly result: UpdateCheck }
  | { readonly step: "error" };

export default function AppUpdateCard() {
  const [installed, setInstalled] = useState<InstalledApp | null>(null);
  const [view, setView] = useState<View>({ step: "idle" });

  useEffect(() => {
    if (!isNativeApp()) return;
    let cancelled = false;
    readInstalledApp()
      .then((app) => {
        if (!cancelled) setInstalled(app);
      })
      .catch((err: unknown) => reportError(err, "appUpdate.installed"));
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isNativeApp()) return null;

  async function check() {
    setView({ step: "checking" });
    try {
      setView({ step: "done", result: await checkForUpdate() });
    } catch (err) {
      reportError(err, "appUpdate.check");
      setView({ step: "error" });
    }
  }

  return (
    <div className="card">
      <h3>🔄 עדכון אפליקציה</h3>
      {installed && <p className="muted">הגרסה המותקנת: {installed.version}</p>}
      <button className="btn" onClick={() => void check()} disabled={view.step === "checking"}>
        {view.step === "checking" ? "בודק…" : "🔍 בדיקת עדכונים"}
      </button>
      <div role="status" aria-live="polite">
        {view.step === "done" && view.result.status === "current" && (
          <p className="muted">✅ האפליקציה מעודכנת.</p>
        )}
        {view.step === "done" && view.result.status === "available" && (
          <>
            <p>🎉 גרסה חדשה זמינה: {view.result.latestVersion}</p>
            <a className="btn accent" href={ANDROID_APK_URL}>
              ⬇️ הורדה ועדכון
            </a>
            <p className="muted fs-13">
              אחרי ההורדה פתחו את הקובץ ואשרו התקנה. הנתונים שלכם נשמרים.
            </p>
          </>
        )}
        {view.step === "error" && (
          <p className="muted">לא הצלחנו לבדוק עדכונים. בדקו חיבור לאינטרנט ונסו שוב.</p>
        )}
      </div>
    </div>
  );
}
