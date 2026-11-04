import type { ThemeId } from "./types";

/**
 * Format de l'examen civique — mention naturalisation.
 * Source : arrêté du 10 octobre 2025, art. 2 à 4 (JORFTEXT000052381620) ; service-public.gouv.fr F39426.
 * 40 questions (28 connaissance + 12 mises en situation), 45 min, 4 choix, 80 % = 32/40.
 */
export const EXAM = {
  total: 40,
  durationMin: 45,
  passMark: 32,
  /** objectif conseillé à l'entraînement pour garder une marge */
  target: 36,
  distribution: [
    { theme: "principes", connaissance: 5, situation: 6 },
    { theme: "institutions", connaissance: 6, situation: 0 },
    { theme: "droits", connaissance: 5, situation: 6 },
    { theme: "histoire", connaissance: 8, situation: 0 },
    { theme: "societe", connaissance: 4, situation: 0 },
  ] as { theme: ThemeId; connaissance: number; situation: number }[],
};

/**
 * Répartition des questions de connaissance par « notion » (arrêté du 10/10/2025, art. 3) :
 * « chaque candidat devra répondre à un nombre équivalent de questions par thématique et notion ».
 */
export const NOTIONS: Record<ThemeId, { id: string; label: string; count: number }[]> = {
  principes: [
    { id: "symboles", label: "Devise et symboles de la République", count: 3 },
    { id: "laicite", label: "Laïcité", count: 2 },
  ],
  institutions: [
    { id: "democratie", label: "Démocratie et droit de vote", count: 3 },
    { id: "organisation", label: "Organisation de la République", count: 2 },
    { id: "europe", label: "Institutions européennes", count: 1 },
  ],
  droits: [
    { id: "droits-fondamentaux", label: "Droits fondamentaux", count: 2 },
    { id: "obligations", label: "Obligations et devoirs", count: 3 },
  ],
  histoire: [
    { id: "histoire", label: "Périodes et personnages historiques", count: 3 },
    { id: "geographie", label: "Territoires et géographie", count: 3 },
    { id: "patrimoine", label: "Patrimoine français", count: 2 },
  ],
  societe: [
    { id: "installation", label: "S'installer et résider en France", count: 1 },
    { id: "soins", label: "Accès aux soins", count: 1 },
    { id: "travail", label: "Travailler en France", count: 1 },
    { id: "famille-ecole", label: "Autorité parentale et système éducatif", count: 1 },
  ],
};

/** Date de l'examen par défaut (modifiable dans « Progression »). */
export const DEFAULT_EXAM_DATE = "2026-11-16";
