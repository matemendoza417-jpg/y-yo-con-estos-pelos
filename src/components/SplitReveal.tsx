import { motion, useReducedMotion } from "framer-motion";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  animateOnMount?: boolean;
}

export function SplitReveal({
  text,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.04,
  className = "",
  animateOnMount = false,
  ...rest
}: Props) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");
  const anim = { y: "0%", opacity: 1, filter: "blur(0px)" };
  const initial = reduceMotion ? false : { y: "110%", opacity: 0, filter: "blur(8px)" };
  return (
    <Tag className={className} {...(rest as object)}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={initial}
            {...(animateOnMount
              ? { animate: anim }
              : { whileInView: anim, viewport: { once: true, margin: "-10%" } })}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
