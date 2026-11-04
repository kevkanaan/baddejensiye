import type { ThemeId } from "./types";

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  short: string;
  /** classes Tailwind pour la pastille / la barre de progression */
  dot: string;
  bar: string;
  soft: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "principes",
    label: "Principes et valeurs de la République",
    short: "Principes & valeurs",
    dot: "bg-blue-600",
    bar: "bg-blue-600",
    soft: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  },
  {
    id: "institutions",
    label: "Système institutionnel et politique",
    short: "Institutions",
    dot: "bg-violet-600",
    bar: "bg-violet-600",
    soft: "bg-violet-50 text-violet-800 dark:bg-violet-950 dark:text-violet-200",
  },
  {
    id: "droits",
    label: "Droits et devoirs",
    short: "Droits & devoirs",
    dot: "bg-rose-600",
    bar: "bg-rose-600",
    soft: "bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  },
  {
    id: "histoire",
    label: "Histoire, géographie et culture",
    short: "Histoire, géo & culture",
    dot: "bg-amber-500",
    bar: "bg-amber-500",
    soft: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  },
  {
    id: "societe",
    label: "Vivre dans la société française",
    short: "Vie en société",
    dot: "bg-emerald-600",
    bar: "bg-emerald-600",
    soft: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  },
];

export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t])) as Record<ThemeId, ThemeMeta>;
