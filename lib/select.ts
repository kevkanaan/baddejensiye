import { EXAM, NOTIONS } from "./exam-config";
import { QUESTIONS } from "./data";
import type { Progress, QStat } from "./progress";
import { MASTERED_BOX } from "./progress";
import type { Question, QType, ThemeId } from "./types";

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Ordre aléatoire des choix : order[i] = index du choix d'origine affiché en position i. */
export function shuffledOrder(q: Question) {
  return shuffle(q.choices.map((_, i) => i));
}

export type PracticeMode = "intelligent" | "nouvelles" | "erreurs" | "toutes";

export interface PracticeFilter {
  themes: ThemeId[];
  types: QType[];
  officialOnly: boolean;
  mode: PracticeMode;
  count: number;
}

export function filterPool(f: Pick<PracticeFilter, "themes" | "types" | "officialOnly">) {
  return QUESTIONS.filter(
    (q) =>
      (f.themes.length === 0 || f.themes.includes(q.theme)) &&
      (f.types.length === 0 || f.types.includes(q.type)) &&
      (!f.officialOnly || q.origin === "officielle"),
  );
}

/** Priorité de révision : erreurs dues > révisions dues > nouvelles > le reste. */
function priority(s: QStat | undefined, now: number) {
  if (!s || s.seen === 0) return 2;
  if (s.box <= 1) return 0;
  if (s.due <= now) return 1;
  return 3 + s.box;
}

export function pickPractice(f: PracticeFilter, progress: Progress): Question[] {
  const now = Date.now();
  let pool = filterPool(f);
  const st = progress.stats;
  if (f.mode === "nouvelles") pool = pool.filter((q) => !st[q.id]?.seen);
  if (f.mode === "erreurs") pool = pool.filter((q) => (st[q.id]?.wrong ?? 0) > 0 && (st[q.id]?.box ?? 0) < MASTERED_BOX);
  const n = f.count > 0 ? f.count : pool.length;
  if (f.mode === "intelligent") {
    // tri par priorité, aléatoire à priorité égale
    const sorted = shuffle(pool).sort((a, b) => priority(st[a.id], now) - priority(st[b.id], now));
    return shuffle(sorted.slice(0, n));
  }
  return shuffle(pool).slice(0, n);
}

/**
 * Tire un examen blanc respectant la répartition officielle thème × type × notion
 * (arrêté du 10/10/2025, art. 3).
 */
export function pickExam(progress?: Progress): Question[] {
  const out: Question[] = [];
  const st = progress?.stats ?? {};
  // légère préférence pour les questions peu vues, pour couvrir plus de terrain d'un examen à l'autre
  const weight = (q: Question) => (st[q.id]?.seen ?? 0) + Math.random() * 2.5;
  const usedText = new Set<string>();
  const take = (pool: Question[], n: number) => {
    const picked: Question[] = [];
    for (const q of pool.slice().sort((a, b) => weight(a) - weight(b))) {
      if (picked.length >= n) break;
      const k = q.question.trim().toLowerCase();
      if (usedText.has(k)) continue;
      usedText.add(k);
      picked.push(q);
    }
    return picked;
  };

  for (const d of EXAM.distribution) {
    const themeQs = QUESTIONS.filter((q) => q.theme === d.theme);
    const sit = take(
      themeQs.filter((q) => q.type === "situation"),
      d.situation,
    );
    const knowledge = themeQs.filter((q) => q.type === "connaissance");
    const con: Question[] = [];
    for (const n of NOTIONS[d.theme]) {
      con.push(...take(knowledge.filter((q) => q.notion === n.id), n.count));
    }
    // complément si une notion manque de questions, ou s'il manque des mises en situation
    const missing = d.connaissance + d.situation - sit.length - con.length;
    const ids = new Set(con.map((q) => q.id));
    con.push(...take(knowledge.filter((q) => !ids.has(q.id)), missing));
    out.push(...con, ...sit);
  }
  return shuffle(out);
}
