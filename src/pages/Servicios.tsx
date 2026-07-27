import { useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import Reveal from "../components/Reveal";
import { services, process } from "../content/brand";

export default function Servicios() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start center", "end center"],
  });

  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Typewriter animation variants for the Hero
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="bg-ink min-h-screen font-sans text-cream selection:bg-red selection:text-cream">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-40 pb-24 md:pt-56 md:pb-32 md:px-10 overflow-hidden bg-cream text-ink rounded-b-[3rem] md:rounded-b-[4rem] z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red rounded-full blur-[120px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        <div className="mx-auto max-w-[1400px] relative z-10">
          <Reveal>
            <p className="text-sm tracking-widest uppercase mb-6 flex items-center gap-4 text-red font-bold">
              <span className="w-12 h-[1px] bg-red" /> Especialidad
            </p>
          </Reveal>
          
          <motion.h1 
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="font-serif italic text-7xl md:text-[9rem] lg:text-[12rem] leading-[0.85] tracking-tight mb-10"
          >
            {"Programas.".split("").map((char, index) => (
              <motion.span key={index} variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.h1>
          
          <Reveal delay={0.8}>
            <p className="text-2xl md:text-4xl max-w-3xl font-medium text-balance opacity-80 leading-snug">
              No vendemos piezas sueltas. Diseñamos sistemas completos para que tu marca escale.
            </p>
          </Reveal>
        </div>
      </section>
      {/* 2. ACCORDION SERVICES SECTION */}
      <section className="px-6 py-24 md:py-40 md:px-10 relative">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col border-t border-cream/20">
            {services.map((service, idx) => {
              const isOpen = activeAccordion === idx;
              return (
                <div key={service.n} className="border-b border-cream/20 flex flex-col">
                  {/* Header */}
                  <button 
                    onClick={() => setActiveAccordion(isOpen ? null : idx)}
                    className="flex items-center justify-between py-8 md:py-12 group text-left w-full focus:outline-none"
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
                      <span className="font-serif italic text-2xl md:text-3xl text-red opacity-80 transition-opacity group-hover:opacity-100">
                        {service.n}
                      </span>
                      <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-none transition-colors group-hover:text-cream text-cream/90 flex flex-wrap gap-x-[0.3em]">
                        {service.title.split(" ").map((word, wIdx) => (
                          <span key={wIdx} className="inline-block whitespace-nowrap">
                            {word}
                          </span>
                        ))}
                      </h2>
                    </div>
                    <div className="relative w-8 h-8 md:w-12 md:h-12 flex-shrink-0 flex items-center justify-center rounded-full border border-cream/30 group-hover:border-red group-hover:bg-red/10 transition-colors ml-4">
                      <span className="absolute w-4 md:w-6 h-[1.5px] bg-cream group-hover:bg-red transition-colors"></span>
                      <motion.span 
                        animate={{ rotate: isOpen ? 0 : 90 }}
                        transition={{ duration: 0.3 }}
                        className="absolute w-4 md:w-6 h-[1.5px] bg-cream group-hover:bg-red transition-colors"
                      ></motion.span>
                    </div>
                  </button>
                  
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-12 md:pb-20 pt-4 md:pl-[5.5rem]">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                            
                            {/* Left Text */}
                            <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8">
                              <p className="text-xl md:text-3xl font-medium leading-[1.3] text-balance text-cream">
                                {service.summary}
                              </p>
                              <p className="text-base md:text-lg opacity-70 leading-relaxed font-medium">
                                {service.detail}
                              </p>
                            </div>

                            {/* Right Info */}
                            <div className="lg:col-span-6 flex flex-col gap-8 md:gap-10">
                              
                              <div className="flex flex-col gap-4">
                                <h4 className="text-xs font-bold tracking-widest uppercase text-red flex items-center gap-4">
                                  <span className="w-6 h-[1px] bg-red"></span> Fit Ideal
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {service.fit.map((f, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full text-xs md:text-sm tracking-wide font-medium bg-cream/5 border border-cream/10 text-cream/90">
                                      {f}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="flex flex-col gap-4">
                                <h4 className="text-xs font-bold tracking-widest uppercase text-red flex items-center gap-4">
                                  <span className="w-6 h-[1px] bg-red"></span> Incluye
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                                  {service.includes.split(', ').map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                      <span className="text-red font-serif italic text-lg leading-none">✦</span>
                                      <span className="text-sm md:text-base font-medium capitalize leading-tight opacity-80">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="p-6 md:p-8 rounded-[1.5rem] bg-cream text-ink mt-2">
                                <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 mb-3 md:mb-4">El Resultado</h4>
                                <p className="font-serif italic text-xl md:text-2xl leading-tight">
                                  "{service.result}"
                                </p>
                              </div>

                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ANIMATED PROCESS TIMELINE */}
      <section ref={processRef} className="px-6 py-32 md:py-48 md:px-10 bg-cream text-ink rounded-t-[3rem] md:rounded-t-[4rem] relative overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="text-center mb-24 md:mb-40">
            <Reveal>
              <p className="text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-4 text-red font-bold">
                <span className="w-8 h-[1px] bg-red" /> Método <span className="w-8 h-[1px] bg-red" />
              </p>
              <h2 className="font-serif italic text-5xl md:text-7xl lg:text-[8rem] leading-none tracking-tight text-navy">
                Cómo trabajamos
              </h2>
              <p className="text-xl md:text-2xl opacity-60 mt-6 max-w-2xl mx-auto">
                Un framework diseñado paso a paso para no dejar nada al azar.
              </p>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* The vertical timeline line */}
            <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[2px] bg-ink/10 -translate-x-1/2"></div>
            
            {/* The animated fill line */}
            <motion.div 
              className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-[4px] bg-red -translate-x-1/2 origin-top"
              style={{ scaleY: processScroll }}
            ></motion.div>

            <div className="flex flex-col gap-16 md:gap-32">
              {process.map((p, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div key={p.n} className="relative flex flex-col md:flex-row items-start md:items-center w-full">
                    
                    {/* Number / Node indicator */}
                    <div className="absolute left-[39px] md:left-1/2 w-20 h-20 bg-cream rounded-full border-4 border-cream flex items-center justify-center -translate-x-1/2 z-10">
                      <span className="font-serif italic text-3xl text-ink/40">{p.n}</span>
                    </div>

                    {/* Content Left (if even) or Right (if odd) on Desktop, always right on Mobile */}
                    <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-24 md:text-right' : 'md:pl-24 md:ml-auto'}`}>
                      <Reveal delay={0.2}>
                        <h3 className="font-serif text-3xl md:text-5xl italic mb-4 leading-tight group-hover:text-red transition-colors duration-500">
                          {p.title}
                        </h3>
                        <p className="text-lg md:text-xl opacity-70 leading-relaxed text-balance font-medium">
                          {p.text}
                        </p>
                      </Reveal>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
