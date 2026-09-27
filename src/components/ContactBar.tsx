import { Phone, MapPin, CalendarCheck } from "lucide-react";
import { MAIN, mapsSearch } from "@/lib/business";

/**
 * Barra de contacto fija: solo móvil/tablet (md:hidden), z-50 y respetando el
 * safe-area del iPhone. Tres acciones: llamar al local principal, cómo llegar y
 * reservar. No hay botón de WhatsApp porque no hay un número de WhatsApp
 * confirmado: los dos teléfonos son fijo y no se publica un canal no verificado.
 */
export function ContactBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 divide-x divide-cream/10 bg-carbon/95 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <a
          href={MAIN.phoneHref}
          className="flex flex-col items-center gap-1.5 py-3 text-[0.68rem] font-semibold tracking-[0.08em] text-cream uppercase"
        >
          <Phone className="size-5 text-champagne" aria-hidden="true" />
          Llamar
        </a>
        <a
          href={mapsSearch(MAIN)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 py-3 text-[0.68rem] font-semibold tracking-[0.08em] text-cream uppercase"
        >
          <MapPin className="size-5 text-champagne" aria-hidden="true" />
          Cómo llegar
        </a>
        <a
          href="#contacto"
          className="flex flex-col items-center gap-1.5 py-3 text-[0.68rem] font-semibold tracking-[0.08em] text-cream uppercase"
        >
          <CalendarCheck className="size-5 text-champagne" aria-hidden="true" />
          Reservar
        </a>
      </div>
    </div>
  );
}
