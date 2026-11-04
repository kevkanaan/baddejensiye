"use client";

import { THEME_BY_ID } from "@/lib/themes";
import type { Question } from "@/lib/types";

const LETTERS = ["A", "B", "C", "D"];

export function QuestionBadges({ q }: { q: Question }) {
  const t = THEME_BY_ID[q.theme];
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
      <span className={`rounded-full px-2 py-0.5 ${t.soft}`}>{t.short}</span>
      {q.type === "situation" && (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-800 dark:bg-orange-950 dark:text-orange-200">
          Mise en situation
        </span>
      )}
      {q.origin === "officielle" && (
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-white dark:bg-white dark:text-slate-900">
          Liste officielle
        </span>
      )}
      <span className="text-slate-500 dark:text-slate-400">{q.subtheme}</span>
    </div>
  );
}

export default function QuestionCard({
  q,
  order,
  selected,
  reveal,
  onSelect,
  disabled,
}: {
  q: Question;
  order: number[];
  selected: number | null;
  reveal: boolean;
  onSelect?: (choice: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4">
      <QuestionBadges q={q} />
      <h2 className="text-lg leading-snug font-semibold md:text-xl">{q.question}</h2>
      <ul className="space-y-2.5">
        {order.map((ci, pos) => {
          const isSel = selected === ci;
          const isAns = q.answer === ci;
          let cls =
            "border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500";
          if (reveal) {
            if (isAns) cls = "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/60";
            else if (isSel) cls = "border-rose-500 bg-rose-50 dark:border-rose-500 dark:bg-rose-950/60";
            else cls = "border-slate-200 bg-white opacity-60 dark:border-slate-800 dark:bg-slate-900";
          } else if (isSel) {
            cls = "border-france-blue bg-blue-50 ring-2 ring-france-blue/30 dark:border-blue-400 dark:bg-blue-950/60";
          }
          return (
            <li key={ci}>
              <button
                type="button"
                disabled={disabled || reveal}
                onClick={() => onSelect?.(ci)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 p-3.5 text-left text-[15px] leading-snug transition disabled:cursor-default ${cls}`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    reveal && isAns
                      ? "bg-emerald-600 text-white"
                      : reveal && isSel
                        ? "bg-rose-600 text-white"
                        : isSel
                          ? "bg-france-blue text-white dark:bg-blue-500"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {LETTERS[pos]}
                </span>
                <span className="flex-1">{q.choices[ci]}</span>
                {reveal && isAns && <span className="text-emerald-600 dark:text-emerald-400">✓</span>}
                {reveal && isSel && !isAns && <span className="text-rose-600 dark:text-rose-400">✗</span>}
              </button>
            </li>
          );
        })}
      </ul>
      {reveal && <Explanation q={q} correct={selected === q.answer} answered={selected !== null} />}
    </div>
  );
}

export function Explanation({ q, correct, answered }: { q: Question; correct: boolean; answered: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 text-[15px] leading-relaxed ${
        !answered
          ? "border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-800/60"
          : correct
            ? "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
            : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
      }`}
    >
      <p className="mb-1 font-semibold">
        {!answered ? "Sans réponse" : correct ? "Bonne réponse !" : "Mauvaise réponse"}
        {(!answered || !correct) && <> — la bonne réponse : « {q.choices[q.answer]} »</>}
      </p>
      <p>{q.explanation}</p>
      {q.source && (
        <a
          href={q.source}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-france-blue underline underline-offset-2 dark:text-blue-400"
        >
          Source
        </a>
      )}
    </div>
  );
}
