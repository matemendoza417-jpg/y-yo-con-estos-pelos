import { motion, useScroll, useTransform, useInView, useMotionValue, animate, MotionConfig } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Phone, MapPin, Clock, CreditCard } from "lucide-react";
import { Nav } from "@/components/Nav";
import { ContactBar } from "@/components/ContactBar";
import { Magnetic } from "@/components/Magnetic";
import { SplitReveal } from "@/components/SplitReveal";
import { Typewriter } from "@/components/Typewriter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BeforeAfter } from "@/components/BeforeAfter";
import { BUSINESS, LOCATIONS, MAIN, mapsDirections, mapsSearch } from "@/lib/business";

import hero from "@/assets/hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import s1 from "@/assets/stylist-1.jpg";
import s2 from "@/assets/stylist-2.jpg";
import s3 from "@/assets/stylist-3.jpg";

/*
 * Carta de servicios. Lo verificado del negocio es "peluquería, barbería y
 * estética unisex" más "estudiamos tu imagen, tratamientos capilares". El resto
 * son las specialization habituales de un salón de ese tipo: se presentan como
 * propuesta a validar con el dueño, no como carta confirmada.
 */
const services = [
  {
    n: "01",
    title: "Peluquería",
    copy: "Corte, color y peinado para el día a día. Nos cuentas lo que buscas y lo resolvemos con lo que tu pelo necesita, no con lo que más se vende.",
    tags: ["Corte", "Color", "Peinado"],
  },
  {
    n: "02",
    title: "Barbería",
    copy: "Afeitado, perfilado de barba y cuidados de piel. Con la misma mano y el mismo trato que en el resto de servicios.",
    tags: ["Barba", "Perfilado", "Piel"],
  },
  {
    n: "03",
    title: "Estética",
    copy: "Tratamientos de estética en el mismo sitio que el pelo. Para ti… todo en un mismo lugar.",
    tags: ["Estética", "Unisex"],
  },
  {
    n: "04",
    title: "Tratamientos capilares",
    copy: "Estudiamos tu imagen y trabajamos el cabello con los tratamientos que necesita, no los que se venden solos.",
    tags: ["Diagnóstico", "Reparación", "Nutrición"],
  },
  {
    n: "05",
    title: "Color",
    copy: "Tintes, mechas y balayage. Elegimos el tono pensando en tu pelo y en cómo llevas el estilo, no en el catálogo.",
    tags: ["Tinte", "Mechas", "Balayage"],
  },
  {
    n: "06",
    title: "Corte & Styling",
    copy: "Cortes que caen solos y peinados para los días que importan. Para todos, de la primera a la última.",
    tags: ["Corte", "Evento", "Ocasion"],
  },
];

const steps = [
  { n: "I", title: "Escucha", copy: "Nos sentamos contigo y entendemos qué buscas, qué no quieres y hasta dónde quieres llegar." },
  { n: "II", title: "Diagnóstico", copy: "Miramos el cabello, su historia y su estado antes de proponer nada." },
  { n: "III", title: "Diseño", copy: "Proponemos un color y una forma pensados para ti, no para una foto de catálogo." },
  { n: "IV", title: "Ejecución", copy: "Cuidado en cada detalle y tiempo el que haga falta para no correr." },
  { n: "V", title: "Ritual final", copy: "Tratamiento, styling y una despedida que ya sabes que no va a ser la última." },
];

/* Equipo: material de muestra. Los nombres son de la propuesta de diseño, no
   del personal real del negocio. */
const stylists = [
  { name: "Muestra 1", role: "Dirección y color", img: s1 },
  { name: "Muestra 2", role: "Especialista en rubios", img: s2 },
  { name: "Muestra 3", role: "Barbería y estética", img: s3 },
];

const gallery = [g1, g2, g3, g4, s1, g1, g2, s2];

/* Opiniones de muestra: material de diseño, no reseñas reales verificadas. */
const testimonials = [
  { name: "Muestra", body: "Fui con un color imposible de un mal salón. Me lo arreglaron sin destrozarme el pelo. Ya no voy a otro sitio." },
  { name: "Muestra", body: "El balayage más natural que me han hecho jamás. Y el trato: como si te cuidaran de verdad." },
  { name: "Muestra", body: "Salí de allí sintiéndome otra persona. Es difícil describir el nivel de detalle que ponen." },
  { name: "Muestra", body: "Extensiones invisibles, literalmente. Nadie las nota. Yo tampoco cuando me miro." },
  { name: "Muestra", body: "Un espacio precioso, un equipo que sabe lo que hace. No hay peluquería así en Alcoy." },
];

const faqs = [
  {
    q: "¿Cuántos locales tenéis?",
    a: "Dos, ambos en Alcoi. El principal está en Calle Juan de Juanes, 17 BAJO (03802) y el segundo en Avenida Hispanidad, 61 (03804). Cada uno tiene su propio teléfono.",
  },
  {
    q: "¿Qué ofrecéis?",
    a: "Peluquería, barbería y estética unisex, más tratamientos capilares. Para ti… todo en un mismo lugar.",
  },
  {
    q: "¿Con cuántos años contáis?",
    a: "Más de 20 años. Es el dato que publica el propio negocio en sus directorios y es el que se repite en esta web.",
  },
  {
    q: "¿Trabajáis con cita previa?",
    a: "Lo confirmamos al reservar. Llama al local que te quede más cerca y te decimos directamente qué huecos hay.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "No publicamos precios hasta que el negocio los confirme. Llámanos y te damos el presupuesto por teléfono.",
  },
];

function Marquee() {
  const items = ["Peluquería", "Barbería", "Estética", "Color", "Tratamientos", "Corte", "Styling"];
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-cream/10 py-6">
      <div className="flex animate-marquee whitespace-nowrap gap-16">
        {doubled.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-16 font-display text-4xl md:text-6xl">
            <span className={i % 2 === 0 ? "text-cream" : "text-stroke"}>{t}</span>
            <span className="text-champagne">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Counter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, mv]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

function ServiceCard({ n, title, copy, tags, i }: { n: string; title: string; copy: string; tags: string[]; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-graphite/60 p-8 transition-all duration-500 hover:border-champagne/40 hover:-translate-y-1"
      data-cursor="hover"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-champagne/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      <div className="flex items-baseline justify-between">
        <span className="font-display text-sm text-champagne">{n}</span>
        <span className="h-px w-14 bg-cream/20 transition-all group-hover:w-24 group-hover:bg-champagne" />
      </div>
      <h3 className="font-display mt-6 text-4xl leading-[0.95] text-cream md:text-5xl">{title}</h3>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog">{copy}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="rounded-full border border-cream/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cream/80">
            {t}
          </span>
        ))}
      </div>
      <a
        href={MAIN.phoneHref}
        className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-champagne"
      >
        Reservar
        <span aria-hidden="true">→</span>
      </a>
    </motion.article>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden ambient-gold grain">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src={hero}
          alt="Cabello con color en el salón Y Yo Con Estos Pelos de Alcoi"
          className="h-full w-full object-cover object-[center_30%] opacity-70"
          width={1600}
          height={1808}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 via-carbon/40 to-carbon" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b0b0c_85%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-16 pt-40 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-cream/80"
        >
          <span className="h-px w-10 bg-champagne" />
          Peluquería, barbería y estética · Alcoi
        </motion.div>

        <h1 className="font-display text-[14vw] leading-[0.86] tracking-[-0.03em] text-cream md:text-[9vw]">
          <SplitReveal as="span" text="Y yo con" className="block" delay={0.3} animateOnMount />
          <SplitReveal
            as="span"
            text="estos pelos."
            className="block italic text-shimmer"
            delay={0.55}
            animateOnMount
          />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="max-w-lg"
          >
            <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
              {BUSINESS.claim}. {BUSINESS.promise} {BUSINESS.slogan}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9 }}
            className="flex flex-wrap items-center justify-start gap-4 md:justify-end"
          >
            <Magnetic>
              <a
                href={MAIN.phoneHref}
                data-cursor="hover"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cream px-7 py-4 text-sm uppercase tracking-[0.2em] text-carbon transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(214,179,106,0.7)]"
              >
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-champagne via-nude to-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Phone className="relative z-10 size-4" aria-hidden="true" />
                <span className="relative z-10">{MAIN.phone}</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={mapsSearch(MAIN)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-carbon/40 px-6 py-4 text-sm tracking-[0.14em] text-cream backdrop-blur-sm transition-colors hover:border-champagne hover:text-champagne"
              >
                {MAIN.street}, {MAIN.postalCode}
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-cream/15 pt-6 text-[11px] uppercase tracking-[0.24em] text-cream/70"
        >
          <span>{BUSINESS.claim} · Alcoi</span>
          <span className="hidden md:block">2 locales · Juan de Juanes 17 y Av. Hispanidad 61</span>
          <span>Lun – Sáb · 08:00 – 20:00</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Specialists() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <span className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> Sobre nosotras
          </span>
          <SplitReveal
            as="h2"
            text="Un espacio, no una peluquería más."
            className="font-display text-5xl leading-[0.95] text-cream md:text-7xl"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-lg leading-relaxed text-cream/85 md:text-xl">
            {BUSINESS.claim} dedicándose a la peluquería, la barbería y la estética en Alcoi. Dos
            locales, el mismo equipo y el mismo criterio: {BUSINESS.promise.toLowerCase()}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {[
              { to: 20, prefix: "+", suffix: "", label: "años de salón" },
              { to: 2, prefix: "", suffix: "", label: "locales en Alcoi" },
              { to: 3, prefix: "", suffix: "", label: "servicios: pelo, barba, estética" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl text-champagne md:text-5xl">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-fog">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
              <span className="h-px w-8 bg-champagne" /> Servicios
            </span>
            <SplitReveal
              as="h2"
              text="Todo en un mismo lugar."
              className="font-display max-w-3xl text-5xl leading-[0.95] text-cream md:text-7xl"
            />
          </div>
          <p className="max-w-sm text-fog">
            Carta propuesta para la web. El negocio todavía no publica su lista de servicios, así
            que se confirma con el dueño antes de darla por buena.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.n} {...s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const [active, setActive] = useState(LOCATIONS[0].id);
  const loc = LOCATIONS.find((l) => l.id === active) ?? LOCATIONS[0];

  return (
    <section id="locales" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> Dónde estamos
          </span>
          <SplitReveal
            as="h2"
            text="Dos locales en Alcoi."
            className="font-display text-5xl leading-[0.95] text-cream md:text-7xl"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-4">
            {LOCATIONS.map((l) => {
              const isActive = l.id === active;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setActive(l.id)}
                  aria-pressed={isActive}
                  className={`rounded-3xl border p-7 text-left transition-colors duration-500 ${
                    isActive
                      ? "border-champagne/60 bg-graphite/80"
                      : "border-cream/10 bg-graphite/40 hover:border-cream/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                        {l.name}
                      </span>
                      <p className="font-display mt-2 text-2xl leading-tight text-cream">
                        {l.street}
                      </p>
                      <p className="mt-1 text-sm text-fog">
                        {l.postalCode} {l.city}, {l.region}
                      </p>
                    </div>
                    <Phone className="size-5 shrink-0 text-champagne" aria-hidden="true" />
                  </div>
                  <p className="mt-5 font-display text-3xl text-cream">{l.phone}</p>
                </button>
              );
            })}

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              <a
                href={loc.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-4 text-sm uppercase tracking-[0.16em] text-carbon transition-colors hover:bg-champagne"
              >
                Llamar
              </a>
              <a
                href={mapsDirections(loc)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-4 text-sm uppercase tracking-[0.16em] text-cream transition-colors hover:border-champagne hover:text-champagne"
              >
                Cómo llegar
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-3xl border border-cream/10">
              <iframe
                key={loc.id}
                title={`Mapa de ${BUSINESS.name} en ${loc.street}, ${loc.city}`}
                src={`https://maps.google.com/maps?q=${loc.mapsQuery}&hl=es&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 md:h-[420px]"
              />
            </div>

            <div className="rounded-3xl border border-cream/10 bg-graphite/50 p-7">
              <span className="text-[11px] uppercase tracking-[0.22em] text-champagne">
                Horario · {loc.name}
              </span>
              {loc.hours ? (
                <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {loc.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 border-b border-cream/10 pb-2">
                      <dt className="text-sm text-fog">{h.days}</dt>
                      <dd className="text-sm text-cream">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 flex items-center gap-2 text-sm text-fog">
                  <Clock className="size-4 text-champagne" aria-hidden="true" />
                  {loc.hoursNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  return (
    <section id="trabajo" className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> Antes / Después
          </span>
          <SplitReveal
            as="h2"
            text="La diferencia se ve. Deslízala."
            className="font-display text-5xl leading-[0.95] text-cream md:text-7xl"
          />
          <p className="mt-6 max-w-md text-fog">
            <strong className="text-cream">Material de muestra.</strong> Estas comparaciones son
            de la propuesta de diseño, no trabajos reales del salón. Se sustituyen por los
            trabajos del negocio cuando se faciliten.
          </p>
        </div>
        <div className="md:col-span-7">
          <BeforeAfter />
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const height = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="proceso" ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> El ritual
          </span>
          <SplitReveal
            as="h2"
            text="Cinco pasos. Un resultado que no se olvida."
            className="font-display text-5xl leading-[0.95] text-cream md:text-7xl"
          />
        </div>

        <div className="relative pl-10 md:pl-20">
          <div className="absolute left-2 top-0 h-full w-px bg-cream/10 md:left-6" />
          <motion.div style={{ height }} className="absolute left-2 top-0 w-px bg-champagne shadow-[0_0_20px_rgba(214,179,106,0.6)] md:left-6" />

          <div className="flex flex-col gap-16">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="relative grid gap-4 md:grid-cols-[auto_1fr_2fr] md:items-baseline md:gap-12"
              >
                <span className="absolute -left-10 top-2 grid h-4 w-4 place-items-center rounded-full border border-champagne bg-carbon md:-left-[62px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                </span>
                <span className="font-display text-3xl text-champagne">{s.n}</span>
                <h3 className="font-display text-4xl text-cream md:text-5xl">{s.title}</h3>
                <p className="max-w-md text-fog">{s.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryGrid() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-[110rem] px-4">
        <p className="mb-8 px-2 text-center text-[11px] uppercase tracking-[0.24em] text-fog">
          Galería de muestra · se sustituye por fotos reales del salón
        </p>
        <div className="columns-2 gap-4 md:columns-4">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.05 }}
              className="mb-4 overflow-hidden rounded-2xl bg-graphite break-inside-avoid"
              data-cursor="media"
              data-cursor-label="Ver"
            >
              <img
                src={src}
                alt="Trabajo del salón, imagen de muestra"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="equipo" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
              <span className="h-px w-8 bg-champagne" /> Equipo
            </span>
            <SplitReveal
              as="h2"
              text="Manos que piensan."
              className="font-display text-5xl leading-[0.95] text-cream md:text-7xl"
            />
          </div>
          <p className="max-w-sm text-fog">
            <strong className="text-cream">Material de muestra.</strong> Los nombres y las fotos
            son de la propuesta de diseño, no del personal real del negocio.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {stylists.map((p, i) => (
            <motion.figure
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl bg-graphite ${i === 1 ? "md:mt-12" : ""}`}
              data-cursor="hover"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-carbon via-carbon/70 to-transparent p-6">
                <div>
                  <div className="font-display text-3xl text-cream">{p.name}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-champagne">{p.role}</div>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-cream/30 text-cream transition-all group-hover:border-champagne group-hover:text-champagne group-hover:rotate-45">↗</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden border-y border-cream/10 py-20">
      <div className="mb-10 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-champagne">
          Opiniones de muestra de esta propuesta
        </p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex animate-marquee gap-6">
          {doubled.map((t, i) => (
            <figure key={i} className="glass w-[380px] shrink-0 rounded-3xl p-8 md:w-[440px]">
              <div className="mb-4 flex gap-1 text-champagne" aria-hidden="true">
                {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
              </div>
              <blockquote className="font-display text-2xl leading-snug text-cream">
                “{t.body}”
              </blockquote>
              <figcaption className="mt-6 text-[11px] uppercase tracking-[0.24em] text-fog">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="mb-4 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
            <span className="h-px w-8 bg-champagne" /> Preguntas
          </span>
          <SplitReveal
            as="h2"
            text="Lo que siempre nos preguntan."
            className="font-display text-5xl leading-[0.95] text-cream md:text-6xl"
          />
        </div>
        <div className="md:col-span-8">
          <ul className="divide-y divide-cream/10 border-y border-cream/10">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    data-cursor="hover"
                  >
                    <span className="font-display text-2xl text-cream md:text-3xl">{f.q}</span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cream/20 text-cream transition-transform duration-500 ${isOpen ? "rotate-45 border-champagne text-champagne" : ""}`}>
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 text-fog">{f.a}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contacto" className="relative overflow-hidden py-32 md:py-48 ambient-gold grain">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/10 blur-3xl animate-float-slow" />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <span className="mb-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-champagne">
          <span className="h-px w-8 bg-champagne" /> Reserva
        </span>
        <h2 className="font-display text-[14vw] leading-[0.86] text-cream md:text-[9vw]">
          <SplitReveal as="span" text="Ven a" className="block" />
          <SplitReveal as="span" text="cambiar de pelo." className="block italic text-shimmer" delay={0.15} />
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-cream/85">
          {BUSINESS.slogan} Llama al local que te quede más cerca y te damos hora.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {LOCATIONS.map((l) => (
            <div key={l.id} className="rounded-3xl border border-cream/10 bg-graphite/50 p-7 text-left backdrop-blur-sm">
              <span className="text-[11px] uppercase tracking-[0.22em] text-champagne">{l.name}</span>
              <p className="mt-3 flex items-start gap-2 text-cream/90">
                <MapPin className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden="true" />
                <span>
                  {l.street}
                  <br />
                  {l.postalCode} {l.city}, {l.region}
                </span>
              </p>
              <a
                href={l.phoneHref}
                className="mt-4 inline-flex items-center gap-2 font-display text-2xl text-cream transition-colors hover:text-champagne"
              >
                <Phone className="size-4 text-champagne" aria-hidden="true" />
                {l.phone}
              </a>
              <a
                href={mapsDirections(l)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-[11px] uppercase tracking-[0.18em] text-fog transition-colors hover:text-champagne"
              >
                Cómo llegar →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 border-t border-cream/10 pt-10 text-left md:grid-cols-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-champagne">Horario</div>
            <div className="mt-3 space-y-1 text-cream/85">
              {(MAIN.hours ?? []).map((h) => (
                <div key={h.days} className="flex justify-between gap-4 text-sm">
                  <span className="text-fog">{h.days}</span>
                  <span>{h.hours}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-fog">Local principal · {MAIN.street}</p>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.24em] text-champagne">Redes</div>
            <ul className="mt-3 space-y-2 text-cream/85">
              {BUSINESS.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline underline-offset-4 transition-colors hover:text-champagne"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-champagne">
              <CreditCard className="size-4" aria-hidden="true" /> Formas de pago
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {BUSINESS.payment.map((p) => (
                <li key={p} className="rounded-full border border-cream/15 px-3 py-1 text-[11px] text-cream/80">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-fog">Datos publicados por el propio negocio.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-carbon py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-[11px] uppercase tracking-[0.22em] text-fog md:flex-row md:items-start md:justify-between">
        <span className="text-center md:text-left">
          © {new Date().getFullYear()} Y Yo Con Estos Pelos · Alcoi
          <span className="mt-2 block normal-case tracking-normal text-fog/80">
            Peluquería, barbería y estética unisex · {BUSINESS.claim}
          </span>
        </span>

        <nav aria-label="Páginas legales" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href="/aviso-legal" className="transition-colors hover:text-cream">Aviso legal</a>
          <a href="/privacidad" className="transition-colors hover:text-cream">Privacidad</a>
          <a href="/cookies" className="transition-colors hover:text-cream">Cookies</a>
        </nav>

        <p className="max-w-sm text-center normal-case leading-relaxed tracking-normal text-fog/80 md:text-right">
          Propuesta de diseño. Las fotografías, los nombres del equipo y las opiniones mostradas son
          material de muestra.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    /* reducedMotion="user": si la persona pide menos movimiento, framer-motion
       desactiva las animaciones de transformación y mantiene solo el cross-fade. */
    <MotionConfig reducedMotion="user">
      <main className="relative">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-champagne focus:px-5 focus:py-3 focus:text-sm focus:text-carbon"
        >
          Saltar al contenido
        </a>
        <ScrollProgress />
        <Nav />

        <div id="contenido">
          <Hero />
          <Marquee />
          <Specialists />
          <Services />
          <Locations />
          <BeforeAfterSection />
          <Process />
          <GalleryGrid />
          <Team />
          <Testimonials />
          <FAQ />
          <CTA />
        </div>
        <Footer />
        <ContactBar />
      </main>
    </MotionConfig>
  );
}
