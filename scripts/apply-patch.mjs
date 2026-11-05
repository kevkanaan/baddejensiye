// Applique un correctif JSON à un fichier de questions.
// Usage : node scripts/apply-patch.mjs data/questions/<fichier>.json <correctif>.json
// Le correctif est un tableau d'opérations :
//   { "id": "pri-c-004", "set": { "answer": 2, "explanation": "…" } }   modifie des champs
//   { "id": "pri-c-004", "delete": true }                              supprime la question
//   { "add": { …question complète… } }                                 ajoute une question
import { readFileSync, writeFileSync } from "node:fs";

const [file, patchFile] = process.argv.slice(2);
if (!file || !patchFile) {
  console.error("Usage : node scripts/apply-patch.mjs <fichier-données> <correctif>");
  process.exit(1);
}
const data = JSON.parse(readFileSync(file, "utf8"));
const patch = JSON.parse(readFileSync(patchFile, "utf8"));
let n = 0;
for (const op of patch) {
  if (op.add) {
    if (data.some((q) => q.id === op.add.id)) throw new Error(`id déjà présent : ${op.add.id}`);
    data.push(op.add);
    n++;
    continue;
  }
  const i = data.findIndex((q) => q.id === op.id);
  if (i < 0) throw new Error(`id introuvable : ${op.id}`);
  if (op.delete) data.splice(i, 1);
  else Object.assign(data[i], op.set);
  n++;
}
writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
console.log(`${n} opération(s) appliquée(s) à ${file}`);
