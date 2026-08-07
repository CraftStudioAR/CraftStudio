import { useRef, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "motion/react";
import GlyphMark from "./GlyphMark";
import ScrollGrow from "./ScrollGrow";
import { cld } from "../lib/cloudinary";
import type { WorkCase } from "../content/brand";

// Solo combina los 4 hex oficiales de marca — sin tonos inventados.
const bgs = ["from-red to-ink", "from-navy to-ink", "from-ink to-navy", "from-red to-navy"];

export default function WorkCard({
  work,
  index,
  total,
  to,
  cursorLabel = "Ver caso",
}: {
  work: WorkCase;
  index: number;
  total: number;
  to: string;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 250, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 250, damping: 22 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 10);
    rotateX.set(py * -10);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <Link to={to} data-cursor={cursorLabel} className="group block w-full min-w-0">
      <ScrollGrow from={0.82} to={1} shrinkBack={false} style={{ perspective: 900 }}>
        <motion.div
          ref={ref}
          data-theme="dark"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
          className={`relative flex w-full min-w-0 aspect-[3/4] sm:aspect-[4/3] md:aspect-[4/3] max-h-[44vh] md:max-h-none items-center justify-center overflow-hidden ${
            work.cover ? "bg-ink" : `bg-gradient-to-br ${bgs[index % bgs.length]}`
          }`}
        >
          {work.cover ? (
            <>
              <img
                src={cld(work.cover.publicId, "f_auto,q_auto,w_800")}
                alt={work.cover.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Degradado sólo al pie: la foto tiene que leerse, el nombre se apoya abajo. */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
            </>
          ) : (
            <GlyphMark
              variant={index}
              className="absolute h-[75%] w-[75%] text-cream/25 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:text-cream/35"
            />
          )}

          {/* El nombre de la marca va con nuestra tipografía, nunca con su logo. */}
          <span className="font-sans font-bold uppercase tracking-[0.28em] absolute bottom-7 left-6 right-16 text-left text-lg sm:text-xl md:text-2xl leading-tight text-cream/95 transition-transform duration-700 ease-out origin-bottom-left group-hover:scale-105">
            {work.client}
          </span>

          <div className="grain-overlay !absolute !opacity-15" />
          <div className="glass-sheen" />

          <span className="absolute top-4 left-4 h-3 w-3 border-t border-l border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
          <span className="absolute top-4 right-4 h-3 w-3 border-t border-r border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
          <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
          <span className="absolute right-4 bottom-4 h-3 w-3 border-r border-b border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

          <span className="absolute right-4 bottom-4 text-xs tracking-widest text-cream/70 uppercase">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </motion.div>
      </ScrollGrow>

      {/* En la grilla lo importante es entender rápido qué se desarrolló; el detalle
          del proceso vive dentro del caso. Los colores heredan del contexto porque
          la tarjeta se usa sobre fondo oscuro (home) y sobre crema (/trabajos). */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-current text-sm sm:text-base font-medium leading-snug opacity-90">
            {work.title ?? work.client}
          </h3>
          <span className="font-mono text-current text-xs opacity-40 shrink-0">{work.year}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {[work.category, work.scope?.[0]].filter(Boolean).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-current/20 px-3 py-1 text-[10px] sm:text-[11px] tracking-wide uppercase opacity-60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
