import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover" | "media">("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-cursor='media']")) {
        setVariant("media");
        setLabel(target.closest<HTMLElement>("[data-cursor='media']")?.dataset.cursorLabel ?? "Ver");
      } else if (target?.closest("a, button, [data-cursor='hover']")) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };
    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  const size = variant === "media" ? 96 : variant === "hover" ? 56 : 40;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-champagne mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-champagne/60 text-[10px] uppercase tracking-[0.2em] text-cream transition-[width,height,background-color] duration-300 ease-out mix-blend-difference"
        style={{
          width: size,
          height: size,
          backgroundColor: variant === "media" ? "rgba(214,179,106,0.9)" : "transparent",
          color: variant === "media" ? "#111" : undefined,
        }}
      >
        {variant === "media" ? label : ""}
      </div>
    </>
  );
}
