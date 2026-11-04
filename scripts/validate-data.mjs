// Valide data/questions/*.json et data/fiches/*.json
// Usage : node scripts/validate-data.mjs
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const qDir = join(root, "data", "questions");
const fDir = join(root, "data", "fiches");

const THEMES = ["principes", "institutions", "droits", "histoire", "societe"];
const TYPES = ["connaissance", "situation"];
const ORIGINS = ["officielle", "complement"];
// notions de l'arrêté du 10/10/2025 (doit rester synchronisé avec lib/exam-config.ts)
const NOTIONS = {
  principes: ["symboles", "laicite"],
  institutions: ["democratie", "organisation", "europe"],
  droits: ["droits-fondamentaux", "obligations"],
  histoire: ["histoire", "geographie", "patrimoine"],
  societe: ["installation", "soins", "travail", "famille-ecole"],
};
let missingNotion = 0;

const errors = [];
const warnings = [];
const ids = new Map();
const stats = {};
let total = 0;

const err = (f, id, m) => errors.push(`${f} [${id ?? "?"}] ${m}`);

for (const file of existsSync(qDir) ? readdirSync(qDir).filter((f) => f.endsWith(".json")) : []) {
  let data;
  try {
    data = JSON.parse(readFileSync(join(qDir, file), "utf8"));
  } catch (e) {
    err(file, null, `JSON invalide : ${e.message}`);
    continue;
  }
  if (!Array.isArray(data)) {
    err(file, null, "le fichier doit contenir un tableau");
    continue;
  }
  for (const q of data) {
    total++;
    const id = q?.id;
    if (typeof id !== "string" || !id) err(file, id, "id manquant");
    else if (ids.has(id)) err(file, id, `id dupliqué (déjà dans ${ids.get(id)})`);
    else ids.set(id, file);
    if (!THEMES.includes(q.theme)) err(file, id, `theme invalide : ${q.theme}`);
    if (!TYPES.includes(q.type)) err(file, id, `type invalide : ${q.type}`);
    if (!ORIGINS.includes(q.origin)) err(file, id, `origin invalide : ${q.origin}`);
    if (typeof q.subtheme !== "string" || !q.subtheme.trim()) err(file, id, "subtheme manquant");
    if (typeof q.question !== "string" || q.question.trim().length < 5) err(file, id, "question manquante");
    if (!Array.isArray(q.choices) || q.choices.length !== 4) err(file, id, "il faut exactement 4 choix");
    else {
      if (q.choices.some((c) => typeof c !== "string" || !c.trim())) err(file, id, "choix vide");
      const norm = q.choices.map((c) => String(c).trim().toLowerCase());
      if (new Set(norm).size !== 4) err(file, id, "choix en double");
      if (norm.some((c) => /toutes les réponses|aucune des réponses|réponses ci-dessus/.test(c)))
        warnings.push(`${file} [${id}] choix méta (« toutes les réponses… ») — à éviter car l'ordre est mélangé`);
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) err(file, id, `answer invalide : ${q.answer}`);
    if (typeof q.explanation !== "string" || q.explanation.trim().length < 10) err(file, id, "explication manquante");
    if (q.source !== undefined && (typeof q.source !== "string" || !/^https?:\/\//.test(q.source)))
      err(file, id, `source invalide : ${q.source}`);
    if (q.notion !== undefined && !(NOTIONS[q.theme] ?? []).includes(q.notion))
      err(file, id, `notion invalide pour ${q.theme} : ${q.notion}`);
    if (q.type === "connaissance" && q.notion === undefined) missingNotion++;
    const key = `${q.theme}/${q.type}`;
    stats[key] = (stats[key] ?? 0) + 1;
  }
}

for (const file of existsSync(fDir) ? readdirSync(fDir).filter((f) => f.endsWith(".json")) : []) {
  try {
    const f = JSON.parse(readFileSync(join(fDir, file), "utf8"));
    if (!THEMES.includes(f.theme)) err(`fiches/${file}`, null, `theme invalide : ${f.theme}`);
    if (!Array.isArray(f.sections) || !f.sections.length) err(`fiches/${file}`, null, "sections manquantes");
    for (const s of f.sections ?? []) {
      if (!s.title || !Array.isArray(s.points) || !s.points.length)
        err(`fiches/${file}`, null, `section invalide : ${s.title}`);
    }
  } catch (e) {
    err(`fiches/${file}`, null, `JSON invalide : ${e.message}`);
  }
}

console.log(`Questions : ${total}`);
for (const [k, v] of Object.entries(stats).sort()) console.log(`  ${k.padEnd(28)} ${v}`);
for (const w of warnings) console.log(`AVERTISSEMENT ${w}`);
if (missingNotion) console.log(`(info) ${missingNotion} question(s) de connaissance sans "notion" : tirées sans contrainte de notion à l'examen blanc`);
if (errors.length) {
  console.log(`\n${errors.length} erreur(s) :`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\n✓ Données valides");
