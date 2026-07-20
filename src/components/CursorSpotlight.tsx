import { useMotionValue, useSpring, useTransform, motion } from "motion/react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";

// Mismo tratamiento de "luz" que sigue al cursor usado en el hero de Home,
// reutilizable en otras secciones de apertura para no dejar una sola página
// con ese efecto. Solo navy/red a baja opacidad — sin hex nuevos.
export default function CursorSpotlight({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const x = useTransform(spx, (v) => `${v * 100}%`);
  const y = useTransform(spy, (v) => `${v * 100}%`);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <div onMouseMove={onMouseMove} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ "--mx": x, "--my": y } as CSSProperties}
        className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(circle_34vw_at_var(--mx)_var(--my),rgb(165_47_24/0.10),rgb(10_4_36/0.09)_45%,transparent_72%)]"
      />
      {children}
    </div>
  );
}
