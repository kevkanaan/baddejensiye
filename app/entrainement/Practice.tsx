"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import PracticeSession from "@/components/PracticeSession";
import FlashSession from "@/components/FlashSession";
import { THEMES } from "@/lib/themes";
import { filterPool, pickPractice, type PracticeMode } from "@/lib/select";
import { MASTERED_BOX, useHydrated, useProgress } from "@/lib/progress";
import type { Question, QType, ThemeId } from "@/lib/types";

const MODES: { id: PracticeMode; label: string; hint: string }[] = [
  { id: "intelligent", label: "Intelligent", hint: "Erreurs et révisions dues d'abord, puis nouvelles questions" },
  { id: "nouvelles", label: "Nouvelles", hint: "Seulement les questions jamais vues" },
  { id: "erreurs", label: "Mes erreurs", hint: "Questions ratées et pas encore maîtrisées" },
  { id: "toutes", label: "Aléatoire", hint: "Tirage au hasard" },
];
const COUNTS = [10, 20, 40, 0];

export default function Practice() {
  const params = useSearchParams();
  const progress = useProgress();
  const hydrated = useHydrated();

  const initialTheme = params.get("theme") as ThemeId | null;
  const [themes, setThemes] = useState<ThemeId[]>(initialTheme ? [initialTheme] : []);
  const [types, setTypes] = useState<QType[]>(
    params.get("type") === "situation" ? ["situation"] : params.get("type") === "connaissance" ? ["connaissance"] : [],
  );
  const [officialOnly, setOfficialOnly] = useState(params.get("officiel") === "1");
  const [mode, setMode] = useState<PracticeMode>((params.get("mode") as PracticeMode) || "intelligent");
  const [count, setCount] = useState(() => {
    const n = Number(params.get("n"));
    return Number.isInteger(n) && n > 0 ? n : 20;
  });
  const [format, setFormat] = useState<"qcm" | "cartes">(params.get("format") === "cartes" ? "cartes" : "qcm");
  const [session, setSession] = useState<{ qs: Question[]; key: number } | null>(null);

  const pool = useMemo(() => filterPool({ themes, types, officialOnly }), [themes, types, officialOnly]);
  const available = useMemo(() => {
    const st = progress.stats;
    if (mode === "nouvelles") return pool.filter((q) => !st[q.id]?.seen).length;
    if (mode === "erreurs") return pool.filter((q) => (st[q.id]?.wrong ?? 0) > 0 && (st[q.id]?.box ?? 0) < MASTERED_BOX).length;
    return pool.length;
  }, [pool, mode, progress.stats]);

  const start = () => {
    const qs = pickPractice({ themes, types, officialOnly, mode, count }, progress);
    if (qs.length) setSession({ qs, key: Date.now() });
  };

  // démarrage automatique depuis un lien du tableau de bord (?start=1)
  const autostarted = useRef(false);
  useEffect(() => {
    if (hydrated && params.get("start") === "1" && !autostarted.current) {
      autostarted.current = true;
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated]);

  if (session) {
    const Comp = format === "cartes" ? FlashSession : PracticeSession;
    return (
      <Comp
        key={session.key}
        questions={session.qs}
        onExit={() => setSession(null)}
        onRestart={(qs) => setSession({ qs, key: Date.now() })}
      />
    );
  }

  const toggleTheme = (id: ThemeId) => setThemes((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">S'entraîner</h1>
        <p className="text-slate-600 dark:text-slate-400">Choisissez ce que vous voulez travailler.</p>
      </div>

      <Section title="Thèmes">
        <div className="flex flex-wrap gap-2">
          <Chip on={themes.length === 0} onClick={() => setThemes([])}>
            Tous
          </Chip>
          {THEMES.map((t) => (
            <Chip key={t.id} on={themes.includes(t.id)} onClick={() => toggleTheme(t.id)}>
              <span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} />
              {t.short}
            </Chip>
          ))}
        </div>
      </Section>

      <Section title="Type de questions">
        <div className="flex flex-wrap gap-2">
          <Chip on={types.length === 0} onClick={() => setTypes([])}>
            Toutes
          </Chip>
          <Chip on={types.length === 1 && types[0] === "connaissance"} onClick={() => setTypes(["connaissance"])}>
            Connaissance
          </Chip>
          <Chip on={types.length === 1 && types[0] === "situation"} onClick={() => setTypes(["situation"])}>
            Mises en situation
          </Chip>
          <Chip on={officialOnly} onClick={() => setOfficialOnly((v) => !v)}>
            {officialOnly ? "✓ " : ""}Liste officielle uniquement
          </Chip>
        </div>
      </Section>

      <Section title="Mode">
        <div className="grid gap-2 sm:grid-cols-2">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-xl border-2 p-3 text-left transition ${
                mode === m.id
                  ? "border-france-blue bg-blue-50 dark:border-blue-400 dark:bg-blue-950/50"
                  : "border-slate-200 bg-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900"
              }`}
            >
              <p className="font-semibold">{m.label}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{m.hint}</p>
            </button>
          ))}
        </div>
      </Section>

      <div className="grid gap-6 sm:grid-cols-2">
        <Section title="Format">
          <div className="flex flex-wrap gap-2">
            <Chip on={format === "qcm"} onClick={() => setFormat("qcm")}>
              QCM
            </Chip>
            <Chip on={format === "cartes"} onClick={() => setFormat("cartes")}>
              Cartes mémoire
            </Chip>
          </div>
        </Section>
        <Section title="Nombre de questions">
          <div className="flex flex-wrap gap-2">
            {COUNTS.map((c) => (
              <Chip key={c} on={count === c} onClick={() => setCount(c)}>
                {c === 0 ? "Toutes" : c}
              </Chip>
            ))}
          </div>
        </Section>
      </div>

      <div
        className="sticky -mx-4 border-t border-slate-200 bg-slate-50/95 px-4 pt-3 pb-2 backdrop-blur md:bottom-0 md:border-0 dark:border-slate-800 dark:bg-slate-950/95"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + var(--nav-h, 0px))" }}
      >
        <button className="btn btn-primary w-full py-4 text-base shadow-lg" disabled={!hydrated || available === 0} onClick={start}>
          {available === 0
            ? mode === "erreurs"
              ? "Aucune erreur à revoir 🎉"
              : "Aucune question disponible"
            : `Commencer · ${count === 0 ? available : Math.min(count, available)} question${available > 1 ? "s" : ""}`}
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">{available} questions correspondent à ces critères</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold tracking-wide text-slate-500 uppercase dark:text-slate-400">{title}</h2>
      {children}
    </section>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip ${
        on
          ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
}
