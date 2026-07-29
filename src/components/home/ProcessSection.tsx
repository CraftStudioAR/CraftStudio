import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import Reveal from "../Reveal";

const steps = [
  "DIAGNÓSTICO",
  "EVALUACIÓN",
  "PLANIFICACIÓN",
  "RESULTADO FINAL"
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"]
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.75) setActiveStep(3);
    else if (latest >= 0.50) setActiveStep(2);
    else if (latest >= 0.25) setActiveStep(1);
    else if (latest >= 0.05) setActiveStep(0);
    else setActiveStep(-1);
  });

  return (
    <section ref={containerRef} className="bg-cream text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        <Reveal>
          <div className="max-w-2xl mb-16 md:mb-24">
            <p className="text-sm tracking-widest text-red uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-red" /> Cómo Trabajamos
            </p>
            <h2 className="font-sans font-medium tracking-tight text-4xl md:text-6xl lg:text-7xl">
              El proceso <span className="font-serif italic font-normal text-red text-5xl md:text-7xl lg:text-8xl">Craft</span>
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
            {steps.map((step, i) => {
              const isActive = i <= activeStep;
              return (
              <Reveal key={step} delay={i * 0.15}>
                <div className="flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-8">
                  {/* Circle indicator */}
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors duration-500 flex-shrink-0 relative z-10 ${isActive ? 'border-red bg-cream shadow-[0_0_15px_rgba(165,47,24,0.1)]' : 'border-ink/20 bg-cream'}`}>
                    <span className={`font-serif italic text-base transition-colors duration-500 ${isActive ? 'opacity-100 text-red' : 'opacity-50 text-ink'}`}>
                      0{i + 1}
                    </span>
                  </div>
                  
                  <h3 className={`font-sans font-medium text-xl md:text-3xl tracking-tight text-balance transition-colors duration-500 break-words ${isActive ? 'text-red' : 'text-ink'}`}>
                    {step}
                  </h3>
                </div>
              </Reveal>
            )})}
          </div>
        </div>

      </div>
    </section>
  );
}
