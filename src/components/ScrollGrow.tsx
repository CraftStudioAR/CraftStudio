import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Escala un elemento a medida que entra/cruza el viewport por scroll — la
 * versión propia del "imágenes que crecen con el scroll" que se tomó como
 * referencia, aplicada a cualquier bloque (no solo fotos).
 */
export default function ScrollGrow({
  children,
  from = 0.85,
  to = 1,
  className = "",
  style,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [from, to, from]);

  return (
    <motion.div ref={ref} style={{ ...style, scale }} className={className}>
      {children}
    </motion.div>
  );
}
