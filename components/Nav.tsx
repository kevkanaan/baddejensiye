"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Accueil", icon: HomeIcon },
  { href: "/entrainement", label: "S'entraîner", icon: TargetIcon },
  { href: "/examen", label: "Examen blanc", icon: ClockIcon },
  { href: "/fiches", label: "Fiches", icon: BookIcon },
  { href: "/progression", label: "Progrès", icon: ChartIcon },
];

export default function Nav() {
  const path = usePathname();
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <>
      {/* Barre du haut (ordinateur) */}
      <header className="sticky top-0 z-30 hidden border-b border-slate-200 bg-white/85 backdrop-blur md:block dark:border-slate-800 dark:bg-slate-950/85">
        <nav className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-2">
          <Link href="/" className="mr-3 flex items-center gap-2 font-bold whitespace-nowrap">
            <Flag />
            Examen civique
          </Link>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-2.5 py-2 text-sm font-medium whitespace-nowrap transition ${
                active(l.href)
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {[
            { href: "/jour-j", label: "Jour J", cls: "ml-auto" },
            { href: "/questions", label: "Questions", cls: "" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${l.cls} rounded-lg px-2.5 py-2 text-sm font-medium whitespace-nowrap transition ${
                active(l.href)
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Barre du bas (téléphone) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="grid grid-cols-5">
          {LINKS.map((l) => {
            const Icon = l.icon;
            const on = active(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                    on ? "text-france-blue dark:text-blue-400" : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function Flag() {
  return (
    <span className="flex h-5 w-7 overflow-hidden rounded-sm ring-1 ring-slate-300 dark:ring-slate-700" aria-hidden>
      <span className="flex-1 bg-france-blue" />
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-france-red" />
    </span>
  );
}

type IconProps = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

function HomeIcon(p: IconProps) {
  return (
    <svg {...base} className={p.className} aria-hidden>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function TargetIcon(p: IconProps) {
  return (
    <svg {...base} className={p.className} aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}
function ClockIcon(p: IconProps) {
  return (
    <svg {...base} className={p.className} aria-hidden>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6" />
    </svg>
  );
}
function BookIcon(p: IconProps) {
  return (
    <svg {...base} className={p.className} aria-hidden>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 21V5M8 7h7M8 11h7" />
    </svg>
  );
}
function ChartIcon(p: IconProps) {
  return (
    <svg {...base} className={p.className} aria-hidden>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </svg>
  );
}
