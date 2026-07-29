import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { programas, programasInfo, brandPartnerships, brandPartnershipsInfo } from "../../content/brand";

export default function ServicesSection() {
  const [activeProgramas, setActiveProgramas] = useState(0);
  const [activePartnerships, setActivePartnerships] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play accordion logic (Desktop only)
  useEffect(() => {
    if (isHovered || window.innerWidth < 1024) return;

    const interval = setInterval(() => {
      setActiveProgramas((prev) => (prev + 1) % programas.length);
      setActivePartnerships((prev) => (prev + 1) % brandPartnerships.length);
    }, 6000); 

    return () => clearInterval(interval);
  }, [isHovered]);

  const colorsProgramas = [
    "bg-white text-ink border border-ink/5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]",
    "bg-navy text-cream",
    "bg-red text-cream"
  ];

  const colorsPartnerships = [
    "bg-navy text-cream",
    "bg-white text-ink border border-ink/5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]"
  ];

  return (
    <section className="bg-cream text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 flex flex-col gap-24">
        
        {/* Header General */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm tracking-widest text-red uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-red" /> Servicios
              </p>
              <h2 className="font-sans font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl mb-6 break-words lg:whitespace-nowrap">
                Cómo trabaja <span className="font-serif italic font-normal text-6xl md:text-8xl lg:text-9xl text-red">Craft</span>
              </h2>
              <p className="text-lg md:text-xl text-ink/70 text-balance">
                En Craft contamos con dos modalidades de trabajo: Programas y Brand Partnerships.
              </p>
            </div>
            <Magnetic>
              <Link
                to="/servicios"
                className="border-b border-ink/30 pb-1 text-sm tracking-wide uppercase hover:border-ink transition-colors self-start md:self-auto"
              >
                Ver todos {"\u2197\uFE0E"}
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        {/* Grupo 1: Programas */}
        <div>
          <Reveal>
            <div className="mb-8 md:mb-12 max-w-3xl">
              <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-navy mb-4">{programasInfo.title}</h3>
              <p className="text-lg md:text-xl font-medium mb-3">{programasInfo.description}</p>
              <p className="text-base text-ink/60">{programasInfo.ideal}</p>
            </div>
          </Reveal>
          <AccordionGroup 
            items={programas} 
            colors={colorsProgramas} 
            activeIndex={activeProgramas} 
            setActiveIndex={setActiveProgramas} 
            setIsHovered={setIsHovered} 
          />
        </div>

        {/* Grupo 2: Brand Partnerships */}
        <div>
          <Reveal>
            <div className="mb-8 md:mb-12 max-w-3xl">
              <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl text-navy mb-4">{brandPartnershipsInfo.title}</h3>
              <p className="text-lg md:text-xl font-medium mb-3">{brandPartnershipsInfo.description}</p>
              <p className="text-base text-ink/60">{brandPartnershipsInfo.ideal}</p>
            </div>
          </Reveal>
          <AccordionGroup 
            items={brandPartnerships} 
            colors={colorsPartnerships} 
            activeIndex={activePartnerships} 
            setActiveIndex={setActivePartnerships} 
            setIsHovered={setIsHovered} 
          />
        </div>

      </div>
    </section>
  );
}

// Subcomponente para reutilizar la lógica del acordeón
function AccordionGroup({ items, colors, activeIndex, setActiveIndex, setIsHovered }: any) {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.7 } }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div 
      className="flex flex-col lg:flex-row h-[450px] lg:h-[500px] gap-4 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((s: any, i: number) => {
        const isActive = activeIndex === i;
        
        return (
          <motion.div 
            layout
            key={s.n}
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(i)}
            initial={false}
            animate={{ flex: isActive ? 3 : 0.5 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className={`relative overflow-hidden rounded-2xl cursor-none flex-shrink-0 ${colors[i]} max-lg:min-h-[80px]`}
            style={{ minWidth: "0px" }}
          >
            <AnimatePresence mode="wait">
              {!isActive ? (
                <motion.div 
                  key={`inactive-${s.n}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-row lg:flex-col items-center justify-start lg:justify-center w-full h-full px-8 py-0 lg:p-0"
                >
                  <span className="font-serif text-2xl opacity-60 mr-3 lg:mr-0 lg:absolute lg:top-10">{s.n}</span>
                  <h3 className="font-serif text-2xl md:text-4xl whitespace-nowrap lg:-rotate-90 opacity-70 tracking-wide origin-center truncate lg:overflow-visible">
                    {s.title}
                  </h3>
                </motion.div>
              ) : (
                <motion.div 
                  key={`active-${s.n}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-center lg:justify-between w-full h-full overflow-hidden"
                >
                  <div className="lg:w-[600px] flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                    <span className="font-serif text-3xl md:text-4xl opacity-60 mb-0 lg:mb-6 block flex-shrink-0">{s.n}</span>
                    <motion.h3 
                      variants={titleVariants}
                      initial="hidden"
                      animate="visible"
                      className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[1.1] text-balance"
                    >
                      {s.title.split("").map((char: string, index: number) => (
                        <motion.span key={index} variants={charVariants}>{char}</motion.span>
                      ))}
                    </motion.h3>
                  </div>

                  <div className="mt-4 lg:mt-auto flex flex-col lg:max-w-lg lg:w-[500px]">
                    <p className="text-lg md:text-xl lg:text-3xl font-medium mb-0 leading-snug line-clamp-3 lg:line-clamp-none">
                      {s.summary}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
