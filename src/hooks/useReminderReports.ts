import { useEffect } from "react";
import { useLingo } from "../store/useLingo";
import { reportReminderDay } from "../services/push";
import { dayComplete } from "../services/reminders";
import { reportError } from "../services/errors";
import { dateKeyFromTs } from "../utils/missions";

/** Offline is expected (the next open reports again); anything else is worth knowing about. */
function reportFailure(context: string) {
  return (err: unknown) => {
    if (typeof navigator !== "undefined" && navigator.onLine === false) return;
    reportError(err, context);
  };
}

/**
 * Keeps the web-push reminder from nagging a learner who already showed up:
 * reports "opened today" on load and whenever the tab returns, and "finished
 * today" once every mission is done. A no-op unless this browser opted in.
 */
export function useReminderReports(): void {
  const { dailyMissions } = useLingo();

  useEffect(() => {
    function reportSeen() {
      if (document.visibilityState !== "visible") return;
      reportReminderDay({ seenDate: dateKeyFromTs(Date.now()) }).catch(reportFailure("reminder.seen"));
    }
    reportSeen();
    document.addEventListener("visibilitychange", reportSeen);
    return () => document.removeEventListener("visibilitychange", reportSeen);
  }, []);

  useEffect(() => {
    const now = Date.now();
    if (!dayComplete(dailyMissions, now)) return;
    reportReminderDay({ doneDate: dateKeyFromTs(now) }).catch(reportFailure("reminder.done"));
  }, [dailyMissions]);
}
