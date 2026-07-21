import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { LogoMark } from "../Logo";
import { values } from "../../content/brand";
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
        className="bg-navy relative overflow-hidden text-cream rounded-[2rem] md:rounded-[4rem] flex flex-col items-center justify-center"
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

        <div className="w-full relative z-10 px-6 md:px-10 lg:px-20 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Manifesto */}
          <div>
            <Reveal>
              <h2 className="font-sans font-bold text-6xl md:text-[8vw] leading-none tracking-tighter opacity-15 mb-8">
                ESTUDIO
              </h2>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.3] mb-12 text-balance">
                Un estudio que piensa como estratega y construye como artesano.
              </h3>
              
              <Magnetic>
                <Link
                  to="/estudio"
                  data-cursor="Conocer"
                  className="group relative inline-flex items-center gap-4 rounded-full px-8 py-4 bg-cream text-navy hover:bg-white transition-colors duration-300"
                >
                  <LogoMark className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
                  <span className="text-sm tracking-widest uppercase font-medium">Conocer el estudio</span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          {/* Right: Values cleanly aligned */}
          <div className="flex flex-col mt-10 lg:mt-0">
            {values.slice(0, 4).map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="flex items-start gap-6 border-b border-white/10 py-5 md:py-6 first:pt-0">
                  <span className="font-serif italic text-2xl md:text-3xl opacity-30 mt-1">
                    0{i + 1}
                  </span>
                  <div>
                     <h4 className="font-serif italic text-2xl md:text-4xl mb-2 text-cream">{v.title}</h4>
                     <p className="opacity-60 text-sm md:text-base leading-relaxed max-w-sm">{v.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </motion.section>
    </div>
  );
}
