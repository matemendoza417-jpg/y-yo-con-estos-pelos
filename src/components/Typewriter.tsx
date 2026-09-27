import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

interface Props {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number;
  startDelay?: number;
  caret?: boolean;
}

export function Typewriter({
  text,
  as: Tag = "p",
  className = "",
  speed = 22,
  startDelay = 0,
  caret = true,
}: Props) {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  // Con movimiento reducido el texto aparece entero: no se escribe letra a letra.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setStarted(true);
      setDone(true);
      setI(text.length);
    }
  }, [reduceMotion, text]);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!started || reduceMotion) return;
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      setI((prev) => {
        if (prev >= text.length) {
          setDone(true);
          return prev;
        }
        return prev + 1;
      });
      timeout = setTimeout(() => {
        raf = requestAnimationFrame(tick);
      }, speed);
    };
    const start = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout!);
      cancelAnimationFrame(raf);
    };
  }, [started, text, speed, startDelay, reduceMotion]);

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, i)}</span>
      {caret && !reduceMotion && (
        <span
          aria-hidden="true"
          className={`ml-1 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-champagne align-middle ${
            done ? "animate-[tw-blink_1.1s_steps(2)_infinite]" : ""
          }`}
        />
      )}
    </Tag>
  );
}
