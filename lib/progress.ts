"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_EXAM_DATE } from "./exam-config";
import type { ThemeId } from "./types";

/** Statistiques d'une question (répétition espacée type Leitner). */
export interface QStat {
  seen: number;
  correct: number;
  wrong: number;
  /** 0 = jamais vue, 1 = à revoir, 2…5 = de mieux en mieux connue */
  box: number;
  last: number;
  due: number;
}

export interface ExamResult {
  at: number;
  score: number;
  total: number;
  passMark: number;
  durationSec: number;
  byTheme: Partial<Record<ThemeId, [number, number]>>;
  wrongIds: string[];
}

export interface Progress {
  v: 1;
  examDate: string;
  stats: Record<string, QStat>;
  exams: ExamResult[];
  /** activité par jour (AAAA-MM-JJ) : [réponses, bonnes réponses] */
  days: Record<string, [number, number]>;
}

const KEY = "ec-progress-v1";
const DAY = 86_400_000;
/** intervalle avant nouvelle révision selon la boîte (en jours) */
const INTERVALS = [0, 0, 1, 2, 4, 7];
export const MASTERED_BOX = 3;

const empty = (): Progress => ({ v: 1, examDate: DEFAULT_EXAM_DATE, stats: {}, exams: [], days: {} });

let state: Progress | null = null;
const listeners = new Set<() => void>();
const SERVER_SNAPSHOT = empty();

function load(): Progress {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...empty(), ...JSON.parse(raw) } : empty();
  } catch {
    state = empty();
  }
  return state!;
}

function commit(next: Progress) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* stockage plein ou indisponible : on garde l'état en mémoire */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      state = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, load, () => SERVER_SNAPSHOT);
}

/** true une fois côté client (évite d'afficher l'état vide du serveur). */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function recordAnswers(results: { id: string; correct: boolean }[]) {
  if (!results.length) return;
  const p = load();
  const now = Date.now();
  const stats = { ...p.stats };
  let good = 0;
  for (const { id, correct } of results) {
    const s: QStat = stats[id] ? { ...stats[id] } : { seen: 0, correct: 0, wrong: 0, box: 0, last: 0, due: 0 };
    s.seen++;
    s.last = now;
    if (correct) {
      good++;
      s.correct++;
      s.box = s.box === 0 ? 2 : Math.min(5, s.box + 1);
    } else {
      s.wrong++;
      s.box = 1;
    }
    s.due = now + INTERVALS[s.box] * DAY;
    stats[id] = s;
  }
  const k = todayKey();
  const [a, c] = p.days[k] ?? [0, 0];
  commit({ ...p, stats, days: { ...p.days, [k]: [a + results.length, c + good] } });
}

export function recordAnswer(id: string, correct: boolean) {
  recordAnswers([{ id, correct }]);
}

export function saveExam(r: ExamResult) {
  const p = load();
  commit({ ...p, exams: [...p.exams, r].slice(-50) });
}

export function setExamDate(date: string) {
  commit({ ...load(), examDate: date });
}

export function resetProgress() {
  commit({ ...empty(), examDate: load().examDate });
}

export type Status = "nouvelle" | "a-revoir" | "en-cours" | "maitrisee";

export function statusOf(s: QStat | undefined): Status {
  if (!s || s.seen === 0) return "nouvelle";
  if (s.box <= 1) return "a-revoir";
  if (s.box >= MASTERED_BOX) return "maitrisee";
  return "en-cours";
}

export function isDue(s: QStat | undefined, now = Date.now()) {
  return !!s && s.seen > 0 && s.due <= now;
}

export function daysUntil(dateStr: string, from = new Date()) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((target.getTime() - start.getTime()) / DAY);
}

/* ---------- export / import (synchronisation manuelle ordinateur ↔ téléphone) ---------- */

async function gzip(text: string) {
  const stream = new Blob([text]).stream().pipeThrough(new CompressionStream("gzip"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function gunzip(bytes: Uint8Array) {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream("gzip"));
  return await new Response(stream).text();
}

const toB64 = (bytes: Uint8Array) => {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
};
const fromB64 = (b64: string) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

export async function exportCode() {
  return "EC1:" + toB64(await gzip(JSON.stringify(load())));
}

/** Fusionne une progression importée avec la progression locale (garde le meilleur des deux). */
export async function importCode(code: string) {
  const trimmed = code.trim().replace(/\s+/g, "");
  if (!trimmed.startsWith("EC1:")) throw new Error("Code invalide (il doit commencer par EC1:)");
  const incoming = JSON.parse(await gunzip(fromB64(trimmed.slice(4)))) as Progress;
  if (incoming?.v !== 1 || typeof incoming.stats !== "object") throw new Error("Code invalide");
  const local = load();
  const stats = { ...local.stats };
  for (const [id, s] of Object.entries(incoming.stats)) {
    const mine = stats[id];
    stats[id] = !mine || s.last > mine.last ? s : mine;
  }
  const seen = new Set(local.exams.map((e) => e.at));
  const exams = [...local.exams, ...(incoming.exams ?? []).filter((e) => !seen.has(e.at))].sort((a, b) => a.at - b.at);
  const days = { ...local.days };
  for (const [k, v] of Object.entries(incoming.days ?? {})) {
    const mine = days[k];
    days[k] = !mine || v[0] > mine[0] ? v : mine;
  }
  commit({ v: 1, examDate: incoming.examDate || local.examDate, stats, exams, days });
  return Object.keys(incoming.stats).length;
}
