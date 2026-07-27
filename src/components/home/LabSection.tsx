import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../Reveal";
import Marquee from "../Marquee";

export default function LabSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -100]);

  return (
    <section ref={containerRef} className="bg-cream text-ink py-32 md:py-48 relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
      
      {/* Huge subtle background text / Marquee */}
      <div className="absolute inset-0 z-0 flex flex-col justify-center pointer-events-none opacity-[0.03] overflow-hidden -rotate-6 scale-110">
        <Marquee items={["CRAFT LAB", "✦", "EDITORIAL", "✦", "IDEAS", "✦"]} className="text-[12rem] md:text-[18rem] font-serif italic" />
      </div>

      {/* Decorative floating rings (Animated background) */}
      <motion.div style={{ y: y3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[40vw] md:h-[40vw] border border-ink/10 rounded-full pointer-events-none z-0" />
      <motion.div style={{ y: y1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[60vw] md:h-[60vw] border border-ink/5 rounded-full pointer-events-none z-0" />

      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        <Reveal>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-16 lg:gap-12 w-full">
            
            {/* Massive Asymmetrical Title */}
            <div className="flex-shrink-0 lg:-translate-y-8">
              <h2 className="font-serif italic text-8xl md:text-[10rem] lg:text-[13rem] leading-[0.8] tracking-tight text-navy -ml-1 md:-ml-3">
                Craft<br/>Lab<span className="text-red">.</span>
              </h2>
            </div>
            
            {/* Text Block aligned to the right/bottom */}
            <div className="max-w-2xl">
              <p className="text-xs md:text-sm tracking-widest uppercase mb-8 flex items-center gap-6 text-red font-bold">
                <span className="w-16 h-[1.5px] bg-red" /> Manifiesto Editorial
              </p>
              
              <p className="font-sans text-2xl md:text-4xl lg:text-5xl leading-[1.3] text-balance opacity-90 font-medium">
                Un espacio de ideas, ensayos y curadurías donde desglosamos la <span className="font-serif italic text-red">mirada Craft:</span> observar el contexto para entender cómo las marcas se construyen, se comunican y responden al paradigma actual.
              </p>
            </div>
            
          </div>
        </Reveal>
      </div>
    </section>
  );
}
