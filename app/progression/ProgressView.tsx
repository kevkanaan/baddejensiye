"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUESTIONS } from "@/lib/data";
import {
  exportCode,
  importCode,
  resetProgress,
  setExamDate,
  statusOf,
  todayKey,
  useHydrated,
  useProgress,
} from "@/lib/progress";
import { THEMES, THEME_BY_ID } from "@/lib/themes";
import type { ThemeId } from "@/lib/types";

export default function ProgressView() {
  const p = useProgress();
  const hydrated = useHydrated();

  const subthemes = useMemo(() => {
    const m = new Map<string, { theme: ThemeId; name: string; total: number; seen: number; correct: number; answers: number; mastered: number }>();
    for (const q of QUESTIONS) {
      const key = `${q.theme}|${q.subtheme}`;
      const e = m.get(key) ?? { theme: q.theme, name: q.subtheme, total: 0, seen: 0, correct: 0, answers: 0, mastered: 0 };
      e.total++;
      const st = p.stats[q.id];
      if (st?.seen) {
        e.seen++;
        e.correct += st.correct;
        e.answers += st.correct + st.wrong;
      }
      if (statusOf(st) === "maitrisee") e.mastered++;
      m.set(key, e);
    }
    return [...m.values()];
  }, [p.stats]);

  const weak = subthemes
    .filter((s) => s.answers >= 3)
    .map((s) => ({ ...s, rate: s.correct / s.answers }))
    .filter((s) => s.rate < 0.8)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 8);

  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const k = todayKey(d);
    return { k, d, v: p.days[k] ?? [0, 0] };
  });
  const maxDay = Math.max(10, ...last14.map((x) => x.v[0]));

  if (!hydrated) return null;

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Progression</h1>

      <section id="date" className="card space-y-2 p-5">
        <h2 className="font-semibold">Date de mon examen</h2>
        <input
          type="date"
          value={p.examDate}
          onChange={(e) => e.target.value && setExamDate(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
        />
      </section>

      <section className="card p-5">
        <h2 className="mb-3 font-semibold">Activité des 14 derniers jours</h2>
        <div className="flex h-28 gap-1">
          {last14.map(({ k, d, v }) => (
            <div key={k} className="flex flex-1 flex-col items-center gap-1" title={`${v[0]} réponses, ${v[1]} bonnes`}>
              <div className="relative w-full flex-1">
                <div className="absolute inset-x-0 bottom-0 rounded-t bg-slate-300 dark:bg-slate-700" style={{ height: `${(v[0] / maxDay) * 100}%` }} />
                <div className="absolute inset-x-0 bottom-0 rounded-t bg-emerald-500" style={{ height: `${(v[1] / maxDay) * 100}%` }} />
              </div>
              <span className="text-[10px] text-slate-500">{d.getDate()}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">Vert : bonnes réponses · gris : total des réponses</p>
      </section>

      <section className="card p-5">
        <h2 className="mb-3 font-semibold">Points faibles</h2>
        {weak.length === 0 ? (
          <p className="text-sm text-slate-500">Pas encore assez de réponses (ou aucun sous-thème sous 80 % de réussite).</p>
        ) : (
          <ul className="space-y-2">
            {weak.map((w) => (
              <li key={w.theme + w.name}>
                <Link href={`/entrainement?theme=${w.theme}&mode=erreurs&start=1`} className="flex items-center gap-3 text-sm hover:underline">
                  <span className={`h-2.5 w-2.5 rounded-full ${THEME_BY_ID[w.theme].dot}`} />
                  <span className="flex-1">{w.name}</span>
                  <span className="font-semibold tabular-nums text-rose-600">{Math.round(w.rate * 100)} %</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="card p-5">
        <h2 className="mb-3 font-semibold">Détail par thème</h2>
        <div className="space-y-4">
          {THEMES.map((t) => {
            const subs = subthemes.filter((s) => s.theme === t.id).sort((a, b) => b.total - a.total);
            const total = subs.reduce((a, s) => a + s.total, 0);
            const mastered = subs.reduce((a, s) => a + s.mastered, 0);
            return (
              <details key={t.id} className="group">
                <summary className="flex cursor-pointer list-none items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} />
                  <span className="flex-1 font-medium">{t.label}</span>
                  <span className="text-sm tabular-nums text-slate-500">
                    {mastered}/{total}
                  </span>
                  <span className="text-slate-400 transition group-open:rotate-90">›</span>
                </summary>
                <ul className="mt-2 space-y-1.5 pl-5">
                  {subs.map((s) => (
                    <li key={s.name} className="text-sm">
                      <div className="flex justify-between">
                        <span>{s.name}</span>
                        <span className="tabular-nums text-slate-500">
                          {s.mastered}/{s.total}
                        </span>
                      </div>
                      <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                        <div className={`h-full ${t.bar}`} style={{ width: `${(s.mastered / s.total) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      <section className="card p-5">
        <h2 className="mb-3 font-semibold">Examens blancs</h2>
        {p.exams.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucun pour l'instant. <Link href="/examen" className="text-france-blue underline dark:text-blue-400">Faire un examen blanc</Link>
          </p>
        ) : (
          <>
            <div className="mb-3 flex h-24 items-end gap-1.5">
              {p.exams.slice(-20).map((e) => (
                <div
                  key={e.at}
                  className={`flex-1 rounded-t ${e.score >= e.passMark ? "bg-emerald-500" : "bg-rose-500"}`}
                  style={{ height: `${(e.score / e.total) * 100}%` }}
                  title={`${e.score}/${e.total}`}
                />
              ))}
            </div>
            <ul className="space-y-1.5 text-sm">
              {p.exams
                .slice()
                .reverse()
                .slice(0, 10)
                .map((e) => (
                  <li key={e.at} className="flex justify-between">
                    <span className="text-slate-500">{new Date(e.at).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" })}</span>
                    <span className={`font-semibold tabular-nums ${e.score >= e.passMark ? "text-emerald-600" : "text-rose-600"}`}>
                      {e.score}/{e.total}
                    </span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </section>

      <Sync />

      <section className="card space-y-2 p-5">
        <h2 className="font-semibold">Réinitialiser</h2>
        <p className="text-sm text-slate-500">Efface toutes les statistiques de cet appareil (la date d'examen est conservée).</p>
        <button
          className="btn border border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
          onClick={() => {
            if (confirm("Effacer toute votre progression sur cet appareil ?")) resetProgress();
          }}
        >
          Tout effacer
        </button>
      </section>
    </div>
  );
}

function Sync() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <section className="card space-y-3 p-5">
      <h2 className="font-semibold">Synchroniser ordinateur ↔ téléphone</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        La progression est enregistrée sur chaque appareil. Pour la transférer : copiez le code sur un appareil, puis collez-le sur
        l'autre (les deux progressions sont fusionnées, rien n'est perdu).
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          className="btn btn-primary"
          onClick={async () => {
            const c = await exportCode();
            setCode(c);
            try {
              await navigator.clipboard.writeText(c);
              setMsg("Code copié dans le presse-papiers. Envoyez-le-vous (mail, messagerie…) puis collez-le sur l'autre appareil.");
            } catch {
              setMsg("Copiez le code ci-dessous.");
            }
          }}
        >
          Copier mon code
        </button>
        <button
          className="btn btn-ghost"
          disabled={!code.trim()}
          onClick={async () => {
            try {
              const n = await importCode(code);
              setMsg(`Progression importée et fusionnée (${n} questions).`);
              setCode("");
            } catch (e) {
              setMsg(e instanceof Error ? e.message : "Code invalide");
            }
          }}
        >
          Importer le code collé
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Collez ici le code EC1:… venant de l'autre appareil"
        rows={3}
        className="w-full rounded-xl border border-slate-300 bg-white p-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-950"
      />
      {msg && <p className="text-sm font-medium">{msg}</p>}
    </section>
  );
}
