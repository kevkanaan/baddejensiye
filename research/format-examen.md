# Format de l'examen civique, mention « naturalisation »

Recherche du 4 novembre 2026. Examen du candidat prévu vers le 16 novembre 2026.
Chaque affirmation est suivie de sa source (URL). Les sources officielles (Légifrance, service-public.gouv.fr, ministère de l'Intérieur, Assemblée nationale) priment. Les deux organismes agréés (CCI Paris Île-de-France et France Éducation International) viennent ensuite. Les sites privés ne servent qu'à signaler des divergences.

---

## RÉSUMÉ POUR L'APPLICATION

| Paramètre | Valeur | Source |
|---|---|---|
| Nombre de questions | **40** (28 de connaissance + 12 mises en situation) | Arrêté du 10/10/2025, art. 3 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620 ; https://www.service-public.gouv.fr/particuliers/actualites/A18713 |
| Durée | **45 minutes** au maximum (sauf aménagement médical) | Arrêté du 10/10/2025, art. 4 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39426 |
| Seuil de réussite | **32 bonnes réponses sur 40**, soit 80 % | Arrêté du 10/10/2025, art. 2 (80 %) ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39426 (32 bonnes réponses) |
| Format | QCM en français, **4 propositions, une seule bonne réponse** | Arrêté, art. 3 ; https://www.service-public.gouv.fr/particuliers/actualites/A18713 |
| Barème | Bonne réponse = 1 point ; mauvaise réponse ou absence de réponse = 0 (**aucun point négatif**) | Arrêté, art. 3 et annexe III |
| Navigation | On peut revenir sur les questions non traitées. Avant la validation finale, une fenêtre récapitulative liste les questions sans réponse. | Mémo surveillant CCI : https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-memo-surveillant-examen-civique.pdf |

### Tableau thème × type (identique pour toutes les mentions, donc aussi pour la naturalisation)

| Thème (slug `data/SCHEMA.md`) | Connaissance | Mise en situation | Total |
|---|---:|---:|---:|
| Principes et valeurs de la République (`principes`) | 5 | 6 | **11** |
| Système institutionnel et politique (`institutions`) | 6 | 0 | **6** |
| Droits et devoirs (`droits`) | 5 | 6 | **11** |
| Histoire, géographie et culture (`histoire`) | 8 | 0 | **8** |
| Vivre dans la société française (`societe`) | 4 | 0 | **4** |
| **Total** | **28** | **12** | **40** |

Source : arrêté du 10 octobre 2025, art. 3. Le texte précise que « Chaque candidat devra répondre à un nombre équivalent de questions par thématique et notion » : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620. La même grille figure chez la CCI : https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/presentation/

### Détail par notion, utile pour tirer les questions d'un examen blanc

| Thème | Notion (arrêté) | Nb |
|---|---|---:|
| principes | Devise et symboles de la République | 3 |
| principes | Laïcité | 2 |
| principes | Mises en situation | 6 |
| institutions | Démocratie et droit de vote | 3 |
| institutions | Organisation de la République | 2 |
| institutions | Institutions européennes (Union européenne) | 1 |
| droits | Droits fondamentaux | 2 |
| droits | Obligations et devoirs des personnes résidant en France | 3 |
| droits | Mises en situation | 6 |
| histoire | Principales périodes et personnages historiques | 3 |
| histoire | Territoires et géographie | 3 |
| histoire | Patrimoine français | 2 |
| societe | S'installer et résider en France | 1 |
| societe | Accès aux soins | 1 |
| societe | Travailler en France | 1 |
| societe | Autorité parentale et système éducatif | 1 |

Source : arrêté du 10/10/2025, art. 3 : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052381620

```jsonc
// Configuration proposée pour le générateur d'examens blancs
{
  "totalQuestions": 40,
  "durationMinutes": 45,
  "passMark": 32,           // 80 %
  "choicesPerQuestion": 4,
  "negativeMarking": false,
  "allowReview": true,      // retour sur les questions non traitées + récapitulatif avant validation
  "blueprint": {
    "principes":    { "connaissance": 5, "situation": 6 },
    "institutions": { "connaissance": 6, "situation": 0 },
    "droits":       { "connaissance": 5, "situation": 6 },
    "histoire":     { "connaissance": 8, "situation": 0 },
    "societe":      { "connaissance": 4, "situation": 0 }
  }
}
```

**Points à retenir pour l'application :**
- Les **mises en situation** ne portent que sur les thèmes **principes** (6) et **droits** (6). Le référentiel ne prévoit aucune mise en situation pour les thèmes 2, 4 et 5 (https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052381620). Certains sites privés présentent une autre répartition, mais elle ne figure pas dans l'arrêté.
- Les mises en situation ne sont **pas publiées**. Seuls les intitulés des questions de connaissance le sont, sans les propositions de réponse (https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/ ; arrêté, art. 3 : « Les questions de connaissances sont rendues publiques sur le site internet du ministère chargé des naturalisations »).
- Rythme moyen : 45 min ÷ 40 = **environ 67 secondes par question**.
- Il n'y a aucune pénalité, donc l'application doit apprendre au candidat à **ne jamais laisser de case vide**.
- Liste officielle naturalisation (fichier `research/liste-officielle-connaissance-2025-12-12.txt`) : environ 244 à 247 intitulés. Le décompte par ligne donne : principes 35, institutions 55, droits 38, histoire 76, société 43. Le jeu de données data.gouv tiré de cette liste compte 244 questions, dont une en double (https://www.data.gouv.fr/datasets/questions-de-connaissance-de-lexamen-civique-mention-naturalisation, jeu de données publié par un tiers).

---

## 1. Textes de référence

| Texte | Objet | Source |
|---|---|---|
| Loi n° 2024-42 du 26 janvier 2024 « pour contrôler l'immigration, améliorer l'intégration » | Crée l'examen civique, exigé au plus tard au 1er janvier 2026 | https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488 ; https://www.service-public.gouv.fr/particuliers/actualites/A18713 |
| Décret n° 2025-648 du 15 juillet 2025 (modifie le décret n° 93-1362 du 30/12/1993) | Naturalisation : niveau de français **B2**, examen civique (art. 37), attestation de réussite à joindre au dossier (art. 37-1, 10°). S'applique aux demandes **déposées à compter du 1er janvier 2026**. | Art. 37 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906771 ; art. 37-1 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906775 |
| Décret n° 2025-647 du 15 juillet 2025 (CESEDA) | Examen civique pour la carte de séjour pluriannuelle (CSP) et la carte de résident (CR) : art. R413-12-1, D413-12-2, R413-15, R433-5 | https://www.centre-inffo.fr/?p=498281 |
| Arrêté du 20 août 2025 (JORF n° 0195 du 23/08/2025) | Procédure d'agrément des organismes (agrément de 3 ans) | https://www.centre-inffo.fr/?p=498971 |
| **Arrêté du 10 octobre 2025** relatif au programme, aux épreuves et aux modalités d'organisation de l'examen civique (NOR INTV2527907A, JORF n° 0240 du 12/10/2025) | **Texte central** : 3 mentions, 40 questions, répartition, seuil de 80 % (naturalisation), 45 min, support numérique, règlement. Sur Légifrance, la version en vigueur au 04/11/2026 est **inchangée depuis le 13/10/2025**. | https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620 ; règlement (annexe III) : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000052382298 |
| Arrêté du 30 décembre 2025 (NOR INTV2536199A, JO n° 306 du 31/12/2025, texte 15) | Dispense ou aménagement pour handicap ou état de santé (naturalisation), avec un modèle de certificat médical | Copie du JO : https://www.lemediasocial.fr/hulkStatic/EL/ELI/2026/01/fcc296be7-5e3f-44cd-ba41-5c771e670fba/sharp_/ANX/editdoc-8.pdf |
| Arrêté du 3 juillet 2026 (NOR INTV2612527A, JO du 16/07/2026) | Nouveau **livret du citoyen** (remplace la version de 2022) | https://blog.landot-avocats.net/2026/07/16/diffusion-de-la-version-2026-du-livret-du-citoyen/ ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39426 |

Le décret de 1993 (art. 37) définit 4 domaines de connaissances : histoire de France ; principes, symboles et institutions de la République ; exercice de la citoyenneté ; place de la France en Europe et dans le monde (https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906771 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39426). L'arrêté les organise en **5 thèmes**. Les deux textes ne se contredisent pas : l'un fixe le cadre, l'autre la structure de l'épreuve.

## 2. Format de l'épreuve

- L'examen comporte trois « mentions » : carte de séjour pluriannuelle, carte de résident et naturalisation. L'examen mentionné à l'art. 37 du décret de 1993 « porte la mention "naturalisation" et prend la forme d'un questionnaire à choix multiples » (arrêté, art. 1 et 2 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620).
- « Pour toutes les mentions », l'épreuve est un QCM « rédigé en langue française et comprenant quarante questions », qui mélange questions de connaissances et mises en situation (arrêté, art. 3 ; livret CCI : https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-responsable-examen-civique.pdf).
- Il y a 28 questions de connaissance et 12 mises en situation, avec **1 bonne réponse sur 4 propositions** (https://www.service-public.gouv.fr/particuliers/actualites/A18713 ; https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/).
- L'épreuve se passe sur support numérique, en 45 minutes au plus. Seul un aménagement médical permet de dépasser cette durée (arrêté, art. 4 ; annexe III : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000052382298).
- Le **niveau de difficulté varie selon la mention** : « la difficulté de l'examen est adaptée à chacun des titres concernés » (réponse ministérielle du 11/08/2026 : https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488 ; flyer DGEF : https://www.immigration.interieur.gouv.fr/sites/dgef/files/medias/documents/2026-06/Flyer_A5_Examen_civique_Sejour_nov2025_Accessible.pdf). Le **référentiel (annexe I) est pourtant unique** pour les trois mentions (arrêté). En pratique, ce sont les listes de questions qui diffèrent : CSP, CR et naturalisation ont chacune leur liste.

## 3. Ce que couvre le référentiel (annexe I de l'arrêté)

Source de toute la section : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052381620

- **Thème 1, Principes et valeurs** : République une et indivisible, souveraineté nationale ; Liberté (libertés individuelles et collectives, interdiction de la polygamie) ; Égalité (dont l'égalité femmes-hommes, la lutte contre les discriminations et le racisme) ; Fraternité et solidarité (impôts, défense, retraites) ; symboles (drapeau, hymne, devise, Marianne, 14 juillet, coq, français langue de la République) ; laïcité (loi de 1905, liberté de conscience, neutralité de l'État et des agents publics, règles à l'école).
- **Thème 2, Système institutionnel et politique** : État de droit, séparation des pouvoirs, conditions pour voter, pluralisme ; commune, département, région ; institutions de la Ve République, Conseil constitutionnel, Défenseur des droits ; types d'élections et durée des mandats ; UE (étapes, nombre d'États membres, symboles, institutions, droit de vote des citoyens européens).
- **Thème 3, Droits et devoirs** : droits fondamentaux (dignité, intégrité, Constitution de 1958, Déclaration de 1789, Charte de l'environnement de 2004) ; libertés limitées par la loi et l'ordre public ; obligations fiscales et sociales ; police et gendarmerie ; types d'infractions ; voter, être juré d'assises.
- **Thème 4, Histoire, géographie et culture** : de la monarchie à la Révolution, Empire et Code civil, colonisation et abolition de l'esclavage, école républicaine (1880), guerres mondiales, Shoah, Résistance, appel du 18 juin, vote des femmes (1944), ONU, CEE, Constitution de 1958, élection du président au suffrage universel direct, abolition de la peine de mort (1981), UE et euro ; fleuves, massifs, métropoles, outre-mer, pays frontaliers, mers ; **environ 68 millions d'habitants en 2025** ; monuments, artistes, gastronomie ; **environ 321 millions de francophones, 5e langue mondiale**.
- **Thème 5, Vivre dans la société française** : démarches courantes (assurance, permis, impôts, changement d'adresse, état civil, logement) ; soins (Assurance maladie, mutuelle, vaccins obligatoires, **numéros d'urgence**, droits du patient) ; droit du travail (durée légale, congés, contrat, syndicats), recherche d'emploi, création d'entreprise ; autorité parentale, protection de l'enfance, obligation scolaire, organisation de l'école.

## 4. Seuil et notation

- Pour la mention naturalisation, le seuil est fixé à **80 % de bonnes réponses** (arrêté, art. 2). Le décret de 1993 renvoie ce point à un arrêté (art. 37 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906771).
- En nombre, cela fait **32/40** (https://www.service-public.gouv.fr/particuliers/vosdroits/F39426). Le modèle d'attestation de la CCI indique aussi « Le seuil de réussite [...] est de 32 réponses correctes sur 40 » (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/attestation-examen-civique.pdf).
- La correction est automatique et **on ne peut pas demander une nouvelle correction** (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/results/).

## 5. Support et interface

- L'examen se passe sur ordinateur ou tablette (https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/). Les centres CCI utilisent des PC ou des Mac reliés à Internet, avec une souris, et la tablette sert seulement à la photo et à la signature (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-responsable-examen-civique.pdf). Plusieurs centres FEI annoncent l'examen « sur ordinateur » (Bordeaux Montaigne : https://formations.u-bordeaux-montaigne.fr/plugins/odf-web/odf/_content/program-examen-civique/EXAMEN%20CIVIQUE.pdf ; CAVILAM Vichy : https://www.cavilam.com/en/examen-civique/). **Il n'y a jamais de papier.**
- Dans les centres CCI, le candidat se connecte avec un **code d'accès personnel (3 séries de 3 caractères)**. Ses nom et prénom restent affichés à l'écran. Une page de **consignes générales** présente l'interface, puis le candidat clique sur « Continuer » (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-surveilllant-examen-civique.pdf).
- « Le candidat gère son temps et peut revenir sur les questions non traitées ». Une « fenêtre récapitulative » indique les questions sans réponse avant la validation finale (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-memo-surveillant-examen-civique.pdf).
- En cas de panne, le candidat se reconnecte avec son code et **reprend là où il s'était arrêté** (livret du surveillant CCI, même URL).
- Les documents CCI consultés ne disent pas si l'ordre des questions est aléatoire, si un chronomètre est affiché, ni si le score apparaît à l'écran à la fin. Ces points restent **non vérifiés**. L'interface de FEI n'a pas pu être consultée, car son site bloque les robots.

## 6. Organismes habilités, centres et inscription

- **Deux organismes sont agréés** par le ministère de l'Intérieur depuis novembre 2025 : la **CCI Paris Île-de-France (CCIP, « Le français des affaires »)** et **France Éducation International (FEI)** (https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488 ; https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/).
- Au 26 mai 2026, **444 centres** couvraient tous les départements (https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488).
- **Inscription CCIP** : recherche de centres et de sessions sur https://francais.cci-paris-idf.fr/candidat?produit=21 (choisir l'option « Naturalisation »), puis inscription auprès du centre. Le centre envoie ensuite un e-mail de confirmation et la convocation, qu'il faut aussi chercher dans les spams. Le **numéro AGDREF** (numéro étranger) est demandé (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/registration/).
- **Inscription FEI** : pré-inscription en ligne sur https://test-civique.fr/inscription, puis prise de contact avec le centre choisi, paiement et réception d'une convocation nominative par e-mail. Exemple de l'Université Bordeaux Montaigne : https://formations.u-bordeaux-montaigne.fr/plugins/odf-web/odf/_content/program-examen-civique/EXAMEN%20CIVIQUE.pdf. Carte des centres FEI : https://www.france-education-international.fr/centres-d-examen/carte?type-centre=examen_civique
- Service-public renvoie aussi vers ces cartes (CCIP : https://www.service-public.gouv.fr/particuliers/vosdroits/R74875 ; FEI : https://www.service-public.gouv.fr/particuliers/vosdroits/R75684 et https://www.service-public.gouv.fr/particuliers/vosdroits/R75549). Depuis l'étranger, il faut s'adresser à un Institut français, à une Alliance française ou au consulat (https://www.service-public.gouv.fr/particuliers/vosdroits/F39426).
- L'inscription est **ferme et non remboursable**. En cas d'absence justifiée (maladie, etc.), justificatif à l'appui, la CCI peut proposer une nouvelle date (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/registration/ ; https://www.lefrancaisdesaffaires.fr/candidat/conditions-dinscription-et-de-passation/).

## 7. Coût

- Le prix est **librement fixé par chaque centre, entre 60 € et 80 €** selon la réponse ministérielle publiée au JO le 11/08/2026 (https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488).
- Exemples : 70 € à l'Université Bordeaux Montaigne, centre FEI (https://formations.u-bordeaux-montaigne.fr/plugins/odf-web/odf/_content/program-examen-civique/EXAMEN%20CIVIQUE.pdf) ; 70 € au CAVILAM de Vichy (https://www.cavilam.com/en/examen-civique/).
- La **préparation officielle est gratuite** (https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/). Le ministère met en garde contre les sites payants, qui présentent des « risques de fraude ou de fausses informations » (même page).

## 8. Résultats, attestation et validité

- **Délai** :
  - CCI : résultats envoyés « within 24 to 48 business hours », soit sous 24 à 48 heures ouvrées, par un e-mail contenant un lien vers un coffre-fort numérique. Il n'y a **pas d'attestation papier** (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/certificate/).
  - Côté centre CCI, les résultats arrivent 12 à 48 h après la mise en correction, hors week-end (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-responsable-examen-civique.pdf).
  - FEI : résultats sous 12 à 48 h sur le compte créé lors de la pré-inscription (https://formations.u-bordeaux-montaigne.fr/plugins/odf-web/odf/_content/program-examen-civique/EXAMEN%20CIVIQUE.pdf).
- **Contenu de l'attestation (modèle CCI)** : mention, n° AGDREF, nom, prénom, date et lieu de naissance, n° d'inscription, date de session, centre, score sur 40, résultat (Réussite ou non). La **photo prise le jour J** figure aussi sur l'attestation (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/attestation-examen-civique.pdf ; arrêté, annexe II).
- **Validité : illimitée.** « L'attestation de réussite n'a pas de durée de validité » (https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/ ; https://www.service-public.gouv.fr/particuliers/actualites/A18713). L'attestation de français, elle, doit dater de **moins de 2 ans** (art. 37-1, 9° : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906775).
- **Conservation** : sauvegardez l'attestation vous-même. La CCI annonce une conservation de 10 ans sur sa page « certificate », mais son livret du responsable (novembre 2025) parle d'une « capacité d'archivage de 2 ans », après quoi il faudrait repasser l'examen (sources ci-dessus).
- L'attestation doit être **jointe au dossier de naturalisation au moment du dépôt**. L'examen se passe donc **avant** la demande (art. 37-1, 10° ; https://www.service-public.gouv.fr/particuliers/actualites/A18713).

## 9. Tentatives, échec et fraude

- On peut passer l'examen « à tout moment et autant de fois que nécessaire » (https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/ ; réponse ministérielle : https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488). Chaque passage se paie.
- Aucun délai minimal entre deux passages n'est fixé par un texte officiel. Un centre FEI (CFPPA d'Auterive) annonce « un délai minimal d'un jour » (https://citesciencesvertes.educagri.fr/wp-content/uploads/2026/04/EXAMEN-CIVIQUE.pdf). C'est une information propre à ce centre.
- **Recours** à la CCI uniquement pour une anomalie ou un dysfonctionnement grave, dans les **30 jours** suivant la date de l'attestation. Il donne droit à un nouveau passage gratuit, et l'ancien résultat est alors annulé même si le nouveau est moins bon (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/results/ ; https://www.lefrancaisdesaffaires.fr/candidat/conditions-dinscription-et-de-passation/).
- **Fraude** : l'examen est déclaré nul et le candidat **ne peut pas repasser l'examen pendant 2 ans** (arrêté, art. 5 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39426).

## 10. Dispenses et aménagements (naturalisation)

- **Seule dispense prévue pour la naturalisation** : un handicap ou un état de santé déficient chronique qui rend impossible l'évaluation des connaissances. Il faut un **certificat médical** conforme au modèle officiel, et l'administration peut demander une contre-expertise (art. 37-1, 10° : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906775 ; arrêté du 30/12/2025 : https://www.lemediasocial.fr/hulkStatic/EL/ELI/2026/01/fcc296be7-5e3f-44cd-ba41-5c771e670fba/sharp_/ANX/editdoc-8.pdf ; modèle : https://www.immigration.interieur.gouv.fr/documentation/guides-textes-et-brochures/modele-de-certificat-medical-pour-dispense-de-lexamen-civique-etou-du-test-linguistique.html).
- **Aménagements** possibles sur certificat médical : tiers-temps, sujet agrandi, aides techniques, accès pour les personnes à mobilité réduite. Les personnes qui ne lisent que le braille sont dispensées de l'examen civique (annexe de l'arrêté du 30/12/2025, même URL).
- **Pas de dispense liée à l'âge pour la naturalisation.** La dispense des plus de 65 ans existe pour la **CSP et la CR** (https://www.service-public.gouv.fr/particuliers/vosdroits/F39530 ; https://www.centre-inffo.fr/?p=498281), mais l'art. 37-1 du décret de 1993 n'en prévoit aucune. La page de la CCI dit « Les étrangers de plus de 65 ans ne sont pas tenus de passer l'examen » sans distinguer les mentions (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/registration/). Cette formulation est **trompeuse pour la naturalisation**.
- **Pas de dispense liée à un diplôme**, ni pour les réfugiés et autres bénéficiaires de la protection internationale (BPI) dans le cas de la naturalisation. Leur exemption ne vaut que pour la CSP et la CR (art. 37-1 ; https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/).
- **Non concernés** : les personnes qui acquièrent la nationalité **par déclaration** (mariage avec un Français, ascendant ou frère ou sœur de Français). L'examen ne concerne que la naturalisation et la réintégration **par décret** (https://www.service-public.gouv.fr/particuliers/vosdroits/F39426).

## 11. Pièces à présenter

- **À l'inscription** : n° AGDREF (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/registration/) et une pièce d'identité valide. Le centre en note le numéro (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-responsable-examen-civique.pdf). Joindre un certificat médical en cas de demande d'aménagement.
- **Le jour J** : la **convocation** et une **pièce d'identité en cours de validité**, c'est-à-dire un **titre de séjour**, ou un **passeport ou une carte d'identité pour les ressortissants de l'UE** candidats à la mention naturalisation (arrêté, annexes II et III : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000052382298 ; https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/examination/). Sans pièce valide, ou si le candidat refuse la photo, il n'est **pas admis** (livret du surveillant CCI).

## 12. Déroulé le jour J

Sources : annexes II et III de l'arrêté (https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000052382298) ; CCI (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/examination/ ; livrets et mémo cités plus haut).

1. Les épreuves ont lieu entre 8 h et 20 h. Il faut arriver à l'heure de la convocation : **aucun retardataire n'est admis**, sans tolérance.
2. Le surveillant contrôle la convocation et la pièce d'identité, **prend une photo** (elle figurera sur l'attestation) et fait signer le candidat sur une tablette.
3. **Vérifiez vos données** : orthographe des nom et prénom, date et lieu de naissance, n° AGDREF, e-mail. Elles seront reproduites sur l'attestation et se corrigent sur place.
4. Les affaires personnelles vont dans un casier ou un espace surveillé. Le **téléphone est éteint et rangé**, et ne peut pas servir de montre. Écouteurs et objets connectés sont interdits, sauf les appareils auditifs. Il ne faut **rien sur les genoux**. Seule la pièce d'identité reste sur la table, et il n'y a **aucun brouillon ni document**.
5. Le surveillant rappelle la durée (45 min), le barème, les règles et les sanctions en cas de fraude. Chacun saisit son code d'accès et lit la page de consignes. Le départ est donné en même temps pour tous.
6. Pendant l'épreuve, il est interdit de communiquer. **Toute sortie de la salle est définitive.** Le surveillant vérifie l'identité en cours d'épreuve.
7. Avant de valider, le récapitulatif signale les questions sans réponse.
8. Les résultats arrivent 12 à 48 h plus tard, par e-mail ou sur le compte candidat (section 8).

## 13. Différences entre naturalisation, carte de résident et carte pluriannuelle

| | Naturalisation (décret) | Carte de résident (CR) | Carte de séjour pluriannuelle (CSP) |
|---|---|---|---|
| Format | 40 QCM (28 + 12), 45 min, 4 choix | identique | identique |
| Seuil | 80 %, soit 32/40 | 32/40 | 32/40 |
| Référentiel et répartition par thème | identiques (arrêté, art. 3) | identiques | identiques |
| Liste des questions de connaissance | **Liste propre** à la naturalisation (PDF du ministère, 12/12/2025) | Liste CR | Liste CSP |
| Difficulté | « adaptée » au titre ; aucune échelle officielle publiée (a priori la plus exigeante : déduction) | différente de la CSP (formation-civique) | différente de la CR (formation-civique) |
| Validité de l'attestation | illimitée | illimitée ; la mention CR vaut aussi pour une CSP | illimitée |
| Niveau de français exigé à côté | **B2** | B1 | A2 |
| Dispense pour les plus de 65 ans | **non** | oui | oui |
| Exemption BPI ou accords bilatéraux | **non** | oui (selon les cas) | oui (selon les cas) |
| Autre évaluation | **Entretien d'assimilation** en préfecture, maintenu, et signature de la charte des droits et devoirs | — | Formation civique de 4 jours (CIR) avant l'examen |

Sources : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39530 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F2213 ; https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/ ; https://www.centre-inffo.fr/?p=498281 ; https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906771 (B2) ; https://www.service-public.gouv.fr/particuliers/actualites/A18713 (formation civique de 24 h sur 4 jours, CSP).

À retenir : **il faut s'inscrire avec la mention « Naturalisation »**. L'art. 37-1, 10° exige l'attestation de l'examen « mentionné à l'article 37 », c'est-à-dire la mention naturalisation (arrêté, art. 2). Une attestation CR ou CSP ne convient donc a priori pas. Aucun texte ne le dit en toutes lettres : c'est une déduction.

## 14. Ce qui a changé ou été publié en 2026

- **1er janvier 2026** : l'examen devient obligatoire pour les demandes de naturalisation ou de réintégration déposées à partir de cette date. Le niveau de français exigé passe de **B1 à B2** (art. 37 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906771 ; https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488).
- **Liste officielle des questions de connaissance pour la naturalisation** : le fichier du ministère est daté du 12/12/2025 dans son nom, et la CCI l'héberge depuis décembre 2025 (https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/examen-civique-naturalisation-questions-de-connaissance.pdf). Plusieurs sites privés parlent d'une publication le « 12 janvier 2026 » (https://www.data.gouv.fr/datasets/questions-de-connaissance-de-lexamen-civique-mention-naturalisation). **Aucune nouvelle version** n'a été trouvée en 2026.
- **Bilan officiel** (réponse ministérielle publiée au JO le 11/08/2026) : au 26 mai 2026, **71 125 personnes** avaient passé l'examen, avec un **taux moyen de réussite de 81 %**, dans **444 centres**, pour un prix de 60 à 80 € (https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488). **Aucune ventilation par mention** n'a été publiée.
  - Un site privé annonce 72 % de réussite au 1er trimestre 2026 (23 400 candidats) sur la base d'un communiqué du 28/03/2026 introuvable (https://www.testciviquefrance.fr/articles/statistiques-test-civique-2026-taux-reussite-72-pourcent). Ce chiffre n'est **pas vérifié**.
- **Nouveau livret du citoyen** : arrêté du 3 juillet 2026, JO du 16/07/2026. Le livret est refondu pour couvrir les connaissances attendues (https://blog.landot-avocats.net/2026/07/16/diffusion-de-la-version-2026-du-livret-du-citoyen/ ; https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488 ; https://www.service-public.gouv.fr/particuliers/vosdroits/F39426).
- Le site **formation-civique.interieur.gouv.fr** propose **222 fiches thématiques** (réponse ministérielle, même URL).
- **Rumeur démentie** : un passage à 50 questions en juin 2026 a circulé. Le site qui l'avait lancé l'a corrigé le 28/10/2026 : « Aucun texte officiel publié ne prévoit 50 questions » (https://www.testciviquefrance.fr/articles/reforme-test-civique-50-questions-juin-2026). L'arrêté du 10/10/2025 n'a pas été modifié (version consolidée sur Légifrance au 04/11/2026 : https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620).
- **Retours de candidats** : peu de témoignages vérifiables ont été trouvés. La presse relève le stress lié au seuil de 80 % et à l'épreuve sur ordinateur, ainsi que des questions de culture du quotidien qui déroutent (exemple d'une question sur un dessert populaire en France) (https://www.connexionfrance.com/news/new-civic-tests-for-foreigners-in-france-launch-amid-criticism/762116).

## 15. Incertitudes et divergences entre sources

1. **Plus de 65 ans** : la page de la CCI dit qu'ils sont dispensés sans distinguer les mentions. Pour la naturalisation, **ce n'est pas le cas** d'après le décret (art. 37-1) et service-public F39426. Seule la CSP et la CR sont concernées.
2. **Interdiction après fraude** : l'arrêté prévoit 2 ans. Les conditions générales de la CCI parlent de 1 an pour une triche et de 2 ans pour une usurpation d'identité (https://www.lefrancaisdesaffaires.fr/candidat/conditions-dinscription-et-de-passation/). L'arrêté prévaut.
3. **Délai des résultats** : 24 à 48 h ouvrées (page CCI), 12 à 48 h (livret CCI et centre FEI). Ces délais sont compatibles entre eux mais varient.
4. **Archivage de l'attestation à la CCI** : 10 ans selon la page « certificate », 2 ans selon le livret de novembre 2025. Mieux vaut télécharger et sauvegarder l'attestation dès réception.
5. **Date de la liste officielle naturalisation** : 12/12/2025 (nom du fichier, hébergement CCI de décembre 2025) contre « 12/01/2026 » chez des tiers.
6. **Nombre d'intitulés dans la liste** : 244 (data.gouv, publié par un tiers), 258 ou 260 (sites privés). Le décompte par ligne du fichier local donne environ 247.
7. **Origine des 28 questions de connaissance** : l'arrêté dit que les questions de connaissances sont « rendues publiques », mais **ne dit pas explicitement** que les 28 questions posées viennent exclusivement de la liste, ni que leur formulation est identique. Les 4 propositions ne sont jamais publiées. Le ministère prévient que « le format des questions d'entraînement peut différer » (formation-civique).
8. **Interface** : ordre aléatoire des questions, chronomètre affiché, score à l'écran en fin d'épreuve ? Ces points n'ont **pas été confirmés**. Le manuel du candidat de FEI (versions de mars et de septembre 2026) n'a pas pu être lu, car le site bloque les robots.
9. **Taux de réussite par mention** : non publié. Le seul chiffre officiel est une moyenne de 81 %, toutes mentions confondues, au 26/05/2026.
10. **Attestation CR utilisée pour une naturalisation** : aucun texte ne le prévoit, et le décret vise la mention naturalisation. Il faut considérer que ce n'est **pas** possible.
11. **Pièce d'identité le jour J** : les textes citent le « titre de séjour ». Il n'a pas été vérifié si un récépissé ou un titre expiré est accepté. **À demander au centre.**

---

## Conseils pratiques pour le jour J

**Avant (J-12 à J-1)**
- Vérifiez que la **convocation** porte bien la **mention « Naturalisation »**, la date, l'heure et l'adresse. Cherchez-la dans les spams et, si elle n'est pas arrivée quelques jours avant, contactez le centre (https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/registration/).
- Vérifiez que votre **titre de séjour** (ou passeport ou carte d'identité si vous êtes citoyen de l'UE) est **valide le jour J**. Sinon, appelez le centre.
- Visez **au moins 36/40 en examen blanc** pour garder une marge. Le seuil réel est de 32, et le stress ou des formulations inattendues coûtent des points. Un site privé rapporte des échecs de candidats qui ne visaient que 32 à l'entraînement (https://demarchesetrangers.fr/naturalisation/resultats-examen-civique, non vérifié).
- Entraînez-vous **chronomètre à 45 min** sur des examens complets de 40 questions, avec la répartition officielle (11/6/11/8/4).
- Travaillez **les mises en situation** des thèmes principes et droits : laïcité, égalité femmes-hommes, non-discrimination, liberté d'expression et ses limites, obligations fiscales, rôle de la police, droits du locataire ou du salarié. La bonne réponse est presque toujours celle qui **respecte la loi, les droits d'autrui et la neutralité du service public**.
- Révisez les sources officielles gratuites : fiches de https://formation-civique.interieur.gouv.fr/, livret du citoyen 2026, référentiel (annexe I de l'arrêté).

**Le jour même**
- Arrivez **en avance** : aucun retardataire n'est admis.
- Apportez votre convocation et une pièce d'identité valide. **Passez aux toilettes avant**, car toute sortie est définitive.
- Ne gardez **ni montre connectée, ni téléphone**, même éteint dans une poche. Les vêtements sur les genoux sont interdits. Tout reste au casier.
- Au moment de la photo et de la signature, **vérifiez l'orthographe de votre nom, votre date et lieu de naissance et votre n° AGDREF**. Une erreur se retrouverait sur l'attestation.

**Pendant l'épreuve (45 min, 40 questions)**
- Comptez **environ 1 minute par question**. Faites un premier passage rapide en répondant à tout ce que vous savez, puis revenez sur les questions laissées de côté.
- **Ne laissez aucune case vide** : une mauvaise réponse ne retire aucun point. Avant de valider, consultez la fenêtre récapitulative des questions sans réponse.
- Lisez **toute la question et les 4 propositions**. Méfiez-vous des négations (« Quelle proposition est **in**correcte ? ») et des pièges sur les dates, nombres et durées : mandat présidentiel de 5 ans, 27 États dans l'UE, 1905, 1789, 1944, 1958, 1981, etc.
- Pour une mise en situation, éliminez d'abord les réponses illégales ou discriminatoires, puis celles qui passent par la violence ou par le fait de « se faire justice soi-même ».
- En cas de problème technique, **levez la main tout de suite**. Le test reprend là où il s'était arrêté. Une anomalie grave peut donner lieu à un recours dans les 30 jours (CCI).

**Après**
- Les résultats arrivent **sous 12 à 48 h** par e-mail (lien vers un coffre-fort numérique) ou sur le compte candidat. **Téléchargez l'attestation et faites-en plusieurs sauvegardes** : elle est valable sans limite de durée, mais son archivage chez l'organisme est limité.
- En cas d'échec, vous pouvez vous réinscrire **sans limite de tentatives**, en payant à nouveau.
- L'attestation se joint au **dossier de naturalisation au moment du dépôt**. L'**entretien d'assimilation** en préfecture reste à préparer à part.

---

## Sources consultées (principales)

- Arrêté du 10/10/2025 (version JO et version consolidée) : https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052381620 ; https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620
- Règlement de l'examen (annexe III) : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000052382298
- Décret 93-1362, art. 37 et 37-1 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906771 ; https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000051906775
- Arrêté du 30/12/2025 (JO n° 306 du 31/12/2025) : https://www.lemediasocial.fr/hulkStatic/EL/ELI/2026/01/fcc296be7-5e3f-44cd-ba41-5c771e670fba/sharp_/ANX/editdoc-8.pdf
- Service-public F39426 (vérifié le 16/07/2026) : https://www.service-public.gouv.fr/particuliers/vosdroits/F39426
- Service-public F39530 (vérifié le 10/02/2026) : https://www.service-public.gouv.fr/particuliers/vosdroits/F39530
- Service-public, actualité A18713 (18/12/2025) : https://www.service-public.gouv.fr/particuliers/actualites/A18713
- Service-public F2213 (naturalisation par décret) : https://www.service-public.gouv.fr/particuliers/vosdroits/F2213
- Ministère de l'Intérieur, formation civique : https://formation-civique.interieur.gouv.fr/examen-civique/informations-g%C3%A9n%C3%A9rales-sur-lexamen-civique/
- Flyer DGEF (novembre 2025) : https://www.immigration.interieur.gouv.fr/sites/dgef/files/medias/documents/2026-06/Flyer_A5_Examen_civique_Sejour_nov2025_Accessible.pdf
- Assemblée nationale, QE n° 11488 (réponse publiée au JO le 11/08/2026) : https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488
- CCI Paris IDF, Le français des affaires : https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/presentation/ ; …/registration/ ; …/examination/ ; …/results/ ; …/certificate/ ; https://www.lefrancaisdesaffaires.fr/candidat/conditions-dinscription-et-de-passation/
- Livrets CCI (novembre 2025) : https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-responsable-examen-civique.pdf ; https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-livret-du-surveilllant-examen-civique.pdf ; https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/2025-memo-surveillant-examen-civique.pdf ; https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/attestation-examen-civique.pdf
- Centres FEI : https://formations.u-bordeaux-montaigne.fr/plugins/odf-web/odf/_content/program-examen-civique/EXAMEN%20CIVIQUE.pdf ; https://www.cavilam.com/en/examen-civique/ ; https://citesciencesvertes.educagri.fr/wp-content/uploads/2026/04/EXAMEN-CIVIQUE.pdf
- Centre Inffo (décret 2025-647, arrêté d'agrément) : https://www.centre-inffo.fr/?p=498281 ; https://www.centre-inffo.fr/?p=498971
- Livret du citoyen 2026 : https://blog.landot-avocats.net/2026/07/16/diffusion-de-la-version-2026-du-livret-du-citoyen/
- Sources secondaires, citées seulement pour signaler des divergences : https://www.data.gouv.fr/datasets/questions-de-connaissance-de-lexamen-civique-mention-naturalisation ; https://www.testciviquefrance.fr/articles/reforme-test-civique-50-questions-juin-2026 ; https://www.testciviquefrance.fr/articles/statistiques-test-civique-2026-taux-reussite-72-pourcent ; https://www.connexionfrance.com/news/new-civic-tests-for-foreigners-in-france-launch-amid-criticism/762116
