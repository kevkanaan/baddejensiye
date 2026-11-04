import questionsJson from "@/generated/questions.json";
import fichesJson from "@/generated/fiches.json";
import type { Fiche, Question, ThemeId } from "./types";

export const QUESTIONS = questionsJson as unknown as Question[];
export const FICHES = fichesJson as unknown as Fiche[];

export const QUESTION_BY_ID: Record<string, Question> = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

export function questionsOfTheme(theme: ThemeId) {
  return QUESTIONS.filter((q) => q.theme === theme);
}

/** Supprime accents et casse pour la recherche. */
export function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
