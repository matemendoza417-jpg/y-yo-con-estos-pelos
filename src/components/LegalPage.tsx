import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ContactBar } from "@/components/ContactBar";
import { BUSINESS, LOCATIONS, SITE_URL } from "@/lib/business";

const NAV = [
  { to: "/aviso-legal", label: "Aviso legal" },
  { to: "/privacidad", label: "Privacidad" },
  { to: "/cookies", label: "Cookies" },
];

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b border-cream/10">
        <div className="mx-auto flex h-20 max-w-4xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            to="/"
            className="font-display text-xl tracking-tight text-cream"
          >
            {BUSINESS.name}
          </Link>
          <Link
            to="/"
            className="rounded-full border border-cream/20 px-5 py-2.5 text-[0.7rem] tracking-[0.18em] text-cream uppercase transition-colors hover:bg-cream hover:text-carbon"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <span className="text-[0.7rem] tracking-[0.28em] text-champagne uppercase">Legal</span>
        <h1 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] text-cream">
          {title}
        </h1>
        <p className="mt-3 text-sm text-fog">Última actualización: {updated}</p>

        <div className="mt-12 space-y-6 text-[0.95rem] leading-[1.85] text-fog [&_a]:text-cream [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-champagne [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-cream [&_li]:ml-5 [&_li]:list-disc [&_li]:mb-2 [&_strong]:text-cream [&_table]:w-full [&_table]:text-sm [&_td]:border [&_td]:border-cream/10 [&_td]:p-3 [&_td]:align-top [&_th]:border [&_th]:border-cream/10 [&_th]:p-3 [&_th]:bg-graphite [&_th]:text-left [&_th]:font-medium [&_th]:text-cream">
          {children}
        </div>

        <nav className="mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/10 pt-8" aria-label="Páginas legales">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[0.7rem] tracking-[0.16em] text-fog uppercase transition-colors hover:text-cream"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </main>

      <footer className="border-t border-cream/10">
        <div className="mx-auto max-w-4xl space-y-3 px-5 py-8 text-xs leading-relaxed text-fog/80 sm:px-8">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name} · {LOCATIONS[0].street},{" "}
            {LOCATIONS[0].postalCode} {LOCATIONS[0].city} · {LOCATIONS[0].phone} ·{" "}
            {LOCATIONS[1].street} · {LOCATIONS[1].phone}
          </p>
          <p>
            Propuesta de diseño publicada en {SITE_URL}. Las fotografías, los nombres del equipo y
            las opiniones mostradas son material de muestra.
          </p>
        </div>
      </footer>
      <ContactBar />
    </div>
  );
}
