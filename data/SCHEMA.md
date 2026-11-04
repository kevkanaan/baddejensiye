# Format des données

## Questions — `data/questions/*.json`

Chaque fichier est un **tableau JSON** de questions :

```jsonc
{
  "id": "pri-c-001",            // unique dans TOUT le dossier ; préfixe = fichier (voir ci-dessous)
  "theme": "principes",         // principes | institutions | droits | histoire | societe
  "subtheme": "Symboles",       // sous-thème libre, court (ex. "Laïcité", "Union européenne")
  "type": "connaissance",       // connaissance | situation (mise en situation)
  "origin": "officielle",       // officielle = intitulé présent dans la liste officielle du 12/12/2025
                                // complement = question ajoutée grâce à la recherche
  "question": "Que porte Marianne sur la tête ?",
  "choices": ["Un bonnet phrygien", "Une couronne", "Un casque", "Une tiare"],  // EXACTEMENT 4, distincts
  "answer": 0,                  // index (0-3) de la bonne réponse dans "choices"
  "explanation": "Le bonnet phrygien, porté par les esclaves affranchis dans l'Antiquité, symbolise la liberté.",
  "source": "https://www.elysee.fr/..."   // optionnel : URL d'une source fiable
}
```

Règles :
- Français correct, accents compris. Une seule bonne réponse, sans ambiguïté.
- Les distracteurs doivent être plausibles mais clairement faux.
- L'ordre des choix est mélangé par l'application : ne pas écrire « toutes les réponses ci-dessus ».
- `explanation` : 1 à 3 phrases, donne la raison + si possible un moyen mnémotechnique.
- Une question officielle peut avoir plusieurs **variantes** (mêmes intitulé, autres choix) :
  ids distincts, même `question`.

Champ optionnel `notion` (questions de **connaissance** uniquement) : notion officielle de l'arrêté du 10/10/2025,
utilisée pour tirer les examens blancs avec la bonne répartition. Valeurs autorisées par thème :
- `principes` : `symboles` (devise, symboles, valeurs, langue, fraternité/solidarité), `laicite`
- `institutions` : `democratie` (démocratie, vote, élections, mandats), `organisation` (institutions, collectivités, justice, Constitution), `europe`
- `droits` : `droits-fondamentaux`, `obligations` (devoirs, impôts, infractions, juré, respect de la loi)
- `histoire` : `histoire`, `geographie`, `patrimoine` (monuments, arts, lettres, gastronomie, culture)
- `societe` : `installation` (démarches, logement, état civil, impôts), `soins`, `travail`, `famille-ecole`

Préfixes d'id par fichier : `pri` (principes), `ins` (institutions), `dro` (droits),
`his` (histoire), `geo` (géographie/culture, thème `histoire`), `soc` (société), `gap` (compléments critiques).
Puis `-c-` (connaissance) ou `-s-` (situation) ou `-x-` (complément connaissance), puis un numéro.

## Fiches de révision — `data/fiches/<theme>.json`

```jsonc
{
  "theme": "principes",
  "title": "Principes et valeurs de la République",
  "intro": "Ce qu'il faut absolument retenir…",
  "sections": [
    { "title": "Les symboles", "points": ["**Devise** : Liberté, Égalité, Fraternité", "…"] }
  ]
}
```
`points` accepte `**gras**` uniquement (pas d'autre markdown).

## Validation

```bash
node scripts/validate-data.mjs
```
