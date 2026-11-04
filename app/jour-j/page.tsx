import Link from "next/link";
import type { Metadata } from "next";
import { EXAM } from "@/lib/exam-config";
import { THEME_BY_ID } from "@/lib/themes";

export const metadata: Metadata = { title: "Le jour J" };

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-france-blue underline underline-offset-2 dark:text-blue-400">
    {children}
  </a>
);

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card space-y-3 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="space-y-2 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">{children}</div>
    </section>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export default function Page() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Le jour J</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Format officiel, règles et stratégie. Sources : arrêté du 10 octobre 2025, service-public.gouv.fr, organismes agréés.
        </p>
      </div>

      <Block title="L'épreuve en bref">
        <ul className="grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
          {[
            [EXAM.total, "questions (QCM)"],
            [EXAM.durationMin + " min", "au maximum"],
            [EXAM.passMark + "/40", "pour réussir (80 %)"],
            ["4", "choix, 1 seule bonne réponse"],
          ].map(([v, l]) => (
            <li key={String(l)} className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              <p className="text-xl font-bold">{v}</p>
              <p className="text-xs text-slate-500">{l}</p>
            </li>
          ))}
        </ul>
        <p>
          <b>28 questions de connaissance + 12 mises en situation</b>, sur ordinateur (jamais sur papier). Une mauvaise réponse ou
          une absence de réponse vaut 0 : <b>aucun point négatif</b>. On peut revenir sur les questions ; un récapitulatif signale
          les questions sans réponse avant la validation.
        </p>
        <div className="space-y-1.5 pt-1 text-sm">
          {EXAM.distribution.map((d) => (
            <div key={d.theme} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${THEME_BY_ID[d.theme].dot}`} />
              <span className="flex-1">{THEME_BY_ID[d.theme].label}</span>
              <span className="tabular-nums text-slate-500">
                {d.connaissance + d.situation}
                {d.situation > 0 && ` (dont ${d.situation} mises en situation)`}
              </span>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Avant le jour J">
        <ul className="space-y-2">
          <Check>
            Vérifiez que la <b>convocation</b> porte bien la mention <b>« Naturalisation »</b>, la date, l'heure et l'adresse
            (regardez aussi dans les spams).
          </Check>
          <Check>
            Vérifiez que votre <b>titre de séjour</b> (ou passeport / carte d'identité pour un citoyen de l'UE) sera{" "}
            <b>valide le jour J</b>. En cas de doute (récépissé, titre expiré), appelez le centre.
          </Check>
          <Check>
            Visez <b>au moins 36/40 en examen blanc</b> pour garder une marge : le stress et les formulations inattendues coûtent
            des points.
          </Check>
          <Check>
            Faites des examens blancs <b>complets, chronométrés à 45 min</b>, surtout les derniers jours.
          </Check>
          <Check>
            Travaillez les <b>mises en situation</b> (laïcité, égalité femmes-hommes, discriminations, liberté d'expression,
            impôts, police, droits du locataire et du salarié).
          </Check>
        </ul>
      </Block>

      <Block title="Le jour même">
        <ul className="space-y-2">
          <Check>
            Arrivez <b>en avance</b> : <b>aucun retardataire n'est admis</b>.
          </Check>
          <Check>
            Apportez la <b>convocation</b> et une <b>pièce d'identité valide</b>. Sans elle, ou si vous refusez la photo, vous ne
            pourrez pas passer l'examen.
          </Check>
          <Check>
            Passez aux toilettes avant : <b>toute sortie de la salle est définitive</b>.
          </Check>
          <Check>
            Téléphone <b>éteint et rangé</b>, pas de montre connectée ni d'écouteurs, rien sur les genoux, pas de brouillon.
          </Check>
          <Check>
            Lors de la photo et de la signature, <b>vérifiez l'orthographe de vos nom et prénom, date et lieu de naissance et
            numéro AGDREF</b> : ils seront recopiés sur l'attestation.
          </Check>
        </ul>
      </Block>

      <Block title="Pendant l'épreuve : la stratégie">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Environ <b>1 minute par question</b>. Premier passage rapide sur ce que vous savez, puis revenez sur les questions
            laissées de côté.
          </li>
          <li>
            <b>Ne laissez aucune question sans réponse</b> : une mauvaise réponse ne retire aucun point.
          </li>
          <li>
            Lisez la question <b>et les 4 propositions</b> jusqu'au bout. Attention aux négations (« laquelle est{" "}
            <b>fausse</b> / <b>in</b>correcte ? ») et aux pièges de dates, nombres et durées.
          </li>
          <li>
            <b>Mise en situation</b> : éliminez d'abord les réponses illégales, discriminatoires ou violentes, puis celles où l'on
            « se fait justice soi-même ». La bonne réponse respecte presque toujours <b>la loi, les droits d'autrui et la
            neutralité du service public</b>.
          </li>
          <li>Un problème technique ? Levez la main immédiatement : l'examen reprend là où il s'était arrêté.</li>
        </ul>
      </Block>

      <Block title="Après l'examen">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Résultats sous <b>12 à 48 h</b>, par e-mail ou sur le compte candidat. <b>Téléchargez et sauvegardez l'attestation</b>{" "}
            (validité illimitée, mais archivage limité chez l'organisme).
          </li>
          <li>L'attestation se joint au dossier de naturalisation au moment du dépôt.</li>
          <li>En cas d'échec, on peut repasser l'examen sans limite de tentatives (chaque passage est payant, 60 à 80 €).</li>
          <li>
            L'<b>entretien d'assimilation</b> en préfecture reste à préparer à part : les mêmes connaissances y servent.
          </li>
        </ul>
      </Block>

      <Block title="Ressources officielles gratuites">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <A href="https://formation-civique.interieur.gouv.fr/">formation-civique.interieur.gouv.fr</A> — fiches thématiques et
            entraînement du ministère de l'Intérieur.
          </li>
          <li>
            <A href="https://www.service-public.gouv.fr/particuliers/vosdroits/F39426">service-public.gouv.fr — Examen civique (naturalisation)</A>
          </li>
          <li>
            <A href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000052381620">Arrêté du 10 octobre 2025</A> — format et
            référentiel officiel (annexe I).
          </li>
          <li>
            <A href="https://www.lefrancaisdesaffaires.fr/wp-content/uploads/2025/12/examen-civique-naturalisation-questions-de-connaissance.pdf">
              Liste officielle des questions de connaissance (naturalisation)
            </A>
          </li>
        </ul>
        <p className="text-sm text-slate-500">
          Le ministère met en garde contre les sites payants (risque de fraude ou de fausses informations) : la préparation
          officielle est gratuite.
        </p>
      </Block>

      <div className="grid gap-2 sm:grid-cols-2">
        <Link href="/examen" className="btn btn-primary py-3">
          Faire un examen blanc
        </Link>
        <Link href="/entrainement?type=situation&start=1" className="btn btn-ghost py-3">
          M'entraîner aux mises en situation
        </Link>
      </div>
    </div>
  );
}
