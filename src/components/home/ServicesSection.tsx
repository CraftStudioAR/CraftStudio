import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { services } from "../../content/brand";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section className="bg-cream text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Header */}
        <Reveal>
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-sm tracking-widest text-red uppercase mb-4 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-red" /> Qué Hacemos
              </p>
              <h2 className="font-sans font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl">Servicios</h2>
            </div>
            <Magnetic>
              <Link
                to="/servicios"
                className="border-b border-ink/30 pb-1 text-sm tracking-wide uppercase hover:border-ink transition-colors"
              >
                Ver todos ↗
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        {/* Split Screen Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Interactive Menu */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center gap-6 md:gap-10">
            {services.map((s, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={s.n}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className="cursor-pointer group flex items-start gap-4 md:gap-6"
                >
                  <span className={`font-serif text-lg md:text-xl transition-colors duration-500 mt-2 md:mt-3 ${isActive ? 'text-red' : 'text-ink/30 group-hover:text-ink/50'}`}>
                    {s.n}
                  </span>
                  <h3 className={`font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.2] transition-all duration-500 origin-left ${isActive ? 'translate-x-2 md:translate-x-4 opacity-100' : 'opacity-40 group-hover:opacity-60'}`}>
                    {s.title}
                  </h3>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Visor */}
          <div className="lg:w-1/2 w-full">
            <div className="w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgb(0,0,0,0.03)] border border-ink/[0.03] relative min-h-[420px] md:min-h-[380px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.n}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col"
                >
                  <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-medium text-balance mb-6">
                    {activeService.summary}
                  </p>
                  
                  <div className="h-[1px] w-full bg-ink/10 mb-6" />
                  
                  <p className="text-base md:text-lg opacity-60 leading-relaxed text-balance mb-8">
                    {activeService.detail}
                  </p>
                  
                  <div className="inline-flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-cream/50 rounded-xl p-4 border border-ink/5 self-start">
                    <span className="text-[10px] font-bold tracking-widest text-red uppercase shrink-0">
                      ✦ Fit ideal
                    </span>
                    <span className="text-sm opacity-80">{activeService.fit}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
