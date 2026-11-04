export type ThemeId = "principes" | "institutions" | "droits" | "histoire" | "societe";
export type QType = "connaissance" | "situation";
export type Origin = "officielle" | "complement";

export interface Question {
  id: string;
  theme: ThemeId;
  subtheme: string;
  /** notion officielle de l'arrêté (questions de connaissance), voir NOTIONS dans exam-config */
  notion?: string;
  type: QType;
  origin: Origin;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  source?: string;
}

export interface FicheSection {
  title: string;
  points: string[];
}

export interface Fiche {
  theme: ThemeId;
  title: string;
  intro?: string;
  sections: FicheSection[];
}
