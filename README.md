# Examen civique — préparation naturalisation

Application Next.js pour réviser l'**examen civique, mention naturalisation** (obligatoire depuis le 1er janvier 2026) :
40 QCM en 45 minutes, 32 bonnes réponses requises (80 %).

## Fonctionnalités

- **Tableau de bord** : compte à rebours jusqu'à l'examen, plan du jour, maîtrise par thème.
- **Entraînement** par thème / type (connaissance, mises en situation) / liste officielle, en mode QCM ou cartes mémoire,
  avec correction immédiate et explication sourcée.
- **Répétition espacée** (boîtes de Leitner) : les questions ratées reviennent en priorité en mode « Intelligent ».
- **Examen blanc** fidèle à l'arrêté du 10 octobre 2025 : 40 questions tirées selon la répartition officielle
  (11 / 6 / 11 / 8 / 4, dont 12 mises en situation, et par notion), chronomètre de 45 min, questions marquées, correction détaillée.
- **Fiches de révision** par thème, **banque de questions** consultable (recherche, réponses masquables).
- **Page « Jour J »** : règles, pièces à apporter, stratégie.
- **Progression** : activité, points faibles, historique des examens blancs, **synchronisation ordinateur ↔ téléphone**
  par code à copier-coller.
- Fonctionne **hors ligne** et s'installe sur le téléphone (« Ajouter à l'écran d'accueil »).

La progression est stockée dans le navigateur (localStorage) : aucun compte, aucun serveur, aucune donnée envoyée.

## Données

- `research/` : notes de recherche sourcées (format de l'examen, sources officielles, sites existants, mises en situation,
  faits à jour au 4 novembre 2026) et texte de la liste officielle des questions de connaissance (12/12/2025).
- `data/questions/*.json` : banque de questions (format décrit dans `data/SCHEMA.md`).
- `data/fiches/*.json` : fiches de révision.
- `npm run validate` vérifie les données ; elles sont fusionnées dans `generated/` avant `dev` et `build`.

## Lancer en local

Prérequis : **Node.js 20.9 ou plus récent** (Node 24 LTS conseillé : https://nodejs.org).

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000. Pour tester sur le téléphone, ouvrir l'adresse « Network » affichée par `npm run dev`
(même réseau Wi-Fi).

## Déployer gratuitement sur Vercel

**Option A — via GitHub (recommandé, redéploiement automatique à chaque push)**

1. Créer un dépôt GitHub (privé si vous le souhaitez) et y pousser ce dossier.
2. Sur https://vercel.com/new, importer le dépôt. Vercel détecte Next.js : laisser les réglages par défaut
   (la commande `npm run build` lance automatiquement la validation et la fusion des données).
3. Cliquer sur **Deploy**. L'URL `https://<nom>.vercel.app` est prête en une à deux minutes.

**Option B — en ligne de commande**

```bash
npx vercel
```

puis `npx vercel --prod` pour la mise en production.

Sur le téléphone : ouvrir l'URL, puis « Ajouter à l'écran d'accueil » (Safari : bouton Partager ; Chrome : menu ⋮).
Pour reprendre sa progression d'un appareil à l'autre : **Progrès → Synchroniser → Copier mon code**, puis coller le code
sur l'autre appareil.

## Avertissement

Les réponses ont été rédigées à partir des sources officielles (Légifrance, service-public.gouv.fr, ministère de
l'Intérieur…) et vérifiées, mais seule la documentation officielle fait foi. Les faits susceptibles d'évoluer
(Premier ministre, SMIC…) sont datés au 4 novembre 2026 : revérifiez-les la veille de l'examen.
