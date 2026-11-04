"use client";

import Link from "next/link";
import { useMemo } from "react";
import { QUESTIONS } from "@/lib/data";
import { EXAM } from "@/lib/exam-config";
import { daysUntil, isDue, MASTERED_BOX, statusOf, todayKey, useHydrated, useProgress } from "@/lib/progress";
import { THEMES } from "@/lib/themes";

export default function Dashboard() {
  const hydrated = useHydrated();
  const p = useProgress();

  const s = useMemo(() => {
    const now = Date.now();
    let seen = 0,
      mastered = 0,
      toReview = 0,
      due = 0;
    const byTheme = Object.fromEntries(THEMES.map((t) => [t.id, { total: 0, seen: 0, mastered: 0 }]));
    for (const q of QUESTIONS) {
      const st = p.stats[q.id];
      const status = statusOf(st);
      const bt = byTheme[q.theme];
      bt.total++;
      if (status !== "nouvelle") {
        seen++;
        bt.seen++;
      }
      if (status === "maitrisee") {
        mastered++;
        bt.mastered++;
      }
      if (status === "a-revoir") toReview++;
      else if (isDue(st, now)) due++;
    }
    return { seen, mastered, toReview, due, byTheme, unseen: QUESTIONS.length - seen };
  }, [p.stats]);

  const days = daysUntil(p.examDate);
  const today = p.days[todayKey()] ?? [0, 0];
  const lastExams = p.exams.slice(-3);
  const avgLast = lastExams.length ? lastExams.reduce((a, e) => a + e.score, 0) / lastExams.length : null;

  // plan quotidien : couvrir toutes les nouvelles questions avant J-2, puis examens blancs et révisions
  const studyDays = Math.max(1, days - 1);
  const newPerDay = Math.ceil(s.unseen / studyDays);
  const examsToday = days <= 7 ? (days <= 3 ? 2 : 1) : 0;

  const pctMastered = QUESTIONS.length ? Math.round((s.mastered / QUESTIONS.length) * 100) : 0;

  return (
    <div className="space-y-5">
      <section className="card overflow-hidden">
        <div className="flex items-center gap-4 bg-gradient-to-br from-france-blue to-blue-800 p-5 text-white">
          <div className="flex-1">
            <p className="text-sm opacity-80">Examen civique · naturalisation</p>
            <p className="text-2xl font-bold">
              {!hydrated
                ? " "
                : days > 1
                  ? `J-${days}`
                  : days === 1
                    ? "C'est demain !"
                    : days === 0
                      ? "C'est aujourd'hui !"
                      : "Examen passé"}
            </p>
            <p className="text-sm opacity-80">
              {hydrated &&
                new Date(p.examDate + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}{" "}
              · <Link href="/progression#date" className="underline underline-offset-2">modifier</Link>
            </p>
          </div>
          <Ring pct={hydrated ? pctMastered : 0} />
        </div>
        <div className="grid grid-cols-3 divide-x divide-slate-200 text-center dark:divide-slate-800">
          <Stat value={hydrated ? s.seen : "–"} label={`vues / ${QUESTIONS.length}`} />
          <Stat value={hydrated ? s.mastered : "–"} label="maîtrisées" />
          <Stat value={hydrated ? today[0] : "–"} label="réponses aujourd'hui" />
        </div>
      </section>

      <section className="card space-y-3 p-5">
        <h2 className="font-semibold">Votre plan pour aujourd'hui</h2>
        {!hydrated ? (
          <div className="h-48 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
        ) : (
        <ul className="space-y-2 text-[15px]">
          {s.toReview + s.due > 0 && (
            <PlanItem
              href="/entrainement?mode=intelligent&start=1"
              title={`Revoir ${s.toReview + s.due} question${s.toReview + s.due > 1 ? "s" : ""}`}
              hint={`${s.toReview} erreur(s) récente(s), ${s.due} révision(s) programmée(s)`}
              tone="rose"
            />
          )}
          {s.unseen > 0 && (
            <PlanItem
              href={`/entrainement?mode=nouvelles&n=${Math.min(newPerDay, s.unseen)}&start=1`}
              title={`Découvrir ${Math.min(newPerDay, s.unseen)} nouvelles questions`}
              hint={`${s.unseen} jamais vues · rythme conseillé pour tout voir avant J-1`}
              tone="blue"
            />
          )}
          <PlanItem
            href="/examen"
            title={examsToday > 1 ? `Faire ${examsToday} examens blancs` : examsToday === 1 ? "Faire un examen blanc" : "Faire un examen blanc (facultatif)"}
            hint={`${EXAM.total} questions en ${EXAM.durationMin} min · objectif ${EXAM.passMark}/${EXAM.total}${avgLast !== null ? ` · moyenne récente ${avgLast.toFixed(1)}` : ""}`}
            tone="emerald"
          />
          <PlanItem href="/fiches" title="Relire une fiche de révision" hint="10 minutes, idéalement le thème le plus faible" tone="amber" />
        </ul>
        )}
      </section>

      <section className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Maîtrise par thème</h2>
          <Link href="/progression" className="text-sm text-france-blue underline-offset-2 hover:underline dark:text-blue-400">
            Détails
          </Link>
        </div>
        <div className="space-y-3">
          {THEMES.map((t) => {
            const b = s.byTheme[t.id];
            const pct = b.total ? (b.mastered / b.total) * 100 : 0;
            const seenPct = b.total ? (b.seen / b.total) * 100 : 0;
            return (
              <Link key={t.id} href={`/entrainement?theme=${t.id}&start=1`} className="block group">
                <div className="flex justify-between text-sm">
                  <span className="font-medium group-hover:underline">{t.short}</span>
                  <span className="tabular-nums text-slate-500">
                    {hydrated ? b.mastered : 0}/{b.total}
                  </span>
                </div>
                <div className="relative mt-1 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className={`absolute inset-y-0 left-0 opacity-30 ${t.bar}`} style={{ width: `${hydrated ? seenPct : 0}%` }} />
                  <div className={`absolute inset-y-0 left-0 ${t.bar}`} style={{ width: `${hydrated ? pct : 0}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Barre pleine = maîtrisée (réussie au moins {MASTERED_BOX - 1} fois de suite) · barre claire = déjà vue. Touchez un thème pour
          vous entraîner dessus.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <QuickLink href="/entrainement?type=situation&start=1" title="Mises en situation" hint="Les questions « Que faites-vous ? »" />
        <QuickLink href="/entrainement?officiel=1&start=1" title="Liste officielle" hint="Les intitulés publiés par le ministère" />
        <QuickLink href="/entrainement?format=cartes&start=1" title="Cartes mémoire" hint="Révision rapide, idéal sur téléphone" />
        <QuickLink href="/questions" title="Toutes les questions" hint="Recherche + réponses" />
      </section>

      <Link
        href="/jour-j"
        className="card flex items-center gap-4 border-amber-300 bg-amber-50 p-4 transition hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/40"
      >
        <span className="text-2xl" aria-hidden>
          📋
        </span>
        <span className="flex-1">
          <span className="block font-semibold">Le jour J : règles et stratégie</span>
          <span className="block text-sm text-slate-600 dark:text-slate-400">
            Pièces à apporter, déroulé, pas de point négatif, gestion du temps…
          </span>
        </span>
        <span className="text-slate-400">→</span>
      </Link>
    </div>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="p-3">
      <p className="text-xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Ring({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="7" />
        {pct > 0 && (
          <circle cx="32" cy="32" r={r} fill="none" stroke="white" strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(pct / 100) * c} ${c}`} />
        )}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">{pct}%</span>
    </div>
  );
}

const TONES = {
  rose: "bg-rose-500",
  blue: "bg-france-blue dark:bg-blue-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
};

function PlanItem({ href, title, hint, tone }: { href: string; title: string; hint: string; tone: keyof typeof TONES }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition hover:border-slate-400 dark:border-slate-800 dark:hover:border-slate-600"
      >
        <span className={`h-9 w-1.5 shrink-0 rounded-full ${TONES[tone]}`} />
        <span className="flex-1">
          <span className="block font-medium">{title}</span>
          <span className="block text-sm text-slate-500">{hint}</span>
        </span>
        <span className="text-slate-400">→</span>
      </Link>
    </li>
  );
}

function QuickLink({ href, title, hint }: { href: string; title: string; hint: string }) {
  return (
    <Link href={href} className="card block p-4 transition hover:border-slate-400 dark:hover:border-slate-600">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-500">{hint}</p>
    </Link>
  );
}
