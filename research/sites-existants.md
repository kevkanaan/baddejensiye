# Ressources non officielles et retours de candidats : examen civique 2026, mention naturalisation

> Recherche menée le 4 novembre 2026. Plus de 30 sources consultées : sites de quiz, blogs, cabinets, applications, presse, forums, associations, centres d'examen et jeux de données publiés sur data.gouv.fr.
> Les questions sont **reformulées** et les réponses vérifiées par recoupement. Aucun contenu protégé n'est recopié en masse.
> « Liste NAT » désigne la liste officielle des questions de connaissance « naturalisation » du 12/12/2025. Le fichier local `research/liste-officielle-connaissance-2025-12-12.txt` est cité sous la forme « l.N ».
> Codes : thème = `principes | institutions | droits | histoire | societe` ; type = `connaissance | situation`.

---

## 0. L'essentiel

1. **Alerte sur les données.** Le fichier texte local **ne contient pas 15 intitulés officiels** de la liste NAT. Le PDF du ministère les contient, mais **sous forme d'images**, et l'extraction texte les a perdus. Le PDF compte 259 occurrences, soit 258 intitulés distincts, contre 244 dans le fichier local. Deux de ces questions (Victor Hugo, Pyrénées) ont été citées par des candidats. Le détail et les réponses sont en section 1. **Il faut les ajouter dans l'application.**
2. **Les questions de connaissance viennent bien des listes officielles.** Les questions citées par les candidats correspondent toujours à un intitulé de la liste de **leur** mention (NAT, CR ou CSP). Les questions présentées comme « hors liste » dans la presse (Matignon, région la plus peuplée, fixation d'un salaire, Joséphine Baker, nombre de communes) viennent toutes des listes **CR ou CSP**. Elles ont donc probablement été posées à des candidats à un titre de séjour. Pour être « trop préparé », la section 6 donne en bonus les intitulés CR/CSP absents de la liste NAT.
3. **Les mises en situation (12 sur 40) ne sont publiées nulle part.** Tous les sites qui en proposent les ont **reconstituées**. Selon l'arrêté du 10/10/2025, elles portent sur les thèmes **principes** (6) et **droits et devoirs** (6) ; voir `format-examen.md`. Un seul énoncé réel est connu avec ses 4 choix : un usager portant un signe religieux au guichet d'un service public. La bonne réponse est de **le servir normalement**.
4. **Les candidats décrivent les mises en situation comme la partie la plus difficile.** Ils parlent de « questions pièges » sur la laïcité (usager ou agent), l'égalité salariale femmes-hommes, les discriminations et la liberté d'expression. Calcul simple : même avec 28/28 en connaissance, il faut au moins 4 mises en situation justes sur 12 pour atteindre 32/40.
5. **Les sites privés sont nombreux, commerciaux et souvent contradictoires.** Sur le nombre de questions, le seuil, les décrets ou le niveau de langue, plusieurs affichent des erreurs (section 7). Aucun ne connaît les vraies propositions de réponse du jour J. Leurs QCM sont des **reconstitutions**.
6. Résultats connus : 71 125 candidats et **81 % de réussite moyenne** au 26/05/2026, toutes mentions confondues (réponse ministérielle publiée au JO du 11/08/2026, https://www.assemblee-nationale.fr/dyn/17/questions/QANR5L17QE11488). Les scores rapportés par les candidats préparés vont de 37 à 39/40. Un candidat peu préparé a échoué à 31/40.

---

## 1. Les 15 intitulés officiels NAT absents du fichier texte local (critique)

### 1.1 Comment l'écart a été établi

- Le PDF de l'utilisateur (`examen-civique-naturalisation-questions-de-connaissance-20251212.pdf`) a pour SHA-256 `482f5d9f…2bed6`. C'est **exactement** le fichier archivé par le jeu de données REMEC sur data.gouv.fr (https://www.data.gouv.fr/datasets/examen-civique-questions-officielles-pour-la-naturalisation). REMEC y recense **259 occurrences**, dont 1 doublon : « Qui peut se présenter aux élections présidentielles ? » apparaît deux fois (l.47 et l.55).
- `pdftotext` ne restitue aucune de ces 15 questions. L'analyse de la structure du PDF montre que les pages 1, 4, 6, 7, 8, 9 et 10 contiennent respectivement 3, 3, 1, 4, 1, 2 et 1 **images**, soit **15 au total**. Cela correspond exactement au nombre de questions manquantes par page. Ces intitulés ont donc été insérés comme images.
- Des recoupements indépendants le confirment :
  - le jeu PrépaCivique sur data.gouv.fr (258 questions) contient ces intitulés ;
  - des candidats ont cité « courant/œuvre de Victor Hugo » et « chaîne de montagnes entre la France et l'Espagne » (The Local, 12/01/2026) ;
  - un témoignage cite « Selon la Constitution, la France est une République… » (rdvenprefecture.fr).
- La ligne 221 du fichier local (« ? » seul) est la trace de l'image « Quelle mer se situe entre la France et l'Angleterre ? ».
- Le pied de page du PDF est une annotation rouge : « Questions de connaissance à choix multiples (une bonne réponse sur quatre choix proposés) ».

### 1.2 Intitulés manquants, position et réponse attendue

| # | Page PDF | À insérer après (fichier local) | Intitulé officiel | Thème / type | Réponse à retenir |
|---|---|---|---|---|---|
| 1 | 1 | l.18 (Marianne) | Que signifie le mot « fraternité » dans la devise française ? | principes / connaissance | La **solidarité et l'entraide** entre les personnes. Le Conseil constitutionnel en a fait un principe à valeur constitutionnelle en 2018 : c'est la liberté d'aider autrui dans un but humanitaire. |
| 2 | 1 | l.22 | Selon la Constitution, la France est une République… | principes / connaissance | « …**indivisible, laïque, démocratique et sociale** » (article 1er). |
| 3 | 1 | l.25 | Selon le principe de laïcité, que signifie la neutralité de l'État ? | principes / connaissance | L'État **ne reconnaît, ne salarie ni ne subventionne aucun culte** et ne favorise aucune croyance. Ses agents ne manifestent pas leur religion (loi de 1905, art. 2). |
| 4 | 4 | l.90 | Quel est le dernier État à avoir intégré l'Union européenne en 2013 ? | institutions / connaissance | La **Croatie**, entrée le 1er juillet 2013. |
| 5 | 4 | l.95 | Les citoyens de l'UE peuvent-ils voter aux élections locales dans un autre État de l'Union ? | institutions / connaissance | **Oui, aux élections municipales** (et européennes) de leur pays de résidence. En France, ils ne peuvent toutefois être ni maire ni adjoint (Constitution, art. 88-3). |
| 6 | 4 | l.99 | Quelle est la devise de l'Union européenne ? | institutions / connaissance | « **Unie dans la diversité** », adoptée en 2000. |
| 7 | 6 | l.145 | Qui peut être appelé à faire partie d'un jury d'assises en France ? | droits / connaissance | Un **citoyen français d'au moins 23 ans**, inscrit sur les listes électorales et **tiré au sort**, qui sait lire et écrire le français (Code de procédure pénale, art. 255). |
| 8 | 7 | l.152 | Quel est l'objectif des lois scolaires de la IIIe République ? | histoire / connaissance | Rendre l'école primaire **gratuite (1881), obligatoire et laïque (1882)** : instruire tous les enfants et former des citoyens (lois Jules Ferry). |
| 9 | 7 | l.153 | Pourquoi l'année 1958 est importante pour la France ? | histoire / connaissance | C'est la naissance de la **Ve République** : Constitution du **4 octobre 1958**, approuvée par référendum le 28 septembre. |
| 10 | 7 | l.154 | Simone Veil est une figure importante de l'histoire française. Elle a notamment : | histoire / connaissance | Porté la **loi de 1975 qui légalise l'IVG** (loi Veil). Elle était rescapée d'Auschwitz, a été la 1re présidente du Parlement européen élu (1979) et est entrée au Panthéon en 2018. |
| 11 | 7 | l.163 | Qui a rendu l'école gratuite, laïque et obligatoire ? | histoire / connaissance | **Jules Ferry**, en 1881-1882. |
| 12 | 8 | l.184 | Quelle œuvre a été écrite par Victor Hugo ? | histoire / connaissance | ***Les Misérables*** (1862) ou ***Notre-Dame de Paris*** (1831). Hugo est le chef de file du **romantisme**. Pièges : *Les Fleurs du mal* (Baudelaire), *L'Étranger* (Camus), *Madame Bovary* (Flaubert), *Le Petit Prince* (Saint-Exupéry). |
| 13 | 9 | l.220 (remplace la l.221 « ? ») | Quelle mer se situe entre la France et l'Angleterre ? | histoire (géographie) / connaissance | **La Manche.** |
| 14 | 9 | l.226 | Quelle chaîne de montagnes est située entre la France et l'Espagne ? | histoire (géographie) / connaissance | **Les Pyrénées.** Ne pas confondre avec la l.197 (France-Italie : les **Alpes**). |
| 15 | 10 | l.251 | Qu'est-ce que le principe de confidentialité dans le domaine de la santé ? | societe / connaissance | Le **secret médical** : un professionnel de santé ne peut pas divulguer les informations de santé d'un patient sans son accord (Code de la santé publique, art. L1110-4). |

---

## 2. Inventaire des ressources non officielles

Échelle de fiabilité :
- **A** : fiable et recoupé ;
- **B** : globalement juste, avec des erreurs mineures ou des approximations ;
- **C** : commercial, avec des contradictions ou des erreurs notables ;
- **D** : à éviter ou inutilisable.

### 2.1 Sites de quiz et plateformes d'entraînement

| # | Ressource (URL) | Type | Contenu | Fiabilité et erreurs repérées |
|---|---|---|---|---|
| 1 | PrépaCivique : https://www.prepacivique.fr (pages par question : `/question/...` ; article sur les mises en situation : `/articles/questions-mise-en-situation-examen-civique`) | Plateforme de quiz (freemium) | Une page par intitulé officiel avec 4 choix, correction et explication. Test blanc gratuit de 40 questions sans inscription. 10 mises en situation corrigées. Publie aussi les listes NAT, CR et CSP sur data.gouv.fr. | **B.** Bonne couverture de la liste NAT. Erreur notable : pour « En France, il est possible pour l'État de financer : », deux propositions sont défendables (« entretien d'édifices du culte sous conditions » est aussi juste). Certaines explications sont simplifiées. |
| 2 | Entraînement Civique : https://www.entrainement-civique.fr | Quiz gratuit, sans inscription | 635 questions, filtrées par mention (308 pour NAT), dont **50 mises en situation reconstituées**. Répartition 11/6/11/8/4 respectée. | **B.** Gratuit et clair. Les mises en situation sont des reconstitutions sans source officielle. Aucune erreur factuelle repérée. |
| 3 | LeTestCivique.fr : https://letestcivique.fr/examen-civique/naturalisation | Quiz (freemium) | Simulations NAT, CR et CSP, QCM par chapitre, PDF. Publie les listes sur data.gouv.fr, ainsi qu'un lexique FR-EN-ZH. | **B/C.** Les 5 exemples sont justes. Se dit « conforme au référentiel officiel » sans le démontrer. Prête à confusion entre plateforme privée et examen officiel. |
| 4 | DémarchesÉtrangers : https://demarchesetrangers.fr/naturalisation/simulation-examen-civique-2026 et `/examen-blanc-6` | Simulateur gratuit et guide PDF (9,99 €) | Banque annoncée de 450 questions. Examens blancs de 40 questions. | **C.** Dans l'examen blanc n° 6, **33 bonnes réponses sur 40 sont en position b**, ce qui fausse l'entraînement. Il parle de « nouvelle lecture » au lieu de « nouvelle délibération » (art. 10). La FAQ dit que l'examen a lieu en préfecture, ce qui est faux : il a lieu en centre agréé. Le nombre de questions est contradictoire (450, 480 ou 240). |
| 5 | IntegrationFrance : https://www.integrationfrance.fr | Plateforme (inscription gratuite) | Annonce « 675 questions officielles » (260 NAT, 209 CR, 206 CSP), QCM par chapitre et examen blanc. | **C.** Annonce aussi « 1 900+ questions » et parle d'un « seuil de 24 points » dans un teaser : c'est **faux**, le seuil est de 32/40. Il emploie le terme « entretien civique » pour le QCM. Les taux d'échec cités ne sont pas sourcés. |
| 6 | QCM Civique : https://qcmcivique.fr | Abonnement payant avec essai | Annonce « 1 800+ questions » (193 + 209 + 240 par parcours). | **C.** Chiffres incohérents. Promet de reproduire « exactement » l'examen, sans preuve. |
| 7 | Test Civique France : https://www.testciviquefrance.fr | Quiz (gratuit ou payant, flou) | 800+ questions, examens blancs. Exemple de mise en situation sur un voisin bruyant. | **C.** Cite un « décret n° 2025-647 du 10 juin 2025 » (date erronée : le décret date du 15/07/2025). « 95 % de réussite » non sourcé. Un « délai de 30 jours avant nouvelle tentative » n'est confirmé par aucune source officielle. |
| 8 | Franova : https://www.franova.fr/blog/examen-civique-2026-questions-pdf-gratuit | Blog, PDF et premium | 3 examens de 40 questions (NAT, CR, CSP). Mises en situation : collègue voilée en mairie, dessin de Noël, salle de prière, piscine mixte, patient qui refuse une femme médecin. | **C.** Des options sont vides, beaucoup de corrigés manquent, et la page affiche « 100 % de réussite ». Les mises en situation sont intéressantes, mais certaines sont ambiguës (dessin de Noël). |
| 9 | Ma Formation Civique : https://www.maformationcivique.fr | Plateforme | 8 questions de connaissance et 3 mises en situation sans choix. | **B/C.** Pour le 14 juillet, ne donne que la Bastille (la fête de la Fédération de 1790 manque). Durée incohérente (30 ou 45 min). |
| 10 | Travail-Industrie : https://travail-industrie.com/nos-formations/formation-preparer-examen-civique/ | Mini-formation gratuite, sans inscription | 5 modules, quiz de 10 questions, examen blanc de 40 questions. | **B.** Gratuit. Contradiction interne sur le nombre de mises en situation par module. Son examen final applique un barème -1 qui n'existe pas à l'examen officiel. |
| 11 | France Fraternités, « Ensemble en France » : https://www.ensemble-en-france.org | Site associatif **financé par le ministère de l'Intérieur** | Grand quiz gratuit (Débutant/Expert), modules sur les valeurs, exercices de FLE. Le site digiSchool rapporte que le ministère signale un quiz associatif de 50 questions dont le format peut différer. | **A/B.** Source sérieuse. Format différent de l'examen. |

### 2.2 Blogs, guides, cabinets

| # | Ressource | Type | Contenu | Fiabilité et erreurs |
|---|---|---|---|---|
| 12 | France Accueil : https://franceaccueil.com/examen-civique-2026-40-questions-corrigees/ et forum https://forum.franceaccueil.com | Blog, forum, e-book à 29,99 €, vidéos YouTube | 40 questions corrigées, dont 12 mises en situation (prosélytisme d'un agent, discrimination à l'embauche, violences conjugales, harcèlement, portefeuille trouvé, voisin bruyant, propriétaire qui entre sans accord). Un **retour d'expérience NAT** sur le forum (voir section 3). | **B.** Les réponses sont justes. Deux questions de connaissance sont étiquetées « mise en situation » à tort (n° 37, numéro du SAMU). Une réponse est vague (n° 17, « la justice »). Dates de vérification incohérentes. |
| 13 | Natification et Questions-Naturalisation (ENAGE SAS) : https://blog.natification.fr/2026/02/examen-civique/ et https://questions-naturalisation.fr | Blog et guides payants | Guide de 300 questions, 50 questions d'**entretien d'assimilation** (oral), témoignages d'entretiens. | **C.** **Mélange le QCM civique et l'entretien oral en préfecture** (« Citez 3 ministres », « Pourquoi devenir français ? »). Écrit « obligatoire depuis 2025 » au lieu du 1er janvier 2026. Affirme « aucune surprise ». Utile seulement pour préparer l'entretien. |
| 14 | Examen-Civique-France : https://examen-civique-france.fr/blog/10-questions-examen-civique-2026/ | Blog lié à Natification | « 10 questions les plus difficiles ». | **C.** Le classement mélange QCM et entretien. Contenus utiles : loi Veil de 1975, chef des armées, décret et loi. Présente son application comme un « simulateur officiel », alors que le site est privé. |
| 15 | Parlez-vous French : https://parlez-vous-french.com/test-blanc-examen-civique-naturalisation/ | École de FLE (blog, test blanc vidéo) | 80 questions corrigées gratuites. | **B.** Les réponses sont généralement justes. Questions trompeuses : l'euro (2002 donné comme réponse, alors que la monnaie unique existe depuis 1999) et la « fondation de l'UE » (1992 ou 1993). |
| 16 | Me Blanvillain (avocate) : https://blanvillain-avocat.fr/examen-civique-2026-questions-reponses/ | Blog de cabinet | 40 questions de connaissance, sans mise en situation. | **B.** Écrit « Pôle emploi » (France Travail depuis 2024). Donne une seule origine pour le 14 juillet. Aucune mise en situation. |
| 17 | digiSchool : https://www.digischool.fr/articles/fle/examen-civique-naturalisation-titre-sejour/ | Article (vend du FLE) | Méthode et pièges : ne jamais laisser une case vide, faire attention aux négations. Liste les ressources gratuites du ministère. | **B.** Bonne méthode. Aucune question. |
| 18 | EDUF (École du Français, SAS) : https://www.eduf.fr/guides-pratiques/quelles-sont-les-questions-posees-lors-de-lexamen-civique-2026 | Organisme de formation (Qualiopi), payant | 8 questions et 5 pistes de mises en situation : employeur et signe religieux, refus de l'école, carte électorale, discrimination, voisinage. | **C.** Indique le **niveau B1 pour la naturalisation, ce qui est faux** : c'est **B2** depuis le 1/1/2026. Écrit « Pôle emploi ». Parle d'« examinateurs » alors que l'examen est passé sur ordinateur. |
| 19 | Naturalisation France Facile (application) : https://naturalisationfrancefacile.fr/blog/questions-mise-en-situation-examen-civique-naturalisation.html | Blog et application | Mises en situation : enseignante qui parle des religions, écart de salaire femme/homme, fils qui refuse le sport à cause des filles. | **C.** Les exemples sont justes. Annonce « 258 questions réelles posées en préfecture » sans source. Sa règle « une réponse qui invoque une tradition ou une religion pour contourner la loi est toujours fausse » est **utile**. |
| 20 | Naturalisation-Facile : https://naturalisation-facile.fr/examen-civique | Blog et guides payants (29,90 €) | Indique que les 12 mises en situation portent sur les thèmes « principes » et « droits et devoirs ». Met en garde contre les offres d'examen « à distance », qui n'existent pas. | **B/C.** Erreur de calcul de marge : il annonce 5 points de marge au lieu de 4. Contradictions sur les dispenses. |
| 21 | Préfecture-Alerte : https://prefecture-alerte.com/en/blog/examen-civique-naturalisation-2026-guide-complet | Blog | Mises en situation : employeur qui refuse une femme voilée, collègue qui refuse de travailler avec une femme. | **C.** Affirme un **seuil de 60 % pour les titres de séjour, ce qui est faux** : il est de 80 % pour toutes les mentions. Confusions sur le coût. |
| 22 | RDV en Préfecture : https://www.rdvenprefecture.fr/examen-civique/questions-officielles/ | Service privé (PDF de 596 questions) | Témoignages de candidats avec les questions tombées (section 3). | **C.** Témoignages invérifiables. Ils sont cependant **cohérents avec les listes officielles** : les questions citées par un candidat CR sont dans la liste CR, celles d'un candidat NAT dans la liste NAT. |

### 2.3 Applications mobiles

| # | Application | Éditeur et modèle | Observations |
|---|---|---|---|
| 23 | « Mon Test Civique » (iOS) : https://apps.apple.com/fr/app/id6758161534 | Ismael Rubio, gratuite avec premium | Note 4,8/5 sur seulement 16 avis. Couvre NAT et CR. Collecte des données personnelles (localisation, téléphone). Aucun avis ne décrit de question tombée. **C.** |
| 24 | « Civic Exam 2026: QCM France » (Android) : https://appgoblin.info/apps/com.julsoftwares.qcmexamencivique | Jul Softwares, gratuite avec publicité | Environ 1 100 installations, aucune note. Outil « indépendant ». **C/D.** |
| 25 | « Mon Examen Civique 2026 » (Android, com.azsoft.prepacivique) et « Examen Civique Français 2026 » (iOS, id6759701806) | Éditeurs privés | Aucun avis exploitable. **D** faute d'information. |

Les applications n'apportent rien de plus que les sites. Aucune n'a accès aux vraies mises en situation.

### 2.4 Vidéos et réseaux sociaux

- **YouTube** : France Accueil propose des vidéos « 40 questions officielles pour la naturalisation » en plusieurs parties, et Parlez-vous French un test blanc vidéo. Elles se contentent de lire des QCM reconstitués.
- **InfoMigrants** a publié une vidéo, « Pour moi, c'était facile », tournée à la sortie d'un centre du nord de l'Île-de-France. Seule son accroche est accessible (relayée par unjobs.org).
- **Instagram et Facebook** : un candidat NAT (38/40) recommande une page Instagram « naturalisation ». France Accueil anime un groupe Facebook qui sert de source à son forum. Ces contenus ne sont pas consultables par un robot.
- **Reddit** est inaccessible à l'outil de recherche. Les sites qui citent des « questions tombées sur TikTok » n'apportent aucune preuve.

### 2.5 Associations, centres et organismes de formation

| Organisme | Rôle | Intérêt |
|---|---|---|
| CCI Paris Île-de-France, « Le français des affaires » : https://www.lefrancaisdesaffaires.fr/en/candidate/examen-civique/preparation/ | Organisme **agréé** (novembre 2025), réseau de centres | Rappelle les règles : 1 point par bonne réponse, 0 en cas d'erreur ou d'absence de réponse, donc **aucune pénalité : il faut toujours répondre**. Niveaux de langue : A2 (CSP), B1 (CR), B2 (NAT). Pièce exigée : titre de séjour, ou passeport ou carte d'identité pour un citoyen de l'UE. |
| CAVILAM, Vichy : https://www.cavilam.com/en/examen-civique/ | Centre d'examen (70 €) | 4 sessions par mois, inscription via test-civique.fr. Pas de préparation spécifique. |
| France Fraternités, « Ensemble en France » | Association | Quiz gratuit (voir 2.1, n° 11). |
| Secours catholique (Hélène Ceccato), « Le français pour toutes et tous » (Xavier Thiollet), Paroles voyageuses (Leïla Marçot) | Associations, citées par la presse | Critiques : test « déconnecté du terrain », stress, questions de culture jugées éloignées du quotidien (Victor Hugo). Utile pour savoir que la culture générale (auteurs, œuvres) tombe vraiment. |
| GISTI : https://gisti.org/IMG/pdf/add_guide-nationalite.pdf | Association juridique | Guide de la nationalité, utile pour la procédure. Pas de quiz. |

### 2.6 Jeux de données réutilisables (data.gouv.fr)

| Jeu | Contenu | Usage pour l'application |
|---|---|---|
| REMEC, « Questions officielles pour la naturalisation » : https://www.data.gouv.fr/datasets/examen-civique-questions-officielles-pour-la-naturalisation | 259 occurrences, 258 distinctes, avec page, position, doublon et SHA-256 de la source. **Sans réponses.** | **Référence pour compléter la liste**, avec les 15 intitulés de la section 1. Licence Ouverte 2.0 proposée, mais la DGEF n'a pas placé le PDF sous licence explicite. |
| PrépaCivique (NAT 258, CR 209, CSP 191) et LeTestCivique (NAT, CR, CSP) | Intitulés seuls | Recoupement. |
| « Examen Civique NT » (utilisateur « admin-civique ») : https://www.data.gouv.fr/datasets/examen-civique-nt | 258 questions avec des réponses « suggérées ». Le fichier s'appelle `gemini-code-….json`. | **D** : réponses vraisemblablement générées par une IA et non vérifiées. Ne pas réutiliser. |
| Lexique trilingue (MTECH) et glossaire (examenciviquenaturalisation.fr) | Définitions | Facultatif. |

### 2.7 Presse (retours d'expérience)

- The Local, 12/01/2026, d'après La Voix du Nord : https://www.thelocal.fr/20260112/trick-questions-first-candidates-in-frances-new-civics-test-speak-out
- ObservAlgérie, 11/01/2026 : https://observalgerie.com/2026/01/11/immigration/demande-de-titre-de-sejour-en-france-les-questions-etranges-du-test-civique/
- Reportage InfoMigrants repris par Mediaterranée : https://mediaterranee.com/1132026-test-civique-obligatoire-dans-les-coulisses-de-lexamen-qui-conditionne-le-titre-de-sejour
- Connexion France, 02/01/2026, citant franceinfo : https://www.connexionfrance.com/news/new-civic-tests-for-foreigners-in-france-launch-amid-criticism/762116
- Visa-Algérie, citant La Voix du Nord du 15/12/2025, selon laquelle l'examen est plus difficile pour la naturalisation : https://www.visa-algerie.com/titre-de-sejour-naturalisation-lexamen-civique-juge-trop-dur-pour-les-etrangers/
- La Presse (Tunisie) : https://www.lapresse.tn/?p=4310700

---

## 3. Retours d'expérience : ce qui est réellement tombé

| Source et date | Candidat, mention, score | Questions citées (reformulées) | Correspondance avec les listes officielles |
|---|---|---|---|
| The Local, 12/01/2026 (d'après La Voix du Nord) | Rita, Libanaise, **NAT** | **Mise en situation : un usager porte un signe religieux dans un service public.** Choix proposés : le servir, refuser de le servir, lui demander d'ôter le signe, en référer à un responsable. **Réponse : le servir**, car la neutralité s'impose aux agents et non aux usagers. Elle la qualifie de « question piège ». | Mise en situation (non publiée). Proche de l'intitulé NAT l.26 « Que peut faire un usager du service public dans une mairie ? ». |
| idem | Candidats non nommés, mention non précisée | Année de signature du traité de Maastricht (1992) ; océan de la côte ouest (Atlantique) ; chaîne de montagnes entre la France et l'Espagne (Pyrénées) ; dates de la Première Guerre mondiale (1914-1918) ; région la plus peuplée (Île-de-France) ; ce que doit faire un employeur pour fixer un salaire (respecter le SMIC et la convention collective) ; courant littéraire de Victor Hugo (romantisme) | NAT l.97, NAT image p.9, NAT l.167. CSP (« océan… côte ouest », « fixer un salaire »). CR (« région la plus peuplée »). Victor Hugo correspond à la NAT image p.8 (« Quelle œuvre a été écrite par Victor Hugo ? »). |
| idem (commentaires) | Karen, Paris, **39/40** ; K. Pruitt | Karen : test « facile, avec quelques questions piégeuses ». Pruitt s'est trompé sur le **nombre de communes** et sur une question sur le **suffrage**. | « Combien de communes environ » : CR. « Suffrage universel » : CSP, ou NAT l.164. |
| ObservAlgérie, 11/01/2026 | Lassana, Malien, **37/40** | **Mise en situation : deux agents d'accueil, même expérience, salaire plus bas proposé à la femme.** Est-ce légal ? **Non**, c'est l'égalité salariale. Il juge les mises en situation « les plus difficiles ». | Mise en situation (principes : égalité). |
| InfoMigrants via Mediaterranée (janvier 2026) | Centre de Saint-Ouen-l'Aumône. Samuel, Nigérien, **31/40, échec**. Charlie, Camerounaise, CSP, 38/40. Bienvenu, Congolais | Chef-lieu de la Bretagne (Rennes) ; dates de la Première Guerre mondiale ; **hôtel Matignon** (résidence du Premier ministre) ; roi exécuté pendant la Révolution (Louis XVI) ; année où Napoléon devient empereur (1804) ; Joséphine Baker (« jamais entendu parler ») | NAT l.229, l.167, l.157, l.159. Matignon : CR. Joséphine Baker : CSP. « Chaque candidat a un QCM différent. » |
| Forum France Accueil, 20/01/2026 | Anonyme, **NAT**, Paris 7e (70 €), **38/40** | Les 5 thèmes attendus. Mises en situation sur les droits, les devoirs, **le vote** et les valeurs. 3 semaines de préparation. | Confirme le format 28 + 12. |
| RDV en Préfecture (témoignages invérifiables) | « CR, 39/40 » | Devise ; ce qu'interdit la charte de la laïcité à l'école ; nombre de régions ; État sorti de l'UE en 2020 ; **à quelle liberté renvoie la PMA** ; année de l'euro ; musicien français célèbre ; Rodin | Toutes dans la liste **CR**, ce qui rend le témoignage cohérent. |
| idem | « Samir K. », reçu (mention probablement NAT) | Paroles de la Marseillaise ; **« Selon la Constitution, la France est une République… »** ; loi de 1905 ; rôle du Conseil constitutionnel ; majorité numérique ; Napoléon empereur ; libération de Paris ; chef-lieu d'Auvergne-Rhône-Alpes ; Albert Camus | Toutes dans la liste **NAT**, y compris une image p.1. |
| idem | « Awa D. », 38/40 | 11 novembre ; année de la Ve République ; pays colonisés par la France | NAT l.172, image p.7 (1958) et l.163. |
| La Presse (Tunisie) | Anonymes | **Mise en situation : contravention de stationnement, que faire dans les 45 jours ?** Payer l'amende ou la contester dans le délai indiqué sur l'avis. Interface jugée « intuitive ». | Mise en situation (droits et devoirs). |
| Connexion France, d'après franceinfo | Anecdote rapportée par X. Thiollet | « Quel dessert est populaire en France ? » (réponse donnée : pain au chocolat). Probablement tirée de l'**ancien entretien en préfecture**, pas du QCM. Stress sur la définition de l'**État de droit**. | État de droit : NAT l.64. |

Ce qu'on en retient :

1. Les questions de connaissance du jour J sont les intitulés publiés. La formulation peut être très légèrement adaptée et l'ordre est aléatoire. **Chaque candidat a un tirage différent.**
2. **Personne n'a publié les 4 choix des questions de connaissance.** Seul le choix de la mise en situation « usager et signe religieux » est connu. Les propositions des sites privés sont des **reconstitutions**.
3. Les mises en situation réellement signalées portent sur la laïcité au guichet (usager ou agent), l'égalité salariale femmes-hommes, une contravention et son délai, et le vote. Elles sont jugées **plus difficiles** et « piégeuses ».
4. La culture générale tombe vraiment : Victor Hugo, Camus, Rodin, Joséphine Baker (CSP). Même des candidats bien intégrés se font surprendre par l'histoire (date du sacre de Napoléon, rois).

---

## 4. Questions hors liste NAT à connaître (classées par thème et par type)

> Pour les intitulés CR et CSP, voir la section 6. Ici : les questions vues sur des sites non officiels ou signalées par des candidats, et surtout **les mises en situation**.

### 4.1 Connaissance : compléments utiles (sites privés, entretien, culture générale)

| Thème | Question reformulée | Bonne réponse |
|---|---|---|
| principes | Signification des couleurs du drapeau | Le bleu et le rouge sont les couleurs de Paris, le blanc celle de la royauté. Le drapeau tricolore est un symbole de la Révolution. |
| principes | Quand La Marseillaise a-t-elle été écrite, et par qui ? | En **1792**, par **Rouget de Lisle**. Elle devient l'hymne national en 1795, puis définitivement sous la IIIe République (1879). |
| principes | Quel animal symbolise la France ? | **Le coq** (gaulois). Il n'est pas un symbole officiel de la Constitution. |
| principes | Quels sont les symboles officiels inscrits dans la Constitution (art. 2) ? | Langue française, drapeau tricolore, Marseillaise, devise « Liberté, Égalité, Fraternité », principe « gouvernement du peuple, par le peuple et pour le peuple ». |
| institutions | Qui promulgue les lois ? | Le **président de la République**, dans les 15 jours (art. 10). Il peut demander une **nouvelle délibération** ou saisir le Conseil constitutionnel. |
| institutions | Qui est le chef des armées ? | Le **président de la République** (art. 15), et non le Premier ministre. |
| institutions | Où siègent l'Assemblée nationale et le Sénat ? | Au **Palais Bourbon** (Assemblée) et au **Palais du Luxembourg** (Sénat). L'Élysée accueille le Président, Matignon le Premier ministre. |
| institutions | Devant qui le Gouvernement est-il responsable ? | Devant l'**Assemblée nationale** (motion de censure, art. 49-50). |
| institutions | Différence entre loi et décret | La **loi** est votée par le Parlement. Le **décret**, pris par le Président ou le Premier ministre, en précise l'application et ne peut pas la contredire. |
| institutions | Combien de députés et de sénateurs ? | **577** députés (5 ans, suffrage direct) et **348** sénateurs (6 ans, suffrage indirect, renouvelés par moitié tous les 3 ans). |
| institutions | Une région peut-elle voter une loi nationale ? | **Non.** Seul le Parlement vote la loi. Les collectivités ont une autonomie administrative limitée. |
| droits | Présomption d'innocence | Toute personne est présumée innocente tant qu'un tribunal ne l'a pas déclarée coupable (DDHC, art. 9). |
| droits | Numéros utiles en plus des 15, 17 et 18 | **112** (urgence européenne), **114** (SMS ou application pour les sourds et malentendants), **3919** (violences faites aux femmes), **119** (enfance en danger), **115** (hébergement d'urgence). |
| histoire | Qui était Jeanne d'Arc ? | Héroïne de la guerre de Cent Ans : libère Orléans (1429), brûlée à Rouen (1431). |
| histoire | Qui était Jean Moulin ? | Unificateur de la Résistance intérieure, mort en 1943, au **Panthéon** depuis 1964. |
| histoire | Qui était Joséphine Baker ? | Artiste de music-hall naturalisée française (1937), **résistante**, militante antiraciste, au **Panthéon** en 2021. Elle peut apparaître comme bonne réponse à « Qui était une figure de la Résistance ? » (NAT l.171). |
| histoire | Courant littéraire de Victor Hugo | **Romantisme.** Auteur des *Misérables* et de *Notre-Dame de Paris*, opposant à la peine de mort, exilé sous Napoléon III, au Panthéon en 1885. |
| histoire | Loi Veil | **1975**, légalisation de l'IVG. L'IVG est **inscrite dans la Constitution depuis le 8 mars 2024** (art. 34 : « liberté garantie »). |
| histoire | Premier président de la Ve République | **Charles de Gaulle** (1959-1969). |
| histoire | Grands fleuves et massifs | Fleuves : Seine, Loire (le plus long fleuve français), Rhône, Garonne. Massifs : Alpes, Pyrénées, Massif central, Jura, Vosges. |
| societe | PACS | Contrat entre deux personnes majeures pour organiser leur vie commune, conclu en mairie ou chez un notaire. |
| societe | Congés payés | **5 semaines** par an (2,5 jours ouvrables par mois travaillé). |
| societe | Contrat de travail sans date de fin | Le **CDI**. |
| societe | Organisme qui verse les prestations familiales et les aides au logement | La **CAF**. La **CPAM** rembourse les soins. |

### 4.2 Mises en situation recensées (reconstituées par les sites et la presse), avec la réponse à retenir

> Selon l'arrêté (`format-examen.md`), les vraies mises en situation relèvent des thèmes **principes** et **droits et devoirs**. Les situations de la vie quotidienne (logement, travail) sont donc à classer en `droits`.
> **Règle d'or** relevée chez plusieurs préparateurs et confirmée par les retours : la bonne réponse est celle qui **applique la loi commune, respecte l'égalité et les droits d'autrui** et passe par les **voies légales** (signaler, porter plainte, saisir l'autorité compétente). Les réponses qui invoquent une tradition, une religion ou une « justice personnelle », ou qui consistent à ignorer ou fuir, sont fausses.

#### Thème « principes » (laïcité, égalité, libertés, fraternité)

| # | Situation (reformulée) | Bonne réponse | Piège ou nuance | Source |
|---|---|---|---|---|
| P1 | Un usager se présente au guichet d'une mairie avec un signe religieux visible. Que fait l'agent ? | **Il le reçoit normalement.** | La neutralité s'impose aux **agents**, pas aux usagers. Seule exception : il est interdit de **dissimuler son visage** dans l'espace public (loi de 2010). | **Candidate NAT** (The Local) |
| P2 | Une collègue agente de mairie, ou un agent de préfecture, porte un signe religieux visible au travail. | **Ce n'est pas permis** : un agent public doit être neutre. Il faut le rappeler ou en référer à la hiérarchie. | À ne pas confondre avec P1 (usager). | PrépaCivique, Franova |
| P3 | Un agent public refuse de servir un usager à cause de sa religion. | **Discrimination illégale.** | Ce n'est pas « appliquer la laïcité ». | DémarchesÉtrangers |
| P4 | Un enseignant d'école publique fait la promotion de sa religion ou de ses opinions politiques en classe. | **Interdit** : neutralité et laïcité de l'enseignement public. | — | PrépaCivique, DémarchesÉtrangers, France Accueil |
| P5 | Votre enfant dit que son enseignante a parlé des différentes religions en classe. | **C'est normal** : l'école enseigne le **fait religieux** de façon neutre. | Il n'y a pas lieu de se plaindre. | Naturalisation France Facile |
| P6 | Un parent veut dispenser sa fille de piscine ou de sport parce que les cours sont mixtes. | **Impossible** : ces cours sont obligatoires pour tous. | Intitulé officiel CR : « peut-on refuser… cours de sport… mixtes ? » : **non**. | Franova, liste CR |
| P7 | Un garçon de 14 ans refuse le cours de sport parce qu'il y a des filles. | Le cours est **obligatoire et mixte**. Le parent doit le rappeler. | — | Naturalisation France Facile |
| P8 | Lors d'un entretien d'embauche, on vous demande votre religion, votre origine, si vous êtes enceinte ou votre situation familiale. | **Question interdite**, car discriminatoire. L'employeur ne peut interroger que sur les **compétences et l'expérience**. | Intitulé officiel NAT l.6. | LeTestCivique, PrépaCivique |
| P9 | Un employeur privé refuse d'embaucher une femme parce qu'elle porte un voile. | **Discrimination religieuse interdite.** | Nuance : dans le **privé**, une restriction est possible seulement si le **règlement intérieur** prévoit une clause de neutralité **justifiée et proportionnée** (Code du travail, art. L1321-2-1), ou pour des raisons d'hygiène ou de sécurité. Dans le **public**, les agents sont toujours neutres. | Préfecture-Alerte, EDUF |
| P10 | Deux salariés, même poste et même ancienneté : la femme est moins payée. | **Illégal** : à travail égal, salaire égal (Code du travail, art. L3221-2). On peut saisir la DRH, l'inspection du travail ou les prud'hommes. | Ce n'est pas « l'employeur fixe librement les salaires ». | **Presse** (ObservAlgérie), Naturalisation France Facile |
| P11 | Un employeur refuse d'embaucher des femmes dans son entreprise. | **Interdit** : discrimination fondée sur le sexe. | Intitulé officiel CR. | Liste CR |
| P12 | Un collègue refuse de travailler avec une femme, ou d'être dirigé par elle. | **Inacceptable** : égalité femmes-hommes. On le signale à l'employeur. | — | Préfecture-Alerte, Ma Formation Civique |
| P13 | Un patient à l'hôpital public refuse d'être soigné par une femme médecin. | Il **ne peut pas exiger** un soignant d'un autre sexe pour des raisons religieuses. Le service s'organise selon les besoins médicaux (charte de la laïcité dans les services publics). | Le « libre choix du médecin » existe en général, mais il ne permet pas de récuser un soignant pour son sexe ou sa religion, ni de perturber le service. | Franova |
| P14 | Une personne critique fortement le gouvernement sur les réseaux sociaux, sans insulte ni appel à la haine. | **Liberté d'expression protégée.** | Les limites sont l'injure, la diffamation, la provocation à la haine ou à la violence, l'apologie du terrorisme et l'atteinte à la vie privée. | DémarchesÉtrangers, LeTestCivique |
| P15 | Quelqu'un publie de fausses informations qui portent atteinte à l'honneur d'une personne. | **Abus sanctionné** (diffamation). | — | DémarchesÉtrangers |
| P16 | Quelqu'un refuse d'appliquer une loi au nom de ses convictions religieuses. | **Interdit** : nul ne peut se prévaloir de ses croyances pour s'affranchir des règles communes. | — | DémarchesÉtrangers, Natification |
| P17 | Un proche veut vous accompagner dans l'isoloir ou voir votre bulletin. | **Refuser** : le vote est **personnel et secret**, et le passage par l'isoloir est obligatoire (Code électoral, art. L62). | Une procuration est possible, mais vous ne pouvez pas voter « à la place » d'une autre personne. | PrépaCivique, liste CR |
| P18 | Un couple veut seulement un mariage religieux. | Le **mariage civil en mairie est obligatoire et préalable**. Un ministre du culte qui célèbre un mariage religieux sans mariage civil préalable commet un délit (Code pénal, art. 433-21). | — | Parlez-vous French |
| P19 | Un salarié demande une salle de prière à son employeur privé. | **L'employeur n'est pas obligé** d'en fournir une. | — | Franova |
| P20 | Un propriétaire refuse de louer à cause de l'origine du candidat locataire. | **Discrimination** (Code pénal, art. 225-1 et 225-2 : jusqu'à 3 ans et 45 000 €). On peut porter plainte ou saisir le Défenseur des droits. | — | PrépaCivique |
| P21 | Une fille est exclue d'une activité parce qu'elle est une fille. | **Contraire à l'égalité femmes-hommes.** | — | France Accueil |
| P22 | Refus de serrer la main d'une collègue pour motif religieux | **Ambigu** : la réponse dépend du contexte. Ne pas l'utiliser comme question d'entraînement. | — | DémarchesÉtrangers (formulation contestable) |

#### Thème « droits et devoirs »

| # | Situation (reformulée) | Bonne réponse | Piège ou nuance | Source |
|---|---|---|---|---|
| D1 | Vous êtes témoin d'un accident ou voyez une personne en danger. | **Alerter les secours** (15, 18 ou 112) et porter secours sans vous mettre en danger. | Ne rien faire est un délit de **non-assistance à personne en danger** (Code pénal, art. 223-6 : 5 ans et 75 000 €). NAT l.130. | Parlez-vous French, liste CR |
| D2 | Vous êtes tiré au sort comme juré d'assises et ne voulez pas y aller. | C'est une **obligation**. Une absence sans motif légitime est punie d'une amende allant jusqu'à **3 750 €**. | NAT l.131 et l.140. | Parlez-vous French |
| D3 | Vous êtes placé en garde à vue. | Vous avez droit à un **avocat dès le début**, au silence, à un médecin, à prévenir un proche et à un interprète. | NAT l.122. | PrépaCivique |
| D4 | Vous recevez une contravention (stationnement). | **La payer ou la contester** dans le délai indiqué sur l'avis (**45 jours** pour l'amende forfaitaire). | Ne pas l'ignorer : l'amende est majorée ensuite. | **Presse** (La Presse) |
| D5 | Un parent ne veut pas inscrire son enfant de 8 ans à l'école. | **Illégal** : l'instruction est obligatoire de **3 à 16 ans**. Sanctions pénales possibles. | NAT l.271-272. | Ma Formation Civique, EDUF |
| D6 | Victime ou témoin de violences conjugales | Appeler le **17** ou le **112**, le **3919**, ou envoyer un SMS au **114**. **Porter plainte.** | — | France Accueil, liste CR |
| D7 | Harcèlement moral au travail | **Signaler** (employeur, médecin du travail, inspection du travail) et **porter plainte**. | Ni se taire ni quitter le pays. | France Accueil, DémarchesÉtrangers |
| D8 | Vous trouvez un portefeuille dans la rue. | Le **rapporter** au commissariat, à la gendarmerie ou au service des objets trouvés de la mairie. | — | France Accueil |
| D9 | Un collègue publie votre photo sur Internet sans votre accord. | **Atteinte au droit à l'image et à la vie privée** (Code civil, art. 9). | — | DémarchesÉtrangers |
| D10 | Une association refuse une personne handicapée sans raison valable. | **Discrimination.** | — | DémarchesÉtrangers |
| D11 | Votre voisin fait du bruit toutes les nuits. | **D'abord en parler calmement** avec lui. Ensuite : conciliateur de justice, puis police en cas de tapage nocturne. | Les sites privés retiennent « dialoguer d'abord ». Appeler la police n'est pas illégal, mais ce n'est pas la première démarche. | Test Civique France, Entraînement Civique, France Accueil |
| D12 | Le propriétaire entre dans votre logement loué sans votre accord. | **Interdit** : il doit respecter le domicile du locataire. | NAT l.238 (ce que le locataire peut faire seul). | France Accueil, PrépaCivique |
| D13 | Un appareil acheté neuf tombe en panne 18 mois après l'achat. | **Garantie légale de conformité de 2 ans**, auprès du **vendeur**. | NAT l.241 (machine à laver cassée). Si elle est irréparable : **déchetterie ou reprise par le vendeur, jamais sur le trottoir** (dépôt sauvage puni d'une amende). | PrépaCivique, listes CSP et CR |
| D14 | Toutes les banques refusent de vous ouvrir un compte. | **Droit au compte** : la **Banque de France** désigne une banque. | — | PrépaCivique |
| D15 | Votre employeur ne vous paie pas votre salaire. | Saisir le **conseil de prud'hommes**, en référé si c'est urgent. | NAT l.265. | PrépaCivique |
| D16 | Vous n'avez pas de revenus imposables. Devez-vous déclarer ? | **Oui** : la déclaration de revenus est **obligatoire chaque année**. | NAT l.7 et l.129. | Franova |
| D17 | Un policier ou un gendarme vous donne un ordre. | **S'y conformer**, puis contester ensuite par les voies légales si nécessaire. | Intitulé CR. | Natification, liste CR |
| D18 | Vous recevez votre carte électorale. | Aller voter au **bureau indiqué**. Une **pièce d'identité** est exigée dans les communes de 1 000 habitants et plus. Voter n'est pas obligatoire. | NAT l.59. | EDUF |
| D19 | On vous propose de travailler « au noir ». | **Interdit** (travail dissimulé). Pas de protection sociale. | NAT l.257. | DémarchesÉtrangers |
| D20 | Quelqu'un jette ses déchets, son mégot ou des encombrants dans la rue. | **Interdit et puni d'une amende** (135 € pour un mégot ou un déchet). | Intitulés CSP et CR. | Listes CSP et CR |

---

## 5. Pièges et ambiguïtés sur des intitulés de la liste NAT

> Repérés en comparant les sites (contradictions entre eux) et les retours. Pour chacun : la réponse la plus probable. Si les deux valeurs figurent parmi les choix, privilégier la **formulation exacte** de la question.

| Intitulé NAT (ligne) | Piège | Réponse à retenir |
|---|---|---|
| Euro, monnaie officielle de la France (l.181) | **1999** (monnaie unique, 1er janvier 1999) ou **2002** (pièces et billets, 1er janvier 2002). Les sites divergent. | Les sites retiennent majoritairement **2002**, qui correspond à l'euro « dans le porte-monnaie ». Connaître les deux dates. |
| Année de fondation de l'UE (l.165) ; traité de Maastricht (l.97) ; citoyenneté européenne (l.90) | Maastricht a été **signé le 7/02/1992** et est **entré en vigueur le 1/11/1993**. | L'intitulé l.97 relie lui-même Maastricht à la « fondation » : **1992**. La citoyenneté européenne date aussi de Maastricht, donc **1992**. Si « 1993 » est seul proposé, c'est l'entrée en vigueur. |
| Depuis quand le Président est-il élu au suffrage universel direct ? (l.164) | Référendum de **1962** ou première élection en **1965**. | **1962** (réforme), première application en 1965. |
| Depuis quelle année l'école publique est-elle gratuite ? (l.175) | Gratuité en **1881**, obligation et laïcité en **1882**. | **1881** pour la gratuité. |
| Depuis quand l'esclavage est-il aboli ? (l.173) | Première abolition en **1794**, rétablissement en 1802, abolition définitive en **1848** (Schœlcher). | **1848** ; l.174 : **Victor Schœlcher**. |
| Durée du congé paternité depuis le 1/07/2021 (l.281) | **25 jours** calendaires, ou **28 jours** avec les 3 jours de congé de naissance. | PrépaCivique propose « 25 jours calendaires ». Si « 28 jours » figure seul, c'est le total. Connaître 25 + 3 = 28. |
| Régions (l.226) et départements (l.84) | **13 régions métropolitaines**, mais **18 au total**. **101 départements** (96 en métropole et 5 en outre-mer). | Lire « métropolitaine » dans l'intitulé : **13**. La liste CR demande « en France » : **18**. |
| 101e département depuis 2011 (l.231) | — | **Mayotte** (31 mars 2011). |
| Île au sud-est du continent africain (l.227) ; île dans l'océan Indien (l.217) | La Réunion et Mayotte sont toutes deux dans l'océan Indien. | Sud-est de l'Afrique : **La Réunion**, à l'est de Madagascar, est la réponse habituelle. Mayotte est entre Madagascar et le Mozambique. Vérifier les choix. |
| Principal port maritime de France (l.225) | **Marseille-Fos** est le 1er port en tonnage. Le Havre est le 1er port à conteneurs. | **Marseille.** |
| Sanction maximale si les parents ne respectent pas l'obligation d'instruction (l.272) | **6 mois et 7 500 €** (refus d'inscription après mise en demeure, Code pénal, art. 227-17-1) ou **2 ans et 30 000 €** (se soustraire à ses obligations parentales, art. 227-17). | PrépaCivique retient « amende et prison » (6 mois et 7 500 €). À recouper avec `faits-actuels.md`. |
| « En France, il est possible pour l'État de financer : » (l.27) | La loi de 1905 interdit de subventionner un culte, **sauf exceptions** : **aumôneries** (armée, prisons, hôpitaux, lycées), **entretien des édifices du culte construits avant 1905** (propriété publique), écoles privées sous contrat, Alsace-Moselle (Concordat). | Retenir les exceptions. Selon les choix, la bonne réponse est l'**aumônerie** ou l'**entretien d'un édifice public du culte**. Le slug de PrépaCivique (« aumoneries ») va dans ce sens, mais sa propre correction donne « écoles publiques et hôpitaux » : **incohérence**. |
| Quel symbole religieux peut être porté à l'école publique ? (l.35) | Élèves : les signes **discrets** sont admis, les signes **ostensibles** interdits (loi du 15/03/2004). Enseignants : **aucun**. | « Un signe **discret** » (petite croix, médaille, petite main de Fatma). |
| Que peut faire un usager du service public dans une mairie ? (l.26) | Confusion entre usager et agent. | L'usager peut **porter un signe religieux** et être **servi sans discrimination**. Il ne peut pas exiger un agent d'un sexe donné ni dissimuler son visage. |
| Dans lequel de ces endroits est-on autorisé à fumer ? (l.125) | Depuis le **1er juillet 2025**, il est **interdit de fumer** sur les plages, dans les parcs et jardins publics, sous les abribus, aux abords des écoles et dans les équipements sportifs (décret du 27/06/2025). | **Chez soi**, ou dans la rue hors abords d'écoles. **Pas** sur une plage ni dans un parc. |
| Que commémore la fête nationale ? (l.17) ; Que signifie le 14 juillet ? (l.153) | La loi de 1880 ne précise pas l'événement. | Prise de la Bastille (**1789**) **et** fête de la Fédération (**1790**). |
| 8 mai (l.169) et 11 novembre (l.172) | Inversion fréquente. | 8 mai : **victoire de 1945** (capitulation de l'Allemagne nazie). 11 novembre : **armistice de 1918**. |
| Qui assure l'intérim du Président en cas de décès ? (l.81) | « Premier ministre » est un distracteur classique. | Le **président du Sénat** (art. 7). |
| Philosophe des Lumières qui a dénoncé l'esclavage (l.184) | Plusieurs l'ont fait. | **Montesquieu** (*De l'esprit des lois*), **Voltaire** (*Candide*), **Condorcet**. En pratique, un seul figurera parmi les choix. |
| Population de la France en 2025 (l.224) | — | Environ **68 à 69 millions** (68,6 millions au 1/01/2025 selon l'Insee). |
| Majorité numérique (l.124) | — | **15 ans** (loi du 7/07/2023). |
| Communes (CR) | — | Environ **35 000** (34 875 au 1/01/2026, DGCL). |

---

## 6. Bonus « trop préparé » : intitulés des listes CR et CSP absents de la liste NAT, avec réponse courte

> Sources : https://formation-civique.interieur.gouv.fr/examen-civique/liste-officielle-des-questions-de-connaissance-cr/ et `…-csp/`. Ces questions ne devraient pas être tirées pour la mention NAT, mais des candidats en ont reçu (section 3). Elles reprennent les mêmes notions du référentiel. Utilisation suggérée : `origin: "complement"`.
> Seuls les intitulés **sans équivalent** dans la liste NAT sont retenus.

**Principes**
- Participation citoyenne : **voter**, s'engager dans une association (bénévolat).
- À quoi sert un titre de séjour ? **Prouver qu'on réside légalement en France.**
- Sur quel site trouve-t-on le symbole (logo Marianne) de la République ? Un **site officiel de l'État**, par exemple service-public.gouv.fr.
- Peut-on refuser que son enfant aille en cours de sport mixte ? **Non.**
- La répudiation : **n'est pas reconnue en France, elle est interdite.** Seul un juge prononce le divorce, ou il se fait par consentement mutuel.
- Que fait l'État contre les discriminations ? Il les **interdit et les sanctionne** (lois, Défenseur des droits).
- Peut-on insulter publiquement quelqu'un parce qu'il est différent ? **Non**, c'est un délit.
- Certains métiers peuvent-ils être réservés aux hommes ? **Non.**
- Langue officielle et place du français : **le français** est la langue de la République (art. 2).
- Neutralité dans une préfecture : elle concerne les **agents**, pas les usagers. La laïcité impose-t-elle aux agents d'être neutres ? **Oui.**
- Qu'interdit la charte de la laïcité à l'école ? Le port de **signes ostensibles** par les élèves, et le fait de **contester un enseignement** ou de refuser un cours pour un motif religieux.
- Un enfant peut-il refuser d'aller à l'école pour une raison religieuse ? **Non.**
- Quel animal symbolise la France ? **Le coq.** Ce qu'on organise sur les Champs-Élysées le 14 juillet : **le défilé militaire.**
- Rôle d'une association : réunir des personnes autour d'un **projet commun non lucratif**.
- Date de la Constitution de la Ve République : **4 octobre 1958.**

**Institutions**
- La loi est l'expression de… : **la volonté générale** (DDHC, art. 6).
- Peut-on voter à la place d'une autre personne ? **Non**, sauf par **procuration**.
- À la fin de son mandat, le Président peut-il rester au pouvoir ? **Non.** 5 ans, au maximum 2 mandats consécutifs.
- Le Président a commis un crime : il est **inviolable pendant son mandat**, et les poursuites ne sont possibles qu'**après** (un mois après la fin). Il peut aussi être **destitué** par le Parlement réuni en Haute Cour (art. 67-68). *Réponse attendue à vérifier selon les choix.*
- Le Président a-t-il tous les pouvoirs ? **Non** (séparation des pouvoirs).
- Pouvoir législatif : **voter les lois** (Parlement). Pouvoir exécutif : **les appliquer** (Président et Gouvernement). Pouvoir judiciaire : **juger** (juges).
- Si un ministre ne respecte pas la loi : il **peut être poursuivi et jugé**, comme tout le monde. Pour les actes liés à ses fonctions, c'est devant la Cour de justice de la République.
- Hôtel de Matignon : **résidence et bureaux du Premier ministre.** Qui réside à l'Élysée ? **Le Président.** Chef du Gouvernement : **le Premier ministre.**
- Qui est le préfet ? Le **représentant de l'État** dans le département (et la région). Qui dirige la commune ? **Le maire.**
- Nombre de députés : **577.** Les sénateurs : **suffrage universel indirect**, renouvelés **par moitié tous les 3 ans** (mandat de 6 ans).
- Combien de régions en France ? **18** (13 en métropole et 5 en outre-mer).
- Rôle principal du département : **solidarité et action sociale** (RSA, personnes âgées, protection de l'enfance), collèges, routes départementales.
- Rôle principal des communes : **services de proximité** (état civil, écoles maternelles et élémentaires, urbanisme).
- Nombre de communes : environ **35 000.**
- Devise de l'UE : **« Unie dans la diversité ».** Couleur du drapeau européen : **bleu, avec 12 étoiles dorées.**
- Élections européennes : **tous les 5 ans.** Pour y voter en France : **être citoyen de l'UE, majeur et inscrit sur les listes.**
- État non membre de l'UE : par exemple la **Suisse**, la **Norvège** ou le **Royaume-Uni** (depuis 2020).
- Que signifie « suffrage universel » ? **Tous les citoyens majeurs peuvent voter**, sans condition de sexe, de revenu, etc.
- Partis politiques : ils **se forment et exercent leur activité librement** (art. 4 ; pluralisme).

**Droits et devoirs**
- Que signifie PMA ? **Procréation médicalement assistée.** Ouverte depuis la loi du 2/08/2021 aux couples de femmes et aux femmes seules. À quelle liberté renvoie-t-elle ? Celle de **fonder une famille, d'avoir un enfant** (liberté de procréer, libre disposition de son corps). *Formulation exacte de la réponse à vérifier.*
- Droit de se marier : mariage **libre** (consentement des deux époux), entre majeurs. Le **mariage forcé est interdit.** Est-il toujours possible de divorcer ? **Oui.**
- La peine de mort est **abolie** (1981) et **interdite par la Constitution** (art. 66-1, 2007).
- L'avortement : **autorisé**, jusqu'à **14 semaines** de grossesse, pour **toute femme, y compris mineure**. **Liberté garantie par la Constitution depuis mars 2024.**
- Qu'est-ce que la Constitution ? Le **texte suprême** : organisation des pouvoirs, droits et libertés. C'est le **texte le plus difficile à modifier.**
- Charte de l'environnement (2004-2005) : le **droit de vivre dans un environnement équilibré et sain**, et le **devoir de le préserver.**
- Dignité humaine : **tout être humain doit être respecté.** Les traitements inhumains et dégradants sont interdits.
- Droit de manifester : **exprimer collectivement ses opinions sur la voie publique**, après déclaration préalable.
- Droit de grève : **cessation collective et concertée du travail** pour des revendications professionnelles, sans salaire pendant la grève.
- Une Française majeure peut-elle voter ? **Oui** (depuis 1944).
- Réseaux sociaux : on est **responsable de ses propos**. Le cyberharcèlement, l'injure et la haine en ligne sont punis.
- Jeter un mégot ou une bouteille par terre : **interdit, amende.** Trier ses déchets : pour **protéger l'environnement** et recycler.
- Victime de violences : **porter plainte**, appeler le **17** ou le **112**. Témoin : **alerter les secours.**
- Rôle de la police et de la gendarmerie : assurer la **sécurité et l'ordre public**, faire respecter la loi. La gendarmerie est militaire et intervient surtout en zone rurale et périurbaine.
- Exemple de crime : **meurtre, viol** (cour d'assises). Exemple de délit : **vol, conduite sans permis** (tribunal correctionnel).
- Obligation pour tous les résidents, quelle que soit leur nationalité : **respecter les lois** (payer ses impôts, scolariser ses enfants).
- Traite des êtres humains : **recruter, transporter ou héberger une personne pour l'exploiter** (travail forcé, prostitution).
- Déclaration des droits de l'homme et du citoyen : **1789** (26 août).

**Histoire, géographie, culture**
- Surnom de Louis XIV : **le Roi-Soleil.**
- Régime instauré en 1792 : **la République** (Ire République). Peine supprimée en 1981 : **la peine de mort.**
- Pourquoi étudier la Shoah à l'école ? Pour le **devoir de mémoire** et pour lutter contre l'**antisémitisme** et le racisme.
- Débarquement de 1944 : **Normandie** (6 juin). La Provence (15 août) est aussi un débarquement : attention aux choix.
- Continent le plus concerné par la décolonisation française : **l'Afrique.**
- CEE : **1957** (traité de Rome). Combien de Républiques ? **Cinq.** Fondateur et premier président élu de la Ve : **Charles de Gaulle.**
- Pays frontaliers de la métropole : Belgique, Luxembourg, Allemagne, Suisse, Italie, Monaco, Espagne, Andorre. Au nord-est : **Belgique, Luxembourg, Allemagne.**
- Où habite la majorité des Français ? **En ville.** Région la plus peuplée : **Île-de-France.** Pays le plus visité au monde : **la France.**
- Combien de francophones ? Environ **320 millions**. Le français est la **5e langue** la plus parlée.
- Cathédrale incendiée en 2019 : **Notre-Dame de Paris** (15 avril 2019, rouverte en décembre 2024).
- Culture : **Joséphine Baker** (artiste, résistante, Panthéon), **Marc Chagall** (peintre, naturalisé français), **Jean de La Fontaine** (fables), chanteuse célèbre : **Édith Piaf**. Fête française : **14 juillet**, Fête de la musique (21 juin). Le **Louvre** est un musée (ancien palais royal).

**Vivre en société**
- Numéro des pompiers : **18.** Après le permis : **assurer** sa voiture, ce qui est obligatoire, et avoir son certificat d'immatriculation.
- Conditions pour passer le permis B : **17 ans minimum** (depuis 2024) et le **code de la route** réussi.
- Mariage reconnu : le mariage **civil**, célébré en mairie.
- Pour fixer un salaire, l'employeur doit respecter **au moins le SMIC**, la **convention collective** et l'**égalité femmes-hommes.**
- France Travail : **accompagne les demandeurs d'emploi** (inscription, indemnisation) et aide les entreprises à recruter.
- Âge minimum pour travailler : **16 ans.** Dès 14 ans, des travaux légers sont possibles pendant les vacances, avec autorisation.
- Problème de santé non urgent : aller voir son **médecin traitant**, qui coordonne le parcours de soins. Les urgences sont réservées aux situations graves (ou appeler le 15).
- Vaccinations obligatoires : **protéger l'enfant et la collectivité.**
- Fin du collège : le **brevet** (DNB). Fin du lycée : le **baccalauréat.**
- Bail : **écrit et signé** par les deux parties. Lave-vaisselle cassé : **déchetterie** ou reprise par le vendeur.
- Contraception : accessible à **toutes**, y compris aux mineures, et gratuite pour les moins de 26 ans.
- Heures supplémentaires : possibles à la demande de l'employeur, **payées avec majoration.**
- Allocations chômage : avoir **travaillé une durée minimale** (6 mois sur les 24 derniers mois en général), avoir perdu son emploi involontairement et être inscrit à France Travail.
- Cantine : **ouverte à tous les élèves**, sans discrimination. École maternelle : **de 3 à 6 ans**, obligatoire depuis 2019.
- Majorité : **18 ans.** Enfant handicapé : a le **droit d'être scolarisé**, de préférence en classe ordinaire (loi de 2005), avec une aide (AESH) si besoin.

---

## 7. Erreurs repérées sur les sites non officiels (à ne pas reproduire)

| Erreur | Où | Correction |
|---|---|---|
| Seuil de 60 % pour les titres de séjour ; « 24 points minimum » | prefecture-alerte.com ; integrationfrance.fr (teaser) | **32/40 (80 %) pour toutes les mentions.** |
| Niveau de langue B1 pour la naturalisation | eduf.fr | **B2** depuis le 1/01/2026 (A2 pour la CSP, B1 pour la CR). |
| L'examen a lieu en préfecture | FAQ de demarchesetrangers.fr | En **centre agréé** (CCI Paris IDF, France Éducation International et leurs réseaux). |
| « Obligatoire depuis 2025 » | questions-naturalisation.fr | **1er janvier 2026.** |
| Décret « n° 2025-647 du 10 juin 2025 » | testciviquefrance.fr | Décret n° 2025-647 du **15 juillet 2025** ; arrêté du **10 octobre 2025** (voir `format-examen.md`). |
| « Pôle emploi » | eduf.fr, blanvillain-avocat.fr | **France Travail** depuis le 1/01/2024. |
| Le 14 juillet = uniquement la prise de la Bastille | maformationcivique.fr, blanvillain-avocat.fr | Bastille (1789) **et** fête de la Fédération (1790). |
| « Nouvelle lecture » demandée par le Président | demarchesetrangers.fr | **Nouvelle délibération** (art. 10). |
| Bonnes réponses presque toujours en position b | Examen blanc n° 6 de demarchesetrangers.fr | Mélanger les choix. C'est déjà prévu par l'application. |
| Deux réponses défendables (financement par l'État) | prepacivique.fr | Voir la section 5. |
| Mélange du QCM et des questions orales de l'entretien d'assimilation | questions-naturalisation.fr, examen-civique-france.fr | Le QCM ne comporte **aucune question ouverte** (« Citez 3 ministres » relève de l'entretien). |
| Réponses générées par IA publiées comme données | data.gouv.fr, « Examen Civique NT » | Ne pas réutiliser. |
| Chiffres de banques de questions contradictoires (450, 480, 675, 800, 1 800, 1 900…) | Plusieurs sites | Liste NAT officielle : **258 intitulés distincts**, plus les mises en situation non publiées. |
| Marge d'erreur annoncée à 5 points | naturalisation-facile.fr | 8 erreurs permises au total. Si 4 mises en situation sont fausses, il reste **4** erreurs possibles en connaissance. |

---

## 8. Recommandations pour l'application

1. **Ajouter les 15 intitulés de la section 1** (`origin: "officielle"`), avec plusieurs variantes de choix, et corriger le fichier texte ou indiquer cet écart dans les données. Sans eux, environ 6 % de la liste officielle n'est pas travaillé.
2. **Mises en situation** : en générer au moins 40 à 60, réparties à parts égales entre `principes` et `droits`, à partir des tableaux 4.2 (P1-P21, D1-D20). Prévoir des distracteurs de type « tradition ou religion d'abord », « se faire justice soi-même », « ignorer ou fuir » et « l'employeur ou le propriétaire fait ce qu'il veut ». Exclure P22 (ambiguë).
3. **Variantes « piège »** pour les intitulés de la section 5 : euro 1999/2002, UE 1992/1993, suffrage universel direct 1962/1965, école 1881/1882, esclavage 1794/1848, congé paternité 25/28, régions 13/18, usager ou agent. Ce sont les questions où les sites se contredisent : elles valent la peine d'être maîtrisées.
4. **Mode bonus « CR/CSP »** (section 6), avec `origin: "complement"`, désactivable. Utile parce que des candidats ont reçu des intitulés de ces listes et qu'elles recouvrent les mêmes notions.
5. **Examen blanc réaliste** : 40 questions en 45 minutes, répartition 11/6/11/8/4 dont 6 + 6 mises en situation, 4 choix et une seule bonne réponse, aucune pénalité. Afficher le décompte « il faut au moins 32 ». Objectif d'entraînement : **36/40 ou plus**.
6. **Avertir l'utilisateur** dans l'application que les mises en situation sont des **reconstitutions**, et que les choix réels du jour J ne sont pas publics.
