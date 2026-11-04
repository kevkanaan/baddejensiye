"use client";

import { useCallback, useEffect, useState } from "react";
import { QuestionBadges } from "./QuestionCard";
import { recordAnswer } from "@/lib/progress";
import type { Question } from "@/lib/types";

/** Cartes mémoire : on lit la question, on se donne la réponse, puis on vérifie. */
export default function FlashSession({
  questions,
  onExit,
  onRestart,
}: {
  questions: Question[];
  onExit: () => void;
  onRestart: (qs: Question[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const done = results.length === questions.length;
  const q = questions[idx];

  const grade = useCallback(
    (ok: boolean) => {
      recordAnswer(q.id, ok);
      setResults((r) => [...r, ok]);
      setShown(false);
      setIdx((i) => Math.min(i + 1, questions.length - 1));
    },
    [q, questions.length],
  );

  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!shown && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setShown(true);
      } else if (shown && (e.key === "ArrowRight" || e.key === "1")) grade(true);
      else if (shown && (e.key === "ArrowLeft" || e.key === "2")) grade(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, shown, grade]);

  if (done) {
    const ok = results.filter(Boolean).length;
    const toReview = questions.filter((_, i) => !results[i]);
    return (
      <div className="card space-y-4 p-6 text-center">
        <p className="text-sm font-medium text-slate-500">Cartes terminées</p>
        <p className="text-4xl font-bold">
          {ok}/{questions.length}
        </p>
        <p className="text-slate-600 dark:text-slate-400">connues du premier coup</p>
        <div className="flex flex-wrap justify-center gap-2">
          {toReview.length > 0 && (
            <button className="btn btn-primary" onClick={() => onRestart(toReview)}>
              Revoir les {toReview.length} carte{toReview.length > 1 ? "s" : ""} ratée{toReview.length > 1 ? "s" : ""}
            </button>
          )}
          <button className="btn btn-ghost" onClick={onExit}>
            Nouvelle session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={onExit} className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white">
          ✕ Quitter
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-france-blue transition-all dark:bg-blue-500"
            style={{ width: `${(results.length / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-slate-500">
          {idx + 1}/{questions.length}
        </span>
      </div>

      <div className="card min-h-[18rem] space-y-4 p-5 md:p-7">
        <QuestionBadges q={q} />
        <h2 className="text-lg leading-snug font-semibold md:text-xl">{q.question}</h2>
        {shown ? (
          <div className="space-y-3 border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">{q.choices[q.answer]}</p>
            <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{q.explanation}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Formulez votre réponse dans votre tête, puis retournez la carte.</p>
        )}
      </div>

      {shown ? (
        <div className="grid grid-cols-2 gap-3">
          <button className="btn border-2 border-rose-300 bg-rose-50 py-3.5 text-rose-800 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-200" onClick={() => grade(false)}>
            ✗ À revoir
          </button>
          <button className="btn border-2 border-emerald-300 bg-emerald-50 py-3.5 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200" onClick={() => grade(true)}>
            ✓ Je savais
          </button>
        </div>
      ) : (
        <button className="btn btn-primary w-full py-3.5 text-base" onClick={() => setShown(true)}>
          Afficher la réponse
        </button>
      )}
    </div>
  );
}
