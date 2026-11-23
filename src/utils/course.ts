import type { CourseProgress } from "../types";
import { isReviewDay, LEARNING_DAYS } from "./cycle";
import { dateKeyFromTs } from "./missions";

// A level's content is a course, not a calendar: lesson N is what the learner
// meets after finishing N-1 lessons, however long they were away. The weekly
// rhythm still decides *when* a lesson can be finished (Sunday–Thursday) —
// Friday/Saturday review the lessons already finished.

export const NEW_COURSE: CourseProgress = { daysDone: 0, lastDoneDate: null };

function finishedToday(course: CourseProgress, now: number): boolean {
  return course.lastDoneDate === dateKeyFromTs(now);
}

/**
 * The 0-based course day whose content to show now. Learning days show the
 * next unfinished lesson (or the one just finished, until midnight); review
 * days show the latest finished lesson.
 */
export function contentDay(course: CourseProgress, now = Date.now()): number {
  if (isReviewDay(now)) return Math.max(0, course.daysDone - 1);
  return finishedToday(course, now) ? course.daysDone - 1 : course.daysDone;
}

/** Records today's lesson as finished; no-op on review days or a repeat finish. */
export function finishCourseDay(course: CourseProgress, now = Date.now()): CourseProgress {
  if (isReviewDay(now) || finishedToday(course, now)) return course;
  return { daysDone: course.daysDone + 1, lastDoneDate: dateKeyFromTs(now) };
}

/** Shape check for `UserProgress.courses` coming from a backup or Drive. */
export function isValidCourses(v: unknown): boolean {
  if (typeof v !== "object" || v === null || Array.isArray(v)) return false;
  return Object.values(v).every((c) => {
    if (typeof c !== "object" || c === null) return false;
    const { daysDone, lastDoneDate } = c as Record<string, unknown>;
    return (
      Number.isInteger(daysDone) &&
      (daysDone as number) >= 0 &&
      (lastDoneDate === null || typeof lastDoneDate === "string")
    );
  });
}

/** The (up to five) course days ending at `day`, oldest first — a week's worth to review. */
export function reviewWindow(day: number): number[] {
  const first = Math.max(0, day - LEARNING_DAYS + 1);
  return Array.from({ length: day - first + 1 }, (_, i) => first + i);
}
