import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlyphMark from "../GlyphMark";
import ScrollGrow from "../ScrollGrow";

gsap.registerPlugin(ScrollTrigger);

const manifesto =
  "Construimos la forma en la que tu marca se presenta al mundo";

export default function FoundersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto Text Scramble / Fade
      const words = textRef.current?.querySelectorAll("span");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0.1, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 bg-cream text-ink px-6 pt-32 pb-12 md:pb-16 md:px-10 min-h-screen">
      <GlyphMark
        variant={1}
        className="pointer-events-none absolute -left-20 top-10 z-0 h-[40vw] w-[40vw] max-w-[400px] text-ink/[0.03] md:-left-10 rotate-12"
      />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Declaración Principal */}
        <ScrollGrow from={0.95} to={1}>
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
            <p className="mb-6 text-xs tracking-widest text-red uppercase flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-red" /> Nuestro Propósito
            </p>
            <p
              ref={textRef}
              className="font-serif text-3xl leading-[1.2] italic md:text-5xl lg:text-6xl text-ink/90 text-balance mb-12 md:mb-16"
            >
              {manifesto.split(" ").map((w, i) => (
                <span key={i} className="inline-block mr-[0.25em]">
                  {w}
                </span>
              ))}
            </p>
            <div className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-2xl mx-auto flex flex-col gap-8 text-balance">
              <p>Diagnosticamos, definimos y construimos. En ese orden.</p>
              <p>El resultado no es solo visual: es un sistema que funciona, escala y representa con claridad aquello que hace único a cada proyecto.</p>
            </div>
          </div>
        </ScrollGrow>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          
          {/* Tarjeta 1: Filosofía (Dark) */}
          <div className="bg-[#1a1a1a] text-cream rounded-[2rem] p-8 md:p-14 flex flex-col justify-between min-h-auto md:min-h-[500px] shadow-2xl">
            <div>
              <p className="text-cream/50 text-xs tracking-widest uppercase mb-6 md:mb-8 flex items-center gap-2">
                ✦ Sobre el estudio
              </p>
              <h3 className="font-serif text-4xl md:text-6xl italic leading-tight mb-6 md:mb-8 break-words">
                Estrategia primero.<br />Siempre.
              </h3>
              <p className="text-base md:text-xl text-cream/80 leading-relaxed max-w-md">
                Lideramos proyectos de branding y diseño digital desde una dirección clara, combinando criterio estratégico y sensibilidad visual para construir sistemas coherentes y duraderos.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-10 md:mt-12">
              <button className="w-full md:w-auto justify-center bg-cream text-ink px-6 py-4 rounded-full text-xs tracking-widest uppercase font-bold hover:bg-[#e0dad5] transition-colors flex items-center gap-2">
                Conocer Más ↗
              </button>
              <button className="w-full md:w-auto justify-center bg-white/10 text-cream border border-white/10 px-6 py-4 rounded-full text-xs tracking-widest uppercase font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
                Ver Servicios ↗
              </button>
            </div>
          </div>

          {/* Tarjeta 2: Equipo / Fotos (Light) */}
          <div className="bg-[#e3deda] rounded-[2rem] p-4 md:p-8 min-h-[450px] md:min-h-[500px] flex flex-col items-center justify-end relative overflow-hidden group shadow-xl">
            {/* Foto Placeholder principal */}
            <div className="absolute inset-0 bg-ink/[0.03] flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
               <span className="text-ink/30 text-sm tracking-widest uppercase font-medium">Fotografía del equipo</span>
            </div>
            
            {/* Tarjetas flotantes estilo bento inferior */}
            <div className="relative z-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              {/* Tarjeta Martina */}
              <div className="bg-cream p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between transform transition-transform duration-500 group-hover:-translate-y-2">
                <div>
                  <h4 className="font-serif italic text-4xl text-ink">Martina</h4>
                  <p className="text-[10px] tracking-widest uppercase text-ink/50 mt-2">Socia Fundadora</p>
                </div>
                <div className="mt-8 text-xs font-medium text-ink/70 flex items-center gap-2">
                  <span className="text-red">✦</span> Dirección de Arte
                </div>
              </div>

              {/* Tarjeta Tiziana */}
              <div className="bg-cream p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col justify-between transform transition-transform duration-500 group-hover:-translate-y-2">
                <div>
                  <h4 className="font-serif italic text-4xl text-ink">Tiziana</h4>
                  <p className="text-[10px] tracking-widest uppercase text-ink/50 mt-2">Socia Fundadora</p>
                </div>
                <div className="mt-8 text-xs font-medium text-ink/70 flex items-center gap-2">
                  <span className="text-red">✦</span> Dirección Estratégica
                </div>
              </div>
            </div>

          </div>

        </div>
        
      </div>
    </section>
  );
}
