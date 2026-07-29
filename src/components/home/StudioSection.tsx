import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";

import Beams from "../Beams";

export default function StudioSection() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="px-4 md:px-10 pb-10 md:pb-20 perspective-1000">
      {/* Floating Rectangle */}
      <motion.section 
        style={{ scale }}
        data-theme="dark"
        className="bg-navy relative overflow-hidden text-cream rounded-2xl md:rounded-2xl flex flex-col items-center justify-center"
      >
        
        {/* Background Beams - Vertical exactly like Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Beams
            beamWidth={2}
            beamHeight={20}
            beamNumber={40}
            lightColor="#F2EBE9"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={isMobile ? 90 : 0}
          />
        </div>

        <div className="w-full relative z-10 px-6 md:px-10 lg:px-20 py-24 md:py-28 flex flex-col items-center justify-center text-center max-w-5xl lg:max-w-6xl mx-auto">
          
          <Reveal>
            <h2 className="font-sans font-medium tracking-tight text-4xl md:text-5xl lg:text-7xl leading-[1.1] mb-10 text-balance">
              ¿Listo para <span className="font-serif italic font-normal text-cream/70">construir?</span>
            </h2>

            <div className="flex flex-col gap-6 text-lg md:text-xl lg:text-2xl opacity-80 leading-relaxed mb-16 max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-balance md:text-wrap">
              <p>
                Craft mantiene un número de clientes que le permite estar presente de verdad en cada proyecto. Tiempo, experiencia y honestidad al servicio de cada marca — así es como el estudio entiende el trabajo y quiere crecer.
              </p>
              <p>
                Si llegaste hasta acá, probablemente tenés algo que comunicar que todavía no encontró la forma correcta de decirse. Eso es exactamente lo que Craft hace.
              </p>
            </div>
            
            <Magnetic>
              <Link
                to="/contacto"
                data-cursor="Contacto"
                className="group relative flex md:inline-flex items-center justify-center gap-2 md:gap-4 rounded-full px-6 md:px-10 py-5 bg-cream text-navy hover:bg-white transition-all hover:scale-105 shadow-xl shadow-black/10 w-full md:w-auto"
              >
                <span className="text-[10px] md:text-base tracking-widest uppercase font-bold text-center">Empezar un proyecto con Craft</span>
                <span className="text-xl leading-none transition-transform duration-500 group-hover:translate-x-2">{"\u2192\uFE0E"}</span>
              </Link>
            </Magnetic>
          </Reveal>

        </div>
      </motion.section>
    </div>
  );
}
