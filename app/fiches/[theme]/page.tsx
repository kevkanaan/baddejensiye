import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import RichText from "@/components/RichText";
import { FICHES } from "@/lib/data";
import { THEMES, THEME_BY_ID } from "@/lib/themes";
import type { ThemeId } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return THEMES.filter((t) => FICHES.some((f) => f.theme === t.id)).map((t) => ({ theme: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }): Promise<Metadata> {
  const { theme } = await params;
  return { title: THEME_BY_ID[theme as ThemeId]?.label ?? "Fiche" };
}

export default async function Page({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  const fiche = FICHES.find((f) => f.theme === theme);
  const meta = THEME_BY_ID[theme as ThemeId];
  if (!fiche || !meta) notFound();
  const idx = THEMES.findIndex((t) => t.id === theme);
  const next = THEMES[(idx + 1) % THEMES.length];

  return (
    <article className="space-y-5">
      <div>
        <Link href="/fiches" className="text-sm text-slate-500 hover:underline">
          ← Fiches
        </Link>
        <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold">
          <span className={`h-7 w-1.5 rounded-full ${meta.bar}`} />
          {fiche.title}
        </h1>
        {fiche.intro && <p className="mt-2 text-slate-600 dark:text-slate-400">{fiche.intro}</p>}
      </div>

      <nav className="card p-4">
        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">Sommaire</p>
        <ol className="grid gap-1 text-sm sm:grid-cols-2">
          {fiche.sections.map((s, i) => (
            <li key={i}>
              <a href={`#s${i}`} className="text-france-blue hover:underline dark:text-blue-400">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {fiche.sections.map((s, i) => (
        <section key={i} id={`s${i}`} className="card scroll-mt-20 p-5">
          <h2 className="mb-3 text-lg font-semibold">
            {i + 1}. {s.title}
          </h2>
          <ul className="space-y-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
            {s.points.map((pt, j) => (
              <li key={j} className="flex gap-2">
                <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${meta.dot}`} />
                <span>
                  <RichText text={pt} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="grid gap-2 sm:grid-cols-2">
        <Link href={`/entrainement?theme=${theme}&start=1`} className="btn btn-primary py-3">
          S'entraîner sur ce thème
        </Link>
        <Link href={`/fiches/${next.id}`} className="btn btn-ghost py-3">
          Fiche suivante : {next.short} →
        </Link>
      </div>
    </article>
  );
}
