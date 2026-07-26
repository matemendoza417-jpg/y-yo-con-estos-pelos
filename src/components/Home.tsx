import { motion, useScroll, useTransform, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { Magnetic } from "@/components/Magnetic";
import { SplitReveal } from "@/components/SplitReveal";
import { Typewriter } from "@/components/Typewriter";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BeforeAfter } from "@/components/BeforeAfter";


import hero from "@/assets/hero.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import s1 from "@/assets/stylist-1.jpg";
import s2 from "@/assets/stylist-2.jpg";
import s3 from "@/assets/stylist-3.jpg";

const services = [
  { n: "01", title: "Balayage", copy: "Reflejos pintados a mano con transiciones invisibles. Un rubio hecho a tu piel.", tags: ["Rubio", "Californianas", "Iluminación"] },
  { n: "02", title: "Color", copy: "Tinte de autor. Fórmulas mezcladas para tu tono, tu piel y tu carácter.", tags: ["Cobertura", "Fashion", "Moda"] },
  { n: "03", title: "Corrección", copy: "Rescatamos colores fallidos con protocolos técnicos y química controlada.", tags: ["Decoloración", "Matiz", "Reparación"] },
  { n: "04", title: "Extensiones", copy: "Cabello premium colocado con técnicas invisibles. Volumen y longitud reales.", tags: ["Keratina", "Cinta", "Cosidas"] },
  { n: "05", title: "Tratamientos", copy: "Botox capilar, nutrición profunda y rituales que devuelven el brillo verdadero.", tags: ["Nutrición", "Brillo", "Reconstrucción"] },
  { n: "06", title: "Corte & Styling", copy: "Cortes editoriales pensados para caer solos. Peinados para el día que importa.", tags: ["Editorial", "Novias", "Evento"] },
];

const steps = [
  { n: "I", title: "Escucha", copy: "Nos sentamos contigo. Entendemos qué buscas, qué rechazas y hasta dónde quieres llegar." },
  { n: "II", title: "Diagnóstico", copy: "Analizamos tu cabello, su historia química y su potencial real." },
  { n: "III", title: "Diseño", copy: "Creamos un color y una forma únicos, dibujados sobre ti, no sobre una foto." },
  { n: "IV", title: "Ejecución", copy: "Manos expertas, productos de alta gama y tiempos precisos." },
  { n: "V", title: "Ritual final", copy: "Tratamiento, styling y una despedida que ya sabes que no será la última." },
];

const stylists = [
  { name: "Laura", role: "Directora & Colorista", img: s1 },
  { name: "Marta", role: "Especialista rubios", img: s2 },
  { name: "Nadia", role: "Estilista senior", img: s3 },
];

const gallery = [g1, g2, g3, g4, s1, g1, g2, s2];

const testimonials = [
  { name: "Andrea M.", body: "Fui con un color imposible de un mal salón. Me lo arreglaron sin destrozarme el pelo. Ya no voy a otro sitio." },
  { name: "Elena R.", body: "El balayage más natural que me han hecho jamás. Y el trato: como si te cuidaran de verdad." },
  { name: "Carla P.", body: "Salí de allí sintiéndome otra persona. Es difícil describir el nivel de detalle que ponen." },
  { name: "Sofía G.", body: "Extensiones invisibles, literalmente. Nadie las nota. Yo tampoco cuando me miro." },
  { name: "Nuria V.", body: "Un espacio precioso, un equipo que sabe lo que hace. No hay peluquería así en Alcoy." },
];

const faqs = [
  { q: "¿Cuánto dura una sesión de balayage?", a: "Entre 2 y 4 horas, según el largo y el punto de partida. Reservamos siempre tiempo suficiente para no comprometer el resultado." },
  { q: "¿Puedo pedir cita solo para consulta?", a: "Sí. Las consultas de color son gratuitas y muy recomendables antes de un cambio grande." },
  { q: "¿Trabajáis correcciones de color?", a: "Es una de nuestras especialidades. Cada corrección se planifica en varias sesiones para cuidar el cabello." },
  { q: "¿Qué extensiones colocáis?", a: "Cabello 100% natural europeo, en técnicas de queratina, cinta adhesiva y microring." },
];

function Marquee() {
  const items = ["Balayage", "Color", "Rubios", "Corrección", "Extensiones", "Tratamientos", "Corte", "Styling"];
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
          <span key={t} className="rounded-full border border-cream/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-cream/70">
            {t}
          </span>
        ))}
      </div>
      <div className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-cream/60 transition-colors group-hover:text-champagne">
        Reservar
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
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
          alt="Modelo con balayage rubio en Y Yo Con Estos Pelos"
          className="h-full w-full object-cover object-[center_30%] opacity-70"
          width={1600}
          height={1808}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon/40 via-carbon/20 to-carbon" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0b0b0c_85%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-16 pt-40 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] text-cream/70"
        >
          <span className="h-px w-10 bg-champagne" />
          Peluquería de autor · Alcoy
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
            className="max-w-lg text-lg leading-relaxed text-cream/80 md:text-xl"
          >
            <Typewriter
              as="span"
              text="Color, balayage y transformaciones que no se copian, se diseñan. Un estudio en Alcoy pensado para el pelo que otros no saben tratar."
              startDelay={1400}
              speed={18}
            />
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9 }}
            className="flex flex-wrap items-center justify-start gap-4 md:justify-end"
          >
            <Magnetic>
              <a
                href="#contacto"
                data-cursor="hover"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-cream px-7 py-4 text-sm uppercase tracking-[0.2em] text-carbon transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(214,179,106,0.7)]"
              >
                <span className="absolute inset-0 -z-0 bg-gradient-to-r from-champagne via-nude to-champagne opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="relative z-10">Reservar cita</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href="#trabajo"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-6 py-4 text-sm uppercase tracking-[0.2em] text-cream transition-colors hover:border-champagne hover:text-champagne"
              >
                Ver trabajos
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-16 flex items-end justify-between gap-6 border-t border-cream/10 pt-6 text-[11px] uppercase tracking-[0.24em] text-cream/50"
        >
          <span>Est. Alcoy · Since 2014</span>
          <span className="hidden md:block">↓ Scroll · Descubre el estudio</span>
          <span>N. 001 — Color · Balayage · Autor</span>
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
            text="Un estudio, no una peluquería."
            className="font-display text-5xl leading-[0.95] text-cream md:text-7xl"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Typewriter
            as="p"
            text="Nacimos en Alcoy con una obsesión: hacer el color que el resto no se atreve. Cada cabeza es un proyecto. Cada mechón, una decisión. Trabajamos con marcas de alta gama, técnicas internacionales y una manía sana por el detalle."
            className="text-lg leading-relaxed text-cream/80 md:text-xl"
            speed={14}
          />

          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-cream/10 pt-8">
            {[
              { to: 10, prefix: "+", suffix: "", label: "años creando" },
              { to: 6, prefix: "+", suffix: "k", label: "clientas felices" },
              { to: 100, prefix: "", suffix: "%", label: "cabello cuidado" },
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
              text="Lo que hacemos, mejor que nadie."
              className="font-display max-w-3xl text-5xl leading-[0.95] text-cream md:text-7xl"
            />
          </div>
          <p className="max-w-sm text-fog">
            Seis disciplinas, un solo estándar: hacerlo bien, aunque cueste más tiempo.
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
            Trabajos reales de nuestro estudio. Sin filtros, sin trampas, sin retoques.
            Solo técnica, tiempo y buen gusto.
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
                alt="Trabajo del estudio"
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
            Un equipo pequeño, formado fuera y dentro. Cada una con su especialidad.
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
        <span className="text-[11px] uppercase tracking-[0.28em] text-champagne">Ellas lo cuentan</span>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex animate-marquee gap-6">
          {doubled.map((t, i) => (
            <figure key={i} className="glass w-[380px] shrink-0 rounded-3xl p-8 md:w-[440px]">
              <div className="mb-4 flex gap-1 text-champagne">
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
        <p className="mx-auto mt-8 max-w-xl text-lg text-cream/80">
          Reservamos plaza limitada cada día para cuidar el detalle. Escríbenos y te
          proponemos tu hueco.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <a
              href="https://wa.me/34600000000"
              data-cursor="hover"
              className="group inline-flex items-center gap-3 rounded-full bg-champagne px-8 py-4 text-sm uppercase tracking-[0.2em] text-carbon transition-shadow duration-500 hover:shadow-[0_20px_60px_-15px_rgba(214,179,106,0.9)]"
            >
              WhatsApp
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="tel:+34965000000"
              data-cursor="hover"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-4 text-sm uppercase tracking-[0.2em] text-cream hover:border-champagne hover:text-champagne"
            >
              +34 965 000 000
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 grid gap-8 border-t border-cream/10 pt-10 text-left md:grid-cols-3">
          {[
            ["Estudio", "C/ San Nicolás 12\n03801 Alcoy, Alicante"],
            ["Horario", "Mar — Vie · 10:00 — 20:00\nSáb · 09:00 — 15:00"],
            ["Contacto", "hola@yyoconestospelos.es\n@yyoconestospelos"],
          ].map(([t, v]) => (
            <div key={t}>
              <div className="text-[11px] uppercase tracking-[0.24em] text-champagne">{t}</div>
              <div className="mt-3 whitespace-pre-line text-cream/85">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-carbon py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-[11px] uppercase tracking-[0.22em] text-fog md:flex-row">
        <span>© {new Date().getFullYear()} Y Yo Con Estos Pelos · Alcoy</span>
        <span>Estudio de peluquería de autor</span>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Nav />

      <Hero />
      <Marquee />
      <Specialists />
      <Services />
      <BeforeAfterSection />
      <Process />
      <GalleryGrid />
      <Team />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
