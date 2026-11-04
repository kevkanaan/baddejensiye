// Vérifie que chaque intitulé de la liste officielle (naturalisation, 12/12/2025) a au moins une question.
// Usage : node scripts/check-coverage.mjs
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// 15 intitulés insérés comme images dans le PDF officiel (absents du texte extrait) — cf. research/sites-existants.md §1
const IMAGES = [
  "Que signifie le mot « fraternité » dans la devise française ?",
  "Selon la Constitution, la France est une République…",
  "Selon le principe de laïcité, que signifie la neutralité de l'État ?",
  "Quel est le dernier État à avoir intégré l'Union européenne en 2013 ?",
  "Les citoyens de l'UE peuvent-ils voter aux élections locales dans un autre État de l'Union ?",
  "Quelle est la devise de l'Union européenne ?",
  "Qui peut être appelé à faire partie d'un jury d'assises en France ?",
  "Quel est l'objectif des lois scolaires de la IIIe République ?",
  "Pourquoi l'année 1958 est importante pour la France ?",
  "Simone Veil est une figure importante de l'histoire française. Elle a notamment :",
  "Qui a rendu l'école gratuite, laïque et obligatoire ?",
  "Quelle œuvre a été écrite par Victor Hugo ?",
  "Quelle mer se situe entre la France et l'Angleterre ?",
  "Quelle chaîne de montagnes est située entre la France et l'Espagne ?",
  "Qu'est-ce que le principe de confidentialité dans le domaine de la santé ?",
];

const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, " ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const words = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 2));
const sim = (a, b) => {
  const A = words(a),
    B = words(b);
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / Math.max(1, Math.min(A.size, B.size));
};

// Intitulés du fichier texte, une ligne par question, sauf trois intitulés coupés sur deux lignes dans le PDF
const WRAPPED = new Set([56, 110, 146]);
const raw = readFileSync(join(root, "research", "liste-officielle-connaissance-2025-12-12.txt"), "utf8").split(/\r?\n/);
const titles = [];
for (let i = 0; i < raw.length; i++) {
  const l = raw[i].trim();
  if (!l || l.startsWith("===") || l === "Intitulé de la question" || l === "?") continue;
  if (/^(Principes et valeurs|Système institutionnel|Droits et devoirs|Histoire, géographie|Vivre dans la société)/.test(l) && !l.includes("?")) continue;
  if (WRAPPED.has(i + 1)) {
    titles.push({ line: i + 1, text: l + " " + raw[i + 1].trim() });
    i++;
    continue;
  }
  titles.push({ line: i + 1, text: l });
}
for (const t of IMAGES) titles.push({ line: "image", text: t });

const qs = readdirSync(join(root, "data", "questions"))
  .filter((f) => f.endsWith(".json"))
  .flatMap((f) => JSON.parse(readFileSync(join(root, "data", "questions", f), "utf8")).map((q) => ({ ...q, file: f })));
const official = qs.filter((q) => q.origin === "officielle");

let missing = 0;
for (const t of titles) {
  const nt = norm(t.text);
  const exact = official.filter((q) => norm(q.question) === nt);
  const close = exact.length ? exact : official.filter((q) => sim(q.question, t.text) >= 0.85);
  if (!close.length) {
    missing++;
    console.log(`✗ l.${t.line} ${t.text}`);
  }
}
console.log(`\n${titles.length} intitulés officiels, ${titles.length - missing} couverts, ${missing} manquant(s).`);
console.log(`${official.length} questions « officielle » au total (variantes comprises).`);
process.exit(missing ? 1 : 0);
