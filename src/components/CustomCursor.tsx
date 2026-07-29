import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Cursor placeholder: un visor tipo "handle de selección" (referencia directa
 * al motivo de UI de diseño superpuesto a fotografía del brief de dirección
 * creativa). Reemplazar el marcador central por el ícono del cliente cuando
 * lo pase — el resto del sistema (spring, label, estados) queda intacto.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  const active = Boolean(label);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block"
      style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          scale: pressed ? 0.85 : active ? 1.3 : 1,
          rotate: active ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative flex items-center justify-center"
        style={{ width: 34, height: 34 }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="stroke-cream">
          <path d="M1 9V3a2 2 0 0 1 2-2h6" strokeWidth="1.4" />
          <path d="M33 9V3a2 2 0 0 0-2-2h-6" strokeWidth="1.4" />
          <path d="M1 25v6a2 2 0 0 0 2 2h6" strokeWidth="1.4" />
          <path d="M33 25v6a2 2 0 0 1-2 2h-6" strokeWidth="1.4" />
          <circle cx="17" cy="17" r="1.6" className="fill-cream" />
        </svg>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-cream text-ink absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] tracking-wide uppercase"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
