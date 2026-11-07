import { useEffect } from "react";
import { useLingo } from "../store/useLingo";
import { maybeNotifyIncompleteMissions, syncNativeReminders } from "../services/reminders";
import { isNativeApp } from "../services/platform";
import { reportError } from "../services/errors";

/**
 * Browser: checks local reminder conditions on mount and when the tab becomes
 * visible. Android: keeps the OS-scheduled reminders in step with today's
 * missions, so they fire even while the app is closed.
 */
export function useLocalReminder(): void {
  const { dailyMissions, progress } = useLingo();

  useEffect(() => {
    if (!progress) return;
    const native = isNativeApp();

    function check() {
      if (native) syncNativeReminders(dailyMissions).catch((err: unknown) => reportError(err, "reminder.native"));
      else maybeNotifyIncompleteMissions(dailyMissions);
    }

    check();
    const onVis = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVis);
    // Re-check every 15 minutes while the tab stays open past the reminder hour.
    const id = native ? undefined : window.setInterval(check, 15 * 60 * 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.clearInterval(id);
    };
  }, [dailyMissions, progress]);
}
