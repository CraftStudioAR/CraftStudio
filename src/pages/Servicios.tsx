import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import Beams from "../components/Beams";
import { programas, programasInfo, brandPartnerships, brandPartnershipsInfo } from "../content/brand";

export default function Servicios() {
  const [activeProgramas, setActiveProgramas] = useState(0);
  const [activePartnerships, setActivePartnerships] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "center center"]
  });
  const scale = useTransform(ctaScroll, [0, 1], [0.8, 1]);

  // Lock body scroll when mobile modal is open (Bulletproof iOS fix with position restoration)
  useEffect(() => {
    if (mobileActiveIndex !== null) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
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
          
          {/* Header: Título y descripción */}
          <div className="flex flex-col justify-start">
            <Reveal>
              <p className="text-sm tracking-widest uppercase mb-6 flex items-center gap-4 text-red font-bold">
                <span className="w-12 h-[1px] bg-red" /> Especialidad
              </p>
            </Reveal>
            
            <motion.h1 
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="font-serif italic text-6xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight mb-8 text-navy"
            >
              {"Modalidades.".split("").map((char, index) => (
                <motion.span key={index} variants={charVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            
            <Reveal delay={0.6}>
              <p className="text-2xl md:text-4xl max-w-4xl font-medium md:text-balance opacity-90 leading-snug">
                En Craft contamos con dos modalidades de trabajo: Programas y Brand Partnerships.
              </p>
            </Reveal>
          </div>

          {/* Grilla Inferior: Tarjetas de Modalidades lado a lado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16 lg:mt-24 w-full">
            <Reveal delay={0.8}>
              <div className="bg-white p-8 md:p-12 lg:p-16 rounded-2xl border border-ink/5 shadow-[0_15px_40px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col justify-center">
                <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-red mb-6 group-hover:text-navy transition-colors">Programas</h3>
                <p className="text-lg md:text-xl lg:text-2xl font-medium opacity-80 text-balance">
                  Construyen la dirección. Para marcas que necesitan construir, ordenar o redefinir su identidad, posicionamiento y comunicación.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.9}>
              <div className="bg-white p-8 md:p-12 lg:p-16 rounded-2xl border border-ink/5 shadow-[0_15px_40px_rgb(0,0,0,0.03)] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full flex flex-col justify-center">
                <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-red mb-6 group-hover:text-navy transition-colors">Brand Partnerships</h3>
                <p className="text-lg md:text-xl lg:text-2xl font-medium opacity-80 text-balance">
                  Activan o sostienen. Acompañamientos estratégicos y creativos para marcas que necesitan activar una acción puntual o sostener una dirección ya construida.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 2. PROGRAMAS CARDS SECTION */}
      <section className="px-6 pb-24 md:pb-32 md:px-10 relative">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <h2 className="font-serif italic text-5xl md:text-7xl text-navy mb-4">{programasInfo.title}</h2>
              <p className="text-lg md:text-2xl font-medium mb-4">{programasInfo.description}</p>
              <p className="text-base md:text-lg opacity-70 italic">{programasInfo.ideal}</p>
            </div>
          </Reveal>
          
          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:flex flex-row min-h-[450px] gap-4 w-full">
            {programas.map((s, i) => {
              const isActive = activeProgramas === i;
              
              return (
                <motion.div 
                  key={`desktop-prog-${s.n}`}
                  onClick={() => setActiveProgramas(i)}
                  animate={{ flex: isActive ? 3 : 0.5 }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 ${cardColors[i]}`}
                  style={{ minWidth: "0px" }}
                >
                  <CardContent s={s} i={i} isActive={isActive} isMobile={false} />
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE LAYOUT */}
          <div className="flex lg:hidden flex-col gap-4 w-full">
            {programas.map((s, i) => (
              <div 
                key={`mobile-btn-prog-${s.n}`}
                onClick={() => setMobileActiveIndex(i)}
                className={`relative overflow-hidden rounded-2xl flex-shrink-0 cursor-pointer h-[120px] px-6 md:px-8 flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity ${cardColors[i]}`}
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
        </div>
      </section>

      {/* 3. BRAND PARTNERSHIPS CARDS SECTION */}
      <section className="px-6 pb-24 md:pb-40 md:px-10 relative">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <h2 className="font-serif italic text-5xl md:text-7xl text-navy mb-4">{brandPartnershipsInfo.title}</h2>
              <p className="text-lg md:text-2xl font-medium mb-4">{brandPartnershipsInfo.description}</p>
              <p className="text-base md:text-lg opacity-70 italic">{brandPartnershipsInfo.ideal}</p>
            </div>
          </Reveal>
          
          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:flex flex-row min-h-[450px] gap-4 w-full">
            {brandPartnerships.map((s, i) => {
              const isActive = activePartnerships === i;
              
              return (
                <motion.div 
                  key={`desktop-bp-${s.n}`}
                  onClick={() => setActivePartnerships(i)}
                  animate={{ flex: isActive ? 3 : 0.5 }}
                  transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0 ${cardColors[i % cardColors.length]}`}
                  style={{ minWidth: "0px" }}
                >
                  <CardContent s={s} i={i} isActive={isActive} isMobile={false} />
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE LAYOUT */}
          <div className="flex lg:hidden flex-col gap-4 w-full">
            {brandPartnerships.map((s, i) => {
              const offsetIndex = i + 10;
              return (
                <div 
                  key={`mobile-btn-bp-${s.n}`}
                  onClick={() => setMobileActiveIndex(offsetIndex)}
                  className={`relative overflow-hidden rounded-2xl flex-shrink-0 cursor-pointer h-[120px] px-6 md:px-8 flex items-center justify-between shadow-sm hover:opacity-90 transition-opacity ${cardColors[i % cardColors.length]}`}
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
              );
            })}
          </div>
          
          {/* SHARED MOBILE MODAL */}
          <AnimatePresence>
            {mobileActiveIndex !== null && (
              <div className="fixed inset-0 z-[100] lg:hidden flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop (Fijo, no scrollea) */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileActiveIndex(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />
                
                {/* Contenedor Modal (Se adapta al contenido) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={`relative w-full rounded-2xl shadow-2xl overflow-hidden pointer-events-auto ${cardColors[(mobileActiveIndex >= 10 ? mobileActiveIndex - 10 : mobileActiveIndex) % cardColors.length]}`}
                >
                  {/* Botón de cerrar fijo arriba a la derecha (no scrollea porque es absolute al contenedor padre) */}
                  <div className="absolute top-0 right-0 w-full flex justify-end p-4 z-20 pointer-events-none">
                    <button 
                      onClick={() => setMobileActiveIndex(null)}
                      className="w-12 h-12 rounded-full bg-black/10 backdrop-blur-md flex items-center justify-center hover:bg-black/20 transition-colors pointer-events-auto"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 1L13 13M1 13L13 1"/>
                      </svg>
                    </button>
                  </div>

                  {/* Área scrolleable independiente (Controla la altura máxima) */}
                  <div className="w-full max-h-[85vh] overflow-y-auto overscroll-contain no-scrollbar relative z-10">
                    <CardContent 
                      s={mobileActiveIndex >= 10 ? brandPartnerships[mobileActiveIndex - 10] : programas[mobileActiveIndex]} 
                      i={mobileActiveIndex >= 10 ? mobileActiveIndex - 10 : mobileActiveIndex} 
                      isActive={true} 
                      isMobile={true} 
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. FINAL CTA / POR DONDE EMPEZAR */}
      <div ref={ctaRef} className="px-4 md:px-10 pb-10 md:pb-20 pt-10 md:pt-16 perspective-1000 bg-cream">
        <motion.section 
          style={{ scale }}
          className="bg-navy relative overflow-hidden text-cream rounded-2xl md:rounded-2xl p-8 md:p-12 lg:p-20 shadow-2xl flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-20"
        >
          {/* Animated Background Gradients inside the card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 hidden md:block">
            <Beams
              beamWidth={2}
              beamHeight={20}
              beamNumber={40}
              lightColor="#F2EBE9"
              speed={2}
              noiseIntensity={1.75}
              scale={0.2}
              rotation={0}
            />
          </div>
          
          <div className="lg:w-5/12 flex flex-col relative z-10 text-center lg:text-left h-full">
            <Reveal>
              <p className="text-xs tracking-widest text-red uppercase font-bold mb-6 flex items-center justify-center lg:justify-start gap-4">
                <span className="w-8 h-[1px] bg-red" /> Siguiente paso
              </p>
              <h2 className="font-serif italic text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tight mb-8">
                ¿Por dónde <br className="hidden lg:block"/>empezar?
              </h2>
              
              <div className="mt-8 lg:mt-12 flex flex-col items-center lg:items-start gap-8">
                <p className="text-lg text-cream/70 text-balance">
                  ¿No sabés cuál es tu momento? Contanos dónde estás parada y lo definimos juntas.
                </p>
                <a 
                  href="/contacto" 
                  className="group/btn relative inline-flex items-center gap-6 bg-cream text-navy px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white transition-all hover:scale-[1.02] overflow-hidden"
                >
                  <span className="relative z-10 text-xs md:text-sm">Agendar Diagnóstico</span>
                  <span className="relative z-10 text-xl group-hover/btn:translate-x-2 transition-transform duration-500">{"\u2192\uFE0E"}</span>
                </a>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:w-7/12 flex flex-col gap-6 md:gap-8 relative z-10 justify-center">
            <Reveal delay={0.2}>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] flex flex-col gap-4 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <span className="text-red font-serif italic text-2xl mt-1">✦</span>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-90 text-balance">
                    Los <span className="text-white">Programas</span> construyen la dirección.<br/>
                    Los <span className="text-white">Brand Partnerships</span> la activan o sostienen.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] flex flex-col gap-4 backdrop-blur-sm">
                <p className="text-lg md:text-xl font-medium leading-relaxed opacity-80 text-balance">
                  No necesitás saber qué modalidad necesitas hoy: <span className="text-white">el primer paso es entender en qué momento está tu negocio.</span>
                </p>
                <p className="text-base md:text-lg opacity-60 leading-relaxed text-balance">
                  En una reunión de diagnóstico analizamos tu contexto actual, identificamos los principales desafíos y definimos juntas el mejor punto de partida.
                </p>
              </div>
            </Reveal>
          </div>
          
        </motion.section>
      </div>

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
            <div className="p-6 pt-20 flex flex-col gap-10 cursor-default">
              
              {/* Header */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="font-serif text-3xl opacity-40 italic mt-1">{s.n}</span>
                  <h2 className="font-serif italic text-4xl leading-[1.1] pr-4 text-balance break-words">{s.title}</h2>
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
              </div>

              {/* Spacer sólido para garantizar margen inferior en el scroll */}
              <div className="h-16 w-full flex-shrink-0" aria-hidden="true"></div>

            </div>
          ) : (
            /* DESKTOP ACTIVE VIEW (Untouched) */
            <div className="flex flex-col gap-8 md:gap-10 w-full h-full max-w-4xl">
              
              <div className="flex flex-col gap-6 md:gap-8 flex-shrink-0">
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

            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
