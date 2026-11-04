"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { QuestionBadges } from "@/components/QuestionCard";
import { QUESTIONS, normalize } from "@/lib/data";
import { statusOf, useHydrated, useProgress, type Status } from "@/lib/progress";
import { THEMES } from "@/lib/themes";
import type { ThemeId } from "@/lib/types";

const STATUS_LABEL: Record<Status, string> = {
  nouvelle: "Jamais vue",
  "a-revoir": "À revoir",
  "en-cours": "En cours",
  maitrisee: "Maîtrisée",
};
const STATUS_CLS: Record<Status, string> = {
  nouvelle: "text-slate-500",
  "a-revoir": "text-rose-600",
  "en-cours": "text-amber-600",
  maitrisee: "text-emerald-600",
};
const PAGE = 40;

export default function Bank() {
  const p = useProgress();
  const hydrated = useHydrated();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeId | "">("");
  const [type, setType] = useState<"" | "connaissance" | "situation">("");
  const [status, setStatus] = useState<Status | "">("");
  const [hide, setHide] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const q = useDeferredValue(query);

  const index = useMemo(
    () => QUESTIONS.map((x) => ({ x, text: normalize(`${x.question} ${x.choices.join(" ")} ${x.subtheme} ${x.explanation}`) })),
    [],
  );

  const list = useMemo(() => {
    const words = normalize(q).split(/\s+/).filter(Boolean);
    return index
      .filter(
        ({ x, text }) =>
          (!theme || x.theme === theme) &&
          (!type || x.type === type) &&
          (!status || statusOf(p.stats[x.id]) === status) &&
          words.every((w) => text.includes(w)),
      )
      .map(({ x }) => x);
  }, [index, q, theme, type, status, p.stats]);

  const select = "rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Toutes les questions</h1>
        <p className="text-slate-600 dark:text-slate-400">
          {QUESTIONS.length} questions avec réponses et explications. Masquez les réponses pour vous tester.
        </p>
      </div>

      <div className="card sticky top-0 z-10 space-y-2 p-3 md:top-[57px]">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setLimit(PAGE);
          }}
          placeholder="Rechercher (ex. : laïcité, 1958, maire, Marianne…)"
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 dark:border-slate-700 dark:bg-slate-950"
        />
        <div className="flex flex-wrap gap-2">
          <select className={select} value={theme} onChange={(e) => (setTheme(e.target.value as ThemeId | ""), setLimit(PAGE))}>
            <option value="">Tous les thèmes</option>
            {THEMES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.short}
              </option>
            ))}
          </select>
          <select className={select} value={type} onChange={(e) => (setType(e.target.value as typeof type), setLimit(PAGE))}>
            <option value="">Tous types</option>
            <option value="connaissance">Connaissance</option>
            <option value="situation">Mises en situation</option>
          </select>
          <select className={select} value={status} onChange={(e) => (setStatus(e.target.value as Status | ""), setLimit(PAGE))}>
            <option value="">Tous statuts</option>
            {(Object.keys(STATUS_LABEL) as Status[]).map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} className="h-4 w-4" />
            Masquer les réponses
          </label>
        </div>
        <p className="text-xs text-slate-500">{list.length} résultat(s)</p>
      </div>

      <ul className="space-y-3">
        {list.slice(0, limit).map((x) => (
          <Item key={x.id} x={x} hide={hide} status={hydrated ? statusOf(p.stats[x.id]) : "nouvelle"} />
        ))}
      </ul>
      {list.length > limit && (
        <button className="btn btn-ghost w-full" onClick={() => setLimit(limit + PAGE)}>
          Afficher plus ({list.length - limit} restantes)
        </button>
      )}
    </div>
  );
}

function Item({ x, hide, status }: { x: (typeof QUESTIONS)[number]; hide: boolean; status: Status }) {
  const [open, setOpen] = useState(false);
  const show = !hide || open;
  return (
    <li className="card space-y-2 p-4">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <QuestionBadges q={x} />
        </div>
        <span className={`text-xs font-semibold ${STATUS_CLS[status]}`}>{STATUS_LABEL[status]}</span>
      </div>
      <p className="font-medium">{x.question}</p>
      <ul className="grid gap-1 text-sm sm:grid-cols-2">
        {x.choices.map((c, i) => (
          <li
            key={i}
            className={`rounded-lg px-2.5 py-1.5 ${
              show && i === x.answer
                ? "bg-emerald-100 font-semibold text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {c}
          </li>
        ))}
      </ul>
      {show ? (
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {x.explanation}{" "}
          {x.source && (
            <a href={x.source} target="_blank" rel="noopener noreferrer" className="text-france-blue underline dark:text-blue-400">
              Source
            </a>
          )}
        </p>
      ) : (
        <button className="text-sm font-medium text-france-blue dark:text-blue-400" onClick={() => setOpen(true)}>
          Voir la réponse
        </button>
      )}
    </li>
  );
}
