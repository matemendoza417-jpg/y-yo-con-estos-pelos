import { useRef, useState, useCallback } from "react";
import before from "../assets/before.jpg";
import after from "../assets/after.jpg";

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-graphite select-none md:aspect-[16/10]"
      onMouseDown={(e) => {
        dragging.current = true;
        move(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => move(e.touches[0].clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      data-cursor="hover"
    >
      <img
        src={after}
        alt="Después de la transformación"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt="Antes"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-carbon/70 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cream backdrop-blur">
        Antes
      </div>
      <div className="pointer-events-none absolute right-6 top-6 rounded-full bg-champagne px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-carbon">
        Después
      </div>

      <div
        className="absolute inset-y-0 w-px bg-champagne shadow-[0_0_30px_rgba(214,179,106,0.8)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-champagne bg-carbon/80 backdrop-blur text-champagne">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 6L2 12l6 6M16 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
