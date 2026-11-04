import type { Metadata, Viewport } from "next";
import Nav from "@/components/Nav";
import RegisterSW from "@/components/RegisterSW";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Examen civique — Préparation naturalisation", template: "%s · Examen civique" },
  description:
    "Entraînement à l'examen civique (naturalisation) : questions officielles, mises en situation, examens blancs chronométrés et fiches de révision.",
  applicationName: "Examen civique",
  appleWebApp: { capable: true, title: "Examen civique", statusBarStyle: "default" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-dvh">
        <Nav />
        <main className="pb-safe mx-auto w-full max-w-3xl px-4 pt-4 md:pt-8">{children}</main>
        <RegisterSW />
      </body>
    </html>
  );
}
