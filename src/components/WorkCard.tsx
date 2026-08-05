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
            <img
              src={cld(work.cover.publicId, "f_auto,q_auto,w_800")}
              alt={work.cover.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <>
              <GlyphMark
                variant={index}
                className="absolute h-[75%] w-[75%] text-cream/25 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:text-cream/35"
              />
              <span className="font-serif relative px-6 text-center text-2xl sm:text-3xl text-cream/95 italic transition-transform duration-700 ease-out group-hover:scale-105">
                {work.client}
              </span>
            </>
          )}
          {work.cover && (
            <>
              <div className="absolute inset-0 bg-ink/35" />
              <span className="font-serif relative px-6 text-center text-2xl sm:text-3xl text-cream/95 italic transition-transform duration-700 ease-out group-hover:scale-105">
                {work.client}
              </span>
            </>
          )}
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

      <div className="mt-3 flex items-center justify-between text-xs sm:text-sm">
        <span className="font-medium text-cream/80">{work.category}</span>
        <span className="font-mono text-cream/50">{work.year}</span>
      </div>
      {work.tags?.length > 0 && (
        <div className="mt-2 flex flex-wrap sm:flex-nowrap gap-1.5 overflow-hidden min-w-0">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-cream/15 px-2 py-0.5 text-[10px] tracking-wide uppercase text-cream/60 truncate max-w-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
