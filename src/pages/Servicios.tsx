import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import { programas, programasInfo, brandPartnershipsInfo, modalidadesInfo } from "../content/brand";

import SEO from "../components/SEO";
import { buildBreadcrumbSchema } from "../utils/seoSchemas";

export default function Servicios() {
  const [activeProgramas, setActiveProgramas] = useState(0);
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
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
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

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  };

  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      <SEO
        title="Servicios y Modalidades de Trabajo"
        description="Conocé nuestros programas (Build, Shift, Refresh) y Brand Partnerships para potenciar el posicionamiento, branding y comunicación de tu marca."
        keywords="servicios branding, programas de marca, Build Program, Shift Program, Refresh Program, Brand Partnerships, estrategia de marca"
        jsonLd={buildBreadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Servicios", url: "/servicios" }
        ])}
      />
      
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
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl max-w-4xl font-medium text-ink/80 leading-relaxed">
                {modalidadesInfo.description}
              </p>
            </Reveal>

            <Reveal delay={0.7}>
              <div className="w-full h-[1px] bg-ink/10 mt-16 md:mt-20" />
            </Reveal>
          </div>

        </div>
      </section>

      {/* 2. PROGRAMAS CARDS SECTION */}
      <section className="px-6 pb-24 md:pb-32 md:px-10 relative">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <h2 className="font-sans font-bold uppercase tracking-tight text-4xl md:text-6xl text-navy mb-4">{programasInfo.title}</h2>
              <p className="text-lg md:text-2xl font-medium">{programasInfo.description}</p>
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
                  onMouseEnter={() => setActiveProgramas(i)}
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

          {/* MOBILE MODAL */}
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
                  className={`relative w-full rounded-2xl shadow-2xl overflow-hidden pointer-events-auto ${cardColors[mobileActiveIndex % cardColors.length]}`}
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
                      s={programas[mobileActiveIndex]}
                      i={mobileActiveIndex}
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

      {/* 3. BRAND PARTNERSHIPS — es la modalidad en sí, sin subcategorías debajo. */}
      <section className="px-6 pb-12 md:pb-20 md:px-10 relative">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <h2 className="font-sans font-bold uppercase tracking-tight text-4xl md:text-6xl text-navy mb-4">{brandPartnershipsInfo.title}</h2>
              <p className="text-lg md:text-2xl font-medium">{brandPartnershipsInfo.description}</p>
            </div>
          </Reveal>

          <div className="mt-4">
            <motion.div 
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="bg-red text-cream rounded-2xl p-8 md:p-12 lg:p-16 shadow-2xl flex flex-col gap-8 md:gap-10 w-full"
            >
              {/* Header */}
              <motion.div variants={cardItemVariants} className="flex flex-col gap-6 md:gap-8 flex-shrink-0">
                <div className="flex items-baseline gap-4 md:gap-6">
                  <span className="font-serif text-3xl md:text-5xl opacity-40 italic">
                    00
                  </span>
                  <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl leading-none">
                    Brand Partnerships
                  </h2>
                </div>
                <div className="w-16 h-[1px] bg-current opacity-30"></div>
              </motion.div>

              {/* Intro Texts (Single Column) */}
              <motion.p 
                variants={cardItemVariants}
                className="text-xl md:text-2xl font-medium leading-[1.3] text-balance"
              >
                {brandPartnershipsInfo.detail}
              </motion.p>
              
              <motion.p 
                variants={cardItemVariants}
                className="text-base md:text-lg opacity-80 leading-relaxed font-medium font-sans"
              >
                {brandPartnershipsInfo.scope}
              </motion.p>

              {/* Fit Ideal */}
              <motion.div variants={cardItemVariants} className="flex flex-col gap-4">
                <h4 className="text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-4 text-current opacity-60">
                  <span className="w-6 h-[1px] bg-current"></span> Fit Ideal
                </h4>
                <div className="flex flex-wrap gap-2 justify-start">
                  {brandPartnershipsInfo.ideal.map((item, j) => (
                    <span 
                      key={j} 
                      className="px-3 py-1.5 rounded-lg text-[11px] md:text-xs tracking-wide font-medium border bg-white/10 border-white/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA / POR DONDE EMPEZAR */}
      <div ref={ctaRef} className="px-4 md:px-10 pb-10 md:pb-20 pt-10 md:pt-16 perspective-1000 bg-cream">
        <motion.section 
          style={{ scale }}
          className="bg-gradient-to-br from-[#B8381D] via-[#A52F18] to-[#751C0C] relative overflow-hidden text-cream rounded-2xl md:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-20 shadow-2xl flex flex-col lg:flex-row items-start lg:items-stretch justify-between gap-3 sm:gap-6 lg:gap-20 border border-white/10 backdrop-blur-xl"
        >
          {/* Textura y efectos de luz glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />
          <div className="glass-sheen" />
          
          <div className="lg:w-5/12 flex flex-col justify-between relative z-10 text-left h-full">
            <Reveal>
              <p className="text-xs tracking-widest text-cream/80 uppercase font-bold mb-2 sm:mb-4 flex items-center justify-start gap-4">
                <span className="w-8 h-[1px] bg-cream/50" /> Siguiente paso
              </p>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-1 sm:mb-2 lg:mb-8 text-cream">
                ¿Por dónde <br className="hidden lg:block"/>empezar?
              </h2>

              <div className="mt-8 lg:mt-12 hidden lg:flex flex-col items-start gap-8">
                <a
                  href="/contacto" 
                  className="group/btn relative inline-flex items-center gap-6 bg-cream text-red px-10 py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all hover:scale-[1.02] overflow-hidden shadow-lg"
                >
                  <span className="relative z-10 text-xs md:text-sm">Agendar Diagnóstico</span>
                  <span className="relative z-10 text-xl group-hover/btn:translate-x-2 transition-transform duration-500">{"\u2192\uFE0E"}</span>
                </a>
              </div>
            </Reveal>
          </div>
          
          {/* El Home y las secciones de arriba ya explicaron las modalidades: acá va
              directo la problemática y el paso siguiente, sin reciclar ese contenido. */}
          <div className="lg:w-7/12 flex flex-col gap-2.5 sm:gap-4 md:gap-8 relative z-10 justify-center text-left">
            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-medium leading-[1.3] text-balance">
                El primer paso es entender en qué momento está tu marca.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-cream/75 leading-relaxed text-balance max-w-2xl">
                En una primera reunión analizamos tu contexto, identificamos los principales desafíos y definimos juntas el mejor punto de partida para acompañarte.
              </p>
            </Reveal>

            {/* Mobile CTA Button (Al final de todos los textos) */}
            <Reveal delay={0.5} className="block lg:hidden mt-3 pt-1">
              <div className="flex justify-start">
                <a
                  href="/contacto" 
                  className="group/btn relative inline-flex items-center justify-center gap-3 bg-cream text-red px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-md w-auto"
                >
                  <span className="relative z-10 text-xs">Agendar Diagnóstico</span>
                  <span className="relative z-10 text-base group-hover/btn:translate-x-1 transition-transform duration-500">{"\u2192\uFE0E"}</span>
                </a>
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
            <div className="cursor-default w-full">
              <div className="p-6 pt-20 flex flex-col gap-10">
                
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
              </div>

              {/* Pequeño spacer físico para evitar el colapso del padding en iOS, sin sumar gap */}
              <div className="h-6 w-full shrink-0" aria-hidden="true"></div>
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
                      className={`px-3 py-1.5 rounded-lg text-[11px] md:text-xs tracking-wide font-medium border ${
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
