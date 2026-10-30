import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";

export default function StudioSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div ref={containerRef} className="px-4 md:px-10 py-6 md:py-20 perspective-1000">
      <motion.section 
        style={{ scale }}
        className="bg-cream relative overflow-hidden text-ink rounded-2xl flex flex-col items-center justify-center"
      >

        <div className="w-full relative z-10 px-6 md:px-10 lg:px-20 py-14 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center justify-center text-center max-w-5xl lg:max-w-6xl mx-auto">
          
          <Reveal className="flex flex-col items-center justify-center w-full">
            <h2 className="font-sans font-medium tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6 sm:mb-8 md:mb-12 text-balance">
              ¿Listo para construir?
            </h2>

            <Magnetic className="flex justify-center">
              <Link
                to="/contacto"
                data-cursor="Agendar"
                className="group relative inline-flex items-center justify-center gap-3 md:gap-4 rounded-xl sm:rounded-2xl px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 md:py-4.5 lg:py-5 bg-ink text-cream hover:bg-navy transition-all hover:scale-105 shadow-xl shadow-black/5 w-fit mx-auto"
              >
                <span className="text-xs sm:text-sm md:text-base tracking-[0.12em] md:tracking-widest uppercase font-bold text-center whitespace-nowrap">
                  Agendá un diagnóstico
                </span>
                <span className="text-lg sm:text-xl md:text-2xl leading-none transition-transform duration-500 group-hover:translate-x-1.5">
                  {"\u2192\uFE0E"}
                </span>
              </Link>
            </Magnetic>
          </Reveal>

        </div>
      </motion.section>
    </div>
  );
}
