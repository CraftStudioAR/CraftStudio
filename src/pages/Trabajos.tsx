import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { work } from "../content/brand";
import { motion } from "motion/react";

export default function Trabajos() {
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 }
    }
  };

  const charVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Split title manually to handle the line break beautifully on large screens
  const titleLine1 = "Sistemas construidos,";
  const titleLine2 = "no piezas entregadas.";

  return (
    <div className="bg-cream min-h-screen text-ink">
      
      {/* 1. HERO REDISEÑADO */}
      <section className="relative px-6 pt-40 pb-20 md:pt-48 md:pb-32 md:px-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red rounded-full blur-[100px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="mx-auto max-w-[1400px] relative z-10">
          <Reveal>
            <p className="text-sm tracking-widest uppercase mb-8 flex items-center gap-4 text-red font-bold">
              <span className="w-12 h-[1px] bg-red" /> Nuestro Archivo
            </p>
          </Reveal>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="font-serif text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight max-w-5xl"
            >
              <div className="overflow-hidden pb-4 -mb-4">
                {titleLine1.split("").map((char, index) => (
                  <motion.span key={`l1-${index}`} variants={charVariants} className="inline-block italic">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden pb-4 -mb-4 text-navy">
                {titleLine2.split("").map((char, index) => (
                  <motion.span key={`l2-${index}`} variants={charVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </motion.h1>

            <Reveal delay={0.6}>
              <div className="flex flex-col gap-6 lg:max-w-xs lg:pb-4">
                <div className="w-16 h-[1px] bg-current opacity-20 hidden lg:block"></div>
                <p className="text-xl md:text-2xl font-medium leading-[1.4] text-balance opacity-80">
                  Una selección de programas de identidad y comunicación.
                </p>
                <p className="text-xs font-bold tracking-widest uppercase opacity-40">
                  Casos completos a pedido.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. GRILLA DE TRABAJOS (Sin cambios estructurales) */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-20 md:grid-cols-2">
          {work.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 0.08}>
              <WorkCard work={w} index={i} total={work.length} to={`/trabajos/${w.slug}`} cursorLabel="Ver caso" />
            </Reveal>
          ))}
        </div>
      </section>
      
    </div>
  );
}
