import Link from "next/link";

export default function NotFound() {
  return (
    <div className="card space-y-3 p-8 text-center">
      <p className="text-4xl font-bold">404</p>
      <p className="text-slate-600 dark:text-slate-400">Cette page n'existe pas.</p>
      <Link href="/" className="btn btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}
