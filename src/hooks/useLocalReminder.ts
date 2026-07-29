import { useEffect } from "react";
import { useLingo } from "../store/useLingo";
import { maybeNotifyIncompleteMissions } from "../services/reminders";

/** Checks local reminder conditions on mount and when the tab becomes visible. */
export function useLocalReminder(): void {
  const { dailyMissions, progress } = useLingo();

  useEffect(() => {
    if (!progress) return;

    function check() {
      maybeNotifyIncompleteMissions(dailyMissions);
    }

    check();
    const onVis = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVis);
    // Re-check every 15 minutes while the tab stays open past the reminder hour.
    const id = window.setInterval(check, 15 * 60 * 1000);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.clearInterval(id);
    };
  }, [dailyMissions, progress]);
}
