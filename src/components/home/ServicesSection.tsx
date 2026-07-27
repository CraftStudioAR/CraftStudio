import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { services } from "../../content/brand";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play accordion logic (Desktop only)
  useEffect(() => {
    if (isHovered || window.innerWidth < 1024) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 6000); // 6 seconds for a relaxed, harmonious pace

    return () => clearInterval(interval);
  }, [isHovered]);

  const colors = [
    "bg-white text-ink border border-ink/5 shadow-[0_8px_30px_rgb(0,0,0,0.08)]", // Creación de marca
    "bg-navy text-cream",                     // Reposicionamiento
    "bg-red text-cream"                       // Refresh
  ];

  // Typewriter animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.7 }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="bg-cream text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header */}
        <Reveal>
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-sm tracking-widest text-red uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-red" /> Servicios
              </p>
              <h2 className="font-sans font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl mb-6 break-words lg:whitespace-nowrap">
                Cómo trabaja <span className="font-serif italic font-normal">Craft</span>
              </h2>
              <p className="text-lg md:text-xl text-ink/70 text-balance">
                Craft no ofrece paquetes estándar. Trabaja con programas pensados para el momento real en el que está cada empresa.
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

        {/* Horizontal Accordion powered entirely by Framer Motion Layout */}
        <div 
          className="flex flex-col lg:flex-row h-[380px] lg:h-[600px] gap-4 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {services.map((s, i) => {
            const isActive = activeIndex === i;
            
            return (
              <motion.div 
                layout
                key={s.n}
                onClick={() => setActiveIndex(i)}
                onMouseEnter={() => window.innerWidth >= 1024 && setActiveIndex(i)}
                initial={false}
                animate={{
                  flex: isActive ? 3 : 0.5
                }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className={`relative overflow-hidden rounded-[2rem] cursor-pointer flex-shrink-0 ${colors[i]}`}
                style={{
                  minWidth: "0px",
                  minHeight: "0px"
                }}
              >
                <AnimatePresence mode="wait">
                  {!isActive ? (
                    /* INACTIVE VIEW */
                    <motion.div 
                      key={`inactive-${s.n}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex flex-row lg:flex-col items-center justify-center lg:justify-center w-full h-full p-6 lg:p-0"
                    >
                      <span className="font-serif text-2xl opacity-60 mr-3 lg:mr-0 lg:absolute lg:top-10">
                        {s.n}
                      </span>
                      <h3 className="font-serif text-2xl md:text-4xl whitespace-nowrap lg:-rotate-90 opacity-70 tracking-wide origin-center truncate lg:overflow-visible">
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
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="absolute inset-0 p-6 lg:p-10 flex flex-col justify-center lg:justify-between w-full h-full overflow-hidden"
                    >
                      <div className="lg:w-[600px] flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                        <span className="font-serif text-3xl md:text-4xl opacity-60 mb-0 lg:mb-6 block flex-shrink-0">
                          {s.n}
                        </span>
                        
                        {/* Typewriter Title */}
                        <motion.h3 
                          variants={titleVariants}
                          initial="hidden"
                          animate="visible"
                          className="font-serif text-3xl md:text-5xl lg:text-7xl leading-[1.1] text-balance"
                        >
                          {s.title.split("").map((char, index) => (
                            <motion.span key={index} variants={charVariants}>
                              {char}
                            </motion.span>
                          ))}
                        </motion.h3>
                      </div>

                      <div className="mt-4 lg:mt-auto flex flex-col lg:max-w-lg lg:w-[500px]">
                        <p className="text-lg md:text-xl lg:text-3xl font-medium mb-6 lg:mb-12 leading-snug line-clamp-3 lg:line-clamp-none">
                          {s.summary}
                        </p>

                        <div>
                          <Link
                            to="/servicios"
                            className="inline-flex items-center gap-4 text-xs lg:text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                          >
                            <span className="border-b border-current/30 pb-1">Conocer en detalle</span>
                            <span>{"\u2192\uFE0E"}</span>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
