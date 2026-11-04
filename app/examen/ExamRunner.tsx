"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import QuestionCard from "@/components/QuestionCard";
import { EXAM } from "@/lib/exam-config";
import { QUESTION_BY_ID } from "@/lib/data";
import { pickExam, shuffledOrder } from "@/lib/select";
import { recordAnswers, saveExam, useHydrated, useProgress, type ExamResult } from "@/lib/progress";
import { THEMES, THEME_BY_ID } from "@/lib/themes";
import type { Question, ThemeId } from "@/lib/types";

const KEY = "ec-exam-current";

interface Running {
  ids: string[];
  orders: number[][];
  answers: (number | null)[];
  flags: boolean[];
  startedAt: number;
  durationMs: number;
}

interface Finished {
  qs: Question[];
  orders: number[][];
  answers: (number | null)[];
  result: ExamResult;
}

function loadRunning(): Running | null {
  try {
    const r = JSON.parse(localStorage.getItem(KEY) || "null") as Running | null;
    if (r && r.ids.every((id) => QUESTION_BY_ID[id])) return r;
  } catch {}
  return null;
}
function saveRunning(r: Running | null) {
  try {
    if (r) localStorage.setItem(KEY, JSON.stringify(r));
    else localStorage.removeItem(KEY);
  } catch {}
}

const fmt = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export default function ExamRunner() {
  const hydrated = useHydrated();
  const progress = useProgress();
  const [run, setRun] = useState<Running | null>(null);
  const [pending, setPending] = useState<Running | null>(null);
  const [finished, setFinished] = useState<Finished | null>(null);
  const [idx, setIdx] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (hydrated) setPending(loadRunning());
  }, [hydrated]);

  const update = useCallback((r: Running) => {
    setRun(r);
    saveRunning(r);
  }, []);

  const start = () => {
    const qs = pickExam(progress);
    const r: Running = {
      ids: qs.map((q) => q.id),
      orders: qs.map(shuffledOrder),
      answers: qs.map(() => null),
      flags: qs.map(() => false),
      startedAt: Date.now(),
      durationMs: EXAM.durationMin * 60_000,
    };
    setPending(null);
    setIdx(0);
    setFinished(null);
    update(r);
  };

  const submit = useCallback(
    (r: Running) => {
      const qs = r.ids.map((id) => QUESTION_BY_ID[id]);
      const byTheme: Partial<Record<ThemeId, [number, number]>> = {};
      let score = 0;
      const wrongIds: string[] = [];
      qs.forEach((q, i) => {
        const ok = r.answers[i] === q.answer;
        if (ok) score++;
        else wrongIds.push(q.id);
        const [c, t] = byTheme[q.theme] ?? [0, 0];
        byTheme[q.theme] = [c + (ok ? 1 : 0), t + 1];
      });
      const result: ExamResult = {
        at: Date.now(),
        score,
        total: qs.length,
        passMark: EXAM.passMark,
        durationSec: Math.round(Math.min(Date.now() - r.startedAt, r.durationMs) / 1000),
        byTheme,
        wrongIds,
      };
      recordAnswers(qs.map((q, i) => ({ id: q.id, correct: r.answers[i] === q.answer })));
      saveExam(result);
      saveRunning(null);
      setRun(null);
      setConfirming(false);
      setFinished({ qs, orders: r.orders, answers: r.answers, result });
      window.scrollTo({ top: 0 });
    },
    [],
  );

  // chronomètre
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [run]);
  const remaining = run ? run.startedAt + run.durationMs - now : 0;
  useEffect(() => {
    if (run && remaining <= 0) submit(run);
  }, [run, remaining, submit]);

  // clavier : 1-4 / A-D pour répondre, flèches pour naviguer
  useEffect(() => {
    if (!run) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || confirming) return;
      const k = e.key.toLowerCase();
      const pos = ["1", "2", "3", "4"].includes(k) ? +k - 1 : ["a", "b", "c", "d"].indexOf(k);
      if (pos >= 0) {
        const answers = run.answers.slice();
        answers[idx] = run.orders[idx][pos];
        update({ ...run, answers });
      } else if (e.key === "ArrowRight" || e.key === "Enter") setIdx((i) => Math.min(i + 1, run.ids.length - 1));
      else if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [run, idx, update, confirming]);

  if (!hydrated) return null;

  if (finished) return <Results f={finished} onRestart={start} />;

  if (!run) {
    const last = progress.exams.slice(-5).reverse();
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Examen blanc</h1>
          <p className="text-slate-600 dark:text-slate-400">Les conditions réelles de l'examen civique (naturalisation).</p>
        </div>
        <div className="card space-y-4 p-5">
          <ul className="grid grid-cols-3 gap-3 text-center">
            <li className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              <p className="text-2xl font-bold">{EXAM.total}</p>
              <p className="text-xs text-slate-500">questions</p>
            </li>
            <li className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              <p className="text-2xl font-bold">{EXAM.durationMin}</p>
              <p className="text-xs text-slate-500">minutes</p>
            </li>
            <li className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              <p className="text-2xl font-bold">{EXAM.passMark}</p>
              <p className="text-xs text-slate-500">bonnes réponses requises</p>
            </li>
          </ul>
          <div className="space-y-1.5 text-sm">
            {EXAM.distribution.map((d) => (
              <div key={d.theme} className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${THEME_BY_ID[d.theme].dot}`} />
                <span className="flex-1">{THEME_BY_ID[d.theme].label}</span>
                <span className="tabular-nums text-slate-500">
                  {d.connaissance + d.situation} {d.situation > 0 && `(dont ${d.situation} mises en situation)`}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Pas de correction pendant l'épreuve : vous pouvez changer vos réponses, marquer des questions pour y revenir, puis
            terminer. La correction détaillée s'affiche à la fin.
          </p>
          {pending && pending.startedAt + pending.durationMs > Date.now() ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <button
                className="btn btn-primary py-3.5"
                onClick={() => {
                  setIdx(Math.max(0, pending.answers.findIndex((a) => a === null)));
                  update(pending);
                  setPending(null);
                }}
              >
                Reprendre l'examen en cours ({fmt(pending.startedAt + pending.durationMs - Date.now())})
              </button>
              <button className="btn btn-ghost py-3.5" onClick={start}>
                Recommencer un nouvel examen
              </button>
            </div>
          ) : (
            <button className="btn btn-primary w-full py-3.5 text-base" onClick={start}>
              Commencer l'examen blanc
            </button>
          )}
        </div>
        {last.length > 0 && (
          <div className="card p-5">
            <h2 className="mb-3 font-semibold">Derniers examens blancs</h2>
            <ul className="space-y-2">
              {last.map((e) => (
                <li key={e.at} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{new Date(e.at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</span>
                  <span className={`font-semibold tabular-nums ${e.score >= e.passMark ? "text-emerald-600" : "text-rose-600"}`}>
                    {e.score}/{e.total} {e.score >= e.passMark ? "✓ Réussi" : "✗ Échoué"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const q = QUESTION_BY_ID[run.ids[idx]];
  const answeredCount = run.answers.filter((a) => a !== null).length;
  const low = remaining < 5 * 60_000;

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-20 -mx-4 border-b border-slate-200 bg-slate-50/95 px-4 py-2 backdrop-blur md:top-[57px] dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex items-center gap-3">
          <span className={`rounded-lg px-2.5 py-1 font-mono text-lg font-bold tabular-nums ${low ? "bg-rose-600 text-white" : "bg-slate-900 text-white dark:bg-white dark:text-slate-900"}`}>
            {fmt(remaining)}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Question <b>{idx + 1}</b>/{run.ids.length} · {answeredCount} répondue{answeredCount > 1 ? "s" : ""}
          </span>
          <button className="btn btn-primary ml-auto px-3 py-1.5" onClick={() => setConfirming(true)}>
            Terminer
          </button>
        </div>
      </div>

      <div className="card p-4 md:p-6">
        <QuestionCard
          key={q.id}
          q={q}
          order={run.orders[idx]}
          selected={run.answers[idx]}
          reveal={false}
          onSelect={(c) => {
            const answers = run.answers.slice();
            answers[idx] = c;
            update({ ...run, answers });
          }}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button className="btn btn-ghost" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
          ← Précédente
        </button>
        <button
          className={`btn ${run.flags[idx] ? "border-2 border-orange-400 bg-orange-50 text-orange-800 dark:bg-orange-950/50 dark:text-orange-200" : "btn-ghost"}`}
          onClick={() => {
            const flags = run.flags.slice();
            flags[idx] = !flags[idx];
            update({ ...run, flags });
          }}
        >
          {run.flags[idx] ? "★ Marquée" : "☆ À revoir"}
        </button>
        <button className="btn btn-primary" disabled={idx === run.ids.length - 1} onClick={() => setIdx(idx + 1)}>
          Suivante →
        </button>
      </div>

      <div className="card p-3">
        <div className="grid grid-cols-10 gap-1.5 sm:grid-cols-[repeat(20,minmax(0,1fr))]">
          {run.ids.map((id, i) => (
            <button
              key={id}
              onClick={() => setIdx(i)}
              className={`h-8 rounded-md text-xs font-semibold tabular-nums transition ${
                i === idx ? "ring-2 ring-france-blue ring-offset-1 dark:ring-blue-400 dark:ring-offset-slate-900" : ""
              } ${
                run.flags[i]
                  ? "bg-orange-400 text-white"
                  : run.answers[i] !== null
                    ? "bg-france-blue text-white dark:bg-blue-600"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" onClick={() => setConfirming(false)}>
          <div className="card w-full max-w-sm space-y-4 p-5" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold">Terminer l'examen ?</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {run.answers.length - answeredCount > 0
                ? `Attention : ${run.answers.length - answeredCount} question(s) sans réponse (comptées fausses).`
                : "Toutes les questions ont une réponse."}
              {run.flags.some(Boolean) && ` ${run.flags.filter(Boolean).length} question(s) marquée(s) à revoir.`}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn btn-ghost" onClick={() => setConfirming(false)}>
                Continuer
              </button>
              <button className="btn btn-primary" onClick={() => submit(run)}>
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Results({ f, onRestart }: { f: Finished; onRestart: () => void }) {
  const [filter, setFilter] = useState<"erreurs" | "toutes">("erreurs");
  const { result } = f;
  const passed = result.score >= result.passMark;
  const items = useMemo(
    () => f.qs.map((q, i) => ({ q, i })).filter(({ q, i }) => filter === "toutes" || f.answers[i] !== q.answer),
    [f, filter],
  );
  return (
    <div className="space-y-5">
      <div className={`card overflow-hidden`}>
        <div className={`p-6 text-center text-white ${passed ? "bg-emerald-600" : "bg-rose-600"}`}>
          <p className="text-sm font-medium opacity-90">{passed ? "Examen blanc réussi" : "Examen blanc non réussi"}</p>
          <p className="text-5xl font-bold tabular-nums">
            {result.score}/{result.total}
          </p>
          <p className="mt-1 text-sm opacity-90">
            {Math.round((result.score / result.total) * 100)} % · seuil {result.passMark}/{result.total} · {Math.floor(result.durationSec / 60)} min{" "}
            {result.durationSec % 60} s
          </p>
          <p className="mt-2 text-sm font-medium">
            {result.score >= EXAM.target
              ? "Excellente marge : vous êtes prêt(e) !"
              : passed
                ? `Réussi, mais visez ${EXAM.target}/40 pour garder une marge le jour J.`
                : `Il manque ${result.passMark - result.score} bonne(s) réponse(s). Retravaillez vos erreurs ci-dessous.`}
          </p>
        </div>
        <div className="space-y-2 p-5">
          {THEMES.filter((t) => result.byTheme[t.id]).map((t) => {
            const [c, n] = result.byTheme[t.id]!;
            return (
              <div key={t.id}>
                <div className="flex justify-between text-sm">
                  <span>{t.short}</span>
                  <span className="tabular-nums font-medium">
                    {c}/{n}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className={`h-full ${t.bar}`} style={{ width: `${(c / n) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid gap-2 border-t border-slate-200 p-4 sm:grid-cols-2 dark:border-slate-800">
          <button className="btn btn-primary" onClick={onRestart}>
            Nouvel examen blanc
          </button>
          <Link href="/entrainement?mode=erreurs&start=1" className="btn btn-ghost">
            Retravailler mes erreurs
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <h2 className="flex-1 font-semibold">Correction</h2>
        {(["erreurs", "toutes"] as const).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`chip ${filter === k ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900" : "border-slate-300 dark:border-slate-700"}`}
          >
            {k === "erreurs" ? `Erreurs (${result.wrongIds.length})` : "Toutes"}
          </button>
        ))}
      </div>
      {items.map(({ q, i }) => (
        <div key={q.id} className="card p-4 md:p-6">
          <p className="mb-2 text-xs font-semibold text-slate-400">Question {i + 1}</p>
          <QuestionCard q={q} order={f.orders[i]} selected={f.answers[i]} reveal />
        </div>
      ))}
      {items.length === 0 && <p className="text-center text-slate-500">Aucune erreur, bravo !</p>}
    </div>
  );
}
