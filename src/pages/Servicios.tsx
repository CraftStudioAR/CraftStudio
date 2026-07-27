import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import Reveal from "../components/Reveal";
import { services, process } from "../content/brand";

export default function Servicios() {
  const processRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start center", "end center"],
  });

  const cardColors = [
    "bg-cream text-ink border border-ink/10 shadow-xl", 
    "bg-navy text-cream shadow-2xl",                     
    "bg-red text-cream shadow-2xl"                       
  ];

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

      {/* 2. STICKY STACKED CARDS SECTION */}
      <section className="px-6 py-24 md:py-40 md:px-10 relative">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="flex flex-col gap-12 md:gap-24">
            {services.map((service, idx) => {
              // Sticky stacking for all breakpoints.
              // topOffset guarantees they stack neatly, leaving a sliver of the previous card visible.
              const topOffset = `calc(5rem + ${idx * 2}rem)`; 
              const isLast = idx === services.length - 1;

              return (
                <div 
                  key={service.n}
                  className="sticky"
                  style={{ top: topOffset, zIndex: 10 + idx, paddingBottom: isLast ? '0' : '15vh' }}
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className={`rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-12 overflow-y-auto no-scrollbar relative max-h-[calc(100vh-5rem)] lg:min-h-[600px] ${cardColors[idx]}`}
                  >
                    {/* Decorative Background Blur */}
                    {idx === 1 && <div className="absolute top-0 right-0 w-64 h-64 bg-red rounded-full blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>}
                    {idx === 2 && <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy rounded-full blur-[120px] opacity-30 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>}
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                      
                      {/* Left: Title & Summaries */}
                      <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8">
                        <div className="flex items-end gap-6">
                          <span className="font-serif text-5xl md:text-7xl opacity-50 italic">
                            {service.n}
                          </span>
                          <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ margin: "-100px" }}
                            variants={titleVariants}
                            className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-none"
                          >
                            {service.title.split("").map((char, index) => (
                              <motion.span key={index} variants={charVariants} className="inline-block">
                                {char === " " ? "\u00A0" : char}
                              </motion.span>
                            ))}
                          </motion.h2>
                        </div>
                        
                        <div className={`w-24 h-[1px] ${idx === 0 ? 'bg-red' : 'bg-current opacity-30'}`}></div>
                        
                        <p className="text-xl md:text-2xl font-medium leading-[1.3] text-balance">
                          {service.summary}
                        </p>
                        
                        <p className="text-base lg:text-lg opacity-70 leading-relaxed font-medium max-w-xl">
                          {service.detail}
                        </p>
                      </div>

                      {/* Right: Lists & Result */}
                      <div className="lg:col-span-6 flex flex-col gap-8 lg:pt-2 h-full">
                        
                        {/* Fit Ideal */}
                        <div className="flex flex-col gap-4">
                          <h4 className={`text-xs md:text-sm font-bold tracking-widest uppercase flex items-center gap-4 ${idx === 0 ? 'text-red' : 'text-current opacity-60'}`}>
                            <span className={`w-6 h-[1px] ${idx === 0 ? 'bg-red' : 'bg-current'}`}></span> Fit Ideal
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.fit.map((f, i) => (
                              <span 
                                key={i} 
                                className={`px-3 py-1.5 rounded-[2rem] text-xs md:text-sm tracking-wide font-medium border ${
                                  idx === 0 ? 'bg-ink text-cream' : 'bg-white/10 border-white/20'
                                }`}
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Includes */}
                        <div className="flex flex-col gap-4">
                          <h4 className={`text-xs md:text-sm font-bold tracking-widest uppercase flex items-center gap-4 ${idx === 0 ? 'text-red' : 'text-current opacity-60'}`}>
                            <span className={`w-6 h-[1px] ${idx === 0 ? 'bg-red' : 'bg-current'}`}></span> Incluye
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                            {service.includes.split(', ').map((item, i) => (
                              <li key={i} className="flex items-start gap-3 border-b border-current/10 pb-1.5">
                                <span className={idx === 0 ? "text-red font-serif italic" : "text-current opacity-50 font-serif italic"}>✦</span>
                                <span className="text-sm md:text-base font-medium capitalize leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Result Block */}
                        <div className={`mt-auto p-6 md:p-8 rounded-[1.5rem] relative overflow-hidden flex-grow flex flex-col justify-center ${
                          idx === 0 ? 'bg-ink text-cream' : 'bg-black/20'
                        }`}>
                          <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-60 mb-3">El Resultado</h4>
                          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl leading-tight">
                            "{service.result}"
                          </p>
                        </div>

                      </div>
                    </div>
                  </motion.div>
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
