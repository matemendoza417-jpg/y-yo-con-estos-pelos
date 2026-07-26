import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-champagne via-nude to-champagne shadow-[0_0_14px_rgba(214,179,106,0.6)]"
    />
  );
}
