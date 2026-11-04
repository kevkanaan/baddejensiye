// Valide puis fusionne data/questions/*.json et data/fiches/*.json dans generated/
// Lancé automatiquement avant `npm run dev` et `npm run build`.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const check = spawnSync(process.execPath, [join(root, "scripts", "validate-data.mjs")], { stdio: "inherit" });
if (check.status !== 0) {
  console.error("\nLes données sont invalides : corrigez-les avant de lancer l'application.");
  process.exit(1);
}

const readDir = (dir) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.endsWith(".json"))
        .sort()
        .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")))
    : [];

const questions = readDir(join(root, "data", "questions")).flat();
const order = ["principes", "institutions", "droits", "histoire", "societe"];
const fiches = readDir(join(root, "data", "fiches")).sort((a, b) => order.indexOf(a.theme) - order.indexOf(b.theme));

mkdirSync(join(root, "generated"), { recursive: true });
writeFileSync(join(root, "generated", "questions.json"), JSON.stringify(questions));
writeFileSync(join(root, "generated", "fiches.json"), JSON.stringify(fiches));
console.log(`→ generated/questions.json (${questions.length} questions), generated/fiches.json (${fiches.length} fiches)`);
