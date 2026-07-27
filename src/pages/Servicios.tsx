import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import Reveal from "../components/Reveal";
import { services, process } from "../content/brand";

export default function Servicios() {
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);

  const processRef = useRef(null);
  const { scrollYProgress: processScroll } = useScroll({
    target: processRef,
    offset: ["start center", "end center"]
  });

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (mobileActiveIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileActiveIndex]);

  const cardColors = [
    "bg-white text-ink border border-ink/5 shadow-xl", 
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
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-40 pb-24 md:pt-56 md:pb-32 md:px-10 overflow-hidden z-10">
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
            className="font-serif italic text-7xl md:text-[9rem] lg:text-[12rem] leading-[0.85] tracking-tight mb-10 text-navy"
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

      {/* 2. EXPANDABLE CARDS SECTION */}
      <section className="px-6 pb-24 md:pb-40 md:px-10 relative">
        <div className="mx-auto max-w-[1400px]">
          
          {/* DESKTOP LAYOUT (Horizontal Flex) */}
          <div className="hidden lg:flex flex-row min-h-[600px] gap-4 w-full">
            {services.map((s, i) => {
              const isActive = desktopActiveIndex === i;
              
              return (
                <motion.div 
                  key={`desktop-${s.n}`}
                  onClick={() => setDesktopActiveIndex(i)}
                  animate={{ flex: isActive ? 3 : 0.5 }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                  className={`relative overflow-hidden rounded-[2rem] cursor-pointer flex-shrink-0 ${cardColors[i]}`}
                  style={{ minWidth: "0px" }}
                >
                  <CardContent s={s} i={i} isActive={isActive} isMobile={false} />
                </motion.div>
              );
            })}
          </div>

          <div className="flex lg:hidden flex-col gap-4 w-full">
            {services.map((s, i) => (
              <div 
                key={`mobile-btn-${s.n}`}
                onClick={() => setMobileActiveIndex(i)}
                className={`relative overflow-hidden rounded-[2rem] flex-shrink-0 cursor-pointer h-[120px] px-6 md:px-8 flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity ${cardColors[i]}`}
              >
                <div className="flex items-center gap-6">
                  <span className="font-serif text-3xl opacity-60">{s.n}</span>
                  <h3 className="font-serif text-xl md:text-2xl opacity-90 text-balance max-w-[200px]">{s.title}</h3>
                </div>
                <div className="w-10 h-10 shrink-0 rounded-full bg-black/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 1V13M1 7H13"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE MODAL */}
          <AnimatePresence>
            {mobileActiveIndex !== null && (
              <motion.div 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:hidden"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileActiveIndex(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={`relative w-full max-h-[90vh] overflow-y-auto overflow-x-hidden no-scrollbar rounded-[2rem] shadow-2xl flex flex-col ${cardColors[mobileActiveIndex]}`}
                >
                  <div className="sticky top-0 right-0 w-full flex justify-end p-4 z-20 pointer-events-none">
                    <button 
                      onClick={() => setMobileActiveIndex(null)}
                      className="w-12 h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center hover:bg-black/20 transition-colors pointer-events-auto"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 1L13 13M1 13L13 1"/>
                      </svg>
                    </button>
                  </div>

                  <div className="-mt-14">
                    <CardContent 
                      s={services[mobileActiveIndex]} 
                      i={mobileActiveIndex} 
                      isActive={true} 
                      isMobile={true} 
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

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

// Extracted Card Content component to avoid duplication between Desktop and Mobile layouts
function CardContent({ s, i, isActive, isMobile }: { s: any, i: number, isActive: boolean, isMobile: boolean }) {
  return (
    <AnimatePresence mode="popLayout">
      {!isActive ? (
        /* INACTIVE VIEW */
        <motion.div 
          key={`inactive-${s.n}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center w-full h-full p-6 flex-col lg:p-0"
        >
          <span className="font-serif text-2xl opacity-60 lg:absolute lg:top-10">
            {s.n}
          </span>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl whitespace-nowrap lg:-rotate-90 opacity-80 lg:overflow-visible tracking-wide origin-center truncate">
            {s.title}
          </h3>
        </motion.div>
      ) : (
        /* ACTIVE VIEW */
        <motion.div 
          key={`active-${s.n}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={isMobile ? "w-full" : "p-6 md:p-10 lg:p-12 flex flex-col w-full h-full"}
        >
          {isMobile ? (
            /* MOBILE CUSTOM ACTIVE VIEW */
            <div className="p-6 py-10 flex flex-col gap-10 cursor-default">
              
              {/* Header */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="font-serif text-3xl opacity-40 italic mt-1">{s.n}</span>
                  <h2 className="font-serif italic text-4xl leading-[1.1] pr-8 text-balance">{s.title}</h2>
                </div>
                <div className={`w-full h-[1px] ${i === 0 ? 'bg-ink/10' : 'bg-current opacity-20'}`}></div>
              </div>

              {/* Intro Text */}
              <div className="flex flex-col gap-6">
                <p className="text-xl font-medium leading-[1.4]">{s.summary}</p>
                <p className="text-base opacity-80 leading-relaxed">{s.detail}</p>
              </div>

              {/* Attributes Container (Specs Box) */}
              <div className={`p-6 rounded-[1.5rem] flex flex-col gap-10 ${i === 0 ? 'bg-ink/5' : 'bg-white/5'}`}>
                
                {/* Fit Ideal */}
                <div className="flex flex-col gap-5">
                  <h4 className={`text-[10px] font-bold tracking-widest uppercase flex items-center gap-3 ${i === 0 ? 'text-red' : 'text-current opacity-60'}`}>
                    <span className={`w-4 h-[1px] ${i === 0 ? 'bg-red' : 'bg-current'}`}></span> Fit Ideal
                  </h4>
                  <div className="flex flex-col gap-3">
                    {s.fit.map((f: string, j: number) => (
                      <span 
                        key={j} 
                        className={`px-4 py-3 rounded-xl text-xs tracking-wide font-medium border leading-tight ${
                          i === 0 ? 'bg-white border-ink/10 shadow-sm' : 'bg-black/20 border-white/10'
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Incluye */}
                <div className="flex flex-col gap-5">
                  <h4 className={`text-[10px] font-bold tracking-widest uppercase flex items-center gap-3 ${i === 0 ? 'text-red' : 'text-current opacity-60'}`}>
                    <span className={`w-4 h-[1px] ${i === 0 ? 'bg-red' : 'bg-current'}`}></span> Incluye
                  </h4>
                  <ul className="flex flex-col gap-4">
                    {s.includes.split(', ').map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className={i === 0 ? "text-red font-serif italic text-sm" : "text-current opacity-50 font-serif italic text-sm"}>✦</span>
                        <span className="text-sm font-medium capitalize leading-tight opacity-90 pt-0.5">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result Block */}
              <div className={`p-8 rounded-[1.5rem] flex flex-col justify-center items-center text-center mt-2 ${
                i === 0 ? 'bg-ink text-cream' : 'bg-cream text-ink'
              }`}>
                <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-4">El Resultado</h4>
                <p className="font-serif italic text-2xl leading-[1.2] text-balance">
                  "{s.result}"
                </p>
              </div>

            </div>
          ) : (
            /* DESKTOP ACTIVE VIEW (Untouched) */
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full h-full">
              
              {/* Left: Title & Summaries */}
              <div className="lg:w-1/2 flex flex-col gap-6 md:gap-8 flex-shrink-0">
                <div className="flex items-baseline gap-4 md:gap-6">
                  <span className="font-serif text-3xl md:text-5xl opacity-40 italic">
                    {s.n}
                  </span>
                  <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-none flex flex-wrap gap-x-[0.2em]">
                    {s.title.split(" ").map((word: string, wIdx: number) => (
                      <span key={wIdx} className="inline-block whitespace-nowrap">
                        {word}
                      </span>
                    ))}
                  </h2>
                </div>
                
                <div className={`w-16 h-[1px] ${i === 0 ? 'bg-ink/20' : 'bg-current opacity-30'}`}></div>
                
                <p className="text-xl md:text-2xl font-medium leading-[1.3] text-balance">
                  {s.summary}
                </p>
                
                <p className="text-base md:text-lg opacity-80 leading-relaxed font-medium">
                  {s.detail}
                </p>
              </div>

              {/* Right: Lists & Result */}
              <div className="lg:w-1/2 flex flex-col gap-8 md:gap-10">
                
                {/* Fit Ideal */}
                <div className="flex flex-col gap-4">
                  <h4 className={`text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-4 ${i === 0 ? 'text-red' : 'text-current opacity-60'}`}>
                    <span className={`w-6 h-[1px] ${i === 0 ? 'bg-red' : 'bg-current'}`}></span> Fit Ideal
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {s.fit.map((f: string, j: number) => (
                      <span 
                        key={j} 
                        className={`px-3 py-1.5 rounded-full text-[11px] md:text-xs tracking-wide font-medium border ${
                          i === 0 ? 'bg-ink/5 border-ink/10' : 'bg-white/10 border-white/20'
                        }`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Includes */}
                <div className="flex flex-col gap-4">
                  <h4 className={`text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-4 ${i === 0 ? 'text-red' : 'text-current opacity-60'}`}>
                    <span className={`w-6 h-[1px] ${i === 0 ? 'bg-red' : 'bg-current'}`}></span> Incluye
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    {s.includes.split(', ').map((item: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 border-b border-current/10 pb-1.5">
                        <span className={i === 0 ? "text-red font-serif italic text-sm" : "text-current opacity-50 font-serif italic text-sm"}>✦</span>
                        <span className="text-xs md:text-sm font-medium capitalize leading-tight opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Result Block */}
                <div className={`mt-auto p-6 md:p-8 rounded-[1rem] relative overflow-hidden flex flex-col justify-center items-center text-center ${
                  i === 0 ? 'bg-ink text-cream' : 'bg-cream text-ink'
                }`}>
                  <h4 className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2">El Resultado</h4>
                  <p className="font-serif italic text-xl md:text-2xl leading-[1.2] text-balance">
                    "{s.result}"
                  </p>
                </div>

              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
