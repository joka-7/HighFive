import type { Level } from "../types";
import { pickByDay } from "../utils/daily";

export interface CuratedVideo {
  youtubeId: string;
  title: string;
  titleHe: string;
}

/** Level-tagged short English videos (BBC Learning English) for the daily video mission. */
export const VIDEOS_BY_LEVEL: Record<Level, CuratedVideo[]> = {
  A1: [
    {
      youtubeId: "I_tRSrPru94",
      title: "How to introduce yourself",
      titleHe: "איך להציג את עצמך",
    },
    {
      youtubeId: "31y2Bq1RYQA",
      title: "Saying where you're from",
      titleHe: "לומר מאיפה אתם",
    },
    {
      youtubeId: "wUF33157hYI",
      title: "Likes and dislikes",
      titleHe: "אהבות ושנאות",
    },
  ],
  A2: [
    {
      youtubeId: "x72gP4HrU58",
      title: "Talking about family",
      titleHe: "מדברים על משפחה",
    },
    {
      youtubeId: "I_tRSrPru94",
      title: "How to introduce yourself",
      titleHe: "איך להציג את עצמך",
    },
    {
      youtubeId: "31y2Bq1RYQA",
      title: "Saying where you're from",
      titleHe: "לומר מאיפה אתם",
    },
  ],
  B1: [
    {
      youtubeId: "x72gP4HrU58",
      title: "Talking about family",
      titleHe: "מדברים על משפחה",
    },
    {
      youtubeId: "wUF33157hYI",
      title: "Likes and dislikes",
      titleHe: "אהבות ושנאות",
    },
    {
      youtubeId: "31y2Bq1RYQA",
      title: "Saying where you're from",
      titleHe: "לומר מאיפה אתם",
    },
  ],
  B2: [
    {
      youtubeId: "x72gP4HrU58",
      title: "Talking about family",
      titleHe: "מדברים על משפחה",
    },
    {
      youtubeId: "wUF33157hYI",
      title: "Likes and dislikes",
      titleHe: "אהבות ושנאות",
    },
    {
      youtubeId: "I_tRSrPru94",
      title: "How to introduce yourself",
      titleHe: "איך להציג את עצמך",
    },
  ],
  C1: [
    {
      youtubeId: "x72gP4HrU58",
      title: "Talking about family",
      titleHe: "מדברים על משפחה",
    },
    {
      youtubeId: "wUF33157hYI",
      title: "Likes and dislikes",
      titleHe: "אהבות ושנאות",
    },
    {
      youtubeId: "31y2Bq1RYQA",
      title: "Saying where you're from",
      titleHe: "לומר מאיפה אתם",
    },
  ],
  C2: [
    {
      youtubeId: "x72gP4HrU58",
      title: "Talking about family",
      titleHe: "מדברים על משפחה",
    },
    {
      youtubeId: "I_tRSrPru94",
      title: "How to introduce yourself",
      titleHe: "איך להציג את עצמך",
    },
    {
      youtubeId: "wUF33157hYI",
      title: "Likes and dislikes",
      titleHe: "אהבות ושנאות",
    },
  ],
};

/** Today's curated video for a level (rotates by calendar day). */
export function videoForToday(level: Level, day?: number): CuratedVideo {
  return pickByDay(VIDEOS_BY_LEVEL[level], day);
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
}
