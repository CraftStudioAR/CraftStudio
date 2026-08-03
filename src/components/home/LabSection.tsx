import { useRef } from "react";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { Link } from "react-router-dom";

export default function LabSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} data-theme="dark" className="bg-ink text-cream py-32 md:py-48 relative overflow-hidden flex flex-col justify-center min-h-[90vh]">
      
      {/* Background Image */}
      <img 
        src="/images/fondo craft lab home.webp" 
        alt="Craft Lab Editorial Background" 
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      <div className="w-full relative z-10 px-6 md:px-10 max-w-7xl mx-auto">
        <Reveal className="w-full">
          <div className="glass-panel relative overflow-hidden rounded-2xl p-8 md:p-16 lg:p-20 border border-white/10 shadow-2xl">
            <div className="glass-sheen" />
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 relative z-10 w-full lg:translate-x-4">
              
              {/* Title */}
              <div className="flex-shrink-0">
                <h2 className="font-serif italic text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.85] tracking-tight text-cream drop-shadow-sm">
                  Craft<br/>Lab<span className="text-red">.</span>
                </h2>
              </div>
              
              {/* Text Block */}
              <div className="max-w-[450px]">
                <p className="text-xs md:text-sm tracking-widest uppercase mb-6 flex items-center gap-6 text-cream font-bold drop-shadow-sm">
                  <span className="w-12 h-[1.5px] bg-cream" /> Manifiesto Editorial
                </p>
                
                <p className="font-sans text-2xl md:text-3xl lg:text-4xl leading-[1.3] text-balance font-medium tracking-tight drop-shadow-sm">
                  Un espacio de ideas, ensayos y curadurías donde desglosamos la <span className="italic">mirada Craft.</span>
                </p>
                
                <div className="mt-8 md:mt-12">
                  <Magnetic>
                    <Link
                      to="/craft-lab"
                      className="group relative flex justify-center items-center gap-4 rounded-xl px-8 py-3.5 bg-white text-red hover:bg-white/90 transition-all hover:scale-105 shadow-xl w-fit"
                    >
                      <span className="font-bold uppercase tracking-widest text-xs md:text-sm">Explorar el Lab</span>
                      <span className="text-xl leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">{"\u2197\uFE0E"}</span>
                    </Link>
                  </Magnetic>
                </div>
              </div>
              
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
