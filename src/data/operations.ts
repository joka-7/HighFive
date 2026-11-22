import type { DailyMissionFlag, Level, Screen } from "../types";

// The five daily operations. Every one of them can be practised **inside**
// High5 or **outside** it (a video on YouTube, a podcast on Spotify, an
// article on a news site, a conversation with an AI assistant). When it
// happens outside, the learner marks the mission done and writes what they
// watched/listened to/read — that title is kept with the day's log.

export type OperationId = "see" | "listen" | "talk" | "read" | "understand";

export interface ExternalLink {
  label: string;
  url: string;
  /** Levels the link suits; absent means every level. */
  levels?: readonly Level[];
}

const youtubeSearch = (query: string) =>
  `https://www.youtube.com/results?${new URLSearchParams({ search_query: query })}`;
const spotifySearch = (query: string) => `https://open.spotify.com/search/${encodeURIComponent(query)}`;

export interface Operation {
  id: OperationId;
  /** Store flag this operation completes. */
  flag: DailyMissionFlag;
  /** Extra flags that also count as "done" (e.g. Speaking satisfies "talk"). */
  alsoFlags?: DailyMissionFlag[];
  emoji: string;
  title: string;
  sub: string;
  /** In-app path for this operation. */
  screen: Screen;
  cta: string;
  /** A second in-app path, when the operation has two natural ones. */
  altScreen?: Screen;
  altCta?: string;
  /** Label for the "what did you do?" field on the external form. */
  externalLabel: string;
  externalPlaceholder: string;
  /** Suggested apps/sites — opened in a new tab, nothing is tracked. Use `linksForLevel` to show them. */
  links: ExternalLink[];
}

export const OPERATIONS: Operation[] = [
  {
    id: "see",
    flag: "video",
    emoji: "👀",
    title: "לראות",
    sub: "סרטון היום מוטמע כאן למטה — או צפו במה שבא לכם באפליקציה אחרת.",
    // "missions" means the activity lives on this screen itself (the embedded
    // video), so the card offers a mark-as-done button instead of navigation.
    screen: "missions",
    cta: "סמנו שצפיתם ✓",
    externalLabel: "מה ראיתם?",
    externalPlaceholder: 'לדוגמה: "Friends S1E3" ב-Netflix',
    links: [
      { label: "YouTube — English for kids", url: youtubeSearch("english for kids beginners"), levels: ["A1"] },
      { label: "YouTube — easy English stories", url: youtubeSearch("easy english stories for beginners"), levels: ["A2"] },
      { label: "YouTube — English listening practice", url: youtubeSearch("english listening practice intermediate"), levels: ["B1", "B2"] },
      { label: "TED Talks", url: "https://www.ted.com/talks", levels: ["B2", "C1", "C2"] },
      { label: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish/english/features" },
    ],
  },
  {
    id: "listen",
    flag: "listening",
    emoji: "🎧",
    title: "להקשיב",
    sub: "שיר, פודקאסט או קטע האזנה — באפליקציה או באוזניות שלכם.",
    screen: "listening",
    cta: "לתרגיל האזנה ←",
    externalLabel: "למה הקשבתם?",
    externalPlaceholder: 'לדוגמה: "Yesterday" — The Beatles',
    links: [
      { label: "Spotify — podcasts for beginners", url: spotifySearch("english podcast for beginners"), levels: ["A1", "A2"] },
      { label: "Spotify", url: spotifySearch("english podcast"), levels: ["B1", "B2", "C1", "C2"] },
      { label: "BBC Podcasts", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", levels: ["B1", "B2", "C1", "C2"] },
      { label: "YouTube Music", url: "https://music.youtube.com" },
    ],
  },
  {
    id: "talk",
    flag: "talk",
    alsoFlags: ["speaking"],
    emoji: "🗣️",
    title: "לדבר",
    sub: "משפטים להקראה, שיחה עם מאמן ה-AI, או שיחה אמיתית בחוץ.",
    screen: "speaking",
    cta: "לתרגול דיבור ←",
    altScreen: "dialogue",
    altCta: "למאמן שיחה ←",
    externalLabel: "עם מי / על מה דיברתם?",
    externalPlaceholder: 'לדוגמה: שיחה עם ChatGPT על חופשה',
    links: [
      { label: "Claude", url: "https://claude.ai" },
      { label: "ChatGPT", url: "https://chatgpt.com" },
    ],
  },
  {
    id: "read",
    flag: "reading",
    emoji: "📖",
    title: "לקרוא",
    sub: "קטע קריאה עם מילון מובנה, או כתבה באתר שאתם אוהבים.",
    screen: "reading",
    cta: "לקטע הקריאה ←",
    externalLabel: "מה קראתם?",
    externalPlaceholder: 'לדוגמה: כתבה על ספורט ב-BBC',
    links: [
      { label: "News in Levels", url: "https://www.newsinlevels.com", levels: ["A1", "A2", "B1"] },
      { label: "Simple Wikipedia", url: "https://simple.wikipedia.org", levels: ["A2", "B1", "B2"] },
      { label: "BBC News", url: "https://www.bbc.com/news", levels: ["B2", "C1", "C2"] },
    ],
  },
  {
    id: "understand",
    flag: "grammar",
    emoji: "🧠",
    title: "להבין",
    sub: "נושא דקדוק אחד ביום — השיעור היומי, או כל מקור אחר.",
    screen: "lesson",
    cta: "לשיעור היומי ←",
    externalLabel: "מה למדתם?",
    externalPlaceholder: 'לדוגמה: Present Perfect ביוטיוב',
    links: [
      { label: "BBC Grammar", url: "https://www.bbc.co.uk/learningenglish/english/grammar" },
      { label: "British Council", url: "https://learnenglish.britishcouncil.org/grammar" },
    ],
  },
];

/** The operation's suggested links that suit `level`. */
export function linksForLevel(op: Operation, level: Level): ExternalLink[] {
  return op.links.filter((link) => !link.levels || link.levels.includes(level));
}

/** True when the operation counts as done for today's mission state. */
export function isOperationDone(
  op: Operation,
  flags: Record<DailyMissionFlag, boolean>,
): boolean {
  if (flags[op.flag]) return true;
  return (op.alsoFlags ?? []).some((f) => flags[f]);
}
