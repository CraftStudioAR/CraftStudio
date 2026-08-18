import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { getProjects } from "../lib/supabaseClient";
import type { WorkCase } from "../content/brand";
import { motion } from "motion/react";

export default function Trabajos() {
  const [projectsList, setProjectsList] = useState<WorkCase[]>([]);

  useEffect(() => {
    getProjects().then(setProjectsList);
  }, []);
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

  // El portfolio no vuelve a vender la metodología: nombra lo que hay para ver.
  const titleLine1 = "Marcas que acompañamos";
  const titleLine2 = "en distintos momentos de su crecimiento";

  return (
    <div className="bg-cream min-h-screen text-ink">
      
      {/* 1. HERO REDISEÑADO */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 md:px-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red rounded-full blur-[100px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="mx-auto max-w-[1400px] relative z-10">
          <Reveal>
            <p className="text-sm tracking-widest uppercase mb-8 flex items-center gap-4 text-red font-bold">
              <span className="w-12 h-[1px] bg-red" /> Proyectos
            </p>
          </Reveal>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.02] tracking-tight max-w-4xl"
            >
              <div className="overflow-hidden pb-4 -mb-4 flex flex-wrap gap-x-[0.3em] gap-y-2">
                {titleLine1.split(" ").map((word, wIdx) => (
                  <span key={`w1-${wIdx}`} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, index) => (
                      <motion.span key={`l1-${wIdx}-${index}`} variants={charVariants} className="inline-block italic">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
              <div className="overflow-hidden pb-4 -mb-4 text-navy flex flex-wrap gap-x-[0.3em] gap-y-2">
                {titleLine2.split(" ").map((word, wIdx) => (
                  <span key={`w2-${wIdx}`} className="inline-block whitespace-nowrap">
                    {word.split("").map((char, index) => (
                      <motion.span key={`l2-${wIdx}-${index}`} variants={charVariants} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </div>
            </motion.h1>

            <Reveal delay={0.6}>
              <div className="flex flex-col gap-6 lg:max-w-xs lg:pb-4">
                <div className="w-16 h-[1px] bg-current opacity-20 hidden lg:block"></div>
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
        <div className="mx-auto grid max-w-[1400px] gap-x-8 gap-y-12 md:gap-y-20 md:grid-cols-2">
          {projectsList.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 0.08} className="min-w-0 w-full">
              <WorkCard work={w} index={i} total={projectsList.length} to={`/trabajos/${w.slug}`} cursorLabel="Ver caso" />
            </Reveal>
          ))}
        </div>
      </section>
      
    </div>
  );
}
