import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#equipo", label: "Equipo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`glass grain flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "scale-[0.97] py-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]" : ""
        }`}
      >
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-champagne to-gold text-carbon">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 20c3-8 5-12 8-16 1 6 3 10 8 16" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-lg leading-none tracking-tight text-cream">
            Y Yo Con Estos Pelos
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-[13px] uppercase tracking-[0.14em] text-cream/75 transition-colors hover:text-cream"
              >
                <span className="relative z-10">{l.label}</span>
                <span className="absolute inset-0 scale-75 rounded-full bg-cream/5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-[12px] uppercase tracking-[0.18em] text-carbon transition-all duration-300 hover:bg-champagne hover:shadow-[0_10px_30px_-8px_rgba(214,179,106,0.6)]"
        >
          Reservar
          <span className="text-champagne group-hover:text-carbon">→</span>
        </a>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 top-0 h-px w-full bg-cream transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
            <span className={`absolute left-0 top-1.5 h-px w-full bg-cream transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 bottom-0 h-px w-full bg-cream transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>

      {/* Mobile sheet */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
        className="glass grain absolute left-4 right-4 top-20 rounded-3xl p-6 md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-lg font-display text-cream hover:bg-cream/5"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-champagne px-4 py-3 text-sm uppercase tracking-[0.18em] text-carbon"
            >
              Reservar
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
