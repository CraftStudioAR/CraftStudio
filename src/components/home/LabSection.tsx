import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { Link } from "react-router-dom";

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
      


      {/* Decorative floating rings (Animated background) */}
      <motion.div style={{ y: y3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[40vw] md:h-[40vw] border border-ink/10 rounded-full pointer-events-none z-0" />
      <motion.div style={{ y: y1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[60vw] md:h-[60vw] border border-ink/5 rounded-full pointer-events-none z-0" />

      <div className="w-full relative z-10 px-6 md:px-10">
        <Reveal className="w-fit mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-fit md:translate-x-4 lg:translate-x-8">
            
            {/* Title */}
            <div className="flex-shrink-0">
              <h2 className="font-serif italic text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.8] tracking-tight text-navy">
                Craft<br/>Lab<span className="text-red">.</span>
              </h2>
            </div>
            
            {/* Text Block */}
            <div className="max-w-[500px]">
              <p className="text-xs md:text-sm tracking-widest uppercase mb-6 flex items-center gap-6 text-red font-bold">
                <span className="w-12 h-[1.5px] bg-red" /> Manifiesto Editorial
              </p>
              
              <p className="font-sans text-2xl md:text-4xl lg:text-5xl leading-[1.2] text-balance opacity-90 font-medium tracking-tight">
                Un espacio de ideas, ensayos y curadurías donde desglosamos la <span className="italic text-red">mirada Craft.</span>
              </p>
              
              <div className="mt-8 md:mt-12">
                <Magnetic>
                  <Link
                    to="/craft-lab"
                    className="group relative flex justify-center items-center gap-4 rounded-full px-8 py-3.5 bg-ink text-cream hover:bg-navy transition-all hover:scale-105 shadow-xl w-fit"
                  >
                    <span className="font-bold uppercase tracking-widest text-xs md:text-sm">Explorar el Lab</span>
                    <span className="text-xl leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">{"\u2197\uFE0E"}</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
            
          </div>
        </Reveal>
      </div>
    </section>
  );
}
