import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../Reveal";

const steps = [
  "DIAGNÓSTICO",
  "EVALUACIÓN",
  "PLANIFICACIÓN",
  "RESULTADO FINAL"
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-cream text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <Reveal>
          <div className="max-w-2xl mb-16 md:mb-24">
            <p className="text-sm tracking-widest text-red uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-red" /> Cómo Trabajamos
            </p>
            <h2 className="font-sans font-medium tracking-tight text-4xl md:text-6xl lg:text-7xl">
              El proceso <span className="font-serif italic font-normal text-red">Craft</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Background line (Horizontal for desktop, Vertical for mobile) */}
          <div className="hidden md:block absolute top-6 left-0 w-full h-[1px] bg-ink/10" />
          <div className="md:hidden absolute top-0 left-6 w-[1px] h-full bg-ink/10" />
          
          {/* Animated line (Horizontal for desktop, Vertical for mobile) */}
          <motion.div 
            style={{ width: lineWidth }}
            className="hidden md:block absolute top-6 left-0 h-[1px] bg-red origin-left" 
          />
          <motion.div 
            style={{ height: lineWidth }}
            className="md:hidden absolute top-0 left-6 w-[1px] bg-red origin-top" 
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <Reveal key={step} delay={i * 0.15}>
                <div className="flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-8 group">
                  {/* Circle indicator */}
                  <div className="w-12 h-12 rounded-full border border-ink/20 bg-cream flex items-center justify-center transition-colors duration-500 group-hover:border-red group-hover:bg-red/5 flex-shrink-0 relative z-10">
                    <span className="font-serif italic text-base opacity-50 group-hover:opacity-100 group-hover:text-red transition-colors duration-500">
                      0{i + 1}
                    </span>
                  </div>
                  
                  <h3 className="font-sans font-medium text-xl md:text-3xl tracking-tight text-balance transition-colors duration-500 group-hover:text-red break-words">
                    {step}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
