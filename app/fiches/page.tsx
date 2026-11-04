import Link from "next/link";
import type { Metadata } from "next";
import { FICHES, questionsOfTheme } from "@/lib/data";
import { THEMES } from "@/lib/themes";

export const metadata: Metadata = { title: "Fiches de révision" };

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Fiches de révision</h1>
        <p className="text-slate-600 dark:text-slate-400">L'essentiel à savoir, thème par thème. À relire avant chaque session.</p>
      </div>
      <div className="grid gap-3">
        {THEMES.map((t) => {
          const f = FICHES.find((x) => x.theme === t.id);
          const nq = questionsOfTheme(t.id).length;
          return (
            <Link
              key={t.id}
              href={`/fiches/${t.id}`}
              className={`card flex items-center gap-4 p-4 transition hover:border-slate-400 dark:hover:border-slate-600 ${f ? "" : "pointer-events-none opacity-50"}`}
            >
              <span className={`h-12 w-1.5 shrink-0 rounded-full ${t.bar}`} />
              <span className="flex-1">
                <span className="block font-semibold">{t.label}</span>
                <span className="block text-sm text-slate-500">
                  {f ? `${f.sections.length} sections` : "Bientôt disponible"} · {nq} questions d'entraînement
                </span>
              </span>
              <span className="text-slate-400">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
