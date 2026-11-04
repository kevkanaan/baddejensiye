"use client";

import { useCallback, useEffect, useState } from "react";
import QuestionCard, { QuestionBadges } from "./QuestionCard";
import { recordAnswer } from "@/lib/progress";
import { shuffledOrder } from "@/lib/select";
import type { Question } from "@/lib/types";

export default function PracticeSession({
  questions,
  onExit,
  onRestart,
}: {
  questions: Question[];
  onExit: () => void;
  onRestart: (qs: Question[]) => void;
}) {
  const [orders] = useState(() => questions.map(shuffledOrder));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const selected = answers[idx] ?? null;
  const revealed = selected !== null;
  const nbCorrect = Object.entries(answers).filter(([i, a]) => questions[+i].answer === a).length;

  const select = useCallback(
    (choice: number) => {
      if (answers[idx] !== undefined) return;
      setAnswers((a) => ({ ...a, [idx]: choice }));
      recordAnswer(q.id, choice === q.answer);
    },
    [answers, idx, q],
  );

  const next = useCallback(() => {
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx(idx + 1);
    window.scrollTo({ top: 0 });
  }, [idx, questions.length]);

  useEffect(() => {
    if (done) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const pos = ["1", "2", "3", "4"].indexOf(k) >= 0 ? +k - 1 : ["a", "b", "c", "d"].indexOf(k);
      if (!revealed && pos >= 0 && pos < 4) select(orders[idx][pos]);
      else if (revealed && (e.key === "Enter" || e.key === " " || e.key === "ArrowRight")) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [done, revealed, select, next, orders, idx]);

  if (done) {
    const wrong = questions.filter((qq, i) => answers[i] !== undefined && answers[i] !== qq.answer);
    const answered = Object.keys(answers).length;
    const pct = answered ? Math.round((nbCorrect / answered) * 100) : 0;
    return (
      <div className="space-y-5">
        <div className="card p-6 text-center">
          <p className="text-sm font-medium text-slate-500">Session terminée</p>
          <p className="mt-1 text-4xl font-bold">
            {nbCorrect}/{answered}
          </p>
          <p className={`mt-1 font-semibold ${pct >= 80 ? "text-emerald-600" : "text-amber-600"}`}>
            {pct} % {pct >= 80 ? "— niveau examen atteint (80 %)" : "— objectif : 80 %"}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {wrong.length > 0 && (
              <button className="btn btn-primary" onClick={() => onRestart(wrong)}>
                Refaire mes {wrong.length} erreur{wrong.length > 1 ? "s" : ""}
              </button>
            )}
            <button className="btn btn-ghost" onClick={onExit}>
              Nouvelle session
            </button>
          </div>
        </div>
        {wrong.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">À retenir</h3>
            {wrong.map((w) => (
              <div key={w.id} className="card space-y-2 p-4">
                <QuestionBadges q={w} />
                <p className="font-medium">{w.question}</p>
                <p className="text-emerald-700 dark:text-emerald-400">✓ {w.choices[w.answer]}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{w.explanation}</p>
              </div>
            ))}
          </div>
        )}
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
            style={{ width: `${((idx + (revealed ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-slate-500">
          {idx + 1}/{questions.length}
        </span>
        <span className="text-sm font-semibold tabular-nums text-emerald-600">✓ {nbCorrect}</span>
      </div>

      <div className="card p-4 md:p-6">
        <QuestionCard key={q.id + idx} q={q} order={orders[idx]} selected={selected} reveal={revealed} onSelect={select} />
      </div>

      {revealed ? (
        <button className="btn btn-primary w-full py-3.5 text-base" onClick={next} autoFocus>
          {idx + 1 >= questions.length ? "Voir le résultat" : "Question suivante"} →
        </button>
      ) : (
        <p className="hidden text-center text-xs text-slate-400 md:block">
          Astuce : touches 1-4 (ou A-D) pour répondre, Entrée pour continuer.
        </p>
      )}
    </div>
  );
}
