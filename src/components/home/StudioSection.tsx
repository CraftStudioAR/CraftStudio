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
    <div ref={containerRef} className="px-4 md:px-10 pb-10 md:pb-20 perspective-1000">
      <motion.section 
        style={{ scale }}
        className="bg-cream relative overflow-hidden text-ink rounded-2xl flex flex-col items-center justify-center"
      >

        <div className="w-full relative z-10 px-6 md:px-10 lg:px-20 py-24 md:py-28 flex flex-col items-center justify-center text-center max-w-5xl lg:max-w-6xl mx-auto">
          
          <Reveal>
            <h2 className="font-sans font-medium tracking-tight text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-10 text-balance">
              ¿Listo para construir?
            </h2>

            <div className="flex flex-col gap-6 text-lg md:text-xl lg:text-2xl opacity-80 leading-relaxed mb-16 max-w-3xl lg:max-w-4xl mx-auto text-balance">
              <p>
                Si llegaste hasta acá, probablemente tenés algo que comunicar que todavía no encontró la forma correcta de decirse. Eso es exactamente lo que Craft hace.
              </p>
            </div>
            
            <Magnetic>
              <Link
                to="/contacto"
                data-cursor="Agendar"
                className="group relative flex md:inline-flex items-center justify-center gap-2 md:gap-4 rounded-xl px-6 md:px-10 py-5 bg-ink text-cream hover:bg-navy transition-all hover:scale-105 shadow-xl shadow-black/5 w-full md:w-auto"
              >
                <span className="text-[10px] md:text-sm tracking-widest uppercase font-bold text-center">Agendá un diagnóstico</span>
                <span className="text-xl leading-none transition-transform duration-500 group-hover:translate-x-2">{"\u2192\uFE0E"}</span>
              </Link>
            </Magnetic>
          </Reveal>

        </div>
      </motion.section>
    </div>
  );
}
